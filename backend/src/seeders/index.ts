import prisma from "../utils/db";
import users from './users'

async function main() {

    await Promise.all(users.map(async (user) => {
        await prisma.user.create({
            data: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                password: user.password
            }
        })
    }))
}

main();