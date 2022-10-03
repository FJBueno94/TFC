import ITeams from './ITeams';

export default interface IMatches {
  id?: number;
  homeTeam: number;
  homeTeamGoals?: number;
  awayTeam: number;
  awayTeamGoals?: number;
  inProgress?: number;
  teamHome?: ITeams;
  teamAway?: ITeams;
}
