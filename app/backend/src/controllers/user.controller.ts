import { Request, Response } from 'express';
import UserService from '../services/user.services';

export default class User {
  constructor(private userService = new UserService()) {}

  public login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const token = await this.userService.login(email, password);
      return res.status(200).json({ token });
    } catch (error) {
      const err = error as Error;
      return res.status(401).json({ message: err.message });
    }
  };
}
