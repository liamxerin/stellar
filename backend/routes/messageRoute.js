const express = require("express")
const router = express.Router()
const {sendMessage,getMessage } = require('../controllers/messageController.js')
const protectedRoute = require('../middleware/protectRoute.js')


router.get('/:id', protectedRoute, getMessage)
router.post('/send/:id', protectedRoute, sendMessage)


module.exports = router