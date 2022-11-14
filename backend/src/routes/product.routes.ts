import { Router } from "express";
import { createProductController, deleteProductController, getFeaturedProductsController, getProductByIdController, getProductsByQueryController, getProductsController } from "../controllers/product.controller";
import validateResource from "../middlewares/validateResource";
import verifyLogin from "../middlewares/verifyLogin";
import verifyManager from "../middlewares/verifyManager";
import {
  createProductSchema,
  getProductsByQuerySchema,
  getProductsSchema,
} from "../schema/product.schema";

const productRouter = Router();

// Public routes
productRouter
  .get("/", validateResource(getProductsSchema), getProductsController)
  .get("/featured", getFeaturedProductsController)
  .get("/search", validateResource(getProductsByQuerySchema), getProductsByQueryController)
  .get("/:id", getProductByIdController);

// Private [manager] routes
productRouter
  .use(verifyLogin)
  .use(verifyManager)
  .delete("/:id", deleteProductController)
  .post("/", validateResource(createProductSchema), createProductController);

export default productRouter;
