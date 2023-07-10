const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db");


const Token = sequelize.define('tokens',{
    id: {
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true,
        allowNull:false
    },
    jwt: {
        type: DataTypes.TEXT,
        allowNull:false,
        unique:true
    }
    
    
}, {
    timestamps: false
})

module.exports={
    Token
}
