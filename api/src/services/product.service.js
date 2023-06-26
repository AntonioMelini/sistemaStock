const Products = require('../database/products');
const customErrors = require('../utils/error');
const Users =require('../database/users');



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
        console.log(id,productId);
        if(!id || !productId){
            const err = new customErrors ('Missing Params', 400);
            throw (err);
        }
        const user = await Users.findUserById(id);
        if(!user){
            const err = new customErrors ('Invalid User', 400);
            throw (err);
        }
        const productDB = await Products.getOneProduct(id,productId);
        if(!productDB){
            const err = new customErrors ('Product not found', 400);
            throw (err);
        }
        return productDB;
   } catch (error) {
        throw (error);
   }
}
const   createProduct=  async (req)=>{
    try {
        console.log("entro a create product");
        const {id}=req.params;
        const {stock,price,detail,image,name} = req.body;
        if(!stock || !price || !detail || !image || !name){
            console.log("error faltan datos");
            const err = new customErrors ('Missing Params', 400);
            throw (err);
        }
        const user = await Users.findUserById(id);
        if(!user){
            console.log("error esta mal el id");
            const err = new customErrors ('Invalid Params', 400);
            throw (err);
        }
        const newName = `${name}-${id}`
        const newProduct= await Products.createProduct(stock,price,detail,image,newName);
        await user.addProduct(newProduct)
       
        return true;
    } catch (error) {
        console.log("ERROR SERVICE PRODUCT");
        throw (error);
    }
}
const   updateProduct=  async (req)=>{
   try {
        const {id}= req.params;
        let obj= req.body;
        if(!id || !Object.entries(obj).length){
            const err = new customErrors ('Missing Params', 400);
            throw (err);
        }
        const productDB = await Products.findProductById(id);
        console.log(productDB);
        if(!productDB){
            const err = new customErrors ('Invalid Params', 400);
            throw (err);
        }
        obj.name ? obj.name =  `${obj.name}-${productDB.dataValues.userId}` : false
        
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
        const productDB = await Products.findProductById(id);
        if(!productDB){
            const err = new customErrors ("Invalid params",400);
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