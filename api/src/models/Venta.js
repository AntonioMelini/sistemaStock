const {sequelize}= require('../database/db');
const {DataTypes}= require('sequelize');
const { Producto } = require('./Producto');



 const Venta = sequelize.define('ventas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull:false
    },
    cantidad: {
        type: DataTypes.BIGINT,
        allowNull:false,
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull:false,
    },
    descripcion: {
        type: DataTypes.TEXT,
    }
    
    
}, {
    timestamps: false
})
module.exports={Venta};

Venta.belongsTo(Producto, {
    foreignKey: 'productoId',
    targetKey: 'id'
})
Producto.hasOne(Venta,{
    foreignKey: 'productoId',
    sourceKey: 'id'
})
