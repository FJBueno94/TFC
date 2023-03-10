import { Request, Response, NextFunction } from 'express';

const loginValidation = async (req: Request, res: Response, next: NextFunction) => {
  const valid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  if (valid.test(email) === false) {
    return res.status(400).json({ message: 'Valid "email" is required' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'A minimum 6 characters "password" is required' });
  }
  return next();
};

const matchValidation = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;
  if (homeTeam === awayTeam) {
    return res
      .status(401)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }
  return next();
};

export default {
  loginValidation,
  matchValidation,
};
