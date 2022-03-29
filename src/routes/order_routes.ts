import { Router } from 'express';
import {
  getAllOrdersByUserId,
  getMostRecentOrderByUserId,
  getOrder,
  addProductToOrder,
  createNewOrder,
  closeOrder,
  deleteOrder,
  getAllOrders
} from '../controller/order_controller'
import { verifyUser } from '../middleware/user';

export const ordersRouter = Router();

ordersRouter.get('/orders', verifyUser, getAllOrders)
ordersRouter.get('/:userId/orders', verifyUser, getAllOrdersByUserId);
ordersRouter.get('/:userId/orders', verifyUser, getMostRecentOrderByUserId);
ordersRouter.get('/:userId/orders/:orderId', verifyUser, getOrder);
ordersRouter.post('/orders', verifyUser, addProductToOrder);
ordersRouter.post('/:userId/orders', verifyUser, createNewOrder);
ordersRouter.patch('/:userId/orders/:orderId/checkedout', verifyUser, closeOrder);
ordersRouter.delete('/orders', verifyUser, deleteOrder);