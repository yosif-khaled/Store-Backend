import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import config from '../config'

export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const header = req.headers.authorization;
    if (typeof header !== 'undefined') {
      const bearer = header.split(' ');
      const token = bearer[1];
      verify(token, config.SECRET_KEY as string);
      next();
    }
  } catch {
    res.status(403).json({
      message: 'Access Denied'
    });
  }
}