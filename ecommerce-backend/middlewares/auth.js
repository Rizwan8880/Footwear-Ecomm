const express = require("express")
const jwt = require("jsonwebtoken")
const userModel = require("../models/user")

const checkUserAuth = async(req,res,next)=>{
    
    const {authorization} = req.headers

    if(authorization && authorization.startsWith(`Bearer`)){ try {
        
        let token = authorization.split(` `)[1]
        //verify token
        const {id} = jwt.verify(token,process.env.SECRET_KEY)
        // get user from token
         req.user = await userModel.findById(id).select("-password")

         next()
    }
catch (error) {
    console.log("error",error)
    res.status(401).send({"status":"failed","msg":"unauthorized user","token":"No token ",})
}
}else{
    res.send({"status":"failed","msg":"all fields are required in auth",})   

}}

module.exports= checkUserAuth

// $2b$12$kzdcHIATmkACk5eLvCghee2nbhDov1URwtwvmsSZ7RkiZQ.MzXQpO
// $2b$12$yaboCQXBWnt/PFXXBQoXPeWIznnzMS1vqy1QB8O8WTcucKu3sZi2m