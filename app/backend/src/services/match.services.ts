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

  public createMatch = async (match: IMatches): Promise<IMatches> => {
    const { homeTeam, awayTeam } = match;
    const home = await TeamsModel.findOne({ where: { id: homeTeam } });
    const away = await TeamsModel.findOne({ where: { id: awayTeam } });
    if (!home || !away) { throw new Error('There is no team with such id!'); }
    const result = await this.model.create(match);
    return result;
  };

  public finishMatch = async (id: number): Promise<IMatches> => {
    const result = await this.model.update({ inProgress: 0 }, { where: { id } });
    return result as unknown as IMatches;
  };

  public updateMatch = async (id: number, match: IMatches): Promise<IMatches> => {
    const result = await this.model.update(match, { where: { id } });
    return result as unknown as IMatches;
  };
}
