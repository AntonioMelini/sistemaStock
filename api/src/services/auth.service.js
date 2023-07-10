const JWT = require('jsonwebtoken');
require('dotenv').config();
const {ACCES_TOKEN_SECRET,REFRESH_TOKEN_SECRET}= process.env
const userDatabase = require('../database/users');
const customErrors = require('../utils/error');
const bcrypt = require('bcrypt');
const tokenDatabase = require('../database/tokens');


const comparePassword = async(password,hashPassword)=>{
    try {
        return await bcrypt.compare(password,hashPassword);
    } catch (error) {
        const err = new customErrors(error.message||error,400);
        throw (err)
    }
}

const verifyUser = async(email,password)=>{
    try {
        if(!email || !password){
            const err = new customErrors('Missing Params',400);
            throw(err);
        }
        const user= await userDatabase.findUserByEmail(email);
        //console.log(user);
        if(!user ){
            const err = new customErrors('Invalid email',401);
            throw (err);
        }
        const passwordVerify=await comparePassword(password,user.password);
        if(!passwordVerify){
            const err = new customErrors('Invalid Password',401);
            throw (err);
        }
        return user;
    } catch (error) {
        const err = new customErrors(error.message||error,400);
        throw (err)
    }
}

const tokenSign = (user)=>{
    
    try {
        const sign =  JWT.sign({
            id:user.id
        },
        ACCES_TOKEN_SECRET,
        {
            //expiresIn: 60, audience: '12345677'
            expiresIn: '1m'
        })
        console.log("entro a token sign");
        return sign
    } catch (error) {
        console.log(error);
        const err = new customErrors(error.message|| 'token sign error',400)
        throw(err)
    }
    
}
const verifyToken = (tokenJWT,SECRET,req)=>{
    try {
        console.log('entro a verify token',tokenJWT,SECRET);
        if(!tokenJWT){
            const err= new customErrors('Unauthorized',401);
            throw (err);
        }
        JWT.verify(
            tokenJWT,
            SECRET
        );
        console.log("esto es el decode " ,JWT.decode(tokenJWT));
        req.userId = JWT.decode(tokenJWT).id;

        return true;
        
    } catch (error) {
        if(error.message === 'jwt expired'){
            const err = new customErrors('Forbidden',403);
            throw (err);
        }
        throw(error)
    }
}

const logIn = async(req)=>{
    try {
        const{email,password}=req.body;

        const user = await verifyUser(email,password);
        
        let obj ={};
        console.log("ahi viene el token sign",user);
        obj.token =  tokenSign(user);
        console.log('salio de token sign y entro a refersh token', obj.token);
        obj.refreshToken = JWT.sign({id:user.id}, REFRESH_TOKEN_SECRET,{expiresIn:'1d'});
        console.log('termino refresh token', obj.refreshToken);
        await tokenDatabase.create(obj.refreshToken);
        return obj;

    } catch (error) {
        throw(error)
    }
}

const refreshToken = async(req)=>{
    try {
        const cookie = req.cookies
        if(!cookie.jwt){
            const err = new customErrors('Unauthorized',401);
            throw (err);
        }
        const refreshToken = cookie.jwt;
        JWT.verify(refreshToken,REFRESH_TOKEN_SECRET);
        const {id}= JWT.decode(refreshToken);
        return tokenSign(id)
        //console.log(a);
        

    } catch (error) {
        throw(error);
    }
}


module.exports={
    tokenSign,
    verifyToken,
    logIn,
    refreshToken
}



