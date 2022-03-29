import supertest from "supertest";
import app from '../../server';
import { endPoints } from "../endpoints";
import { User } from "../../types/user";
import { Product } from "../../types/product";
import { UserModel } from "../../model/user_model";
import { ProductModel } from "../../model/product_model";
import { OrderModel } from "../../model/order_model";
import config from "../../config";
import { sign } from "jsonwebtoken";

const request = supertest(app);

const uModel = new UserModel();
const pModel = new ProductModel();
const oModel = new OrderModel();

describe('Endpoints Test Suite', ()=>{

  let token: string;

  beforeAll(async ()=>{
  
    const testUser01: User = {
      firstName: 'dummy01',
      lastName: 'dummy02',
      email: 'dummy01@test.com',
      pw: 'test'
    };
    
    const testProduct01: Product = {
      productName: 'testing01',
      price: 350
    };

    console.log('CREATING USER AND RETURNING TOKEN');
    const createdUser = await uModel.create(testUser01);
    token = sign({ user: testUser01 }, config.SECRET_KEY as string);
    console.log(token);
    console.log(createdUser);
    const createdProduct = await pModel.create(testProduct01);
    console.log(createdProduct);
    const tstUsr01Id = '1';
    const createdOrder = await oModel.createNewOrder(tstUsr01Id);
    console.log(createdOrder);
  });

  afterAll( async ()=>{
    await request.delete(endPoints.deleteUser).send({ id: 1 }).set('Authorization', `Bearer ${token}`);
  });

  // Root
  describe('Testing Index EndPoints', ()=>{
    it(`GET ${endPoints.root} :: Should Send Index`, async ()=>{
      const response = await request.get(endPoints.root);
      expect(response.status).toBe(200);
    });
  });

  // User Routes
  describe('Testing User EndPoints', ()=>{
    it(`GET ${endPoints.getAllUsers} :: Should Send All Users :: Requires Token`, async ()=>{
      console.log(`Token: ${token}`);
      const response = await request.get(endPoints.getAllUsers).set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });

    it(`GET ${endPoints.getUserbyId} :: Should Get User With Requested ID :: Requires Token`, async ()=>{
      const response = await request.get('/users/1').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });

    it(`POST ${endPoints.createNewUser} :: Should Create New User :: Hash User Password :: Return Token :: Require Token`, async ()=> {
      const testUser02 = {
        first_name: 'dummy03',
        last_name: 'dummy04',
        email: 'dummy02@test.com',
        pw: 'test'
      };
      const response = await request.post(endPoints.createNewUser).send(testUser02).set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });

    it(`POST ${endPoints.deleteUser} :: Should Delete User With ID Send In Body :: Requires Token`, async ()=>{
      const response = await request.delete(endPoints.deleteUser).send({ id: 2 }).set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });
  });

  // Product Routes
  describe('Testing Products EndPoints', ()=>{

    it(`GET ${endPoints.getAllProducts} :: Gets All Products :: Does Not Require Token`, async ()=>{
      const response = await request.get(endPoints.getAllProducts);
      expect(response.status).toBe(200);
    });

    it(`GET ${endPoints.getProductById} :: Should Get Product With Provided ID :: Does Not Require Token`, async ()=>{
      const response = await request.get('/products/1');
      expect(response.status).toBe(200);
    });

    it(`POST ${endPoints.createNewProduct} :: Should Create New Product :: Requires Token`, async ()=>{
      const testProduct = {
        product_name: 'test',
        price: 300
      }
      const response = await request.post(endPoints.createNewProduct).send(testProduct).set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });

    it(`PATCH ${endPoints.updateProduct} :: Update Product Data :: Requires Token`, async ()=>{
      const updateData = {
        pid: 2,
        product_name: 'update test',
        price: 400,
        category: 'I hate this product'
      };
      const response = await request.patch(endPoints.updateProduct).send(updateData).set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });

    it(`DELETE ${endPoints.deleteProductById} :: Deletes Product :: Requires Token`, async ()=>{
      const response = await request.delete(endPoints.deleteProductById).send({ pid: 2 }).set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });

  });

  // Order Routes
  describe('Testng Orders Points', ()=>{

    it(`GET ${endPoints.getAllOrders} :: Should Return A List Of Orders :: Requires Token`, async ()=>{
      const response = await request.get(endPoints.getAllOrders).set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });

    it(`GET ${endPoints.getAllOrdersByUserId} :: Should Get All Orders Made By A User :: Requires Token`, async ()=>{
      const response = await request.get('/1/orders').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });
    
    it(`GET ${endPoints.getMostRecentOrderByUserId} :: Should Get Most Recent Order By User :: Requires Token`, async ()=>{
      const response = await request.get('/1/orders').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });

    it(`GET ${endPoints.getOrder} :: Should Get A List Of Products Inside An Order :: Requires Token`, async ()=> {
      const response = await request.get('/1/orders/1').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });

    it(`POST ${endPoints.addProductToOrder} :: Should Add Product To Active Order`, async ()=>{
      const addedProduct = {
        order_id: 1,
        product_id: 1,
        quantity: 1
      };
      const response = await request.post(endPoints.addProductToOrder).send(addedProduct).set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });

    it(`POST ${endPoints.createNewOrder} :: Should Create New Order For Current User :: Requires Token`, async ()=>{
      const response = await request.post('/1/orders').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });

    it(`PATCH ${endPoints.closeOrder} :: Should Change Order Status From Active to Complete :: Require Token`, async ()=>{
      const response = await request.patch('/1/orders/1/checkedout').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });

    
    it(`DELETE ${endPoints.deleteOrder} :: Should Delete Order :: Require Token`, async ()=>{
      const response = await request.delete('/orders').set('Authorization', `Bearer ${token}`).send({ id: 1 });
      expect(response.status).toBe(200);
    });

  });
});