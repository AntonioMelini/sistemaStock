const {Category} = require('../models/Category');
const customErrors = require('../utils/error');

const getAllCategories = async(id)=>{
    try {
        return await Category.findAll({
            attributes:{exclude:['userId']},
            where:{
                userId:id
            }
        });
    } catch (error) {
        console.log(error);
        const err = new customErrors(error.errors[0].message||error.message || 'database error',error.statusCode||500);
        throw (err);
    }
}

const createCategory = async (name)=>{
    try {
        return await Category.create({
            name:name
        })
       
    } catch (error) {
        console.log(error);
        const err = new customErrors(error.errors[0].message||error.message || 'database error',error.statusCode||500);
        throw (err);
    }
}

const deleteCategory = async(id,userId)=>{
    try {
        await Category.destroy({
            where:{
                id,
                userId
            }
        })
        return true;
    } catch (error) {
        console.log(error);
        const err = new customErrors(error.errors[0].message||error.message || 'database error',error.statusCode||500);
        throw (err);
    }
}

const updateCategory = async(userId,id,name)=>{
    try {
        await Category.update({
            name
        },{
            where:{
                id,
                userId
            }
        })
    } catch (error) {
        console.log(error);
        const err = new customErrors(error.errors[0].message||error.message || 'database error',error.statusCode||500);
        throw (err);
    }
}
module.exports={
    createCategory,
    getAllCategories,
    deleteCategory,
    updateCategory
};

