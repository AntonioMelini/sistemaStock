const {sequelize}= require('../database/db');
const {DataTypes}= require('sequelize');
const { Categoria } = require('./Categoria');

 const Producto = sequelize.define('productos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    stock: {
        type: DataTypes.BIGINT,
        allowNull:false,
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull:false,
    },
    detalle: {
        type: DataTypes.TEXT
    },
    imagen: {
        type: DataTypes.TEXT,
        allowNull:false,
    },
    nombre: {
        type: DataTypes.STRING(80),
        allowNull:false,
        unique:true
    }
}, {
    timestamps: false
})
module.exports={Producto};

Categoria.hasMany(Producto, {
    foreignKey: 'categoriaId',
    sourceKey: 'id'
});
Producto.belongsTo(Categoria, {
    foreignKey: 'categoriaId',
    targetKey: 'id'
});