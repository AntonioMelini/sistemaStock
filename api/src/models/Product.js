const {sequelize}= require('../database/db');
const {DataTypes}= require('sequelize');
const { Category } = require('./Category');

 const Product = sequelize.define('products', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    stock: {
        type: DataTypes.BIGINT,
        allowNull:false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull:false,
    },
    detail: {
        type: DataTypes.TEXT
    },
    image: {
        type: DataTypes.TEXT,
        allowNull:false,
    },
    name: {
        type: DataTypes.STRING(80),
        allowNull:false,
        unique:true
    }
}, {
    timestamps: false
})
module.exports={Product};

Category.hasMany(Product, {
    foreignKey: 'categoryId',
    sourceKey: 'id'
});
Product.belongsTo(Category, {
    foreignKey: 'categoryId',
    targetKey: 'id'
});