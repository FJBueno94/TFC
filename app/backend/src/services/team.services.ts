import ITeams from '../interfaces/ITeams';
import TeamModel from '../database/models/teams.model';

export default class Team {
  model = TeamModel;

  public getTeams = async (): Promise<ITeams[]> => {
    const result = await this.model.findAll({
      raw: true,
    }) as ITeams[];
    if (!result) {
      throw new Error('No Teams found');
    }
    return result;
  };

  public getTeamById = async (id: number): Promise<ITeams> => {
    const result = await this.model.findByPk(id, {
      raw: true,
    }) as ITeams;
    if (!result) {
      throw new Error('No Team found');
    }
    return result;
  };
}
