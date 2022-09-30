import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

interface IRequest extends Request {
  email?: string | JwtPayload;
}

export default IRequest;
