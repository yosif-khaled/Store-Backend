import { OrderProductModel } from "../../model/order_product_model";

const opModel = new OrderProductModel();


describe('OrderProduct Test Suite', ()=>{

  describe("OrderProduct Model :: Defined Functions", () => {

    it('Index Function is Defined', () => {
      expect(opModel.index).toBeDefined();
    });

    it('Show Function is Defined', () => {
      expect(opModel.show).toBeDefined();
    });

    it('addProductToCart is Defined', () => {
      expect(opModel.addProductToCart).toBeDefined();
    });

    it('Update is Defined', () => {
      expect(opModel.update).toBeDefined();
    });

    it('RemoveProductFromCart is Defined', () => {
      expect(opModel.removeProductFromCart).toBeDefined();
    });

  });

  
  describe("OrderProduct Model :: Functionality", ()=>{

    it("Index Function Should Return All Rows of OrderProduct Table", async ()=>{
      const result = await opModel.index();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const deconResult: any = [...result]
      expect(deconResult).toEqual([ { id: 1, order_id: '1', quantity: 1, product_id: '1' } ]);
    });

    it("Show Function Should Return A Row By ID", async ()=>{
      const result = await opModel.show('1');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const deconResult: any = {...result}
      expect(deconResult).toEqual({ id: 1, order_id: '1', quantity: 1, product_id: '1' });
    });

    it("AddProductToCart Function Should Add A Product In An Order", async ()=>{
      const result = await opModel.addProductToCart({ orderId: 1, qnty: 1, productId: 1 });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const deconResult: any = {...result}
      expect(deconResult).toEqual({ id: 2, order_id: '1', quantity: 1, product_id: '1' });
    });

    it("Update Function Should Update Row Data", async ()=>{
      const result = await opModel.update({ id: 2, orderId: 1, qnty: 2, productId: 1 });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const deconResult: any = {...result}
      expect(deconResult).toEqual({ id: 1, order_id: '1', quantity: 2, product_id: '1' });
    });

    it("RemoveProductFromCart Function Should Remove A product from a Certain Order", async ()=>{
      const result = await opModel.removeProductFromCart('1', '1');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const deconResult: any = {...result}
      expect(deconResult).toEqual({ id: 1, order_id: '1', quantity: 2, product_id: '1' });
    });
    
  });
});