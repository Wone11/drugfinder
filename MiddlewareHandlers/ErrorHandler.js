/**
 * Not found error handler
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const NotFound=(err,req,res,next)=>{
    const error  = new Error(`Not Found : ${req.orginalUrl}`);
    res.status(404);
    next(error);
}

/***
 * Error Handllers
 */
const ErrorHandller=(req,res,next)=>{
    const statusCode = res.statusCode==200 ? 500 :res.statusCode;
    res.status(statusCode);
    res.json({
        message:err.message,
        stack:err.stack
    })
}

module.exports ={ErrorHandller,NotFound}