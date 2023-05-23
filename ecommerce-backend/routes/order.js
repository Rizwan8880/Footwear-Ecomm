const express = require("express");
const bodyparser = require("body-parser");
//const fs = require("fs");
const router = express.Router();
const ordermodel = require("../models/order")



router.post("/placeorder",async(req,res)=>{try {
    let body = req.body
    let order = new ordermodel()
    
    order.userid = body.userid
    order.orderdate = new Date()
    order.address = body.address
    order.city = body.city
    order.state = body.state
    order.pincode = body.pincode
    order.totalamount = body.totalamount
    order.shipmentammount = body.shipmentammount
    order.billammount = body.billammount
    order.status = "pending"
    order.products = body.products

    order.save().then((result)=>res.status(200).json({msg:"success",data:result})
    ,err=>res.status(404).json({msg:"failed",data:err}))
} catch (error) {
    res.status(404).json({msg:"something went wrong",error:error})
    
}
   })

   router.post("/markpaid",async(req,res)=>{
    try {
        let body = req.body;
        let order = await ordermodel.findByIdAndUpdate(
            body.id,{$set:{status:"paid"}},
            {new:true})
//send email to user for order success
//send email to admin(xyz@gmail.com) for order success
            res.status(200).json({status:"success",data:order})
    } catch (error) {
        res.status(404).json({status:"something went wrong",data:error})

    }
   })











module.exports = router