const userService = require('../services/user.service')


const createUser = async(req,res)=>{
   await userService.createUser(req);
   res.send('User was created');
}


const getAllUser = async (req,res)=>{
       const allUsers = await userService.getAllUser();
       res.send(allUsers)
}

const updateUserPassword = async(req,res)=>{
    await userService.updateUserPassword(req);
    res.send('update was succes');
}

const updateUserEmail= async(req,res)=>{
    await userService.updateUserEmail(req);
    res.send('update was succed');
}

const updateUserNicknames = async(req,res)=>{
   await userService.updateUserNicknames(req);
   res.send('update was succed');
}

const deleteUser = async (req,res)=>{
   await userService.deleteUser(req);
   res.send('user was deleted');
}
   module.exports={
    createUser,
    getAllUser,
    updateUserPassword,
    updateUserEmail,
    updateUserNicknames,
    deleteUser


   } 