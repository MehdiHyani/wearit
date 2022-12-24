import prisma from "../utils/db";
import log from "../utils/logger";
import { users, stores, products } from './seedData';
import { faker } from '@faker-js/faker';
import { Role } from "@prisma/client";

async function seedUsers() {
    try {
        await prisma.user.deleteMany();
        await prisma.user.createMany({
            data: users.map(us => ({
                USR_EMAIL: us.email,
                USR_FIRST_NAME: us.firstName,
                USR_LAST_NAME: us.lastName,
                USR_PASSWORD: us.password,
                USR_IMAGE: `https://ui-avatars.com/api/?name=${us.firstName}+${us.lastName}`,
                USR_ROLE: Role.manager,
            }))
        });
        log.info("Seeded users");
    } catch (error) {
        log.error("Error seeding users");
        throw error;
    }
}

async function seedStores() {
    try {
        await prisma.store.deleteMany();
        await prisma.store.createMany({
            data: stores.map(st => ({
                STR_HOURS: st.openingHours,
                STR_LATITUDE: st.latitude,
                STR_LONGITUDE: st.longitude,
                STR_NAME: st.name,
                STR_PHONE: st.phoneNumber,
            })),
        });
        log.info("Seeded stores");
    } catch (error) {
        log.error("Error seeding stores");
        throw error;
    }
}

async function seedProducts() {
    try {
        await prisma.product.deleteMany();

        await Promise.all(products.map(async p => {
            await prisma.product.create({
                data: {
                    PRO_NAME: p.title,
                    PRO_PRICE: p.price,
                    PRO_AVAILABLE_QUANTITY: parseInt(faker.random.numeric(3)),
                    PRO_IMAGES: {
                        createMany: {
                            data: [
                                {
                                    IMG_URL: p.image
                                }, {
                                    IMG_URL: 'https://via.placeholder.com/500'
                                }
                            ]
                        }
                    }
                }
            });
        }));
        log.info("Seeded products");
    } catch (error) {
        log.error("Error seeding products");
        throw error;
    }
}

async function seedFeedbacks() {
    try {
        await prisma.feedback.deleteMany();
        const users = await prisma.user.findMany();
        const products = await prisma.product.findMany();
        await Promise.all(products.map(async product => {
            await Promise.all(users.map(async user => {
                await prisma.feedback.create({
                    data: {
                        FDB_COMMENT: faker.lorem.sentence(),
                        USR_ID: user.USR_ID,
                        PRO_ID: product.PRO_ID,
                    }
                });
            }));
        }));
        log.info("Seeded feedbacks");
    } catch (error) {
        log.error("Error seeding feedbacks");
        throw error;
    }
}

async function main() {
    try {
        await seedUsers();
        await seedStores();
        await seedProducts();
        await seedFeedbacks();
    } catch (error) {
        log.error(error);
        process.exit(1);
    }
}

main();