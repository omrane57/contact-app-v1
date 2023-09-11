const contactDetails = require("./ContactDetails");
const { NotFound,
  UnauthorizeError,
  ValidationError}=require('./errors/Index.js')
class Contact{
    static Id=0
    constructor(firstName,lastName,isActive,contactDetails){
       this.contactId=Contact.Id++,
       this.firstName=firstName,
       this.lastName=lastName,
       this.isActive=isActive,
       this.contactDetails=[]
    
    }
   static newContacts(firstName,lastName){
    try {
      if(typeof firstName!="string"){
        return new ValidationError("Invalid FirstName")
      }
      if(typeof lastName!="string"){
        return new ValidationError("Invalid LastName")
      }
      let newContact=new Contact(firstName,lastName,true);
     
      return newContact;
      
    } catch (error) {
      throw error
    }
        
      }
  deleteContact(){
    this.isActive=false;
   }
   updateContactsFirstName(newValue){
    this.firstName=newValue
   }
   updateContactsLastName(newValue){
    this.lastName=newValue
   }
   updateContact(parameter,newValue){
    switch(parameter){
        case "firstName":{this.updateContactsFirstName(newValue)
                           break;}
        case "lastName":{this.updateContactsLastName(newValue)
        break;}
        default:throw new ValidationError("Invalid Parameter")
    
    
    

    }
   
   }
   
   createContactDetails(type,number){
    let newContactDetails=contactDetails.newContactDetails(type,number)
    
    this.contactDetails.push(newContactDetails)
    return newContactDetails;
  }
  getIdFromContact(contactDetailsid){
  try {
    if(typeof contactDetailsid !="number"){
      return new ValidationError("Invalid Contact Details Id")
     }
     for(let index=0;index<this.contactDetails.length;index++){
      if(contactDetailsid==this.contactDetails[index].contactDetailsId){

        return this.contactDetails[index]
      }
     }
     return null
  } catch (error) {
   throw error
  }
  
  }
  updateContactDetailsFromContact(contactDetailsid,parameter,newValue){
    let updateFromContact=this.getIdFromContact(contactDetailsid)
       updateFromContact.updateContactDetails(parameter,newValue)
    
  }
  getIndex(contactDetailsId){
    try {
      if(typeof contactDetailsId !="number"){
        return new ValidationError("Invalid Contact Details Id")
       }
       for(let index=0;index<this.contactDetails.length;index++){
        if(contactDetailsId==this.contactDetails[index].contactDetailsId){

          return index
        }
       }
      throw new NotFound("Record Not found")
    } catch (error) {
      throw error
    }
    
  }
  getContactDetails(){
    try {
      //  for(let index=0;index<this.contactDetails.length;index++){
      //   if(contactDetailsId==this.contactDetails[index].contactDetailsId){
      //     return this.contactDetails
      //   }
      //  }
       return this.contactDetails
    } catch (error) {
      throw error
    }
    
  }
  deleteContactDetailsFromContact(contactDetailsId){
    try {
      
      const index=this.getIndex(contactDetailsId)

      if(index==null){
        return new NotFound("Record Not Found")
      }
      
      this.contactDetails.splice(index,1)
    } catch (error) {
      throw error
    }
   
  }
}
module.exports=Contact;