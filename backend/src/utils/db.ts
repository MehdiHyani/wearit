import { PrismaClient, User } from '@prisma/client';
import { hash } from 'argon2';

const prisma = new PrismaClient();

// Trigger to hash the password
prisma.$use(async (params, next) => {
    if
    (
        ['create', 'update',].includes(params.action) // Either update or create
        && params.model === 'User' // Model User
        && params.args.data.USR_PASSWORD // In case password is not changed
    )
        params.args.data.USR_PASSWORD = await hash(params.args.data.USR_PASSWORD);
    if
    (
        ['createMany', 'updateMany',].includes(params.action) // Either update or create
        && params.model === 'User' // Model User
    )
        params.args.data =  await Promise.all(params.args.data.map(async (user: Partial<User>) => {
            if(user.USR_PASSWORD)
                user.USR_PASSWORD = await hash(user.USR_PASSWORD);

            return user;
        }));
    const result = await next(params);
    return result;
});

export default prisma;