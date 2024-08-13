const express = require("express")
const router = express.Router()

const {
    loginUser,
    loginOut,
    signup,
    forgotPassword,
    resetPassword,


} = require("../controllers/authController.js")

router.post("/login", loginUser)

router.post("/logout",loginOut)

router.post("/signup",signup)

router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);


module.exports = router