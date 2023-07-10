const {Router} = require('express');
const categoriaRouter  = require('./categoria.routes');
const  purchaseRouter  = require('./purchase.routes');
const  productoRouter  = require('./producto.routes');
const  usuarioRouter  = require('./usuario.routes');
const  saleRouter  = require('./sale.routes');
const authRouter = require('./auth.routes');
const { authHandler } = require('../middlewares/authHandler');

const router = Router();


router
    .use('/categories',authHandler,categoriaRouter)
    .use('/sales',authHandler,saleRouter)
    .use('/products',authHandler,productoRouter)
    .use('/users',authHandler,usuarioRouter)
    .use('/purchases',authHandler,purchaseRouter)
    .use('/auth',authRouter)

module.exports=router;