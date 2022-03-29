import { Request, Response } from 'express';

import { OrderModel } from '../model/order_model';
import { Order, ProductIntoOrder } from '../types/order';
import { Cart } from '../types/cart';
import { OrderProductModel } from '../model/order_product_model';

const orderModel = new OrderModel();
const opModel = new OrderProductModel();

// checked with rest
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await orderModel.showAllOrders();
    res.json(orders);
  } catch (error) {
    res.status(400).json(error);
  }
};

// checked with rest
export const getAllOrdersByUserId = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    const orders = await orderModel.showAllOrdersByUserId(userId);
    res.json(orders);
  } catch (error) {
    res.status(400).json(error);
  }
};


// checked with rest
export const getMostRecentOrderByUserId = async (req: Request, res: Response) => {

  try {
    const userId: string = req.params.userId;
    const recetOrder: Order = await orderModel.getMostRecentOrder(userId);
    res.json(recetOrder);
  } catch (error) {
    res.status(400).json(error);
  }
};


// checked with rest
export const getOrder = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.userId;
    const orderId: string = req.params.orderId;
    const order: Cart[] = await orderModel.showOrder(userId, orderId);
    res.json(order);
  } catch (error) {
    res.json(error);
  }
}


//checked with rest
export const addProductToOrder = async (req: Request, res: Response) => {

  try {
    const p: ProductIntoOrder = {
      orderId: req.body.order_id,
      productId: req.body.product_id,
      qnty: req.body.quantity
    };
    const addedProduct: ProductIntoOrder = await opModel.addProductToCart(p);
    res.json(addedProduct);
  } catch (error) {
    res.status(400).json(error);
  }
};

// checked with rest
export const createNewOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const createdOrder = await orderModel.createNewOrder(userId);
    res.json(createdOrder);
  } catch (error) {
    res.status(400).json(error);
  }
};


export const closeOrder = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.orderId;
    const userId = req.params.userId;
    const order: Order = await orderModel.closeOrder(userId, orderId);
    res.json(order);
  } catch (error) {
    res.json(error);
  }
};


export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const orderId: string = req.body.id;
    const deletedOrder: Order = await orderModel.deleteOrder(orderId);
    res.json(deletedOrder);
  } catch (error) { res.json(error); }
};