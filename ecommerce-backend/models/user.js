const mongoose = require("mongoose")
//const isEmail = require("validator")
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
       // required:[true,"Please enter your name"],
        trim:true
    },
    email:{
        type:String,
        required : true,
        trim:true,
        //required:[true,"Please enter an email"],
        unique:true,
        lowercase:true,
       // validate:[isEmail,"Please enter a valid email"]
    },
    contact:{
        type:String,
        required : true,
        trim:true
    
    },
    password:{
        type:String,
        required : true,
        trim:true
       // required:[true,"please enter a valid password"],
       //minlength:[8,`Minimum password lenght must be 6 characters`]
    },
    ConfirmPassword: {
        type:String,
       // required : true,
        trim:true
    }
    
})

let  userModel = mongoose.model("User",userSchema)


module.exports = userModel