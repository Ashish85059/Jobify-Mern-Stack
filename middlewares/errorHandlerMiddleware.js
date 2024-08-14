import {StatusCodes} from "http-status-codes"

const errorHandlerMiddleware=(err,req,res,next)=>{
    // console.log(err);
    console.log(err.message)
    const statusCode=err.statusCode||StatusCodes.INTERNAL_SERVER_ERROR;
    const msg=err.message||"Something went wrong"
    res.status(statusCode).json({msg})
}

export default errorHandlerMiddleware;