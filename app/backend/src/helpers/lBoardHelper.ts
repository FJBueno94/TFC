import IHome from '../interfaces/IHome';

const getTotalPoints = async (result: IHome) => {
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

const getTotalGames = async (result: IHome) => {
  let totalGames = 0;
  totalGames += result.teamHome.length;
  return totalGames;
};

const getVictories = async (result: IHome) => {
  let totalVictories = 0;
  result.teamHome.forEach((team: { homeTeamGoals: number, awayTeamGoals: number }) => {
    if (team.homeTeamGoals > team.awayTeamGoals) {
      totalVictories += 1;
    }
  });
  return totalVictories;
};

const getDraws = async (result: IHome) => {
  let totalDraws = 0;
  result.teamHome.forEach((team: { homeTeamGoals: number, awayTeamGoals: number }) => {
    if (team.homeTeamGoals === team.awayTeamGoals) {
      totalDraws += 1;
    }
  });
  return totalDraws;
};

const getLosses = async (result: IHome) => {
  let totalLosses = 0;
  result.teamHome.forEach((team: { homeTeamGoals: number, awayTeamGoals: number }) => {
    if (team.homeTeamGoals < team.awayTeamGoals) {
      totalLosses += 1;
    }
  });
  return totalLosses;
};

const getGoalsFavor = async (result: IHome) => {
  let goalsFavor = 0;
  result.teamHome.forEach((team: { homeTeamGoals: number, awayTeamGoals: number }) => {
    goalsFavor += team.homeTeamGoals;
  });
  return goalsFavor;
};

const getGoalsOwn = async (result: IHome) => {
  let goalsOwn = 0;
  result.teamHome.forEach((team: { homeTeamGoals: number, awayTeamGoals: number }) => {
    goalsOwn += team.awayTeamGoals;
  });
  return goalsOwn;
};

const getGoalsBalance = async (result: IHome) => {
  let goalsBalance = 0;
  result.teamHome.forEach((team: { homeTeamGoals: number, awayTeamGoals: number }) => {
    goalsBalance += team.homeTeamGoals - team.awayTeamGoals;
  });
  return goalsBalance;
};

const getEfficiency = async (result: IHome) => {
  const totalGames = await getTotalGames(result);
  const totalPoints = await getTotalPoints(result);
  const efficiency = ((await totalPoints / (await totalGames * 3)) * 100).toFixed(2);
  return efficiency;
};

export {
  getTotalPoints,
  getTotalGames,
  getVictories,
  getDraws,
  getLosses,
  getGoalsFavor,
  getGoalsOwn,
  getGoalsBalance,
  getEfficiency,
};
