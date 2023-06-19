const {Router} = require('express');
const ventaRouter = Router();


ventaRouter.get('/',(req,res)=>{
    try {
        res.send('entraste en ventas')
    } catch (error) {
        res.send({error: error.message})
    }
})

module.exports=ventaRouter