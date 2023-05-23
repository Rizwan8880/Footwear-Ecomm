const express = require("express")
const  router = express.Router()
const {userRegisteration,login,changepassword,loggeduser,changeUserPasswordbyEmailLink,resetUserPasswordbyLink,myorders}  = require("../controllers/user")
const checkUserAuth = require("../middlewares/auth")

router.use("/loggeduser",checkUserAuth)

// public routes
router.post("/userRegisteration",userRegisteration)
router.get("/login",login)
router.patch("/send-Email-Link-to-User-for-Password-change",changeUserPasswordbyEmailLink)
router.patch("/reset-User-Password-by-Link/:id/:secret",resetUserPasswordbyLink)

//private route
router.patch("/changepassword",checkUserAuth,changepassword)
router.get("/loggeduser",loggeduser)
router.get("/myorders",myorders)
module.exports = router