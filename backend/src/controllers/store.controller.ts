import { Request, Response } from "express";
import prisma from "../utils/db";

export async function getStoresController(req: Request, res: Response) {
    try {
        const stores = await prisma.store.findMany();
        return res.send(stores);
    } catch (error) {
        res.status(500).send(error);
    }
}