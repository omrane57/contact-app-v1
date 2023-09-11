class ContactAppError extends Error{
    constructor(message,name,statusCode,specificName)
    {
        super(message)
        this.name=name;
        this.statusCode=statusCode,
        this.specificName=specificName
    }

}
module.exports=ContactAppError;