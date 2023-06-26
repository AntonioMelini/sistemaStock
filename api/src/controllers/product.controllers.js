const asyncErrorHandler = require('../middlewares/asyncErrorHandler');


const  getAllProducts = asyncErrorHandler(async (req,res,next)=>{
    const products = await Products.getAllProducts(req);
    res.status(200).json({status: 'Ok', data: products});
})
const   getOneProduct= asyncErrorHandler (async (req,res,next)=>{
    const product = await Products.getOneProduct(req);
    res.status(200).json({status: 'Ok', data:product});
})
const   createProduct= asyncErrorHandler (async (req,res,next)=>{
    await Products.createProduct(req);
    res.status(201).json({status: 'Ok', data:'Product was created'});
})
const   updateProduct= asyncErrorHandler (async (req,res,next)=>{
    await Products.updateProduct(req);
    res.status(201).json({status: 'Ok', data:'Product was updated'});
})
const   deleteProduct= asyncErrorHandler (async (req,res,next)=>{
    await Products.deleteProduct(req);
    res.status(200).json({status: 'Ok', data:'Product was deleted'});
})

module.exports={
    getAllProducts,
    getOneProduct,
    createProduct,
    updateProduct,
    deleteProduct
}