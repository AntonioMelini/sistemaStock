const {User} = require('../models/User');
const bcrypt = require('bcrypt');
const customErrors = require('../utils/error');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');

const hashingPassword =async (password)=>{
    return await bcrypt.hash(password,10)
    
}
    
const createUser = async (obj)=> {
    try {
       const isAlreadyCreated = await User.findOne({
           where:{
               email:obj.email
           }
       })
       if(!isAlreadyCreated){
           await  User.create(obj)
           return true
       }else{
           const err = new customErrors('User email already in use',400);
          throw (err)
       }
    } catch (error) {
        console.log('entro a error de database');
        throw( error)
       
    }   
   
       
    
}


// const getAllUser = async ()=> {
//     try {
      
//         const usuariosDB = await User.findAll({
//             attributes:{exclude:['password']}
//         })
        
//         return usuariosDB
//     } catch (error) {
//         res.send({error: error.message})
//     }
// }

////////////////////////////

const updateOpcion= async (name,lastname,email)=>{
   
    if(email && name || lastname){
        console.log("TIENE EMAIL");
     if(name && lastname){
       
         const user = await User.findOne({
             where:{
                 email
             }
         });
         user.name=name;
         user.lastname=lastname;
         await user.save();
         return true;
     }else if( !name && lastname){
        
         const user = await  User.findOne({
             where:{
                 email
             }
         });
         user.lastname=lastname;
         await user.save();
         return true;
     }else{
       
         const user = await User.findOne({
             where:{
                 email
             }
         });
         user.name=name;
         await user.save();
     }
    } else{
        const err = new customErrors('please send valid params',400)
        throw (err)
    }
}
 ////////////////////

const updateUserPassword = async (password,email)=> {
    try {
        
          const user=  await User.findOne({
                where:{
                    email:email
                }
            })
            console.log(user)
            if(user){
                user.password = await hashingPassword(password);
        
                await user.save();
                return true;
            }else{
                const err = new customErrors('Please send  email valid',400)
                throw (err);
            }
       
        
        
    } catch (error) {
        console.log("entro a error de database");
       throw (error);
    }
} 
const updateUserEmail = async (id,newEmail)=> {
    try {
       
       
            const user = await User.findByPk(id)
            const mustBeEmpty = await User.findOne({
                where:{
                    email:newEmail
                }
            })
           
        if(!mustBeEmpty && user ){
            user.email= newEmail;
            await user.save();
        }else{
            const err= new customErrors('Email already in use',400)
            throw (err)
        }
        
        
    } catch (error) {
       throw (error)
    }
}
const updateUserNicknames = async (name,lastname,email)=> {
    try {
     
        await updateOpcion(name,lastname,email);
       
    } catch (error) {
        console.log("entro a error de database");
        throw (error)
    }
}


const deleteUser = async (id) =>{
    try {
            const user = await User.findByPk(id);
            if(!user){
                const err = new customErrors('Invalid id',400);
                throw(err);
            }
            await user.destroy();
        
    } catch (error) {
        console.log("error database");
        throw (error);
    }
}
module.exports={
    createUser,
    // getAllUser,
    updateUserPassword,
    updateUserEmail,
    updateUserNicknames,
    deleteUser

}

