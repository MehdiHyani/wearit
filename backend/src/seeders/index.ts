import prisma from "../utils/db";
import log from "../utils/logger";
import { users, stores, products } from './seedData';
import { faker } from '@faker-js/faker';

async function seedUsers() {
    try {
        await prisma.user.deleteMany();
        await prisma.user.createMany({
            data: users.map(us => ({
                USR_EMAIL: us.email,
                USR_FIRST_NAME: us.firstName,
                USR_LAST_NAME: us.lastName,
                USR_PASSWORD: us.password,
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
                    PRO_IMAGES: {
                        create: {
                            IMG_URL: p.image
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

async function seedAvailabilities() {
    try {
        await prisma.availability.deleteMany();
        const stores = await prisma.store.findMany();
        const products = await prisma.product.findMany();
        await Promise.all(stores.map(async store => {
            await Promise.all(products.map(async product => {
                if(parseInt(faker.random.numeric(3)) % 2)
                    await prisma.availability.create({
                        data: {
                            AV_QUANTITY: parseInt(faker.random.numeric(2)),
                            STR_ID: store.STR_ID,
                            PRO_ID: product.PRO_ID,
                        }
                    });
            }));
        }));
        log.info("Seeded availabilities");
    } catch (error) {
        log.error("Error seeding availabilities");
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
        await seedAvailabilities();
        await seedFeedbacks();
    } catch (error) {
        log.error(error);
        process.exit(1);
    }
}

main();