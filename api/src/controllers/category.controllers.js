const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const categoryService = require('../services/category.service');

const getAllCategories= asyncErrorHandler(async(req,res,next)=>{
    const allCategoriesDB = await categoryService.getAllCategories();
    res.status(200).json({status: 'Ok', data: allCategoriesDB});
})
const createCategory =  asyncErrorHandler(async(req,res,next)=>{
    await categoryService.createCategory(req);
    res.status(201).json({status: 'Ok', data: 'Category was added!'});
})
const deleteCategory =  asyncErrorHandler(async(req,res,next)=>{
    await categoryService.deleteCategory(req);
    res.status(200).json({status: 'Ok', data: 'Category was deleted'});
})
const updateCategory =  asyncErrorHandler(async(req,res,next)=>{
    await categoryService.updateCategory(req);
    res.status(200).json({status: 'Ok', data: 'Category was updated'});
})



module.exports={
    getAllCategories,
    createCategory,
    deleteCategory,
    updateCategory,
    
}