const Users = require('../database/users');
const bcrypt = require('bcrypt');
const customErrors = require('../utils/error');

const hashingPassword =async (password)=>{
    return await bcrypt.hash(password,10)
    
}
const isCompleteThePost= (obj)=>{
    if(obj.name && obj.lastname && obj.email && obj.password) return true
    else {
        const err = new customErrors('Invalid Post',400)
        return err;
    }
}

const createUser = async (req,res,next)=>{
    try {
        const obj = req.body;
        console.log(obj);
        const  isComplete = isCompleteThePost(obj);

       if( isComplete!== true){
           throw (isComplete)
       }

       obj.password= await hashingPassword(obj.password);
       await Users.createUser(obj);
    } catch (error) {
        console.log("entroa  error de service");
        throw error;
    }
}
// const getAllUser =  ()=>{
//     const allUsers = Users.getAllUser();
//     return allUsers;
// }
const updateUserPassword =  async(req)=>{
    const {password,email} = req.body;
    if(!password || !email){
        const err = new customErrors('Please send password and email valid',400)
        throw (err);
    }else  await Users.updateUserPassword(password,email);
}
const updateUserEmail =  async(req)=>{
    const {id}= req.params
    const {newEmail} = req.body;
    if(id && newEmail) await Users.updateUserEmail(id,newEmail);
    else{
        const err = new customErrors(' Please send valid values',400)
        throw (err)
    }
}
const updateUserNicknames =  async(req)=>{
    const {name,lastname,email}=req.body;
    await Users.updateUserNicknames(name,lastname,email);
}
const deleteUser = async (req)=>{
    const {id}=req.params;
    if(id) await Users.deleteUser(id);
    else {
        const err = new customErrors('Please send valid params',400)
        throw (err);
    }
    
}


module.exports = {
    createUser,
    // getAllUser,
    updateUserPassword,
    updateUserEmail,
    updateUserNicknames,
    deleteUser
}