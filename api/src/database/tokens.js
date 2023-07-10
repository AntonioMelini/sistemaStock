const { Token } = require("../models/Tokens");
const customErrors = require("../utils/error");



const create = async(jwt)=>{
    console.log("entro a database",jwt);
    try {
        await Token.create({jwt});
        return true;
    } catch (error) {
        console.log(error);
        const err = new customErrors(error.errors[0].message,400);
        throw(err);
    }
}
const findOne = async(jwt)=>{
    try {
        return await Token.findOne({
            where:{
                jwt
            }
        })
    } catch (error) {
        console.log(error);
        const err = new customErrors(error.message);
        throw(err);
    }
}

module.exports={
    findOne,
    create,

}