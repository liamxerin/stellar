const express = require("express")
const User = require('../models/userModel.js')
const bcrypt = require("bcryptjs");
const generateTokenSetCookie = require("../utils/generateToken.js");
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

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
        const {fullName, username, email, password, confirmPassword,gender} = req.body;

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
                email,
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
                username: newUser.username,
                email: newUser.email,
                profilePic:newUser.profilePic
            })
    
    }catch(error){
        console.log("Error in signup controller", error.message)
            res.status(500).json({error: "Internal Server Error"})
    }
}
// ForgotPassword
const forgotPassword = async (req, res) => {
    try {
        const { username } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ error: 'User not found!' })
            
        } 
      
         // Generate a password reset token
        const resetToken = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = resetToken;
        
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
      
        await user.save();

        const resetUrl = `http://localhost:3000/resetpassword?token=${resetToken}`;
        const message = `You are receiving this email because you requested a password reset. Please click on the following link to reset your password: ${resetUrl}`;

          await sendEmail({
            to:  user.email,
            subject: 'Password Reset Request',
            text: message
          });
         
//  console.log('Work@')
        res.status(200).json({   token: resetToken, message: 'Password reset token sent to email' });

    } catch (error) {
         console.log("Error in forgot password controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const resetPassword = async (req, res) => {
    try {
        const { token, newPassword, confirmPassword } = req.body;

        // Validate request body
        if (!token || !newPassword || !confirmPassword) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        // Find user by reset token and ensure token is valid
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ error: "Password reset token is invalid or has expired" });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update user's password and clear reset token fields
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        // Respond to the client
        res.status(200).json({ message: "Password has been successfully reset" });

    } catch (error) {
        console.log("Error in reset password controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};




module.exports = {
    loginUser,
    loginOut,
    signup,
    forgotPassword,
    resetPassword,
    
}