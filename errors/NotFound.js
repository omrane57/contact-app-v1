const ContactAppError = require("./ContactAppError");

const {StatusCodes} =require( 'http-status-codes');

class NotFound extends ContactAppError{
    constructor(specificMessage){
        super("Not Found","Not Found",StatusCodes.NOT_FOUND,specificMessage)
    }
}


module.exports=NotFound;