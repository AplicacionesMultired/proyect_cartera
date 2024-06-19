import { conection } from '../connections/cartera'
import { DataTypes, Model } from 'sequelize'

class Sellers extends Model { }

Sellers.init({
    DOCUMENTO: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
    NOMBRES: { type: DataTypes.STRING, allowNull: true },
    GRPVTAS_CODIGO: { type: DataTypes.STRING, allowNull: true },
    CARGO: { type: DataTypes.STRING, allowNull: true },
    VERSION: { type: DataTypes.STRING, allowNull: true },
}, {
    sequelize: conection,
    modelName: 'Seller',
    tableName: 'VENDEDORES',
    timestamps: false
})

export { Sellers }