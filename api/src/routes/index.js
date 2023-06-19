const {Router} = require('express');
const categoriaRouter  = require('./categoria.routes');
const  compraRouter  = require('./compra.routes');
const  productoRouter  = require('./producto.routes');
const  usuarioRouter  = require('./usuario.routes');
const  ventaRouter  = require('./venta.routes');


const router = Router();


router.use('/categoria',categoriaRouter)
router.use('/compra',compraRouter)
router.use('/producto',productoRouter)
router.use('/usuario',usuarioRouter)
router.use('/venta',ventaRouter)

module.exports=router;