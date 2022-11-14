import { NotFoundError } from "@prisma/client/runtime";
import { Request, Response } from "express";
import { CreateProductInput, getProductsByQueryInput, getProductsInput } from "../schema/product.schema";
import { createProduct, deleteProductById, getFeaturedProducts, getProductById, getProducts, getProductsByQuery } from "../services/product.service";

export async function getProductsController(req: Request<{}, {}, getProductsInput>, res: Response) {
    try {
        const { body: { page } } = req;
        const feedbacks = await getProducts(page);
        return res.send(feedbacks);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function getFeaturedProductsController(req: Request, res: Response) {
    try {
        const feedbacks = await getFeaturedProducts();
        return res.send(feedbacks);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function getProductsByQueryController(req: Request<{}, {}, getProductsByQueryInput>, res: Response) {
    try {
        const { body: { page, query } } = req;
        const feedbacks = await getProductsByQuery(query, page);
        return res.send(feedbacks);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function getProductByIdController(req: Request, res: Response) {
    try {
        const feedbacks = await getProductById(parseInt(req.params.id as string));
        return res.send(feedbacks);
    } catch (error) {
        if(error instanceof NotFoundError)
            return res.status(404).send(error.message);
        res.status(500).send(error);
    }
}

export async function deleteProductController(req: Request, res: Response) {
    try {
        await deleteProductById(parseInt(req.params.id as string));
        return res.sendStatus(200);
    } catch (error) {
        if(error instanceof Object && Object.hasOwn(error, 'meta'))
            return res.status(404).send((error as any).meta.cause);
        res.status(500).send(error);
    }
}

export async function createProductController(req: Request<{}, {}, CreateProductInput>, res: Response) {
    try {
        const product = await createProduct(req.body);
        return res.status(201).send(product);
    } catch (error) {
        res.status(500).send(error);
    }
}