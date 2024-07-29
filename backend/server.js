
const express = require("express")
const dotenv = require("dotenv")

//ROUTES
const authRoutes = require('./routes/authRoute.js')
const messageRoutes = require('./routes/messageRoute.js')
const userRoutes = require('./routes/userRoute.js')


const connectMongo = require('./db/connectMongo.js')
const cookieParser = require('cookie-parser')
const { app, server } = require("./socket/socket.js")

const PORT = process.env.PORT || 5000

dotenv.config()

//middleware



app.use(express.json()) //to parse the incoming requests with payload(from req.body)
app.use(cookieParser())
app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes)
server.listen(PORT, ()=>{
    connectMongo()
    console.log(`Server is running ${PORT}`)
})