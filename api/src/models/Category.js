const {sequelize}= require('../database/db');
const {DataTypes}= require('sequelize');

 const Category = sequelize.define('categories', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    name: {
        type: DataTypes.STRING(80),
        allowNull:false,
        unique:true,
        get(){
            return this.getDataValue('name')?.split('-')[0]
        }
    }
}, {
    timestamps: false
})
module.exports={Category};