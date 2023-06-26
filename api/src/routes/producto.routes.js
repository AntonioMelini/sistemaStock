const {Router} = require('express');
const productoRouter = Router();
const productControllers = require('../controllers/product.controllers');


productoRouter
    .get('/:id',productControllers.getAllProducts)
    .get('/:id/:productId', productControllers.getOneProduct)
    .post('/:id', productControllers.createProduct)
    .put('/:id', productControllers.updateProduct)
    .delete('/:id', productControllers.deleteProduct)

module.exports=productoRouter;