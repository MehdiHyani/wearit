import { NotFoundError } from "@prisma/client/runtime";
import { Request, Response } from "express";
import { CreateProductInput, EditProductInput, getProductsByQueryInput, getProductsInput } from "../schema/product.schema";
import { createProduct, deleteProductById, editProduct, getFeaturedProducts, getProductById, getProducts, getProductsByQuery } from "../services/product.service";

export async function getProductsController(req: Request<Record<string, never>,
    Record<string, never>, getProductsInput>, res: Response) {
    try {
        const { body: { page } } = req;
        const products = await getProducts(page);
        return res.send(products);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function getFeaturedProductsController(req: Request, res: Response) {
    try {
        const products = await getFeaturedProducts();
        return res.send(products);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function getProductsByQueryController(req: Request<Record<string, never>,
    Record<string, never>, getProductsByQueryInput>, res: Response) {
    try {
        const { body: { page, query } } = req;
        const products = await getProductsByQuery(query, page);
        return res.send(products);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function getProductByIdController(req: Request, res: Response) {
    try {
        const products = await getProductById(parseInt(req.params.productId as string));
        return res.send(products);
    } catch (error) {
        if(error instanceof NotFoundError)
            return res.status(404).send(error.message);
        res.status(500).send(error);
    }
}

export async function deleteProductController(req: Request, res: Response) {
    try {
        await deleteProductById(parseInt(req.params.productId as string));
        return res.sendStatus(200);
    } catch (error) {
        if(error instanceof Object && Object.hasOwn(error, 'meta'))
            return res.status(404).send((error as any).meta.cause);
        res.status(500).send(error);
    }
}

export async function editProductController(req: Request<Record<string, never>,
    Record<string, never>, EditProductInput>, res: Response) {
    try {
        await editProduct(parseInt(req.params.productId as string), {
            PRO_AVAILABLE_QUANTITY: req.body.availableQuantity,
            PRO_NAME: req.body.name,
            PRO_PRICE: req.body.price
        });
        return res.sendStatus(200);
    } catch (error) {
        if(error instanceof Object && Object.hasOwn(error, 'meta'))
            return res.status(404).send((error as any).meta.cause);
        res.status(500).send(error);
    }
}

export async function createProductController(req: Request<Record<string, never>,
    Record<string, never>, CreateProductInput>, res: Response) {
    try {
        const { body: { imageUrls, name, price, availableQuantity } } = req;
        const product = await createProduct({ imageUrls, name, price, availableQuantity });
        return res.status(201).send(product);
    } catch (error) {
        res.status(500).send(error);
    }
}