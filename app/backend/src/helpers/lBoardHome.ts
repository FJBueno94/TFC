import ILBoard from '../interfaces/ILBoardHelper';

const getHomeTotalPoints = async (result: ILBoard) => {
  let totalPoints = 0;
  result.teamHome.forEach((team: { homeTeamGoals: number, awayTeamGoals: number }) => {
    if (team.homeTeamGoals > team.awayTeamGoals) {
      totalPoints += 3;
    } else if (team.homeTeamGoals === team.awayTeamGoals) {
      totalPoints += 1;
    }
  });
  return totalPoints;
};

const getHomeTotalGames = async (result: ILBoard) => {
  let totalGames = 0;
  totalGames += result.teamHome.length;
  return totalGames;
};

const getHomeVictories = async (result: ILBoard) => {
  let totalVictories = 0;
  result.teamHome.forEach((team: { homeTeamGoals: number, awayTeamGoals: number }) => {
    if (team.homeTeamGoals > team.awayTeamGoals) {
      totalVictories += 1;
    }
  });
  return totalVictories;
};

const getHomeDraws = async (result: ILBoard) => {
  let totalDraws = 0;
  result.teamHome.forEach((team: { homeTeamGoals: number, awayTeamGoals: number }) => {
    if (team.homeTeamGoals === team.awayTeamGoals) {
      totalDraws += 1;
    }
  });
  return totalDraws;
};

const getHomeLosses = async (result: ILBoard) => {
  let totalLosses = 0;
  result.teamHome.forEach((team: { homeTeamGoals: number, awayTeamGoals: number }) => {
    if (team.homeTeamGoals < team.awayTeamGoals) {
      totalLosses += 1;
    }
  });
  return totalLosses;
};

const getHomeGoalsFavor = async (result: ILBoard) => {
  let goalsFavor = 0;
  result.teamHome.forEach((team: { homeTeamGoals: number, awayTeamGoals: number }) => {
    goalsFavor += team.homeTeamGoals;
  });
  return goalsFavor;
};

const getHomeGoalsOwn = async (result: ILBoard) => {
  let goalsOwn = 0;
  result.teamHome.forEach((team: { homeTeamGoals: number, awayTeamGoals: number }) => {
    goalsOwn += team.awayTeamGoals;
  });
  return goalsOwn;
};

const getHomeGoalsBalance = async (result: ILBoard) => {
  let goalsBalance = 0;
  result.teamHome.forEach((team: { homeTeamGoals: number, awayTeamGoals: number }) => {
    goalsBalance += team.homeTeamGoals - team.awayTeamGoals;
  });
  return goalsBalance;
};

const getHomeEfficiency = async (result: ILBoard) => {
  const totalGames = await getHomeTotalGames(result);
  const totalPoints = await getHomeTotalPoints(result);
  const efficiency = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);
  return efficiency;
};

export {
  getHomeTotalPoints,
  getHomeTotalGames,
  getHomeVictories,
  getHomeDraws,
  getHomeLosses,
  getHomeGoalsFavor,
  getHomeGoalsOwn,
  getHomeGoalsBalance,
  getHomeEfficiency,
};
