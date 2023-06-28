const {Router} = require('express');
const categoriaRouter = Router();
const categoryControllers = require('../controllers/category.controllers');

categoriaRouter
        .get('/',categoryControllers.getAllCategories)
        .post('/',categoryControllers.createCategory)
        .delete('/',categoryControllers.deleteCategory)
        .put('/',categoryControllers.updateCategory)

module.exports=categoriaRouter