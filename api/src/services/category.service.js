const categoryDatabase = require('../database/category');
const customErrors = require('../utils/error');
const userDatabase = require('../database/users');

const validID = async(id)=>{
    if(!id){
        const err = new customErrors('Missing Params');
        throw err;
    }
    const user = await userDatabase.findUserById(id);
    if(!user){
        const err = new customErrors('Invalid Params');
        throw err;
    }
    return user;
}
const getAllCategories = async (req)=>{
    try {
        const {id}=req.params;
        await validID(id);
        const allCategoriesDB = await categoryDatabase.getAllCategories(id);
        console.log(allCategoriesDB);
        return allCategoriesDB;
    } catch (error) {
        throw error;
    }
}

const createCategory  = async (req)=>{
    try {
        const {name} =req.body;
        const {id} =req.params;
        const user=await validID(id);
        if(!name){
            const err = new customErrors('Missing params',400);
            throw(err);
        }
        const newCategory= await categoryDatabase.createCategory(`${name.toUpperCase()}-${id}`);
        await user.addCategory(newCategory);
    } catch (error) {
        throw (error);
    }
}
const deleteCategory  = async (req)=>{
    try {
        const {id,categoryId} =req.body;
        await validID(id);
        return await categoryDatabase.deleteCategory(categoryId,id);
    } catch (error) {
        throw(error);
    }
}
const updateCategory   = async (req)=>{
    try {
        const {id} = req.params;
        const {categoryId,name} = req.body;
        await validID(id);
        if(!name || !categoryId){
            const err = new customErrors('Missing params',400);
            throw(err);
        }
        await categoryDatabase.updateCategory(id,categoryId,`${name.toUpperCase()}-${id}`);
        return true;
    } catch (error) {
        throw(error)
    }
}

module.exports={
    getAllCategories,
    createCategory,
    deleteCategory,
    updateCategory
}