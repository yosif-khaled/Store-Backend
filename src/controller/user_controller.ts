import { Request, Response } from "express";

import { UserModel } from "../model/user_model";
import { User } from "../types/user";

const userModel = new UserModel();

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userModel.index();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getUserbyId = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const user: User = await userModel.show(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const createNewUser = async (req: Request, res: Response) => {
  try {
    const user: User = {
      firstName: req.body.first_name,
      lastName: req.body.last_name,
      email: req.body.email,
      pw: req.body.pw_digest
    };
    const newUser = await userModel.create(user);
    res.json({
      user: newUser
    });
  }
  catch (error) {
    res.status(400).json(error);
  }
};

export const authenticateUser = async (req: Request, res: Response) => {
  try {
    const user: User = {
      firstName: req.body.first_name,
      lastName: req.body.last_name,
      email: req.body.email,
      pw: req.body.pw_digest
    };
    const authorize = await userModel.authenticate(user);
    if (authorize == null) {
      res.json({
        message: "Access Denied"
      });
    } else {
      res.status(203).json(authorize);
    }
  } catch (error) {
    res.status(400).json(error)
  }
};

export const updateUser = async(req: Request, res: Response)=>{
  try{
    const newUserData: User = {
      userId: parseInt(req.params.userId as string),
      firstName: req.body.first_name,
      lastName: req.body.last_name,
      email: req.body.email,
      pw: req.body.password
    };
    const updatedUser = await userModel.updateUser(newUserData);
    res.json(updatedUser);
  } catch(error) {
    res.status(400).json(error);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id: string = req.body.id as string;
    const deleted = await userModel.delete(id);
    res.json({
      message: 'User Deleted',
      deleted_user: deleted
    });
  } catch (error) {
    res.status(400).json(error)
  }
}

// add update user data