const {Product} = require('../models/Product');
const customErrors = require('../utils/error');



const getAllProducts = async (id)=>{
    try {
        return await Product.findAll({
            where:{
                userId:id,
            }
        })
    } catch (error) {
        const err = new customErrors (error.message||'Database Error', error.statusCode||400);
        throw (err);
    }
};

const getOneProduct = async (userId,id)=>{
    try {
        return await Product.findOne({
            where:{
                id,
                userId
            }
        })
    } catch (error) {
        
    }
};

const createProduct = async(stock,price,detail,image,name)=>{
    try {
        // falta el categoria id
        return await Product.create({
            stock,
            price,
            detail,
            image,
            name,
        })
    } catch (error) {
        console.log("ERROR EN LA DATABASE CREATEPRODUCT");
        //console.log(error);
        
        const err = new customErrors (error.errors[0].message || error.message ||'Database Error', error.statusCode||400);
        throw (err);
    }
};
const findProductById = async (id)=>{
    try {
        return await Product.findByPk(id)

    } catch (error) {
        const err = new customErrors (error.message||'Database Error', error.statusCode||400);
        throw (err);
    }
};

const updateProduct =async(id,obj)=>{
    try {
        await Product.update(obj,{
            where:{
                id,
            }
        })
        return true
    } catch (error) {
        console.log("ERROR EN LA DATABASE UPDATEPRODUCT");
        console.log(error);
        const err = new customErrors (error.message||'Database Error', error.statusCode||400);
        throw (err);
    }
};
const deleteProduct = async(id)=>{
    try {
        await Product.destroy({
            where:{
                id
            }
        })
        return true;
    } catch (error) {
        console.log(error);
        const err = new customErrors (error.message||'Database Error', error.statusCode||400);
        throw (err);
    }
};

module.exports={
    getOneProduct,
    getAllProducts,
    updateProduct,
    createProduct,
    deleteProduct,
    findProductById

}