import { Request, Response } from 'express';
import { get, omit } from 'lodash';
import { LoginInput } from '../schema/auth.schema';
import { findSessionById, signAccessToken, signRefreshToken } from '../services/auth.service';
import { findUserByEmail, findUserById, validatePassword } from '../services/user.service';
import { userPrivateFields } from '../utils/constants';
import { verifyJwt } from '../utils/jwt';

export async function loginController(
    req: Request<{}, {}, LoginInput>,
    res: Response,
) {
    const { email, password } = req.body;

    const message = 'Invalid email or password';

    const user = await findUserByEmail(email);

    if (!user) {
        return res.status(403).send(message);
    }

    const isValid = await validatePassword(user.password, password);

    if (!isValid) {
        return res.send(message);
    }

    const accessToken = signAccessToken(user);

    const refreshToken = await signRefreshToken(user.id);

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
        Buffer.from(process.env.REFRESH_PUBLIC_KEY!, 'base64').toString('ascii'),
    );

    if (!decoded) {
        return res.status(401).send(errorMessage);
    }

    const session = await findSessionById(decoded.session);

    if (!session || !session.valid) {
        return res.status(401).send(errorMessage);
    }

    const user = await findUserById(session.userId);

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
    return res
        .clearCookie('accessToken')
        .clearCookie('refreshToken')
        .status(200)
        .json({ success: true });
}

