const {Router} = require('express');
const categoriaRouter  = require('./categoria.routes');
const  compraRouter  = require('./compra.routes');
const  productoRouter  = require('./producto.routes');
const  usuarioRouter  = require('./usuario.routes');
const  ventaRouter  = require('./venta.routes');


const router = Router();


router.use('/categories',categoriaRouter)
router.use('/sales',compraRouter)
router.use('/products',productoRouter)
router.use('/users',usuarioRouter)
router.use('/purchases',ventaRouter)

module.exports=router;