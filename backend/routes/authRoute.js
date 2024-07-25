const express = require("express")
const router = express.Router()

const {
    loginUser,
    loginOut,
    signup


} = require("../controllers/authController.js")

router.post("/login", loginUser)

router.post("/logout",loginOut)

router.post("/signup",signup)



module.exports = router