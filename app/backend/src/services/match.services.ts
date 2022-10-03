import MatchesModel from '../database/models/matches.model';
import IMatches from '../interfaces/IMatches';
import TeamsModel from '../database/models/teams.model';

export default class Matches {
  model = MatchesModel;

  public getMatches = async (): Promise<IMatches[]> => {
    const matches = await this.model.findAll({
      include: [
        {
          model: TeamsModel,
          association: 'teamHome',
          attributes: ['teamName'],
        },
        { model: TeamsModel,
          association: 'teamAway',
          attributes: ['teamName'],
        },
      ],
    }) as IMatches[];
    if (!matches) { throw new Error('No Matches found'); }
    return matches;
  };
}
