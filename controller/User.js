
const User = require("../User");
const {ValidationError,UnauthorizeError} = require("../errors/Index.js");
const cookie=require('cookie-parser');
const JWTAuthentication = require("../middleware/JWTAuthentication");
const getAllStudent=(req,res)=>{
     try{

     
        let allUsers=User.getAllUser()
        res.status(200).send(allUsers)
     }
     catch(error){
        next(error)
     }

}
const getStudent=(req,res)=>{
        try{
            let id=req.params.id
            let newId=Number(id)
            if(isNaN(newId)){
                throw new ValidationError("Invalid Parameter")
            }
             res.status(200).send(User.getUserById(newId))
        }
        catch(error){
            next(error)
        }
}
const login=(req,res,next)=>{
    try{ 
       
    
        const {userName,password}=req.body
        if(typeof userName !="string"||typeof userName !="string"){
            throw new ValidationError("Invalid Parameter")
        }
        const token=User.authenticateUser(userName,password)
    
        res.cookie("auth",token)
        res.status(200).send("Login Done")

    
    }
    catch(error){
        next(error)
    }

}
const del=(req,res,next)=>{
   try{
     const {id}=req.params
     const newId=Number(id)
     if(isNaN(newId)){
        throw new ValidationError("Invalid Id")
     }
    User.deleteById(newId)
    res.status(200).send("User Deleted SuccesFully")
   }
   catch(error){
    next(error)

   }
}
const update=(req,res,next)=>{
    try{
        const {id}=req.params
    const {parameter,newValue}=req.body
     const newId=Number(id)
     if(isNaN(newId)){
        throw new ValidationError("Invalid Id")
     } 
     if(typeof parameter!="string"){
        throw new ValidationError("Invalid parameter")
     }
    if(typeof newValue !="string"){
        throw new ValidationError("Invalid newValue")
    }
    User.updateUser(newId,parameter,newValue)
    res.status(200).send("User Updated Successfully")
    }catch(error){
        next(error)

    }
    
}
const createAdmin=(req,res,next)=>{
    try {
        const {firstName, lastName,userName,password}=req.body
        if(typeof firstName!="string"){
           throw new ValidationError("Invalid FirstName")
        }
        if(typeof lastName!="string"){
           throw new ValidationError("Invalid LastName")
        }
        if(typeof userName!="string"){
           throw new ValidationError("Invalid UserName")
        }
        if(typeof password!="string"){
           throw new ValidationError("Invalid Password")
        }
       User.newAdmin(firstName, lastName,userName,password)
       res.status(200).send("Admin Created Succesfully")
              
    } catch (error) {
        next(error)
        
    }
 
}
const createUser=(req,res,next)=>{
    try {
        const {firstName, lastName,userName,password}=req.body
        if(typeof firstName!="string"){
           throw new ValidationError("Invalid FirstName")
        }
        if(typeof lastName!="string"){
           throw new ValidationError("Invalid LastName")
        }
        if(typeof userName!="string"){
           throw new ValidationError("Invalid UserName")
        }
        if(typeof password!="string"){
           throw new ValidationError("Invalid Password")
        }
       User.newUser(firstName, lastName,userName,password)
       res.status(200).send("User Created Succesfully")
       
            
    } catch (error) {
        next(error)        
    }
   }
