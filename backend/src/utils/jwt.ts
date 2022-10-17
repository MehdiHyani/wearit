import jwt from 'jsonwebtoken';

export function signJwt(
    payload: Object,
    signingKey: string,
    options?: jwt.SignOptions | undefined,
) {
    return jwt.sign(payload, signingKey, {
        ...(options && options),
        algorithm: 'RS256',
    });
}

export function verifyJwt<T>(
    token: string,
    verifyingKey: string,
): T | null {
    try {
        const decoded = jwt.verify(token, verifyingKey) as T;
        return decoded;
    } catch (e) {
        return null;
    }
}