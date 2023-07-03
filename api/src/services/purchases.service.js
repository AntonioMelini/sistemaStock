const customErrors = require("../utils/error");
const userDatabase = require('../database/users');
const purchaseDatabase = require('../database/purchase');
const productDatabase = require('../database/products');
const {manageStock} =require('./manageStock.service');

const validId = async(id)=>{
    try {
        if(!id){
            const err = new customErrors('Missing Params',400);
            throw (err);
        }
        const user = await userDatabase.findUserById(id);
        if(!user){
            const err = new customErrors('Invalid Params',400);
            throw err;
        }
        return user;
    } catch (error) {
        throw (error);
    }
}
const validPost = async(amount,price,productId)=>{
    if( !amount || !price || !productId){
        const err = new customErrors('Missing Params',400);
        throw (err)
    }
    return true
}
//amount price detail producId
const getAllPurchases = async(req)=>{
    try {
        const {id}=req.params;
        await validId(id);
        return await purchaseDatabase.getAllPurchases(id);
    } catch (error) {
        throw (error)
    }
}
const getOnePurchase = async(req)=>{
    try {
        const {id,purchaseId}=req.params;
        await validId(id);
        if(!purchaseId){
            const err = new customErrors('Missing Params',400);
            throw (err)
        }
        const purchaseDB = await purchaseDatabase.getOnePurchase(id,purchaseId);
        if(!purchaseDB){
            const err = new customErrors('Invalid Purchase Params',400);
            throw (err)
        }
        return purchaseDB;
    } catch (error) {
        throw (error)
    }
}
const createPurchase = async(req)=>{
    try {
        const {id}=req.params;
        const {amount,price,detail,productId}=req.body;
        const user = await validId(id);
        await validPost(amount,price,productId);
        await productDatabase.increaseStock(productId,amount);

         const newPurchase =  await purchaseDatabase.createPurchase(amount,price,productId,detail)
         await user.addPurchase(newPurchase);
        return true;
    } catch (error) {
        throw (error)
    }
}
const deletePurchase = async(req)=>{
    try {
        const { id,purchaseId} = req.params;
        await validId(id);
        if(! purchaseId){
            const err = new customErrors('Missing Params',400);
            throw(err);
        }
        const amount= await purchaseDatabase.productAmountFromPurchase(purchaseId);
        if(!amount){
            const err = new customErrors('Invalid Params',400);
            throw(err);
        }
        const productId=await purchaseDatabase.productIdFromPurchase(purchaseId);
        if(!productId){
            const err = new customErrors('Invalid Params',400);
            throw(err);
        }
        await productDatabase.removeStock(productId,amount)
        await purchaseDatabase.deletePurchase(purchaseId,id);
        return true;
    } catch (error) {
        throw (error)
    }
}
const updatePurchase = async(req)=>{
    try {
        const obj = req.body;
        const {id,purchaseId}=req.params;
        await validId(id);
        if(!purchaseId){
            const err = new customErrors('Missing Params',400);
            throw (err)
        }
        await manageStock(purchaseId,id,obj,'purchase');
        await purchaseDatabase.updatePurchase(purchaseId,id,obj)
        return true;
    } catch (error) {
        throw (error)
    }
}


module.exports={
    getAllPurchases,
    getOnePurchase,
    deletePurchase,
    createPurchase,
    updatePurchase,
    validId
}