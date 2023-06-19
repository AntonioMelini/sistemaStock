const {Router} = require('express');
const usuarioRouter = Router();


usuarioRouter.get('/',(req,res)=>{
    try {
        res.send('entraste en usuario')
    } catch (error) {
        res.send({error: error.message})
    }
})

module.exports=usuarioRouter