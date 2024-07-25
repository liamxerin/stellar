const express = require("express")
const User = require('../models/userModel.js')
const bcrypt = require("bcryptjs");
const generateTokenSetCookie = require("../utils/generateToken.js");

    //Login
const loginUser = async (req,res) =>{
    try{

        const {username, password} = req.body;
        const user = await User.findOne({username})
        const isPassword = await bcrypt.compare(password, user?.password || " "); // " " is to be illegal argument
    
        if(!user || !isPassword) {
            return res.status(400).json({error : "Invaild username or password"})
        }
        generateTokenSetCookie(user._id, res);
        res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            username:user.username,
            profilePic:user.profilePic
        })
    
     }catch(error){
        console.log("Error in login controller", error.message)
                res.status(500).json({error: "Internal Server Error"})
     }
}
//logout
const loginOut = async (req,res) =>{
  
    try{

        res.cookie("jwt","", {maxAge:0})
        res.status(200).json({message:"Logged out successfully"})

    }catch(error){
        console.log("Error in log out controller",  error.message)
        res.status(500).json({error: "Internal server error"})
    }

}
//signup
const signup = async (req,res) =>{
    try{
        const {fullName, username, password, confirmPassword,gender} = req.body;

        if(password !== confirmPassword){
            return res.status(400).json({error:"Passwords don't match"})
           
        }
         const user = await User.findOne({username});

         if(user){
            return res.status(400).json({error:"Username already exists"})
         }
            //hash password here
            //const hashedPassword = await bcrypt.hash(password, 12);
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
            const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

            const newUser = User ({
                fullName,
                username,
                password:hashedPassword,
                gender,
                profilePic : gender == 'male' ? boyProfilePic : girlProfilePic
            })
                //Generate JWT token here
           generateTokenSetCookie(newUser._id, res)
            await newUser.save()

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username:newUser.username,
                profilePic:newUser.profilePic
            })
    
    }catch(error){
        console.log("Error in signup controller", error.message)
            res.status(500).json({error: "Internal Server Error"})
    }
}

module.exports = {
    loginUser,
    loginOut,
    signup,
    
}