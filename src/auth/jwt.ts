import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const encryptPassword = (password: string) => {
  return bcrypt.hash(password, 10);
}

export const comparePassword = (password: any, userPassword: string) => {
  return bcrypt.compare(password, userPassword);
}

export const generateToken = (user_id: string) => {
  return jwt.sign(
    { id: user_id.toString() },
    '123456',
    { expiresIn: '30d' },
  )
}