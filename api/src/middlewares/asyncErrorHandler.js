module.exports = (func)=>{

    return (req,res,next)=>{
        console.log("entro a asyncErrorHandler vamo lo pibe ");
        func(req,res,next).catch(err => next(err))
    }
    
}

