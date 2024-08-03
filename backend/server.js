
const express = require("express")
const dotenv = require("dotenv")

//ROUTES
const authRoutes = require('./routes/authRoute.js')
const messageRoutes = require('./routes/messageRoute.js')
const userRoutes = require('./routes/userRoute.js')
const path = require('path');




const connectMongo = require('./db/connectMongo.js')
const cookieParser = require('cookie-parser')
const { app, server } = require("./socket/socket.js")

const PORT = process.env.PORT || 5000



dotenv.config()

//middleware


// const __dirname = path.resolve();
// PORT should be assigned after calling dotenv.config() because we need to access the env variables. Didn't realize while recording the video. Sorry for the confusion.


app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});
server.listen(PORT, ()=>{
    connectMongo()
    console.log(`Server is running ${PORT}`)
})