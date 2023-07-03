const { Purchase } = require("../models/Purchase");
const customErrors = require("../utils/error");

const getAllPurchases = async(userId)=>{
    try {
        return await Purchase.findAll({
            where:{
                userId
            }
        })
    } catch (error) {
        console.log(error);
        const err = new customErrors(error.errors[0].message||error.message || 'database error',error.statusCode||500);
        throw (err);
    }
}
const getOnePurchase = async(userId,id)=>{
    try {
        return await Purchase.findOne({
            where:{
                id,
                userId
            }
        })
    } catch (error) {
        console.log(error);
        const err = new customErrors(error.errors[0].message||error.message || 'database error',error.statusCode||500);
        throw (err);
    }
}
const createPurchase = async(amount,price,productId,detail = '')=>{
    try {
        return await Purchase.create({
            amount,
            price,
            productId,
            detail
        })
    } catch (error) {
        console.log(error);
        const err = new customErrors(error.errors[0].message||error.message || 'database error',error.statusCode||500);
        throw (err);
    }
}
const deletePurchase = async(id,userId)=>{
    try {
        await Purchase.destroy({
            where:{
                id,
                userId
            }
        })
        return true;
    } catch (error) {
        console.log(error);
        const err = new customErrors(error.errors[0].message||error.message || 'database error',error.statusCode||500);
        throw (err);
    }
}
const productIdFromPurchase = async(id)=>{
    try {
        let productId = await Purchase.findByPk(id)
        productId= productId?.dataValues.productId;
        return productId 
    } catch (error) {
        console.log(error);
        const err = new customErrors(error.errors[0].message||error.message || 'database error',error.statusCode||500);
        throw (err);
    }
}
const productAmountFromPurchase = async(id)=>{
    try {
        let amount = await Purchase.findByPk(id);
        amount= amount?.dataValues.amount
        return amount
    } catch (error) {
        console.log(error);
        const err = new customErrors(error.errors[0].message||error.message || 'database error',error.statusCode||500);
        throw (err);
    }
}

const updatePurchase = async(id,userId,obj)=>{
    try {
        await Purchase.update(obj,{
            where:{
                id,
                userId
            }
        });
        return true;
    } catch (error) {
        console.log(error);
        const err = new customErrors(error.errors[0].message||error.message || 'database error',error.statusCode||500);
        throw (err);
    }
}
module.exports={
    getAllPurchases,
    createPurchase,
    deletePurchase,
    productIdFromPurchase,
    productAmountFromPurchase,
    getOnePurchase,
    updatePurchase

}

