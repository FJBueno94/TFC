import { Request, Response } from 'express';
import LeaderboardServices from '../services/leaderboard.services';

export default class Leaderboard {
  constructor(private leaderboardServices = new LeaderboardServices()) {}

  public getHomeMatches = async (req: Request, res: Response) => {
    try {
      const result = await this.leaderboardServices.getHomeMatches();
      return res.status(200).json(result);
    } catch (error) {
      const err = error as Error;
      return res.status(401).json({ message: err.message });
    }
  };

  public getAwayMatches = async (req: Request, res: Response) => {
    try {
      const result = await this.leaderboardServices.getAwayMatches();
      return res.status(200).json(result);
    } catch (error) {
      const err = error as Error;
      return res.status(401).json({ message: err.message });
    }
  };

  public getMatches = async (req: Request, res: Response) => {
    try {
      const result = await this.leaderboardServices.getMatches();
      return res.status(200).json(result);
    } catch (error) {
      const err = error as Error;
      return res.status(401).json({ message: err.message });
    }
  };
}
