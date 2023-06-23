const userService = require('../services/user.service')


const createUser = async(req,res)=>{
   await userService.createUser(req);
   res.status(201).send({status: 'Ok', data:'User was created'});
}


const getAllUser = async (req,res)=>{
       const allUsers = await userService.getAllUser();
       res.status(200).send({status: 'Ok', data:allUsers});
}

const updateUserPassword = async(req,res)=>{
    await userService.updateUserPassword(req);
    res.status(200).send({status: 'Ok', data:'update was succes'});
}

const updateUserEmail= async(req,res)=>{
    await userService.updateUserEmail(req);
    res.status(200).send({status: 'Ok', data:'update was succes'});
   
}

const updateUserNicknames = async(req,res)=>{
   await userService.updateUserNicknames(req);
   res.status(200).send({status: 'Ok', data:'update was succes'});
}

const deleteUser = async (req,res)=>{
   await userService.deleteUser(req);
   res.status(200).send({status: 'Ok', data:'update was succes'});
}
   module.exports={
    createUser,
    getAllUser,
    updateUserPassword,
    updateUserEmail,
    updateUserNicknames,
    deleteUser


   } 