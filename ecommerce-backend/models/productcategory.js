const {Schema,model} = require("mongoose")

const schema = new Schema(
    {
    name:{type:String,required:true},
    srno:{type:Number,required:true},
    imagepath:{type:String}
}
)

const productcategorymodel = model("productcategories",schema)

module.exports= productcategorymodel