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

Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'homeTeam' });

Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'awayTeam' });

export default Match;
