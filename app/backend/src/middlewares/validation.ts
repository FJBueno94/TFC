import { Request, Response, NextFunction } from 'express';

const loginValidation = async (req: Request, res: Response, next: NextFunction) => {
  const valid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  if (valid.test(email) === false) {
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
