import { NotFoundError } from "@prisma/client/runtime";
import { Request, Response } from "express";
import { createOrderInput, getOrdersInput } from "../schema/order.schema";
import { cancelOrder, completeOrder, confirmOrder, createOrder, getOrderById, getOrders } from "../services/order.service";

export async function createOrderController(req: Request<{}, {}, createOrderInput>, res: Response) {
    try {
        const userId = res.locals.user.id
        const [{ id }] = await createOrder(userId, req.body)
        return res.status(201).send(id);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function getOrderByIdController(req: Request, res: Response) {
    try {
        const order = await getOrderById(parseInt(req.params.orderId))
        return res.status(200).send(order);
    } catch (error) {
        if(error instanceof NotFoundError)
            return res.status(404).send(error.message);
        res.status(500).send(error);
    }
}

export async function cancelOrderController(req: Request, res: Response) {
    try {
        await cancelOrder(parseInt(req.params.orderId))
        return res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function getOrdersController(req: Request<{}, {}, getOrdersInput>, res: Response) {
    try {
        const orders = await getOrders(req.body.page);
        return res.status(200).send(orders);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function confirmOrderController(req: Request, res: Response) {
    try {
        await confirmOrder(parseInt(req.params.orderId))
        return res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function completeOrderController(req: Request, res: Response) {
    try {
        await completeOrder(parseInt(req.params.orderId))
        return res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error);
    }
}