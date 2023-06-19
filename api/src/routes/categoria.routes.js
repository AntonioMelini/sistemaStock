const {Router} = require('express');
const categoriaRouter = Router();


categoriaRouter.get('/',(req,res)=>{
    try {
        res.send('entraste en categoria')
    } catch (error) {
        res.send({error: error.message})
    }
})

module.exports=categoriaRouter