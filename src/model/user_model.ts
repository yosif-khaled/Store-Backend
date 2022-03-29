import { compareSync, hashSync } from 'bcrypt';
import { QueryResult } from "pg";
import { sign } from "jsonwebtoken";

import { Client } from "../db";
import config from '../config';
import { User } from "../types/user";
import { userQueries } from '../queries/user_queries';

export class UserModel {

  // working tested with rest
  async index(): Promise<User[]> {
    try {
      const connection = await Client.connect();
      const sql = userQueries.getAllUsers;
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Could Not Get Users. Error: ${error}`);
    }
  }


  // working tested with rest
  async show(id: string): Promise<User> {
    try {
      const connection = await Client.connect();
      const sql = userQueries.getUserById;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could Not Get User with ID:${id}. Error: ${error}`);
    }
  }

  // tested with rest, needs an error message if email already exists
  // rewrite password hashing functions
  async create(u: User): Promise<User> {
    try {
      const connection = await Client.connect();
      const sql = userQueries.createNewUser;
      const hash = await this.encryptPw(u.pw);
      const result = await connection.query(sql, [u.firstName, u.lastName, u.email, hash]);
      const user: User = result.rows[0];
      connection.release();
      return user;
    } catch (error) {
      throw new Error(`Could Not Create User. Error: ${error}`);
    }
  }

  // I think id should be from params
  async updateUser(u: User): Promise<User> {
    try {
      const connection = await Client.connect();
      const sql = userQueries.updateUser;
      const result = await connection.query(sql, [u.firstName, u.lastName, u.email, u.userId]);
      const user = result.rows[0];
      return user;
    } catch (error) {
      throw new Error(`Could Not Update User. Error: ${error}`);
    }
  }

  // tested with rest working returns token
  // rewrite the folowing function -- don't like my variables to dangle out of their functions
  // send token from here
  async authenticate(u: User): Promise<string | null> {
    // authenticate user first if authentic continue
    const connection = await Client.connect();
    const sql = userQueries.getUserByEmail; // use email instead
    const result = await connection.query(sql, [u.email]);
    const isAuthentic = await this.isAuthentic(u.pw, result);
    connection.release();
    // return isAuthentic;
    if (isAuthentic) return this.asignToken(u);
    return null;
  }


  //  
  async delete(id: string): Promise<User> {
    try {
      const connection = await Client.connect();
      const sql = userQueries.deleteUserById;
      const result = await connection.query(sql, [id]);
      const user = result.rows[0];
      connection.release();
      return user;
    } catch (error) {
      throw new Error(`Could Not Delete User. Error: ${error}`);
    }
  }


  private async encryptPw(pwDigest: string): Promise<string> {
    const pepper: string = config.BCRYPT_PW as string;
    const salt: string = config.SALT_ROUNDS as string;
    const hash: string = hashSync(pwDigest + pepper, parseInt(salt));
    return hash;
  }


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private async isAuthentic(pw: string, result: QueryResult<any>): Promise<boolean> {
    if (result.rows.length) {
      const user = result.rows[0];
      const pepper: string = config.BCRYPT_PW as string;
      const check: boolean = compareSync(pw + pepper, user.pw_digest) as boolean;
      return check;
    } else {
      return false;
    }
  }

  private async asignToken(u: User): Promise<string> {
    const token: string = sign({ user: u }, config.SECRET_KEY as string);
    return token;
  }

  // add to create user 
  // private async checkIfEmailExist(email: string): Promise<boolean>{
  //   return true;
  // }

}