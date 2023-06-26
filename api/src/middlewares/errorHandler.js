module.exports = (error,req,res,next)=>{
    console.log("entro a errorhandler PORFAVOR HACE ALGO!!!!!!1" );
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';

    return res.status(error.statusCode).json({
        status: error.status,
        message: error.message
    });
}

