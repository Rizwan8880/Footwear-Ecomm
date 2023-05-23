const userModel = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const dotenv = require("dotenv").config();
const transporter = require("../config/emailconfig.js");
const ordermodel = require("../models/order");
//dotenv.config() 

const  userRegisteration = async (req,res)=>{
console.log("one")
// console.log(req)
    const {name,email,contact,password,Confirmpassword} = req.body ;
    
    //console.log("req.body====>",req.body);
   
    const user = await  userModel.findOne({email:email})
   if(user){
    //console.log("333")

    res.send({"status":"failed","msg":"Email already exsist"})
   }else{
    //console.log("444")

    if(name &&  email && contact &&  password && Confirmpassword  ){
       // console.log("555")

        if(password === Confirmpassword){
            try {
                console.log("666")

                 const salt = await bcrypt.genSalt(10)
                 const hashPassword = await bcrypt.hash(password,salt)
                 console.log("777")

                const doc = new userModel({
                    name:name,
                    email:email,
                    contact:contact,
                    password:hashPassword,
               
                })
                //console.log("888====>",doc)

                await doc.save()
                const savedUser = await userModel.findOne({email:email});
                //console.log("savedUser=====>",savedUser);
                const token = jwt.sign({userID:savedUser._id},process.env.SECRET_KEY,{expiresIn:"5d"})
                //console.log("token====>",token);
                //console.log("env",process.env.SECRET_KEY);
                res.send({status:"sucess",msg:"Registration successfully completed",token:token})
                //console.log("999")

            } catch (error) {
                //console.log("100")

                console.log("found an err",error)
                res.send({status:"failed",msg:"Unabal to Registeration"})
                
            }

        }else {
            res.send({"status":"failed","msg":"password and confirm password dose not match"})
        }

    }else{
        res.send({"status":"failed","msg":"all fields are required"})
    }
   }

   
 }


     
const login = async(req,res)=>{try {
    const {email,password}= req.body;

    const user = await userModel.findOne({email:email})
    if(user.email != null){
        const isMatch = await bcrypt.compare(password,user.password)
        if((user.email===email) && isMatch ){
            const token = jwt.sign({id:user._id},process.env.SECRET_KEY,{expiresIn:"4d"})
       
            res.send({"status":"success","msg":"login success","token":token})

            }else{
            res.send({"status":"failed","msg":"email or password not matched"})
        }

    }else{
        res.send({"status":"failed","msg":"user not found for this email"})
    }
    
} catch (error) {
    console.log("failed to login",error)
    res.send({"status":"failed","msg":"failed to login"})
    
}

    }

const changepassword = async (req,res)=>{ 
    const {Password,PasswordConfirmation} = req.body;

    if(Password && PasswordConfirmation){
        if(Password !== PasswordConfirmation ){
            res.send({"status":"failed","msg":"Password and PasswordConfirmation not match"})
        }else{
            const salt = await bcrypt.genSalt(10)
            const newhashPassword = await bcrypt.hash(Password,salt)
            //console.log(req.user._id)
            await userModel.findByIdAndUpdate(req.user._id,{$set :{password:newhashPassword}
            })
            
            res.send({"status":"success","msg":"password changed successfully"})}

    }else{
        res.send({"status":"failed","msg":"all fields required in chng pass"})
        }   
}

const loggeduser = async (req,res)=>{
    res.send({"user":req.user})
}

console.log("logged")

const changeUserPasswordbyEmailLink = async (req,res)=>{
    const {email}= req.body
    console.log(email);
    if(email){
        
        const user = await userModel.findOne({email:email})
        console.log(user,"asdfghjk");
        if(user){
            //console.log(user)

            const secret = user._id + process.env.SECRET_KEY
           // console.log(secret);
            const token = jwt.sign({id:user._id}, secret , {expiresIn:"15m"})
            const link = `http://localhost:3000/api/user/reset/${user._id}/${token}`
            console.log(link);
            //SEND EMAIL
            const info = await transporter.sendMail({
                from:process.env.EMAIL_FROM,
                to:user.email,
                subject:"app - Password Reset Link ",
                html:`<a href=${link}>Click Here</a> to Reset Your Password `
            })
            res.send({"status":"success","message":"password resent link send to your email please check your email","info":info})

        }else{
            res.send({"status":"failed","message":"user dose not exist"})
        }

    }else{
        res.send({"status":"failed","msg":"email dose not exist please enter valid email"})
    }
} 

const resetUserPasswordbyLink = async (req,res)=>{
    console.log("asdfgh");

    const {id,secret}= req.params;
    const {password,PasswordConfirmation}=req.body

console.log(id,secret);

    const user = await userModel.findById(id)

    console.log(user,"qwert");
    
    const new_secret = user._id + process.env.SECRET_KEY

    await jwt.verify(secret,new_secret)
    console.log("1234");
    if(password && PasswordConfirmation){
        if(password === PasswordConfirmation){
            const salt = await bcrypt.genSalt(12);
            const hashPassword =await bcrypt.hash(password,salt)

            await userModel.findByIdAndUpdate(user._id,{$set:{password:hashPassword}},)

            res.send({"status":"success","msg":"password reset successfully"})

        }else{
            res.send({"status":"failed","msg":"password and PasswordConfirmation are not match"})
        }

    }else{
        res.send({"status":"failed","msg":"All fileds are required"})

    }

}

const myorders = async (req, res)=>{
    try {let body = req.body
      
        let orders = await ordermodel.find({userid:body.userid})
        res.status(200).json({msg:"succsess",orders:orders})
    
        
    } catch (error) {
        res.status(404).json({msg:" failed something went wrong ",orders:error})
    
    }

}
  
module.exports =  {userRegisteration,login,changepassword,loggeduser,changeUserPasswordbyEmailLink,resetUserPasswordbyLink,myorders}   