import { Router } from "express";
import { createAvailabilityController, deleteAvailabilityController, getAvailabilitiesController, getAvailabilityByProductController, updateAvailabilityController } from "../controllers/availability.controller";
import validateResource from "../middlewares/validateResource";
import verifyLogin from "../middlewares/verifyLogin";
import verifyManager from "../middlewares/verifyManager";
import { createAvailabilitySchema, deleteAvailabilitySchema, getAvailabilitiesSchema, updateAvailabilitySchema } from "../schema/availability.schema";

const availabilityRouter = Router();

// Public routes
availabilityRouter
  .get("/:productId", getAvailabilityByProductController);


// Private [manager] routes
availabilityRouter
  .use(verifyLogin)
  .use(verifyManager)
  .get("/", validateResource(getAvailabilitiesSchema), getAvailabilitiesController)
  .post("/", validateResource(createAvailabilitySchema), createAvailabilityController)
  .delete("/", validateResource(deleteAvailabilitySchema), deleteAvailabilityController)
  .patch("/", validateResource(updateAvailabilitySchema), updateAvailabilityController);

export default availabilityRouter;
