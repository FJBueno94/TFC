import ILBoard from '../interfaces/ILBoardHelper';

const getAwayTotalPoints = async (result: ILBoard) => {
  let totalPoints = 0;
  result.teamAway.forEach((team: { homeTeamGoals: number, awayTeamGoals: number }) => {
    if (team.homeTeamGoals < team.awayTeamGoals) {
      totalPoints += 3;
    } else if (team.homeTeamGoals === team.awayTeamGoals) {
      totalPoints += 1;
    }
  });
  return totalPoints;
};

const getAwayTotalGames = async (result: ILBoard) => {
  let totalGames = 0;
  totalGames += result.teamAway.length;
  return totalGames;
};

const getAwayVictories = async (result: ILBoard) => {
  let totalVictories = 0;
  result.teamAway.forEach((team: { homeTeamGoals: number, awayTeamGoals: number }) => {
    if (team.homeTeamGoals < team.awayTeamGoals) {
      totalVictories += 1;
    }
  });
  return totalVictories;
};

const getAwayDraws = async (result: ILBoard) => {
  let totalDraws = 0;
  result.teamAway.forEach((team: { homeTeamGoals: number, awayTeamGoals: number }) => {
    if (team.homeTeamGoals === team.awayTeamGoals) {
      totalDraws += 1;
    }
  });
  return totalDraws;
};

const getAwayLosses = async (result: ILBoard) => {
  let totalLosses = 0;
  result.teamAway.forEach((team: { homeTeamGoals: number, awayTeamGoals: number }) => {
    if (team.homeTeamGoals > team.awayTeamGoals) {
      totalLosses += 1;
    }
  });
  return totalLosses;
};

const getAwayGoalsFavor = async (result: ILBoard) => {
  let goalsFavor = 0;
  result.teamAway.forEach((team: { homeTeamGoals: number, awayTeamGoals: number }) => {
    goalsFavor += team.awayTeamGoals;
  });
  return goalsFavor;
};

const getAwayGoalsOwn = async (result: ILBoard) => {
  let goalsOwn = 0;
  result.teamAway.forEach((team: { homeTeamGoals: number, awayTeamGoals: number }) => {
    goalsOwn += team.homeTeamGoals;
  });
  return goalsOwn;
};

const getAwayGoalsBalance = async (result: ILBoard) => {
  let goalsBalance = 0;
  result.teamAway.forEach((team: { homeTeamGoals: number, awayTeamGoals: number }) => {
    goalsBalance += team.awayTeamGoals - team.homeTeamGoals;
  });
  return goalsBalance;
};

const getAwayEfficiency = async (result: ILBoard) => {
  const totalGames = await getAwayTotalGames(result) as number;
  const totalPoints = await getAwayTotalPoints(result) as number;
  const efficiency = ((await totalPoints / (await totalGames * 3)) * 100).toFixed(2);
  return efficiency as unknown as number;
};

export {
  getAwayTotalPoints,
  getAwayTotalGames,
  getAwayVictories,
  getAwayDraws,
  getAwayLosses,
  getAwayGoalsFavor,
  getAwayGoalsOwn,
  getAwayGoalsBalance,
  getAwayEfficiency,
};
