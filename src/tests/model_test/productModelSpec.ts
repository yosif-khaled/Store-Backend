import { ProductModel } from "../../model/product_model";

const pModel = new ProductModel();

describe("", ()=>{


  describe("Product Model :: Defined Functions", () => {

    it('Index Method Should Return A Product []', () => {
      expect(pModel.index).toBeDefined();
    });
  
    it('Show Method Should Return A Product By ID', () => {
      expect(pModel.show).toBeDefined();
    });
  
    it('Create New Product :: Insert Into DB', () => {
      expect(pModel.create).toBeDefined();
    });
  
    it('Updates Product Data :: Set New Values In DB', () => {
      expect(pModel.update).toBeDefined();
    });
  
    it('Deletes Product From DB By ID', () => {
      expect(pModel.delete).toBeDefined();
    });
  });

  describe("Product Model :: Functionality", ()=>{

    it("create Method :: Should Create A Product", async ()=>{
      const result = await pModel.create({
        productName: 'Horizon',
        price: 300,
        category: 'best seller'
      });
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const deconResult: any = {...result};
      expect(deconResult).toEqual({ pid: 3, product_name: 'Horizon', price: 300, category: 'best seller' });

    });

    it("Index Function Should Return A List of all Products", async ()=>{
      const result = await pModel.index();
      expect(result.length).toBeGreaterThan(0);
    });

    it("Show Function Should Return A Product By ID", async ()=>{
      const result = await pModel.show('3');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const deconResult: any = {...result};
      expect(deconResult).toEqual({ pid: 3, product_name: 'Horizon', price: 300, category: 'best seller' });
    });

    it("Update Function Should Update A Product", async ()=>{
      const result = await pModel.update({ pid: 3, productName: 'Dark Souls', price: 250, category: 'maso' });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const deconResult: any = {...result};
      expect(deconResult).toEqual({ pid: 3, product_name: 'Dark Souls', price: 250, category: 'maso' });
    });

    it("Delte Function Should Delete Product By ID", async ()=>{
      const result = await pModel.delete('3');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const deconResult: any = {...result};
      expect(deconResult).toEqual({ pid: 3, product_name: 'Dark Souls', price: 250, category: 'maso' });
    });

  });
});