import { Request, Response } from 'express';
import { get, omit } from 'lodash';
import { LoginInput } from '../schema/auth.schema';
import { getSessionById, signAccessToken, signRefreshToken } from '../services/auth.service';
import { findSessionById, updateSessionValidity } from '../services/session.service';
import { getUserByEmail, getUserById, validatePassword } from '../services/user.service';
import { userPrivateFields } from '../utils/constants';
import { verifyJwt } from '../utils/jwt';

export async function loginController(
    req: Request<Record<string, never>, Record<string, never>, LoginInput>,
    res: Response,
) {
    const { email, password } = req.body;

    const message = 'Invalid email or password';

    const user = await getUserByEmail(email);

    if (!user) {
        return res.status(403).send(message);
    }

    const isValid = await validatePassword(user.USR_PASSWORD, password);

    if (!isValid) {
        return res.send(message);
    }

    const accessToken = signAccessToken(user);

    const refreshToken = await signRefreshToken(user.USR_ID);

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        maxAge: 900000,
    });
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 2.628e9,
    });
    return res.send({
        user: omit(user, userPrivateFields),
    });
}

export async function refreshTokenController(req: Request, res: Response) {
    const refreshToken = get(req, 'cookies.refreshToken');

    const errorMessage = 'Could not refresh Token';

    const decoded = verifyJwt<{ session: number }>(
        refreshToken,
        Buffer.from(
            process.env.REFRESH_PUBLIC_KEY ? process.env.REFRESH_PUBLIC_KEY : '', 'base64'
        ).toString('ascii'),
    );

    if (!decoded) {
        return res.status(401).send(errorMessage);
    }

    const session = await getSessionById(decoded.session);

    if (!session || !session.SES_VALID) {
        return res.status(401).send(errorMessage);
    }

    const user = await getUserById(session.USR_ID);

    if (!user) {
        return res.status(401).send(errorMessage);
    }

    const accessToken = signAccessToken(user);

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        maxAge: 900000,
    });
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 2.628e9,
    });

    return res.status(200).json({ success: true });
}

export async function logoutController(req: Request, res: Response) {
    /**
     * We clear cookies and remove the validity of the session
     * The reason why we're not deleting the session is knowing
     * SOME important insights about the logins of this users!
     * Catching errors is not of concern here
     */

    const refreshToken = get(req, 'cookies.refreshToken');
    res.clearCookie('accessToken').clearCookie('refreshToken');

    const decoded = verifyJwt<{ session: number }>(
        refreshToken,
        Buffer.from(process.env.REFRESH_PUBLIC_KEY ?? '', 'base64').toString('ascii'),
    );

    if (decoded) {

        let session;

        try {
            session = await findSessionById(decoded.session);
        } catch (error) { }

        if (session && session.SES_VALID) {
            try {
                await updateSessionValidity(decoded.session, false);
            } catch (error) { }
        }
    }

    return res.status(200).json({ success: true });
}

