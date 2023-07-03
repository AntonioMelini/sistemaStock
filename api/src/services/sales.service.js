const customErrors = require("../utils/error");
const saleDatabase = require('../database/sale');
const {validId} = require('./purchases.service');



const validPost = (amount,price)=>{
    if(!amount || !price ){
        const err = new customErrors('Missing Params',400);
        throw (err);
    }
}
////////////////////////////////////////////

const updateSale = async(req)=>{
    try {
        
    } catch (error) {
        
    }
}
const     deleteSale = async(req)=>{
    try {
        const {id,saleId}=req.params;
        await validId(id);
        const validId = await saleDatabase.findSaleById(saleId);
        if(!validId){
            const err = new customErrors('Invalid Params',400);
            throw (err);
        throw (err);
        }
        await saleDatabase.deleteSale(id,saleId);
        return true;
    } catch (error) {
        throw(error);
    }
}
const     createSale = async(req)=>{
    try {
        const {amount,price,detail}=req.body;
        validPost(amount,price);
        await saleDatabase.createSale(amount,price,detail);
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