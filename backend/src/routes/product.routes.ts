import { Router } from "express";
import { createProductController, deleteProductController, editProductController, getFeaturedProductsController, getProductByIdController, getProductsByQueryController, getProductsController } from "../controllers/product.controller";
import validateResource from "../middlewares/validateResource";
import verifyLogin from "../middlewares/verifyLogin";
import verifyManager from "../middlewares/verifyManager";
import {
  createProductSchema,
  editProductSchema,
  getProductsByQuerySchema,
  getProductsSchema,
} from "../schema/product.schema";

const productRouter = Router();

// Public routes
productRouter
  .get("/", getProductsController)
  .get("/featured", getFeaturedProductsController)
  .get("/search", getProductsByQueryController)
  .get("/:productId", getProductByIdController);

// Private [manager] routes
productRouter
  .use(verifyLogin)
  .use(verifyManager)
  .post("/", validateResource(createProductSchema), createProductController)
  .patch("/:productId", validateResource(editProductSchema), editProductController)
  .delete("/:productId", deleteProductController);

export default productRouter;
