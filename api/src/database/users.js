const {User} = require('../models/User');
const customErrors = require('../utils/error');




const findUserByEmail = async(email)=>{
    try {
        return await User.findOne({
            where:{
                email
            }
        })
    } catch (error) {
        console.log("database findByEmail error ",error);
        const err = new customErrors(error.message || "error database", error.statusCode);
        throw (err);
    }
    
}
const findUserById = async(id)=>{
    try {
        return await User.findByPk(id)
    } catch (error) {
        console.log("error database findUserById ",error);
        const err = new customErrors(error.message || "error database", error.statusCode);
        throw (err);
    }
}

const createUser = async (obj)=> {
    try {
       await User.create(obj)
       
    } catch (error) {
        console.log('entro a error de database createUser');
        const err = new customErrors(error.message || "error database", error.statusCode);
        throw( err)
    }      
}



////////////////////////////

// const updateNameLastname= async (name,lastname,email)=>{
//     try {
//         await User.update({
//             name,
//             lastname
//         },{
//             where:{
//                 email
//             }
//         });
//         return true;
//     } catch (error) {
//         console.log('error database upddateNameLastname');
//         const err = new customErrors(error.message || "error database", error.statusCode);
//         throw( err)
//     }
         
// }
// const updateLastname= async (lastname,email)=>{
//     try {
//         await User.update({
//             lastname
//         },{
//             where:{
//                 email
//             }
//         });
//         return true;
//     } catch (error) {
//         console.log('error database upddateLastname');
//         const err = new customErrors(error.message || "error database", error.statusCode);
//         throw( err)
//     }
         
// }
// const updateName= async (name,email)=>{
//     try {
//         await User.update({
//             name
//         },{
//             where:{
//                 email
//             }
//         });
//         return true;
//     } catch (error) {
//         console.log('error database upddateLastname');
//         const err = new customErrors(error.message || "error database", error.statusCode);
//         throw( err)
//     }
         
// }
const updateUserNicknames = async (obj)=> {
    try {
        await User.update(obj,{
            where:{
                email:obj.email
            }
        })
       
    } catch (error) {
        console.log("entro a error de database");
        throw (error)
    }
}

 ////////////////////

const updateUserPassword = async (password,email)=> {
    try {
        
        await User.update({
            password
        },{
            where:{
                email
            }
        })
        return true;
} catch (error) {
        console.log("entro a error de database");
       throw (error);
    }
} 

const updateUserEmail = async (id,newEmail)=> {
    try {
        await User.update({
           email:newEmail
        },{
            where:{
                id
            }
        });
        return true;
    } catch (error) {
        console.log("entro error database updateUserEMail ", error);
        const err = new customErrors(error.message || "error database", error.statusCode);
        throw (err);
    }
}


const deleteUser = async (id,email) =>{
    try {
            
            await User.destroy({
                where:{
                    id,
                    email
                }
            })
            return true;
    } catch (error) {
        console.log("entro error database deleteUser ", error);
        const err = new customErrors(error.message || "error database", error.statusCode);
        throw (err);
    }
}


module.exports={
    createUser,
    updateUserPassword,
    updateUserEmail,
    //updateNameLastname,
    deleteUser,
    findUserByEmail,
    findUserById,
   // updateLastname,
    //updateName,
    updateUserNicknames
}

