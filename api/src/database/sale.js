const { Sale } = require("../models/Sale")

const createSale = async(amount,price,productId,detail = '')=>{
    try {
        return await Sale.create({
            amount,
            price,
            detail,
            productId
        })
       
    } catch (error) {
        console.log(error);
        const err = new customErrors(error.errors[0].message||error.message || 'database error',error.statusCode||500);
        throw (err);
    }
}

const getAllSales = async(userId)=>{
    try {
        return await Sale.findAll({
            where:{
                userId,
            }
        })
    } catch (error) {
        console.log(error);
        const err = new customErrors(error.errors[0].message||error.message || 'database error',error.statusCode||500);
        throw (err);
    }
}
const getOneSale = async (userId,id)=>{
    try {
        return await Sale.findOne({
            where:{
                userId,
                id,            }
        })
    } catch (error) {
        console.log(error);
        const err = new customErrors(error.errors[0].message||error.message || 'database error',error.statusCode||500);
        throw (err);
    }
}
const findSaleById = async(id)=>{
    try {
        return await Sale.findByPk(id);
    } catch (error) {
        console.log(error);
        const err = new customErrors(error.errors[0].message||error.message || 'database error',error.statusCode||500);
        throw (err);
    }
}
const deleteSale =async(userId,id)=>{
    try {
        return  await Sale.destroy({
            where:{
                userId,
                id
            }
        });
        
    } catch (error) {
        console.log(error);
        const err = new customErrors(error.errors[0].message||error.message || 'database error',error.statusCode||500);
        throw (err);
    }
}

const updateSale =async(id,userId,obj)=>{
    console.log("entro a update");
    try {
        return Sale.update(obj,{
            where:{
                id,
                userId
            }
        });
    } catch (error) {
        console.log(error);
        const err = new customErrors(error.errors[0].message||error.message || 'database error',error.statusCode||500);
        throw (err);
    }
}

module.exports={
    createSale,
    getAllSales,
    getOneSale,
    deleteSale,
    findSaleById,
    updateSale


}