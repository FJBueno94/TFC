import { Request, Response } from 'express';
import MatchServices from '../services/match.services';

export default class Match {
  constructor(private matchServices = new MatchServices()) {}

  public getMatches = async (req: Request, res: Response) => {
    try {
      const result = await this.matchServices.getMatches();
      return res.status(200).json(result);
    } catch (error) {
      const err = error as Error;
      return res.status(401).json({ message: err.message });
    }
  };
}
