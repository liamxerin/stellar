const express = require("express")
const router = express.Router()

 const protectedRoute = require('../middleware/protectRoute.js')
const { getUsersForSidebar,sendFriendRequest, respondToFriendRequest } = require("../controllers/userController.js")

router.get("/", protectedRoute, getUsersForSidebar)

router.post('/send-friend-request', protectedRoute, sendFriendRequest)
router.post('/respond-friend-request', protectedRoute, respondToFriendRequest)


module.exports = router

