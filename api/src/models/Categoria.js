const {sequelize}= require('../database/db');
const {DataTypes}= require('sequelize');

 const Categoria = sequelize.define('categorias', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    nombre: {
        type: DataTypes.STRING(80),
        allowNull:false,
        unique:true
    }
}, {
    timestamps: false
})
module.exports={Categoria};