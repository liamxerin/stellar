const express = require("express")
const router = express.Router()

 const protectedRoute = require('../middleware/protectRoute.js')
const getUsersForSidebar = require("../controllers/userController.js")

router.get("/",protectedRoute, getUsersForSidebar)


module.exports = router

