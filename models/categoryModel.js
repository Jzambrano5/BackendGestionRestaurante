import { sequelize } from '../db/conexion.js';
import { DataTypes } from 'sequelize';


export const categoryModel = sequelize.define('categoria', {
    // Los atributos del modelo se definen aquí
    id: {
      //tipo de dato
      type: DataTypes.INTEGER,
      //autoincremento
      autoIncrement: true,
      //clave primaria 
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING, 
      //no permitir valores nulos
      allowNull: false 
    },
  }, {
    // Para desactivar los campos createdAt y updatedAt que sequelize genera por defecto para cada modelo lo desactivamos de la siguiente línea de código
    timestamps: false
    //esto  la tabla usuario 
  });
