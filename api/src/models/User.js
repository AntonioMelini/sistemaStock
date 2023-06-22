const {sequelize}= require('../database/db');
const {DataTypes}= require('sequelize');
const {Purchase} =require('./Purchase');
const { Sale } = require('./Sale');
const { Product } = require('./Product');


 const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    name: {
        type: DataTypes.STRING(60),
        allowNull:false,
    },
    lastname: {
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

module.exports={User};

User.hasMany(Purchase,{
    foreignKey: 'userId',
    sourceKey: 'id'
});

Purchase.belongsTo(User, {
    foreignKey: 'userId',
    targetKey: 'id'
})

User.hasMany(Sale,{
    foreignKey: 'userId',
    sourceKey: 'id'
});

Sale.belongsTo(User, {
    foreignKey: 'userId',
    targetKey: 'id'
})

User.hasMany(Product, {
    foreignKey: 'userId',
    sourceKey: 'id'
})
Product.belongsTo(User, {
    foreignKey: 'userId',
    targetKey: 'id'
})

