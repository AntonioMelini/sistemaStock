const {sequelize}= require('../database/db');
const {DataTypes}= require('sequelize');
const {Compra} =require('./Compra');
const { Venta } = require('./Venta');
const { Producto } = require('./Producto');


 const Usuario = sequelize.define('usuarios', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    nombre: {
        type: DataTypes.STRING(60),
        allowNull:false,
    },
    apellido: {
        type: DataTypes.STRING(60),
        allowNull:false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    
    
}, {
    timestamps: false
})

Usuario.hasMany(Compra,{
    foreignKey: 'userId',
    sourceKey: 'id'
});

Compra.belongsTo(Usuario, {
    foreignKey: 'userId',
    targetKey: 'id'
})

Usuario.hasMany(Venta,{
    foreignKey: 'userId',
    sourceKey: 'id'
});

Venta.belongsTo(Usuario, {
    foreignKey: 'userId',
    targetKey: 'id'
})

Usuario.hasMany(Producto, {
    foreignKey: 'userId',
    sourceKey: 'id'
})
Producto.belongsTo(Usuario, {
    foreignKey: 'userId',
    targetKey: 'id'
})


module.exports={Usuario};