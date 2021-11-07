import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.headers;
  let user: any;

  try {
    user = jwt.verify(token as any, '123456');
  } catch (error) {
    return res.json({ status: 401, message: 'Please login again' });
  }

  req.params.user_id = user.id;

  next();
};