import { Request, Response } from 'express';
import { ProductModel } from '../model/product_model';
import { Product } from '../types/product';

const productModel = new ProductModel();

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await productModel.index();
    res.json(products);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  try {
    const product: Product = await productModel.show(id);
    res.json(product).status(201);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const createNewProduct = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      productName: req.body.product_name,
      price: req.body.price,
      category: req.body.category || null
    };
    const newProduct = await productModel.create(product);
    res.json(newProduct);
  } catch (error) {
    res.status(400).json(error);
  }
};

// this function needs to be updated
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      pid: req.body.pid,
      productName: req.body.product_name,
      price: req.body.price,
      category: req.body.category || null
    };
    const updatedProduct = await productModel.update(product);
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json(error);
  }
}

export const deleteProductById = async (req: Request, res: Response) => {
  try {
    const id = req.body.pid; const deleted = await productModel.delete(id);
    res.json(deleted);
  } catch (error) {
    res.status(400).json(error);
  }
};