// const contactDetails = require("./ContactDetails");

// let admin=User.newAdmin("Om","Rane")
// // let admin1=User.newAdmin("Om","Rane")

// let User1=admin.newUser("akshay","pawar")
// let User2=admin.newUser("calib","flex")
// // admin.deleteById(1)
// User1.createContacts("Yash","Shah")
// User1.createContacts("Shubham","Morya")

// // console.log("Before Deletion")
// User2.createContacts("Yash","Tokle")
// User2.createContacts("Yashesh","Patel")
// // console.log(User2.contacts);

// // User2.deleteContactsById(
    


// User2.createContactDetails(2,"work","9082200578")
// User2.createContactDetails(2,"gaming","9892291514")
// // console.log(User2.contacts)
// // // console.log(User2)
// // User2.deleteContactDetails(2,1)
// // console.log(User2.contacts)
// // console.log(User2.updateContactDetails(2,0,"type","College"))
// // console.log(User2.contacts);
// // console.log(User2.contacts)
// // console.log(User2.contacts)
// // console.log(User1.contacts)


const User = require("./User");
const express=require("express");
const ValidationError = require("./errors/ValidationError");
const { getAllStudent, getStudent, login, del, update, createAdmin, createUser, createContact, getContact, deleteContact, updateContact, getAllContact, createContactDetails, getAllContactDetails, deleteContactDetails, updateContactDetails, getContactDetails } = require("./controller/User");
const jwt=require('jsonwebtoken');
const cookies=require('cookie-parser')

const JWTAuthentication = require("./middleware/JWTAuthentication");
const { ErrorHandler } = require("./middleware/ErrorHandler");
const application=express()
application.use(cookies())

application.use(express.json())
const mainRouter=express.Router()
const gaurded=express.Router()
const ungaurded=express.Router()
const adminRouter=express.Router()
const  userRouter=express.Router()
application.use('/api/v1/contact-app',mainRouter)
mainRouter.use('',gaurded)
mainRouter.use('',ungaurded)
gaurded.use('/admin/user',adminRouter)
gaurded.use('/user',userRouter)

ungaurded.post('/login',login)
adminRouter.use(JWTAuthentication.isAdmin)
userRouter.use(JWTAuthentication.isUser)


const contactRouter = express.Router({mergeParams:true})
const contactDetailsRouter=express.Router({mergeParams:true})
userRouter.use('/:userId/contact',contactRouter)
userRouter.post('/',createContact)
userRouter.get('/',getAllContact)
userRouter.get('/:contactId',getContact)
userRouter.delete('/:contactId',deleteContact)
contactRouter.use('/contactDetails',contactDetailsRouter)

contactDetailsRouter.post('/',createContactDetails)

contactRouter.put('/:contactId',updateContact)
contactDetailsRouter.get('',getAllContactDetails)
contactDetailsRouter.get('/:contactDetailsId',getContactDetails)

contactDetailsRouter.delete('/:contactDetailsId',deleteContactDetails)
contactDetailsRouter.put('/:contactDetailsId',updateContactDetails)
adminRouter.post('/admin',createAdmin)
adminRouter.post('/',createUser)

adminRouter.get('/',getAllStudent)
adminRouter.get('/:id',getStudent)
adminRouter.delete('/:id',del)
adminRouter.put('/:id',update)
application.use(ErrorHandler)
application.listen(9009,()=>{
    console.log("Server Started At Port No 3000");
    User.newAdmin("Om","Rane","om","12345")
    User.newUser("Akshay","Pawar","aksh","12345")
    User.newUser("calib","flex","cal","12345")
    User.newUser("rohit","sharma","rohi","12345")

     


})