const Contact = require("./Contact");
const  { NotFound,
  UnauthorizeError,
  ValidationError} = require( './errors/Index');
const JWTAuthentication = require("./middleware/JWTAuthentication");
class User {
  static #userId = 0;
  static #allUsers=[]
  constructor(Id, firstName, lastName, isAdmin,userName,password) {
    this.userId = Id;
    this.firstName = firstName,
    this.lastName = lastName      
    this.isAdmin = isAdmin,
    this.isActive = true,
   this.contacts = [],
   this.userName=userName,
   this.password=password
  }
  static newAdmin(firstName, lastName,userName,password) {
    try{
      if (typeof firstName != "string") {
        throw new ValidationError("Invalid First Name");
      }
      if (typeof lastName != "string") {
        throw new ValidationError("Invalid Last Name");
      } 
      let newAdmin= new User(User.#userId++,firstName, lastName, true,userName,password);
      User.#allUsers.push(newAdmin)
      return newAdmin;
    }
    catch(error){
        return error
    }


    
  }
 static newUser(firstName, lastName,userName,password) {

 try{
  // if (!this.isAdmin) {
  //   return new UnauthorizeError("he is not admin ");
  // }
  if (typeof firstName != "string") {
    return new ValidationError("Invalid First Name");
  }
  if (typeof lastName != "string") {
    return new ValidationError("Invalid Last Name");
  }
  let newUser= new User(User.#userId++, firstName, lastName, false,userName,password);
   User.#allUsers.push(newUser)
  return newUser;

 }
      
  catch(error){
    return error
  }
   
 
  }
  static getAllUser(){
    return this.#allUsers
  }
  static getUserById(id){
    try{
      for(let k=0;k<User.#allUsers.length;k++){
        if(id===User.#allUsers[k].userId){
          return User.#allUsers[k]
        }
      }
      throw new NotFound("Record Not Found");
    }
    catch(error){
     throw error
    }
  
 }
 static deleteById(id){
  try {
    // if(!this.isAdmin){
    //   throw new UnauthorizeError("Write Is Not Given To User")
    // }
    if(typeof id!=='number'){
      throw new ValidationError("Id Passed is not a Number")
    }
    let persontoBeDeleted=User.getUserById(id)
    if(persontoBeDeleted==null){
      throw new NotFound("User With Input Id Is Not Found")
    }
    if(persontoBeDeleted.isActive==false){
      throw new NotFound("User is already deleted")
    }
    persontoBeDeleted.isActive=false;
    
  } catch (error) {
    return error
  }
  
 }
  #updateFirstName(newValue){
    this.firstName=newValue;
  }
  #updateLastName(newValue){
    this.lastName=newValue;
  }
static updateUser(index,parameter,newValue){

    try{
      if(typeof newValue!="string"){
        throw new ValidationError("invalid input parameter")}
    // if(!this.isAdmin){
    //    throw new UnauthorizeError("No proper Rights Given")
    // }
    let persontoBeUpdate=User.getUserById(index)
    if(persontoBeUpdate===null){
        throw new NotFound("person not found")
    }
    if(persontoBeUpdate.isActive==false){
      throw new NotFound("User is already deleted")
    }
    switch(parameter){
        case "firstName":{persontoBeUpdate.#updateFirstName(newValue);
                          break;}
        case "lastName":{persontoBeUpdate.#updateLastName(newValue);
            break;
    
        }
      default:{throw new ValidationError("Invalid Parameter")}
    }
    }catch(error){
     return error
    }
   
  }
  static getUserByUserName(userName){
    try{
      for(let k=0;k<User.#allUsers.length;k++){
        if(userName==User.#allUsers[k].userName){
          return User.#allUsers[k]
        }
      }
      throw new NotFound("Record Not Found");
    }
    catch(error){
     throw error
    }
  
 }
 static authenticateUser(userName,password){
try{
   const user=User.getUserByUserName(userName)
  
   if(user.password!==password)
{
  throw new UnauthorizeError("Incorrect Password")
}
const token=JWTAuthentication.jwtUserAuthentication(user.userId,user.userName,user.isAdmin)
return token
}
catch(error){
  throw error
}
  }
  // **********************************Contact Section******************************
  createContacts(firstName,lastName){
try {
  if(this.isAdmin){
    throw new UnauthorizeError("Admin As No Rights To Add Contacts")
  }
  let newContact=Contact.newContacts(firstName,lastName,true);
  this.contacts.push(newContact)
} catch (error) {
  return error
}
  
  }
  getAllContact(){
    return this.contacts
  }
  getContactById(id){
    try {
      for(let j=0;j<this.contacts.length;j++){
        if(id===this.contacts[j].contactId){
          return this.contacts[j]
        }
      }
      throw new NotFound("Record Not Found")
    } catch (error) {
      throw error
    }
  
  }
  deleteContactsById(id){
    try{
     
      let contactsToBeDeleted=this.getContactById(id)
      if(contactsToBeDeleted===null){
        throw new NotFound("Id Entered Is Not Present")
      }
     
     contactsToBeDeleted.deleteContact()
    }catch(error){
      return error
    }
   
  }
  updateContactById(id,parameter,newValue){
    try {
      if(typeof id !="number"){
       throw new ValidationError("Invalid Input")
      }
      let contactsToBeUpdated=this.getContactById(id)
      if(contactsToBeUpdated===null){
        throw new NotFound("Id Entered Is Not Present")
      }
   
    return contactsToBeUpdated.updateContact(parameter,newValue)
    } catch (error) {
      return error
    }
    
  }
  createContactDetails(id,type,number){
    try {
      if(this.isAdmin){
        throw new UnauthorizeError("Admin As No Rights To Add Contacts")
      }
     
      let newDetails=this.getContactById(id)
      if(newDetails===null){
        throw new NotFound("Id not found")
      }
      newDetails.createContactDetails(type,number)
      return newDetails
    } catch (error) {
      return error
    }
    
  }
  getContactDetails(id){
    try {
      let getContact=this.getContactById(id)
     
      const allContactDetails= getContact.getContactDetails()
      return allContactDetails
    } catch (error) {
      return error
    }
   
  }
  updateContactDetails(id,contactDetailsId,parameter,newValue){
    try {
      if(typeof id!="number"){
        throw new ValidationError("Invalid Id")
      }
      let toUpdateContactDetail=this.getContactById(id)
      return toUpdateContactDetail.updateContactDetailsFromContact(contactDetailsId,parameter,newValue)
    } catch (error) {
      return error
    }

  }
  deleteContactDetails(id,contactDetailsId){
    try{
    
      let toDeleteContactDetail=this.getContactById(id)
      
      return toDeleteContactDetail.deleteContactDetailsFromContact(contactDetailsId)
    }
    catch(error){
      return error
    }
    
  }
  getContactDetailsById(contactId,contactDetailsId){
    try {
      let contact=this.getContactById(contactId)
    
      const contactDetails= contact.getIdFromContact(contactDetailsId)
      return contactDetails
    } catch (error) {
      return error
    }
  }

}

module.exports=User
// // ***********************DriverCode*******************************
// let admin=User.newAdmin("Om","Rane")
// let User1=admin.newUser("akshay","pawar")
// let User2=admin.newUser("calib","flex")
// User1.createContacts("Yash","Shah")
// User1.createContacts("Shubham","Morya")
// User2.createContactDetails(2,"work","9082200578")
// User2.createContactDetails(2,"gaming","9892291514")