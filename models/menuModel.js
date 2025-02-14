import { sequelize } from '../db/conexion.js';
import { DataTypes } from 'sequelize';
import { categoryModel } from './categoryModel.js';

export const menuModel = sequelize.define('Menu', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    categoriaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: categoryModel,
            key: 'id',
        },
    },
}, {
    timestamps: false,
});

// Relación con la categoría
categoryModel.hasMany(menuModel, { foreignKey: 'categoriaId' });
menuModel.belongsTo(categoryModel, { foreignKey: 'categoriaId' }); 