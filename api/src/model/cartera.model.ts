import { conection } from '../connections/cartera'
import { Sellers } from './vendedores.model'
import { DataTypes, Model } from 'sequelize'

class Cartera extends Model { }

Cartera.init({
  EMPRESA: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
  CUENTA: { type: DataTypes.STRING, primaryKey: true },
  VINCULADO: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
  FECHA: { type: DataTypes.DATE, allowNull: false, primaryKey: true },
  BASE: { type: DataTypes.INTEGER, allowNull: true },
  RASPAS: { type: DataTypes.INTEGER, allowNull: true },
  EXCP2: { type: DataTypes.INTEGER, allowNull: true },
  EXCP3: { type: DataTypes.INTEGER, allowNull: true },
  SALDO_ANT: { type: DataTypes.INTEGER, allowNull: true },
  DEBITO: { type: DataTypes.INTEGER, allowNull: true },
  CREDITO: { type: DataTypes.INTEGER, allowNull: true },
  NUEVOSALDO: { type: DataTypes.INTEGER, allowNull: true },
  VTABNET: { type: DataTypes.INTEGER, allowNull: true },
  VTASIISS: { type: DataTypes.INTEGER, allowNull: true },
  VTASFLEX: { type: DataTypes.INTEGER, allowNull: true },
  VTA_S1: { type: DataTypes.INTEGER, allowNull: true },
  VTA_S2: { type: DataTypes.INTEGER, allowNull: true },
  VTA_S3: { type: DataTypes.INTEGER, allowNull: true },
  RECHAZADOS: { type: DataTypes.INTEGER, allowNull: true },
  ACEPTADOS: { type: DataTypes.INTEGER, allowNull: true },
  DIGITADOS: { type: DataTypes.INTEGER, allowNull: true },
  OBSERVACION1: { type: DataTypes.STRING, allowNull: true },
  OBSERVACION2: { type: DataTypes.STRING, allowNull: true },
  OBSERVACION3: { type: DataTypes.STRING, allowNull: true },
  VERSION: { type: DataTypes.STRING, allowNull: true }
}, {
  sequelize: conection,
  modelName: 'Cartera',
  tableName: 'CARTERA',
  timestamps: false
});

// Definir la relación
Cartera.belongsTo(Sellers, { foreignKey: 'VINCULADO', targetKey: 'DOCUMENTO' });

export { Cartera }