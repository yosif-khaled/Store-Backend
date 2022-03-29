import { Client } from '../db';
import { OrderProduct } from '../types/order_product';
import { orderProductQueries } from '../queries/order_product_queries';

export class OrderProductModel {

  // working tested with rest
  async index(): Promise<OrderProduct[]> {
    try {
      const connection = await Client.connect();
      const sql = orderProductQueries.getAll;
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Could Not Get Products. Error: ${error}`);
    }
  }

  // working tested with rest
  async show(id: string): Promise<OrderProduct> {
    try {
      const connection = await Client.connect();
      const sql = orderProductQueries.getOrderProductById;
      const result = await connection.query(sql, [id]);
      connection.release();
      const row: OrderProduct = result.rows[0];
      return row;
    } catch (error) {
      throw new Error(`Could Not Get Product With ID:${id}. Error: ${error}`);
    }
  }

  // working tested with rest
  async addProductToCart(p: OrderProduct) {
    try {
      const connection = await Client.connect();
      const sql = orderProductQueries.addProductToCart;
      const result = await connection.query(sql, [p.qnty, p.orderId, p.productId]);
      const cart = result.rows[0];
      connection.release();
      return cart;
    } catch (error) {
      throw new Error(`Product Was Not Added. Error: ${error}`);
    }
  }

  // stuck fix it later
  async update(op: OrderProduct): Promise<OrderProduct> {
    try {
      const connection = await Client.connect();
      const sql = orderProductQueries.updateQuantity;
      const result = await connection.query(sql, [op.qnty, op.orderId, op.productId]);
      const product = result.rows[0];
      connection.release();
      return product;
    } catch (error) {
      throw new Error(`Could Not Update Product INFO`);
    }
  }

  // works fine tested with rest
  async removeProductFromCart(orderId: string, productId: string): Promise<OrderProduct> {
    try {
      const connection = await Client.connect();
      const sql = orderProductQueries.removeProductFromCart;
      const result = await connection.query(sql, [orderId, productId]);
      const row = result.rows[0];
      connection.release();
      return row;
    } catch (error) {
      throw new Error(`Could Not Delete Product. Error: ${error}`);
    }
  }
}