const {Router} = require('express');
const categoriaRouter = Router();
const categoryControllers = require('../controllers/category.controllers');

categoriaRouter
        .get('/:id',categoryControllers.getAllCategories)
        .post('/:id',categoryControllers.createCategory)
        .delete('/',categoryControllers.deleteCategory)
        .put('/:id',categoryControllers.updateCategory)

module.exports=categoriaRouter