const createContact=(req,res,next)=>{
    try{
        const token=req.cookies.auth
        const loggedIdUserId=JWTAuthentication.getId(token)
        const {userId}=req.params
        const {firstName,lastName}=req.body
        const newUserId=Number(userId)
        if(newUserId!==loggedIdUserId){
            throw new UnauthorizeError("You Cannot Create Other Users Contacts")
        }
        if(isNaN(newUserId)){
            throw new ValidationError("Invalid Parameter")
        }
        if(typeof firstName !="string"||typeof lastName!="string"){
            throw new ValidationError("Invalid Parameter")
        }
        const user=User.getUserById(newUserId)
    
        user.createContacts(firstName,lastName)
        res.status(200).send("Contact Created")
    }
    catch(error){
        // console.log(error)
        next(error)
    }
  
}
const getAllContact=(req,res,next)=>{
    try{
        const token=req.cookies.auth
        const loggedIdUserId=JWTAuthentication.getId(token)
        const {userId}=req.params

        const newUserId=Number(userId)
        if(newUserId!==loggedIdUserId){
            throw new UnauthorizeError("You Cannot Read Other Users Contacts")
        }
        if(isNaN(newUserId)){
            throw new ValidationError("Invalid Parameter")
        }
      
        const user=User.getUserById(newUserId)
    
        const contact=user.getAllContact()
        res.status(200).send(contact)
    }
    catch(error){
        // console.log(error)
        next(error)
    }
  
}
const deleteContact=(req,res,next)=>{
    try{
        const token=req.cookies.auth
        const loggedIdUserId=JWTAuthentication.getId(token)
        const {userId,contactId}=req.params
        const newUserId=Number(userId)
        const newContactId=Number(contactId)
        if(newUserId!==loggedIdUserId){
            throw new UnauthorizeError("You Cannot Read Other Users Contacts")
        }
        if(isNaN(newUserId)||isNaN(newContactId)){
            throw new ValidationError("Invalid Parameter")
        }
      
        const user=User.getUserById(newUserId)
    
        const contact=user.deleteContactsById(newContactId)
        res.status(200).send("Contact Has Been Deleted Successfully")
    }
    catch(error){
        // console.log(error)
        next(error)
    }
  
}
const getContact=(req,res,next)=>{

    try{
        const token=req.cookies.auth
        const loggedIdUserId=JWTAuthentication.getId(token)
        const {userId,contactId}=req.params
        const newUserId=Number(userId)
        const newContactId=Number(contactId)
        if(newUserId!==loggedIdUserId){
            throw new UnauthorizeError("You Cannot Read Other Users Contacts")
        }
        if(isNaN(newUserId)){
            throw new ValidationError("Invalid Parameter")
        }
      
        const user=User.getUserById(newUserId)
    
        const contact=user.getContactById(newContactId)
        res.status(200).send(contact)
    }
    catch(error){
        // console.log(error)
        next(error)
    }

}
const updateContact=(req,res,next)=>{
    try{
        const token=req.cookies.auth
        const loggedIdUserId=JWTAuthentication.getId(token)
        const {parameter,newValue}=req.body
        console.log(parameter,newValue)
        const {userId,contactId}=req.params
        const newUserId=Number(userId)
        const newContactId=Number(contactId)
        if(newUserId!==loggedIdUserId){
            throw new UnauthorizeError("You Cannot Read Other Users Contacts")
        }
        if(isNaN(newUserId)||isNaN(newContactId)){
            throw new ValidationError("Invalid Parameter")
        }
        if(typeof parameter!="string"||typeof newValue!="string"){
            throw new ValidationError("Invalid Parameter")
        }
        const user=User.getUserById(newUserId)
    
        user.updateContactById(newContactId,parameter,newValue)
        res.status(200).send("Contact Has Been updated Successfully")
    }
    catch(error){
        // console.log(error)
        next(error)
    }
  
}
const createContactDetails=(req,res,next)=>{
    try{
        const token=req.cookies.auth
        const loggedIdUserId=JWTAuthentication.getId(token)
        const {userId,contactId}=req.params
        const {type,number}=req.body
        const newUserId=Number(userId)
        const newContactId=Number(contactId)

        if(newUserId!==loggedIdUserId){
            throw new UnauthorizeError("You Cannot Create Other Users Contacts")
        }
        if(isNaN(newUserId)||isNaN(newContactId)){
            throw new ValidationError("Invalid Parameter")
        }
        if(typeof type !="string"||typeof number!="string"){
            throw new ValidationError("Invalid Parameter")
        }
        const user=User.getUserById(newUserId)
    
        user.createContactDetails(newContactId,type,number)
        res.status(200).send("Contact Details Created Successfully")
    }
    catch(error){
    
        next(error)
    }
  
}
const getAllContactDetails=(req,res,next)=>{
    try{
        const token=req.cookies.auth
        const loggedIdUserId=JWTAuthentication.getId(token)
        const {userId,contactId}=req.params

        const newUserId=Number(userId)
        const newContactId=Number(contactId)

        if(newUserId!==loggedIdUserId){
            throw new UnauthorizeError("You Cannot Read Other Users Contacts")
        }
        if(isNaN(newUserId)||isNaN(newContactId)){
            throw new ValidationError("Invalid Parameter")
        }
      
        const user=User.getUserById(newUserId)
    
        const contactDetails=user.getContactDetails(newContactId)
        res.status(200).send(contactDetails)
    }
    catch(error){
        // console.log(error)
        next(error)
    }
  
}
const deleteContactDetails=(req,res,next)=>{
    try{
        const token=req.cookies.auth
        const loggedIdUserId=JWTAuthentication.getId(token)
        const {userId,contactId,contactDetailsId}=req.params
        const newUserId=Number(userId)
        const newContactId=Number(contactId)
        const newContactDetailsId=Number(contactDetailsId)


        if(newUserId!==loggedIdUserId){
            throw new UnauthorizeError("You Cannot Read Other Users Contacts")
        }
        if(isNaN(newUserId)||isNaN(newContactId)||isNaN(newContactDetailsId)){
            throw new ValidationError("Invalid Parameter")
        }
      
        const user=User.getUserById(newUserId)
    
        user.deleteContactDetails(newContactId,newContactDetailsId)
        res.status(200).send("Contact Details Has Been Deleted Successfully")
    }
    catch(error){
        // console.log(error)
        next(error)
    }}
    const updateContactDetails=(req,res,next)=>{
        try{
            const token=req.cookies.auth
            const loggedIdUserId=JWTAuthentication.getId(token)
            const {parameter,newValue}=req.body
            console.log(parameter,newValue)
            const {userId,contactId,contactDetailsId}=req.params
            const newUserId=Number(userId)
            const newContactId=Number(contactId)
            const newContactDetailsId=Number(contactDetailsId)
            if(newUserId!==loggedIdUserId){
                throw new UnauthorizeError("You Cannot Read Other Users Contacts")
            }
            if(isNaN(newUserId)||isNaN(newContactId)||isNaN(newContactDetailsId)){
                throw new ValidationError("Invalid Parameter")
            }
            if(typeof parameter!="string"||typeof newValue!="string"){
                throw new ValidationError("Invalid Parameter")
            }
            const user=User.getUserById(newUserId)
        
            user.updateContactDetails(newContactId,newContactDetailsId,parameter,newValue)
            res.status(200).send("Contact Details Has Been updated Successfully")
        }
        catch(error){
            // console.log(error)
            next(error)
        }
      
    }
    const getContactDetails=(req,res,next)=>{
        try{
            const token=req.cookies.auth
            const loggedIdUserId=JWTAuthentication.getId(token)
            const {userId,contactId,contactDetailsId}=req.params
            const newUserId=Number(userId)
            const newContactId=Number(contactId)
            const newContactDetailsId=Number(contactDetailsId)

            

            if(newUserId!==loggedIdUserId){
                throw new UnauthorizeError("You Cannot Read Other Users Contacts")
            }
            if(isNaN(newUserId)||isNaN(newContactId)||isNaN(newContactDetailsId)){
                throw new ValidationError("Invalid Parameter")
            }
          
            const user=User.getUserById(newUserId)
        
            const contactDetails=user.getContactDetailsById(newContactId,newContactDetailsId)
            res.status(200).send(contactDetails)
        }
        catch(error){
            // console.log(error)
            next(error)

        }
      
    }  


module.exports={getAllStudent,getStudent,login,del,update,createAdmin,createUser,createContact,getContact,getAllContact,deleteContact,updateContact,createContactDetails,getAllContactDetails,getContactDetails,deleteContactDetails,updateContactDetails}