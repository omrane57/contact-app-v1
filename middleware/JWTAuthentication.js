const { json } = require('express')
const jwt=require('jsonwebtoken')

const UnauthorizeError = require('../errors/UnauthorizeError')
class JWTAuthentication{
    static key="RandomKey1234"
    constructor(id,username,isAdmin){
        this.id=id
        this.username=username
        this.isAdmin =isAdmin 
    }
   static jwtUserAuthentication(id,username,isAdmin){
  const payload=new JWTAuthentication(id,username,isAdmin)    
  const token=jwt.sign(JSON.stringify(payload),JWTAuthentication.key)
  
    return token

   }


   static verifyToken(token){

    const payload=jwt.verify(token,JWTAuthentication.key)
   return payload
   }
   static isAdmin(req,res,next){
    
      const token=req.cookies.auth
    
    
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
        const token=req.cookies.auth
    
    
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