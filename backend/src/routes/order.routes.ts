import { Router } from "express";
import { cancelOrderController, completeOrderController, confirmOrderController, createOrderController, getOrderByIdController, getOrdersController } from "../controllers/order.controller";
import validateResource from "../middlewares/validateResource";
import verifyLogin from "../middlewares/verifyLogin";
import verifyManager from "../middlewares/verifyManager";
import { createOrderSchema, getOrdersSchema } from "../schema/order.schema";

const orderRouter = Router();

// Private [manager, customer] routes
orderRouter
  .use(verifyLogin)
  .post("/", validateResource(createOrderSchema), createOrderController)
  .get("/:orderId", getOrderByIdController)
  .patch("/:orderId/cancel", cancelOrderController);

// Private [manager] routes
orderRouter
  .use(verifyLogin)
  .use(verifyManager)
  .get("/", validateResource(getOrdersSchema), getOrdersController)
  .patch("/:orderId/confirm", confirmOrderController)
  .patch("/:orderId/complete", completeOrderController);


export default orderRouter;
