import { getHomeTotalPoints, getHomeTotalGames, getHomeVictories,
  getHomeDraws, getHomeLosses, getHomeGoalsFavor, getHomeGoalsOwn,
  getHomeGoalsBalance } from './lBoardHome';
import { getAwayTotalPoints, getAwayTotalGames, getAwayVictories,
  getAwayDraws, getAwayLosses, getAwayGoalsFavor, getAwayGoalsOwn,
  getAwayGoalsBalance } from './lBoardAway';
import ILBoard from '../interfaces/ILBoardHelper';

const getTotalPoints = async (result: ILBoard) => {
  const homePoints = await getHomeTotalPoints(result);
  const awayPoints = await getAwayTotalPoints(result);
  return homePoints + awayPoints;
};

const getTotalGames = async (result: ILBoard) => {
  const homeGames = await getHomeTotalGames(result);
  const awayGames = await getAwayTotalGames(result);
  return homeGames + awayGames;
};

const getTotalVictories = async (result: ILBoard) => {
  const homeVictories = await getHomeVictories(result);
  const awayVictories = await getAwayVictories(result);
  return homeVictories + awayVictories;
};

const getTotalDraws = async (result: ILBoard) => {
  const homeDraws = await getHomeDraws(result);
  const awayDraws = await getAwayDraws(result);
  return homeDraws + awayDraws;
};

const getTotalLosses = async (result: ILBoard) => {
  const homeLosses = await getHomeLosses(result);
  const awayLosses = await getAwayLosses(result);
  return homeLosses + awayLosses;
};

const getGoalsFavor = async (result: ILBoard) => {
  const homeGoalsFavor = await getHomeGoalsFavor(result);
  const awayGoalsFavor = await getAwayGoalsFavor(result);
  return homeGoalsFavor + awayGoalsFavor;
};

const getGoalsOwn = async (result: ILBoard) => {
  const homeGoalsOwn = await getHomeGoalsOwn(result);
  const awayGoalsOwn = await getAwayGoalsOwn(result);
  return homeGoalsOwn + awayGoalsOwn;
};

const getGoalsBalance = async (result: ILBoard) => {
  const homeGoalsBalance = await getHomeGoalsBalance(result);
  const awayGoalsBalance = await getAwayGoalsBalance(result);
  return homeGoalsBalance + awayGoalsBalance;
};

const getEfficiency = async (result: ILBoard) => {
  const totalGames = await getTotalGames(result);
  const totalPoints = await getTotalPoints(result);
  return ((totalPoints / (totalGames * 3)) * 100).toFixed(2);
};

export {
  getTotalPoints,
  getTotalGames,
  getTotalVictories,
  getTotalDraws,
  getTotalLosses,
  getGoalsFavor,
  getGoalsOwn,
  getGoalsBalance,
  getEfficiency,
};
