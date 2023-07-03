const asyncErrorHandler = require("../middlewares/asyncErrorHandler")
const salesService = require('../services/sales.service');


const  getAllSales = asyncErrorHandler(async(req,res,next)=>{
    const allSalesDB = await salesService.getAllSales(req);
    res.status(200).json({ status:'ok', data:allSalesDB})
})
const  getOneSale = asyncErrorHandler(async(req,res,next)=>{
    const oneSaleDB = await salesService.getOneSale(req);
    res.status(200).json({ status:'ok', data:oneSaleDB})
})
const  createSale = asyncErrorHandler(async(req,res,next)=>{
    await salesService.createSale(req);
    res.status(200).json({ status:'ok', data:'Purchese was created'})
})
const  deleteSale = asyncErrorHandler(async(req,res,next)=>{
    await salesService.deleteSale(req);
    res.status(200).json({ status:'ok', data:'Purchase was deleted'})
})
const  updateSale = asyncErrorHandler(async(req,res,next)=>{
    await salesService.updateSale(req);
    res.status(200).json({ status:'ok', data:'Purchese was updated'})
})


module.exports={
    updateSale,
    deleteSale,
    createSale,
    getOneSale,
    getAllSales

}