const { verifyToken } = require("../services/auth.service");
const customErrors = require("../utils/error");
const asyncErrorHandler = require("./asyncErrorHandler");
require('dotenv').config();
const ACCES_TOKEN_SECRET = process.env.ACCES_TOKEN_SECRET;


const verifyHeaders = (authHeader)=>{
    if(!authHeader){
        const err= new customErrors('Not Authorization',401);
        throw (err);
    }
    if(authHeader.split(" ")[0] != 'Bearer'){
        const err =new customErrors('Invalid type of Token',401);
        throw(err);
    }
    return true;
}


const authHandler = asyncErrorHandler(async(req,res,next)=>{
    console.log("entro a auth handler",req.headers);


    const authHeader = req.headers.authorization
    
    verifyHeaders(authHeader);
    const token = authHeader && authHeader.split(" ")[1]
   // console.log(token,ACCES_TOKEN_SECRET);
    
    verifyToken(token,ACCES_TOKEN_SECRET,req);

    next();
})
module.exports={
    authHandler
}