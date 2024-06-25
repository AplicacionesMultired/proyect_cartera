import { conection } from '../connections/cartera'
import { DataTypes, Model } from "sequelize";
import { Sellers } from './vendedores.model';

class Bases extends Model {}

Bases.init({
  VINCULADO: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
  BASE: { type: DataTypes.INTEGER, allowNull: true },
  RASPE: { type: DataTypes.INTEGER, allowNull: true },
  EXCP2: { type: DataTypes.INTEGER, allowNull: true },
  EXCP3: { type: DataTypes.INTEGER, allowNull: true },
  LOGIN: { type: DataTypes.STRING, allowNull: true },
  OBSERVACION: { type: DataTypes.STRING, allowNull: true },
  VERSION: { type: DataTypes.STRING, allowNull: true },
}, {
  sequelize: conection,
  modelName: 'Bases',
  tableName: 'BASES',
  timestamps: false
});

Bases.belongsTo(Sellers, { foreignKey: 'VINCULADO', targetKey: 'DOCUMENTO' });

export { Bases }