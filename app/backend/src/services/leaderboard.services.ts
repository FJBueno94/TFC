import MatchModel from '../database/models/matches.model';
import TeamModel from '../database/models/teams.model';
import ILeaderboard from '../interfaces/ILeaderboard';
import { getHomeTotalPoints, getHomeTotalGames, getHomeVictories,
  getHomeDraws, getHomeLosses, getHomeGoalsFavor, getHomeGoalsOwn,
  getHomeGoalsBalance, getHomeEfficiency } from '../helpers/lBoardHome';
import { getAwayTotalPoints, getAwayTotalGames, getAwayVictories,
  getAwayDraws, getAwayLosses, getAwayGoalsFavor, getAwayGoalsOwn,
  getAwayGoalsBalance, getAwayEfficiency } from '../helpers/lBoardAway';

const sort = async (result: ILeaderboard[]) => (await result).sort((a, b) => b
  .totalPoints - a.totalPoints
  || b.totalVictories - a.totalVictories || b.goalsBalance - a.goalsBalance
  || b.goalsFavor - a.goalsFavor || b.totalGames + a.totalGames);

export default class Leaderboard {
  model = TeamModel;

  public async getHomeLeaderboard(): Promise<TeamModel[]> {
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
    const leaderboard = await this.getHomeLeaderboard();
    const response = (Promise.all(leaderboard.map(async (team) => ({
      name: team.teamName,
      totalPoints: await getHomeTotalPoints(team),
      totalGames: await getHomeTotalGames(team),
      totalVictories: await getHomeVictories(team),
      totalDraws: await getHomeDraws(team),
      totalLosses: await getHomeLosses(team),
      goalsFavor: await getHomeGoalsFavor(team),
      goalsOwn: await getHomeGoalsOwn(team),
      goalsBalance: await getHomeGoalsBalance(team),
      efficiency: await getHomeEfficiency(team),
    }))));

    const result = sort(response as unknown as ILeaderboard[]);
    return result as unknown as ILeaderboard[];
  };

  public async getAwayLeaderboard(): Promise<TeamModel[]> {
    const leaderboard = await this.model.findAll({
      include: [
        {
          model: MatchModel,
          association: 'teamAway',
          where: { inProgress: 0 },
          attributes: ['homeTeamGoals', 'awayTeamGoals'],
        },
      ],
    });
    return leaderboard;
  }

  public getAwayMatches = async (): Promise<ILeaderboard[]> => {
    const leaderboard = await this.getAwayLeaderboard();
    const response = (Promise.all(leaderboard.map(async (team) => ({
      name: team.teamName,
      totalPoints: await getAwayTotalPoints(team),
      totalGames: await getAwayTotalGames(team),
      totalVictories: await getAwayVictories(team),
      totalDraws: await getAwayDraws(team),
      totalLosses: await getAwayLosses(team),
      goalsFavor: await getAwayGoalsFavor(team),
      goalsOwn: await getAwayGoalsOwn(team),
      goalsBalance: await getAwayGoalsBalance(team),
      efficiency: await getAwayEfficiency(team),
    }))));

    const result = sort(response as unknown as ILeaderboard[]);
    return result as unknown as ILeaderboard[];
  };
}
