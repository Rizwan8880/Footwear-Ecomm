    const {Schema,model}= require("mongoose");

    let schema = new Schema({
        pcid:{type:String,required:true},
        name:{type:String,required:true},
        description:{type:String,required:true},
        specification:{type:String,required:true},
        mrp:{type:String,required:true},
        price:{type:String,required:true},
        varieties:[],
        instock:{type:String,required:true},
        isactive:{type:String,required:true},
        imagepath:{type:String},
    })

    let productmodel = model("products",schema)

    module.exports= productmodel