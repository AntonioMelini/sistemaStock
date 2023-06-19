const {Router} = require('express');
const productoRouter = Router();


productoRouter.get('/',(req,res)=>{
    try {
        res.send('entraste en producto')
    } catch (error) {
        res.send({error: error.message})
    }
})

module.exports=productoRouter