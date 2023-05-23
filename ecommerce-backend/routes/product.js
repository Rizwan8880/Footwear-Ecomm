const express = require("express");
const bodyparser = require("body-parser");
const fs = require("fs");
const router = express.Router();
const productmodel = require("../models/product")

router.post("/save", async (req, res) => {
    try {
        let body = req.body;
        let product = new productmodel();
        if (req.body.id != "") { product = await productmodel.findById(req.body.id) }
        product.pcid = body.pcid;
        product.name = body.name
        product.description = body.description
        product.specification = body.specification
        product.mrp = body.mrp
        product.price = body.price
        product.varieties = body.varieties
        product.instock = body.instock
        product.isactive = body.isactive
        console.log(product.isactive);
        let base64image = body.imagepath

        if (base64image != "")//is not eqval to blank
        {
            let randomname = (Math.random() + 1).toString(36).substring(7);
            base64image = base64image.replace(/^data:image\*;base64,/, "");
            product.imagepath = "products/" + randomname + ".png";
            fs.writeFile("assets/" + product.imagepath, base64image, 'base64', function (err) {
                if (err)
                    console.log("Error while saving image " + err);
            });
        }

        product.save().then((result) => {
            res.status(200).json({ status: "success", result: result })
        }, (error) => { res.status(404).json({ status: "failed to save", error: error }) })
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ msg: "something went wrong", error: error })
    }
})


router.get("/list", async (req, res) => {
    try {
        //let body = req.body;
        let pcid = req.body.pcid;
        if (pcid == "") {
            let products = await productmodel.find()
            //console.log("product",products);
            res.status(200).json({ msg: "success", result: products })

        } else {
            let product = await productmodel.find({ pcid: pcid })
            //console.log("products",product);
            res.status(200).json({ msg: "product", result: product })
        }
    } catch (error) {
        res.status(404).json({ msg: "something went wrong", error: error })
    }
})


router.get("/get", async (req, res) => {
    try {
        let id = req.body.id
        let product = await productmodel.findById(id)
        res.status(200).json({ status: "success", result: product })
    } catch (error) {
        console.log("error", error);
        res.status(404).json({ status: "failed", msg: "something went wrong" })
    }
})

router.delete("/delete", async (req, res) => {
    try {
        let id = req.body.id
        let product = await productmodel.findByIdAndDelete(id)
        res.status(200).json({ msg: "success", data: product })

    } catch (error) {
        console.log("error", error);
        res.status(404).json({ status: "failed to delete", msg: "something went wrong" })
    }
})

router.post("/savevarieties", async (req, res) => {
    try {
        let body = req.body;
        let product = new productmodel()
        product = await productmodel.findById(body.id)
        product.varieties.push(body.varieties)
        product.save().then((result) => {
            res.status(200).json({ status: "sucsess", data: result }), (err) => {
                res.status(404).json({ status: "failed to save", error: err })
            }
        })

    } catch (error) {
        console.log(("error", error));
        res.status(404).json({ msg: "something went wrong", error: error })
    }
})

router.post("/deletevarieties", async(req, res) => {
    try {
        let body = req.body;
        let product = new productmodel()
        product = await productmodel.findById(req.body.id)
        let varieties = []
        console.log("111",product);
        for (let i = 0; i < product.varieties.length; i++) {
            if (product.varieties[i].color != body.varieties.color || product.varieties[i].size != body.varieties.size)
                varieties.push(product.varieties[i])
        }
        product.varieties = varieties

        product.save().then(result => res.status(200).json({ msg: "success", data: result }),
            err => res.status(400).json({ msg: "failed to delete", error: err }))



    } catch (error) {
        console.log("error", error);
        res.status(404).json({ msg: "something went wrong", error: error })

    }
})






module.exports = router


