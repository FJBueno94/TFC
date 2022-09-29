import { Request, Response, NextFunction } from 'express';

const loginValidation = async (req: Request, res: Response, next: NextFunction) => {
  const valid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const { email, password } = req.body;
  if (valid.test(email) === false || !email) {
    res.status(400).json({ message: 'Valid "email" is required' });
  }
  if (password.length < 6 || !password) {
    res.status(400).json({ message: 'A minimum 6 characters "password" is required' });
  }
  next();
};

export default {
  loginValidation,
};
