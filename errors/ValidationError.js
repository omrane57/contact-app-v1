const ContactAppError = require("./ContactAppError");
const {StatusCodes} =require( 'http-status-codes');

class ValidationError extends ContactAppError{
    constructor(specificMessage){
        super("Invalid Parameter","Invalid Parameter",StatusCodes.BAD_REQUEST,specificMessage)

    }
}


module.exports=ValidationError;