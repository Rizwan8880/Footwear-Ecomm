const {Schema,model}= require("mongoose");

let schema = new Schema({
    userid:{type:String,required:true},
   orderdate:{type:Date,required:true},
    address:{type:String,required:true},
    city:{type:String,required:true},
    state:{type:String,required:true},
    pincode:{type:Number,required:true},
    totalamount:{type:Number,required:true},
    shipmentammount:{type:Number,required:true},
    billammount:{type:Number},
    status:{type:String,required:true},
    products:[]
})

let ordermodel = model("orders",schema)

module.exports= ordermodel