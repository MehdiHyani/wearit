import { createUser } from "../services/user.service";
import prisma from "../utils/db";
import log from "../utils/logger";
import { users, stores, products } from './seedData';
import { faker } from '@faker-js/faker';

async function seedUsers() {
    try {
        await prisma.user.deleteMany();
        await Promise.all(users.map(async user => {
            const { id } = await createUser({
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                password: user.password,
            }, 'admin');
            return id;
        }));
        log.info("Seeded users");
    } catch (error) {
        log.info("Error seeding users");
    }
}

async function seedStores() {
    try {
        await prisma.store.deleteMany();
        await prisma.store.createMany({
            data: stores,
        });
        log.info("Seeded stores");
    } catch (error) {
        log.info("Error seeding stores");
    }
}

async function seedProducts() {
    try {
        await prisma.product.deleteMany();
        await prisma.product.createMany({
            data: products,
        });
        log.info("Seeded products");
    } catch (error) {
        log.info("Error seeding products");
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
                            quantityOnHand: parseInt(faker.random.numeric(2)),
                            storeId: store.id,
                            productId: product.id,
                        }
                    });
            }));
        }));
        log.info("Seeded availabilities");
    } catch (error) {
        log.info("Error seeding availabilities");
    }
}

async function seedFeedbacks() {
    try {
        const users = await prisma.user.findMany();
        const products = await prisma.product.findMany();
        await Promise.all(products.map(async product => {
            await Promise.all(users.map(async user => {
                await prisma.feedback.create({
                    data: {
                        feedback: faker.lorem.sentence(),
                        userId: user.id,
                        productId: product.id,
                    }
                });
            }));
        }));
        log.info("Seeded feedbacks");
    } catch (error) {
        log.info("Error seeding feedbacks");
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
    }
}

main();