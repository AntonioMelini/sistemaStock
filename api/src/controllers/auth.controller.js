const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const authService = require('../services/auth.service');



const logIn = asyncErrorHandler(async(req,res)=>{
    console.log("<< entro a log in >>");
   const JWT=await authService.logIn(req);
//    res.cookie("jwt", JWT,{
//         httpOnly: true,
//    })
    res.cookie("jwt",JWT.refreshToken,{
        maxAge:1000*60*60*24*7,
        httpOnly:true,
        //secure:true,
        sameSite:'lax'    
    })
   res.status(200).json({status:'ok', token:JWT.token})
})

const logOut = (req,res)=>{
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204);
    res.clearCookie('jwt');
    res.status(200).json({status:'ok' , data:'Cookie cleared'})
}
const refresh = asyncErrorHandler(async(req,res)=>{
    console.log("<< entro a refresh >>");
    const token=await authService.refreshToken(req);
    res.status(200).json({status:'ok', data:token})
})

module.exports={
    logIn,
    logOut,
    refresh
}