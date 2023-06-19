const {Router} = require('express');
const compraRouter = Router();


compraRouter.get('/',(req,res)=>{
    try {
        res.send('entraste en compra')
    } catch (error) {
        res.send({error: error.message})
    }
})

module.exports=compraRouter