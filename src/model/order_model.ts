import { Client } from '../db';
import { Order } from '../types/order';
import { Cart } from '../types/cart';
import { orderQueries } from '../queries/order_queries';

export class OrderModel {

  async showAllOrders(): Promise<Order[]> {
    try {
      const connection = await Client.connect();
      const sql = orderQueries.getAllOrders;
      const result = await connection.query(sql);
      const orders = result.rows;
      connection.release();
      return orders;
    } catch (error) {
      throw new Error(`Could not get all orders. Error: ${error}`);
    }
  }
  
  async showAllOrdersByUserId(userId: string): Promise<Order[]> {
    try {
      const connection = await Client.connect();
      const sql = orderQueries.getAllOrdersByUserId;
      const result = await connection.query(sql, [userId]);
      const orders = result.rows;
      connection.release();
      return orders;
    } catch (error) {
      throw new Error(`Could Not Get Orders. Error: ${error}`);
    }
  }
  
  // needs to have a join table
  async showOrder(userId: string, orderId: string): Promise<Cart[]> {
    try {
      const connection = await Client.connect();
    const sql = orderQueries.getOrder;
      const result = await connection.query(sql, [userId, orderId]);
      const cart = result.rows;
      connection.release();
      return cart;
    } catch (error) {
      throw new Error(`Could Not Get Order: ${orderId}. Error: ${error}`);
    }  
  }

  async getMostRecentOrder(userId: string):Promise<Order>{
    try {
      const connection = await Client.connect();
      const sql = orderQueries.getMostRecentOrderByUserId;      
      const result = await connection.query(sql, [userId]);
      const recetOrder = result.rows[0];
      return recetOrder;
    } catch (error) {
      throw new Error(`Could Not Get Most Recent Order. Error: ${error}`);
    }
  }
  
  async createNewOrder(userId: string): Promise<Order> {
    try {
      const connection = await Client.connect();
      const sql = orderQueries.createNewOrder;
      const result = await connection.query(sql, [userId, 'active']);
      const newOrder = result.rows[0];
      connection.release();
      return newOrder;
    } catch (error) {
      throw new Error(`Could Not Create New Order For User: ${userId}. Error: ${error}`);
    }
  }

  // update order status
  async closeOrder(userId: string, orderId: string): Promise<Order> {
    try {
      const connection = await Client.connect();
      const sql = orderQueries.closeOrder;
      const result = await connection.query(sql, ['complete', orderId, userId]);
      const order = result.rows[0];
      connection.release();
      return order;
    } catch (error) {
      throw new Error(`Could Not Update Order Status. Error: ${error}`);
    }
  }
  

  async deleteOrder(orderId: string): Promise<Order> {
    try {
      const connection = await Client.connect();
      const sql = orderQueries.deleteOrder;
      const result = await connection.query(sql, [orderId]);
      const order = result.rows[0];
      connection.release();
      return order;
    } catch (error) {
      throw new Error(`Could Not Delete Order. Error: ${error}`);
    }
  }
}