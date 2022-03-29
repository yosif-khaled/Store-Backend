import { OrderModel } from "../../model/order_model";

const oModel = new OrderModel();

describe("Order Model Suite", ()=>{


  describe("Order Model :: Defined Functions", () => {

    it('Method Returns All Existing Orders', () => {
      expect(oModel.showAllOrders).toBeDefined();
    });
  
    it('Mehtod Returns All Orders For A User By Id', () => {
      expect(oModel.showAllOrdersByUserId).toBeDefined();
    });
  
    it('Method That Returns All Products In An Order', () => {
      expect(oModel.showOrder).toBeDefined();
    });
  
    it('Method That Returns User Most Recent Order', () => {
      expect(oModel.getMostRecentOrder).toBeDefined();
    });
  
    it('Method That Creates New Order For A User', () => {
      expect(oModel.createNewOrder).toBeDefined();
    });
  
    it('Method That Updates Order Status From Active To Complete On CheckOut', () => {
      expect(oModel.closeOrder).toBeDefined();
    });
  
    it('Method That Deletes An Order From DB', () => {
      expect(oModel.deleteOrder).toBeDefined();
    });
  });

  describe("Order Model :: Functionality", ()=>{

    it("Index Function Should Return All Orders", async ()=>{
      const result = await oModel.showAllOrders();
      console.log(result);
      expect(result.length).toBeGreaterThan(0);
    });

    it("showAllOrdersByUserId Function Should Return A List of Orders For A User", async ()=>{
      const result = await oModel.showAllOrdersByUserId('1');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const deconResult: any = [...result];
      expect(deconResult).toEqual([
        { id: 2, user_id: '1', status: 'active' },
        { id: 1, user_id: '1', status: 'complete' }
      ]);
    });

    it("ShowOrder Should Return A List Of All Products In an Order", async ()=>{
      const result = await oModel.showOrder('1', '2');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const deconResult: any = [...result];
      expect(deconResult).toEqual([]);
    });

    it("GetMostRecentOrder Function Should Return All Users", async ()=>{
      const result = await oModel.getMostRecentOrder('1');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const deconResult: any = {...result};
      expect(deconResult).toEqual({ id: 2, user_id: '1', status: 'active' });
    });

    it("CreateNewOrder Function Should Create An Order For A User", async ()=>{
      const result = await oModel.createNewOrder('1');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const deconResult: any = {...result};
      expect(deconResult).toEqual({ id: 3, user_id: '1', status: 'active' });
    });

    it("CloseOrder Function Should Change Status From Active to Complete", async ()=>{
      const result = await oModel.closeOrder('1', '3');
      expect(result.status).toBe('complete');
    });

    it("Delete Function Should Delete Order", async ()=>{
      const result = await oModel.deleteOrder('3');
      expect(result.id).toBe(3);
    });
  });

});