const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        require: true
    },
    username:{
        type:String,
        require:true,
        unique:true,
    },
    email: {
        type: String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
        minlength:6
    },
    gender:{
        type:String,
        require:true,
        enum:['male','female']
    },
    profilePic:{
        type:String,
        default: "",
    },
        resetPasswordToken: {
        type: String,
        default: null
    },
    resetPasswordExpires: {
        type: Date,
        default: null
    },

    friends:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] ,// List of friend IDs

    sentRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Outgoing friend requests
    receivedRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // Incoming friend requests

    
}, {timestamps: true})

module.exports =  mongoose.model("User", userSchema)

