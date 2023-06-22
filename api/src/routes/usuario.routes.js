const {Router} = require('express');
const { User } = require('../models/User');
const userController = require('../controllers/user.controller');
const usuarioRouter = Router();



usuarioRouter.get('/',userController.getAllUser)
usuarioRouter.put('/password',userController.updateUserPassword)
usuarioRouter.put('/email',userController.updateUserEmail)
usuarioRouter.put('/nickname',userController.updateUserNicknames)
usuarioRouter.post('/create',userController.createUser)
usuarioRouter.delete('/',(req,res)=>{
    try {
        res.send('entraste en usuario')
    } catch (error) {
        res.send({error: error.message})
    }
})



module.exports=usuarioRouter