const { NotFound,
  UnauthorizeError,
  ValidationError}=require('./errors/Index.js')
class contactDetails{
    static id=0;
    constructor(Id,type,number){
        this.contactDetailsId=Id,
        this.type=type,
        this.number=number
    }
   static newContactDetails(type,number){
    try {
      if(typeof type!="string"){
        return new ValidationError("Invalid type")
      }
      if(typeof number!="string"||number.length!=10){
        return new ValidationError("Invalid number")
      }
      let newContactDetails=new contactDetails(contactDetails.id++,type,number)
      return newContactDetails;
      
    } catch (error) {
      throw error
    }
   
   }
   updateType(newValue){
    this.type=newValue;
   }
   updateNumber(newValue){
    this.number=newValue;
   }
   updateContactDetails(parameter,newValue){
    try {
      if(typeof newValue!="string"){
        return new ValidationError("Invalid Input")
      }
      switch(parameter){
        case "type":{this.updateType(newValue)
          break;
        }
        case "number":{this.updateNumber(newValue)
          break;
        }
      }
      
    } catch (error) {
      throw error
    }
    
   }
  

}
module.exports=contactDetails