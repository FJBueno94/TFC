import MatchesModel from '../database/models/matches.model';
import IMatches from '../interfaces/IMatches';
import TeamsModel from '../database/models/teams.model';

const association = [
  { model: TeamsModel, association: 'teamHome', attributes: ['teamName'] },
  { model: TeamsModel, association: 'teamAway', attributes: ['teamName'] },
];

export default class Matches {
  model = MatchesModel;

  public getMatches = async (inProgress: string): Promise<IMatches[]> => {
    if (inProgress === 'true') {
      const result = await this.model.findAll({ where: { inProgress: 1 }, include: association });
      return result;
    } if (inProgress === 'false') {
      const result = await this.model.findAll({ where: { inProgress: 0 }, include: association });
      return result;
    }
    const matches = await this.model.findAll({ include: association }) as IMatches[];
    if (!matches) { throw new Error('No Matches found'); }
    return matches;
  };
}
