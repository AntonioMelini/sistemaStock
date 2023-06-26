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
        throw (err);
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
       const isAlreadyCreated = await Users.findUserByEmail(obj.email);
       if(!isAlreadyCreated){
        obj.password= await hashingPassword(obj.password);
        await  Users.createUser(obj)
        return true
    }else{
        const err = new customErrors('User email already in use',400);
       throw (err)
    }
       
    } catch (error) {
        console.log("entroa  error de service " , error);
        throw (error);
    }
}
// const getAllUser =  ()=>{
//     const allUsers = Users.getAllUser();
//     return allUsers;
// }
const updateUserPassword =  async(req)=>{
    try {
        const {password,email} = req.body;
    if(!password || !email){
        const err = new customErrors('Please send password and email valid',400)
        throw (err);
    }
    const user = await Users.findUserByEmail(email);
    if(user){
        const hashPassword= await hashingPassword(password);
        await Users.updateUserPassword(hashPassword,email);
        return true;
    }else{
        const err = new customErrors('Please send  email valid',400)
        throw (err);
    }
    } catch (error) {
        console.log("entro a sevice error ", error);
        throw (error)
    }
    
    
}
const updateUserEmail =  async(req)=>{
    try {
        const {id}= req.params
        const {newEmail} = req.body;
        if(!id && !newEmail) {
            const err = new customErrors(' Please send valid values',400)
            throw (err)
        }
        const user = await Users.findUserById(id);
        if(!user){
            const err = new customErrors('User not found',400)
            throw (err)
        }
        const emailInUse = await Users.findUserByEmail(newEmail);
        if(!emailInUse){
            await Users.updateUserEmail(id,newEmail);
            return true;
        }else{
            const err = new customErrors(' Email already in use',400)
            throw (err)
        }
    } catch (error) {
        console.log('entro a error service ', error);
        throw (error)
    }
    
}
const updateUserNicknames =  async(req)=>{
    try {    
        const obj = req.body;
        if(obj.email && obj.name || obj.lastname){
            await Users.updateUserNicknames(obj)
            return true;
        } else{
            const err = new customErrors('please send valid params',400)
            throw (err)
        }
    } catch (error) {
        throw (error)
    }
   


}
const deleteUser = async (req)=>{
    try {
        const {id}=req.params;
        const {email}=req.body;
        if(!id || !email){
            const err = new customErrors('Please send valid params',400)
            throw (err);
        }
        const userId = await Users.findUserById(id);
        const userEmail = await Users.findUserByEmail(email);
        console.log(userId,"  a   ",userEmail);
        if(!userId || !userEmail || userId.dataValues.id!==userEmail.dataValues.id || userEmail.dataValues.email !== userId.dataValues.email){
            const err = new customErrors('Cant find user',400);
            throw (err);
        }

    // ACCION PARA ELIMINAR SUS PRODUCTOS   

        await Users.deleteUser(id,email);
        return true;
    } catch (error) {
        throw(error);
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