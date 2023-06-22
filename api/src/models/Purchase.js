const {sequelize}= require('../database/db');
const {DataTypes}= require('sequelize');
const { Product } = require('./Product');



 const Purchase = sequelize.define('purchases', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    date: {
        type: DataTypes.DATE,
        allowNull:false
    },
    amount: {
        type: DataTypes.BIGINT,
        allowNull:false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull:false,
    },
    detail: {
        type: DataTypes.TEXT,
    }
    
    
}, {
    timestamps: false
})
module.exports={Purchase};

Product.hasOne(Purchase, {
    foreignKey: 'productId',
    sourceKey: 'id'
});
Purchase.belongsTo(Product, {
    foreignKey: 'productId',
    targetKey: 'id'
})
