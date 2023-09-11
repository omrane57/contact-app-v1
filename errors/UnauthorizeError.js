const ContactAppError = require("./ContactAppError");
const {StatusCodes} =require( 'http-status-codes');

class UnauthorizeError extends ContactAppError{
    constructor(specificMessage){
        super("Unauthorize Access","Unauthorize Access",StatusCodes.UNAUTHORIZED,specificMessage)

    }
}


module.exports=UnauthorizeError;