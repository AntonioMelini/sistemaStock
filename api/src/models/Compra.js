const {sequelize}= require('../database/db');
const {DataTypes}= require('sequelize');
const { Producto } = require('./Producto');



 const Compra = sequelize.define('compras', {
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
module.exports={Compra};

Producto.hasOne(Compra, {
    foreignKey: 'productoId',
    sourceKey: 'id'
});
Compra.belongsTo(Producto, {
    foreignKey: 'productoId',
    targetKey: 'id'
})
