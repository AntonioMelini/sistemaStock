const {User} = require('../models/User');
const bcrypt = require('bcrypt');


const isCompleteThePost= (obj)=>{
    if(obj.name && obj.lastname && obj.email && obj.password) return true
    else throw new Error ('Invalid Post')
}

const hashingPassword =async (password)=>{
    return await bcrypt.hash(password,10)
    
    }
    /////////////////////////////
    
const createUser = async (req)=> {
    try {
        console.log("       aa   ",req.body);
         const obj = req.body;
        isCompleteThePost(obj);
        obj.password= await hashingPassword(obj.password)
        console.log(obj.password);
        const isAlreadyCreated = await User.findOne({
            where:{
                email:obj.email
            }
        })
        if(!isAlreadyCreated){
            await  User.create(obj)
            return true
        }else{
            throw new Error('User already in use')
        }
     
    } catch (error) {
        throw new Error(error.message);
    }
}

/////////////////////////////

const getAllUser = async ()=> {
    try {
      
        const usuariosDB = await User.findAll({
            attributes:{exclude:['password']}
        })
        
        return usuariosDB
    } catch (error) {
        res.send({error: error.message})
    }
}

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
     throw new Error('please send valid params')
    }
}
 ////////////////////

const updateUserPassword = async (req)=> {
    try {
        const {password,email} = req.body;
        
        if(password && email){
          const user=  await User.findOne({
                where:{
                    email:email
                }
            })
            console.log(user)
        user.password = await hashingPassword(password);
        
        await user.save();
        return true;
        }else{
             new Error('Please send password and email valid')
        }
        
    } catch (error) {
       throw new Error(error.message)
    }
} 
const updateUserEmail = async (req)=> {
    try {
        const {id}= req.params
        const {newEmail} = req.body;
        if( id && newEmail){
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
            throw new Error('Email already in use')
        }
        }else{
            throw new Error('PLease send old email and new email')
        }
        
    } catch (error) {
       throw new Error(error.message)
    }
}
const updateUserNicknames = async (req)=> {
    try {
        const {name,lastname,email}=req.body;
        await updateOpcion(name,lastname,email);
       
    } catch (error) {
        throw new Error(error.message);
    }
}


const deleteUser = async (req) =>{
    try {
        const {id}=req.params;
        if(id){
            const user = await User.findByPk(id);
            if(!user){
                throw new Error('Invalid id');
            }
            await user.destroy();
        }
    } catch (error) {
        throw new Error(error.message);
    }
}
module.exports={
    createUser,
    getAllUser,
    updateUserPassword,
    updateUserEmail,
    updateUserNicknames,
    deleteUser

}

