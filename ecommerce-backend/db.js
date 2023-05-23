const mongoose = require("mongoose")

mongoose.connect(`mongodb://127.0.0.1:27017/ecomerceproject`)
const db = mongoose.connection;
db.on("error",error=>console.log("error",error))
db.on("open", ()=>console.log("Connection Established With DB"))


module.exports = db