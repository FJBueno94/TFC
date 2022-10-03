import { Request, Response } from 'express';
import TeamServices from '../services/team.services';

export default class Team {
  constructor(private teamServices = new TeamServices()) {}

  public getTeams = async (req: Request, res: Response) => {
    try {
      const result = await this.teamServices.getTeams();
      return res.status(200).json(result);
    } catch (error) {
      const err = error as Error;
      return res.status(401).json({ message: err.message });
    }
  };

  public getTeamById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const result = await this.teamServices.getTeamById(Number(id));
      return res.status(200).json(result);
    } catch (error) {
      const err = error as Error;
      return res.status(401).json({ message: err.message });
    }
  };
}
