const express = require("express")
const bodyparser =require("body-parser")
const router = express.Router()
const productcategorymodel = require("../models/productcategory")
const fs = require("fs")

router.post("/save", async (req ,res)=>{
    try{
    let body = req.body;
    let productcategory = new productcategorymodel()

    if (req.body.id == " ")productcategory = await productcategorymodel.findById(req.body.id)

    productcategory.name = body.name;
    productcategory.srno = body.srno;
     let base64image = body.image

     if(base64image != "")//is not eqval to blank
        {
            let randomname = (Math.random() + 1).toString(36).substring(7);
            base64image = base64image.replace(/^data:image\*;base64,/, "");
            productcategory.imagepath = "productcategories/" + randomname + ".png";
            fs.writeFile("assets/" + productcategory.imagepath, base64image, 'base64', function(err){
                if(err)
                    console.log("Error while saving image " + err);
            });
        }
        productcategory.save().then(result=>{
            res.end(JSON.stringify({status:"success", data:result}));
            // res.status(200).json({msg:"success",data:result})
        }, err=>{
            res.end(JSON.stringify({status:"failed", data:err}));
        })
    }
    catch(error){
        console.log("CATCH",error);
        
        res.end(JSON.stringify({status:"failed", data:"something went wrong"}));
    }
});

router.get("/list", async (req,res)=>{
    try {
        let productcategories = await productcategorymodel.find();
        res.status(200).json({msg:"success",data:productcategories})
    } catch (error) {
        console.log("error",error);
        res.status(404).json({msg:"failed",error:error})   
    }
})



router.get("/getone", async (req,res)=>{
    try {
        let id=req.query.id
        let productcategory = await productcategorymodel.findById(id)
        res.status(200).json({msg:"success",data:productcategory})
    } catch (error) {
        console.log("error",error);
        res.status(200).json({msg:"failed",error:error})
    }
})


router.delete("/delete", async (req,res)=>{
    try {
        let id = req.query.id
        await productcategorymodel.findOneAndDelete(id)
        res.status(200).json({msg:"success",result:"deleted successfully"})
    } catch (error) {
        console.log(error);
        res.status(404).json({msg:"something went wrong",error:error})
        
    }
})
module.exports=router