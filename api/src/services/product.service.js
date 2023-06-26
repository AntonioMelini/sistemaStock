const Products = require('../database/products');
const customErrors = require('../utils/error');

const  getAllProducts = async (req)=>{
    try {
        const {id} = req.params;
        if(!id){
            const err = new customErrors ('Missing Params', 400);
            throw (err);
        }
        const productsDB = await Products.getAllProducts(id);
        return productsDB;
    } catch (error) {
        console.log("Error Service Getallproducts");
        throw (error)
    }
}
const   getOneProduct=  async (req)=>{
   try {
        const {id,productId} =req.params;
        if(!id || productId){
            const err = new customErrors ('Missing Params', 400);
            throw (err);
        }
        const productDB = await Products.getOneProduct(id,productId);
        return productDB;
   } catch (error) {
        throw (error);
   }
}
const   createProduct=  async (req)=>{
    try {
        const {stock,price,detail,image,name} = req.body;
        if(!stock || !price || !detail || !image || !name){
            const err = new customErrors ('Missing Params', 400);
            throw (err);
        }
        await Products.createProduct(stock,price,detail,image,name);
        return true;
    } catch (error) {
        throw (error);
    }
}
const   updateProduct=  async (req)=>{
   try {
        const {id}= req.params;
        const obj= req.body;
        if(!id || !Object.entries(obj).length){
            const err = new customErrors ('Missing Params', 400);
            throw (err);
        }
        await Products.updateProduct(id,obj);
        return true;

   } catch (error) {
        throw (error);
   }
}
const   deleteProduct=  async (req)=>{
    try {
        const {id}= req.params;
        if(!id){
            const err = new customErrors ('Missing Params', 400);
            throw (err);
        }
        await Products.deleteProduct(id);
        return true;
    } catch (error) {
        
        throw (error);
    }
}

module.exports={
    getAllProducts,
    getOneProduct,
    createProduct,
    updateProduct,
    deleteProduct
}