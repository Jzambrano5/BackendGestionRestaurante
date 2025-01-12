import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";
import { PersonsModel } from "./PersonsModel.js";

export const ReservaModel = sequelize.define("Reserva",{
    id:{
        autoIncrement:true,
        primaryKey:true,
        type: DataTypes.INTEGER,
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    numeroMesa:{
        type:DataTypes.INTEGER,
        allowNull:true,
    },
    Cantidad: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    Hora: {
        type: DataTypes.TIME,
        allowNull: true,
    },
},
{
    timestamps:false
}
)
PersonsModel.hasMany(ReservaModel, { foreignKey: "reserva_id" });
ReservaModel.belongsTo(PersonsModel, { foreignKey: "reserva_id" });