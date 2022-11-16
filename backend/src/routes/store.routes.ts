import { Router } from 'express';
import { getStoresController } from '../controllers/store.controller';

const storeRouter = Router();

// Public routes
storeRouter.get('/', getStoresController);

export default storeRouter;