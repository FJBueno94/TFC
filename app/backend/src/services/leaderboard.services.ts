import MatchModel from '../database/models/matches.model';
import TeamModel from '../database/models/teams.model';
import ILeaderboard from '../interfaces/ILeaderboard';
import { getTotalPoints, getTotalGames, getVictories,
  getDraws, getLosses, getGoalsFavor, getGoalsOwn,
  getGoalsBalance, getEfficiency } from '../helpers/lBoardHelper';

export default class Leaderboard {
  model = TeamModel;

  public async getLeaderboard(): Promise<TeamModel[]> {
    const leaderboard = await this.model.findAll({
      include: [
        {
          model: MatchModel,
          association: 'teamHome',
          where: { inProgress: 0 },
          attributes: ['homeTeamGoals', 'awayTeamGoals'],
        },
      ],
    });
    return leaderboard;
  }

  public getHomeMatches = async (): Promise<ILeaderboard[]> => {
    const leaderboard = await this.getLeaderboard();
    const response = (Promise.all(leaderboard.map(async (team) => ({
      name: team.teamName,
      totalPoints: await getTotalPoints(team),
      totalGames: await getTotalGames(team),
      totalVictories: await getVictories(team),
      totalDraws: await getDraws(team),
      totalLosses: await getLosses(team),
      goalsFavor: await getGoalsFavor(team),
      goalsOwn: await getGoalsOwn(team),
      goalsBalance: await getGoalsBalance(team),
      efficiency: await getEfficiency(team),
    }))));

    const result = (await response).sort((a, b) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor || b.totalGames + a.totalGames);
    return result as unknown as ILeaderboard[];
  };
}
