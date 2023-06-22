const {Router} = require('express');
const { User } = require('../models/User');
const userController = require('../controllers/user.controller');
const usuarioRouter = Router();



usuarioRouter
    .get('/',userController.getAllUser)
    .put('/password',userController.updateUserPassword)
    .put('/emails/:id',userController.updateUserEmail)
    .put('/nickname',userController.updateUserNicknames)
    .post('/create',userController.createUser)
    .delete('/delete/:id',userController.deleteUser)



module.exports=usuarioRouter