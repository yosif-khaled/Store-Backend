import { Client } from '../db';
import { Product } from '../types/product';
import { productQueries } from '../queries/product_queries';
export class ProductModel {

  // working tested with rest
  async index(): Promise<Product[]> {
    try {
      const connection = await Client.connect();
      const sql = productQueries.getAllProducts;
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Could Not Get Products. Error: ${error}`);
    }
  }

  // working tested with rest
  async show(id: string): Promise<Product> {
    try {
      const connection = await Client.connect();
      const sql = productQueries.getProductById;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could Not Get Product With ID:${id}. Error: ${error}`);
    }
  }

  // working tested with rest
  async create(p: Product): Promise<Product> {
    try {
      const connection = await Client.connect();
      const sql = productQueries.createProduct;
      const result = await connection.query(sql, [p.productName, p.price, p.category]);
      const product = result.rows[0];
      connection.release();
      return product;
    } catch (error) {
      throw new Error(`Could Not Create Product. Error: ${error}`);
    }
  }

  // stuck fix it later
  async update(p: Product): Promise<Product> {
    try {
      const connection = await Client.connect();
      const sql = productQueries.updateProduct;
      const result = await connection.query(sql, [p.productName, p.price, p.category, p.pid]);
      const product = result.rows[0];
      connection.release();
      return product;
    } catch (error) {
      throw new Error(`Could Not Update Product INFO`);
    }
  }

  // works fine tested with rest
  async delete(id: string): Promise<Product> {
    try {
      const connection = await Client.connect();
      const sql = productQueries.deleteProduct;
      const result = await connection.query(sql, [id]);
      const product = result.rows[0];
      connection.release();
      return product;
    } catch (error) {
      throw new Error(`Could Not Delete Product. Error: ${error}`);
    }
  }
}