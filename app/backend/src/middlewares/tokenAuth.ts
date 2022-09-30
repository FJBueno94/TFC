import { Response, NextFunction } from 'express';
import Token from '../helpers/token';
import IRequest from '../interfaces/IRequest';

const tokenAuth = (req: IRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const dataToken = Token.verifyToken(authorization);
    const { email } = dataToken as IRequest;
    req.email = email as unknown as IRequest;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

export default tokenAuth;
