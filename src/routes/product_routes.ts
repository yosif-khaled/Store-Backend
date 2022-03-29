import { Router } from 'express';

import {
  getAllProducts,
  getProductById,
  createNewProduct,
  updateProduct,
  deleteProductById
} from '../controller/product_controller'
import { verifyUser } from '../middleware/user';

export const productsRouter = Router();

productsRouter.get('/products', getAllProducts);
productsRouter.get('/products/:id', getProductById);
productsRouter.post('/products', verifyUser, createNewProduct);
productsRouter.patch('/products', verifyUser, updateProduct);
productsRouter.delete('/products', verifyUser, deleteProductById);