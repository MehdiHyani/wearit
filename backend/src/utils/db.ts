import { PrismaClient } from '@prisma/client';
import { hash } from 'argon2';

const prisma = new PrismaClient();

// Trigger to hash the password
prisma.$use(async (params, next) => {
    if
    (
        ['create', 'update'].includes(params.action) // Either update or create
        && params.model === 'User' // Model User
        && params.args.data.password // In case password is not changed
    )
        params.args.data.password = await hash(params.args.data.password);
    const result = await next(params)
    return result
})

export default prisma;