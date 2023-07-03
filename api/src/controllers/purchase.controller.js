const asyncErrorHandler = require("../middlewares/asyncErrorHandler")
const purchaseService = require('../services/purchases.service');


const  getAllPurchases = asyncErrorHandler(async(req,res,next)=>{
    const allPurchaseDB = await purchaseService.getAllPurchases(req);
    res.status(200).json({ status:'ok', data:allPurchaseDB})
})
const  getOnePurchase = asyncErrorHandler(async(req,res,next)=>{
    const onePurchase = await purchaseService.getOnePurchase(req);
    res.status(200).json({ status:'ok', data:onePurchase})
})
const  createPurchase = asyncErrorHandler(async(req,res,next)=>{
    await purchaseService.createPurchase(req);
    res.status(200).json({ status:'ok', data:'Purchese was created'})
})
const  deletePurchase = asyncErrorHandler(async(req,res,next)=>{
    await purchaseService.deletePurchase(req);
    res.status(200).json({ status:'ok', data:'Purchase was deleted'})
})
const  updatePurchase = asyncErrorHandler(async(req,res,next)=>{
    await purchaseService.updatePurchase(req);
    res.status(200).json({ status:'ok', data:'Purchese was updated'})
})


module.exports={
    updatePurchase,
    deletePurchase,
    createPurchase,
    getOnePurchase,
    getAllPurchases

}