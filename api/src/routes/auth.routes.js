const {Router} = require('express');
const authController = require('../controllers/auth.controller');
const authRouter = Router();


authRouter
        .post('/logIn',authController.logIn)
        .post('/logOut',authController.logOut)
        .get('/refresh',authController.refresh)
        

module.exports=authRouter