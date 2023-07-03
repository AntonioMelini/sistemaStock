const customErrors = require("../utils/error");
const saleDatabase = require('../database/sale');
const productDatabase = require('../database/products');
const purchaseService = require('./purchases.service');
const {manageStock} =require('./manageStock.service');



const validPost = (amount,price,productId)=>{
    if(!amount || !price || !productId){
        const err = new customErrors('Missing Params',400);
        throw (err);
    }
}
////////////////////////////////////////////

const updateSale = async(req)=>{
    try {
        const obj = req.body;
        const {id,saleId}=req.params;
        await purchaseService.validId(id);
        if(!saleId){
            const err = new customErrors('Missing Params',400);
            throw (err)
        }
        console.log("ANTES DE ENTRAR A MANAGESTOCK");
        await manageStock(saleId,id,obj,'sale');
        console.log("YA SALIO DE MANAGESTOCK");
        const wasUpdated=await saleDatabase.updateSale(saleId,id,obj)
        if(!wasUpdated[0]){
            const err= new customErrors('Invalid Params',400);
            throw (err);
        }
        return true;
    } catch (error) {
        throw(error)
    }
}
const     deleteSale = async(req)=>{
    try {
        const {id,saleId}=req.params;
        await purchaseService.validId(id);
        console.log("se rompe");
        const validId = await saleDatabase.findSaleById(saleId);
        if(!validId){
            const err = new customErrors('Invalid Params',400);
            throw (err);
        throw (err);
        }
        const wasEliminated=await saleDatabase.deleteSale(id,saleId);
        if(!wasEliminated){
            const err= new customErrors('Invalid Params',400);
            throw (err);
        }
        return true;
    } catch (error) {
        throw(error);
    }
}
const     createSale = async(req)=>{
    try {
        const {id}=req.params;
        const user= await purchaseService.validId(id)
        const {amount,price,productId,detail}=req.body;
        validPost(amount,price,productId);
        await productDatabase.removeStock(productId,amount);
        const newSale= await saleDatabase.createSale(amount,price,productId,detail);
        await user.addSale(newSale);
        return true;
    } catch (error) {
        throw(error);
    }
}
const     getOneSale = async(req)=>{
    try {
        const {id,saleId}=req.params;
        await validId(id);
        if(!saleId){
            const err = new customErrors('Missing Params',400);
            throw (err);
        }
        const oneSaleDB = await saleDatabase.getOneSale(id,saleId);
        return oneSaleDB;
    } catch (error) {
        throw(error);
    }
}
const   getAllSales = async(req)=>{
    try {
        const {id}=req.params
        await validId(id);
        const allSalesDB = await saleDatabase.getAllSales(id);
        return allSalesDB;
    } catch (error) {
        throw (error);
    }
}



module.exports={
    updateSale,
    deleteSale,
    createSale,
    getOneSale,
    getAllSales

}