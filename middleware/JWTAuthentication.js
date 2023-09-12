const { json } = require('express')
const jwt=require('jsonwebtoken')
require('dotenv').config()
const UnauthorizeError = require('../errors/UnauthorizeError')
class JWTAuthentication{

    constructor(id,username,isAdmin){
        this.id=id
        this.username=username
        this.isAdmin =isAdmin 
    }
   static jwtUserAuthentication(id,username,isAdmin){
  const payload=new JWTAuthentication(id,username,isAdmin)    
  const token=jwt.sign(JSON.stringify(payload),process.env.AUTH_SECRET_KEY)
  
    return token

   }


   static verifyToken(token){

    const payload=jwt.verify(token,process.env.AUTH_SECRET_KEY)
   return payload
   }
   static isAdmin(req,res,next){
    
      const token=req.cookies[process.env.AUTH_COOKIE_NAME]
    
    
       if(!token){
        throw new UnauthorizeError("Invalid Token")
       }
       const payload=JWTAuthentication.verifyToken(token)

       if(payload.isAdmin){
        next()
       }
       else{
        res.status(500).send("UnAuthorise Access")
       }
    }
     

    static isUser(req,res,next){
        const token=req.cookies[process.env.AUTH_COOKIE_NAME]
    
    
       if(!token){
        throw new UnauthorizeError("Invalid Token")
       }
       const payload=JWTAuthentication.verifyToken(token)

       if(!payload.isAdmin){
        next()
       }
       else{
        res.status(500).send("Admin Do Not Have Right To Acces")
       }
    }
    static getId(token){
        try{
            const payload=JWTAuthentication.verifyToken(token)
            return payload.id
        }catch(error){
            throw error
        }
        

    }


}
module.exports=JWTAuthentication