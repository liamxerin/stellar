const mongoose = require('mongoose')

const connectMongo = async (req, res)=>{
    try{

        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to mongoDB")

    }catch(error){
        console.log("Error connecting to mongodb", error.message)
    }
}

module.exports = connectMongo
