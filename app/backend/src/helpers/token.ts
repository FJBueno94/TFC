import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import IUser from '../interfaces/IUser';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';
const JWT_OPTIONS: jwt.SignOptions = { expiresIn: '1d', algorithm: 'HS256' };

const createToken = (payload: IUser) => jwt.sign(payload, JWT_SECRET, JWT_OPTIONS);

const verifyToken = (token: string) => jwt.verify(token, JWT_SECRET);

export default {
  createToken,
  verifyToken,
};
