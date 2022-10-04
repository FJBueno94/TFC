import { Model, INTEGER } from 'sequelize';
import db from '.';
import Team from './teams.model';

class Match extends Model {
  public id!: number;
  public homeTeam!: number;
  public homeTeamGoals!: number;
  public awayTeam!: number;
  public awayTeamGoals!: number;
  public inProgress!: number;
}

Match.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    homeTeam: {
      type: INTEGER,
      allowNull: false,
    },
    homeTeamGoals: {
      type: INTEGER,
      allowNull: false,
    },
    awayTeam: {
      type: INTEGER,
      allowNull: false,
    },
    awayTeamGoals: {
      type: INTEGER,
      allowNull: false,
    },
    inProgress: {
      type: INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'match',
    timestamps: false,
    underscored: true,
  },
);

Team.hasMany(Match, { foreignKey: 'id', as: 'team' });

Team.hasMany(Match, { foreignKey: 'homeTeam', as: 'teamHome' });

Team.hasMany(Match, { foreignKey: 'awayTeam', as: 'teamAway' });

Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'teamHome' });

Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'teamAway' });

export default Match;
