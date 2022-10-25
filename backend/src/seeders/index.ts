import { createUser } from "../services/user.service";
import prisma from "../utils/db";
import log from "../utils/logger";
import { users } from './seedData'

async function main() {
    await prisma.user.deleteMany();
    const createdUsers = await Promise.all(users.map(async (user) => {
        const { id } = await createUser({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            password: user.password,
        });
        return id;
    }))
    log.info(createdUsers.join(" "))
}

main();