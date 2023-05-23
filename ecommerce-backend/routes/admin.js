const express = require("express")
const bodyparser = require("body-parser")
const router = express.Router()
const ordermodel = require("../models/order")
const usermodel = require("../models/user")

router.post("/login",async(req,res)=>{
    let body = req.body;
    let status = "";

    if(body.username == "admin" && body.password == "admin"){
     status = "success";}
    else{
    status = "failed";}
    
    let data = {data:{status:status}};
    res.end(JSON.stringify(data));

})
 
router.get("/users",async(req,res)=>{
    try {
        let users = await usermodel.find()
        res.status(200).json({msg:"succsess",orders:users})   
        
    } catch (error) {
        res.status(404).json({msg:" failed something went wrong ",users:error})
    
    }
})


router.get("/orders",async (req, res)=>{
    try {let body = req.body
      if(body.userid == ""){let orders = await ordermodel.find()
      res.status(200).json({msg:"succsess",orders:orders})
    }else{
        let orders = await ordermodel.find({userid:body.userid})
        res.status(200).json({msg:"succsess",orders:orders})}
    
        
    } catch (error) {
        res.status(404).json({msg:" failed something went wrong ",orders:error})
    
    }

})
module.exports = router