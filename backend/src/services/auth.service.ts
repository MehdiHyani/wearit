import { omit } from 'lodash';
import { signJwt } from '../utils/jwt';
import type { User } from '@prisma/client';
import { userPrivateFields } from '../utils/constants';
import { createSession } from './session.service';
import prisma from '../utils/db';

export function signAccessToken(user: User) {
    const payload = omit(user, userPrivateFields);

    const accessToken = signJwt(
        payload,
        Buffer.from(process.env.ACCESS_TOKEN_PRIVATE_KEY ? process.env.ACCESS_TOKEN_PRIVATE_KEY: '', 'base64')
            .toString('ascii'),
        {
            expiresIn: '15m',
        },
    );

    return accessToken;
}

export async function signRefreshToken(userId: number) {
    const session = await createSession(userId);

    const refreshToken = signJwt(
        {
            session: session.id,
        },
        Buffer.from(process.env.REFRESH_PRIVATE_KEY ? process.env.REFRESH_PRIVATE_KEY : '', 'base64').toString('ascii'),
        {
            expiresIn: '30d',
        },
    );

    return refreshToken;
}

export function findSessionById(sessionId: number) {
    return prisma.session.findUnique({
        where: {
            id: sessionId
        }
    });
}