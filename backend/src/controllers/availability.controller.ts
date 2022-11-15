import { Request, Response } from "express";
import { createAvailabilityInput, deleteAvailabilityInput, getAvailabilitiesInput, updateAvailabilityInput } from "../schema/availability.schema";
import { createAvailability, deleteAvailability, getAvailabilities, getAvailabilityByProduct, updateAvailability } from "../services/availability.service";

export async function getAvailabilitiesController(req: Request<{}, {}, getAvailabilitiesInput>, res: Response) {
    try {
        const { body: { page } } = req;
        const availabilities = await getAvailabilities(page);
        return res.send(availabilities);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function getAvailabilityByProductController(req: Request, res: Response) {
    try {
        const availabilities = await getAvailabilityByProduct(parseInt(req.params.productId as string));
        return res.send(availabilities);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function createAvailabilityController(req: Request<{}, {}, createAvailabilityInput>, res: Response) {
    try {
        const { body: availability } = req;
        await createAvailability(availability);
        return res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function deleteAvailabilityController(req: Request<{}, {}, deleteAvailabilityInput>, res: Response) {
    try {
        const { body: { productId, storeId } } = req;
        await deleteAvailability(productId, storeId);
        return res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function updateAvailabilityController(req: Request<{}, {}, updateAvailabilityInput>, res: Response) {
    try {
        const { body: { productId, storeId, quantityOnHand } } = req;
        await updateAvailability(productId, storeId, quantityOnHand);
        return res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error);
    }
}