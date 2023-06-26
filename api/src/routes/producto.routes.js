const {Router} = require('express');
const productoRouter = Router();
const Products = require('../controllers/product.controllers');


productoRouter
    .get('/:id',Products.getAllProducts)
    .get('/one/:id/:productId', Products.getOneProduct)
    .post('/', Products.createProduct)
    .put('/:id', Products.updateProduct)
    .delete('/:id', Products.deleteProduct)

module.exports=productoRouter;