const userService = require('../services/user.service')
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');

const createUser =asyncErrorHandler(  async(req,res,next)=>{
   
      await userService.createUser(req,res,next);
      res.status(201).send({status: 'Ok', data:'User was created'});
})



const updateUserPassword = asyncErrorHandler(async(req,res,next)=>{
    await userService.updateUserPassword(req);
    res.status(200).send({status: 'Ok', data:'update was succes'});
})

const updateUserEmail= asyncErrorHandler(async(req,res)=>{
    await userService.updateUserEmail(req);
    res.status(200).send({status: 'Ok', data:'update was succes'});
   
})

const updateUserNicknames = asyncErrorHandler(async(req,res)=>{
   await userService.updateUserNicknames(req);
   res.status(200).send({status: 'Ok', data:'update was succes'});
})

const deleteUser = asyncErrorHandler(async (req,res)=>{
   await userService.deleteUser(req);
   res.status(200).send({status: 'Ok', data:'delete was succes'});
})
   module.exports={
    createUser,
    updateUserPassword,
    updateUserEmail,
    updateUserNicknames,
    deleteUser


   } 