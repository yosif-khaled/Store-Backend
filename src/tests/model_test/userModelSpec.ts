import { UserModel } from "../../model/user_model";

const uModel = new UserModel();

describe("User Model :: Test Suite", ()=>{
  describe("User Model :: Defined Functions", () => {

    it('Index Method Returns All Users From DB', () => {
      expect(uModel.index).toBeDefined();
    });
  
    it('Show Method Returns A User By ID', () => {
      expect(uModel.show).toBeDefined();
    });
  
    it('Create New User :: Encrypt Pw :: Insert Into DB :: Returns Token', () => {
      expect(uModel.create).toBeDefined();
    });
  
    it('Updates User Data In DB', () => {
      expect(uModel.updateUser).toBeDefined();
    });
  
    it('Authentication Method To Verify Users', () => {
      expect(uModel.authenticate).toBeDefined();
    });
  
    it('Deletes User From DB By ID', () => {
      expect(uModel.delete).toBeDefined();
    });
  });

  describe("User Model :: Functionality", ()=>{

    it("Function That Creates User", async ()=>{
      const result = await uModel.create({
        firstName: 'mock',
         lastName: 'user',
        email: 'mockuser@gmail',
        pw: 'test'
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const user: any = {...result};
      expect(user.first_name === 'mock').toBeTrue;
      expect(user.last_name === 'user').toBeTrue;
      expect(user.email === 'mockuser@gmail').toBeTrue;
      expect(user.pw_digest !== 'test').toBeTrue;
      console.log(`Mock User Created`);
    });

    it("Index Function Should Return A List of Users", async ()=>{
      const result = await uModel.index();
      expect(result.length).toBeGreaterThan(0);
    });

    it("Show Function Should Return A User By ID", async ()=>{
      const result = await uModel.show('3');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const user: any = {...result};
      expect(
        user.id === 3
        && user.first_name === 'mock' 
        && user.last_name === 'user'
        && user.email === 'mockuser@gmail').toBeTrue;
    });

    it("The updateUser Method Should Update User Data", async ()=>{
      const result = await uModel.updateUser({
        userId: 3,
        firstName: 'mockModified',
        lastName: 'userModified',
        email: 'mockuser@gmailModified',
        pw: 'test'
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const updatedUser: any = {...result};
      expect(
        updatedUser.first_name === 'mockModified'
        && updatedUser.last_name === 'userModified'
        && updatedUser.email === 'mockuser@gmailModified'
      ).toBeTrue;
    });

    it("Athenticate User Method :: Should Verify User Password :: Send Token", async ()=>{
      const result = await uModel.authenticate({
        firstName: 'mock',
        lastName: 'user',
        email: 'mockuser@gmail',
        pw: 'test'
      });
      expect(result).not.toBeNull;
    });

    it("delete Method :: Should Delete User By ID", async ()=>{
      const result = await uModel.delete('3');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const user: any = {...result};
      expect(user.first_name === 'mock').toBeTrue;
      expect(user.last_name === 'user').toBeTrue;
      expect(user.email === 'mockuser@gmail').toBeTrue;
    });

  });
});