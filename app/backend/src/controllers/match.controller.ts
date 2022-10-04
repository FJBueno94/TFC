import { Request, Response } from 'express';
import MatchServices from '../services/match.services';

export default class Match {
  constructor(private matchServices = new MatchServices()) {}

  public getMatches = async (req: Request, res: Response) => {
    try {
      const { inProgress } = req.query;
      const result = await this.matchServices.getMatches(inProgress as string);
      return res.status(200).json(result);
    } catch (error) {
      const err = error as Error;
      return res.status(401).json({ message: err.message });
    }
  };

  public createMatch = async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const result = await this.matchServices.createMatch(body);
      return res.status(201).json(result);
    } catch (error) {
      const err = error as Error;
      return res.status(401).json({ message: err.message });
    }
  };
}
