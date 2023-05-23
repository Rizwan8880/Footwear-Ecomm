const express = require("express");
const bodyparser = require("body-parser");

var app = express()
const db = require("./db")

var cors = require("cors");
 app.use(cors())


app.use(express.json())

app.use(express.static("assets"))

app.use(bodyparser.json({limit:"50mb"}))
app.use(bodyparser.urlencoded({limit:"50mb",extended:true}))

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    if(req.method == "OPTIONS")
    {
        res.header("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, DELETE");
        return res.status(200).json({});
    }
    next();})


app.get("/",(req,res)=>{
  return  res.send("Welcome to E-comerce MEAN Project")
})

app.use("/admin",require("./routes/admin"))
app.use("/productcategory",require("./routes/productcategory"))
app.use("/product",require("./routes/product"))
app.use("/users",require("./routes/user"))
app.use("/order",require("./routes/order"))
// mongoose.connect(`mongodb://localhost:27017/ecomerceproject`)
// const db = mongoose.connection;
// db.on("error",error=>console.log("error",error))
// db.on("open", ()=>console.log("Connection Established With DB"))

app.listen(9000,(err)=>{
    if(err) {
        console.log("error",err);
    } else {
    console.log("sever running on port 9000 http://localhost:9000")}
})