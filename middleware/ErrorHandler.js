const ContactAppError = require("../errors/ContactAppError");

const ErrorHandler=(error,req,res,next)=>{
console.log(error);
if(error instanceof ContactAppError){
    
    res.status(error.statusCode).send(error)
    return
}
res.status(500).send("Internal Server Error")
}
module.exports={ErrorHandler}