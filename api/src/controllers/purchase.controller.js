const asyncErrorHandler = require("../middlewares/asyncErrorHandler")

const  getAllPurchases = asyncErrorHandler(async(req,res,next)=>{
    res.status(200).json({ status:'ok', data:'ok'})
})
const  getOnePurchase = asyncErrorHandler(async(req,res,next)=>{
    res.status(200).json({ status:'ok', data:'ok'})
})
const  createPurchase = asyncErrorHandler(async(req,res,next)=>{
    res.status(200).json({ status:'ok', data:'ok'})
})
const  deletePurchase = asyncErrorHandler(async(req,res,next)=>{
    res.status(200).json({ status:'ok', data:'ok'})
})
const  updatePurchase = asyncErrorHandler(async(req,res,next)=>{
    res.status(200).json({ status:'ok', data:'ok'})
})


module.exports={
    updatePurchase,
    deletePurchase,
    createPurchase,
    getOnePurchase,
    getAllPurchases

}