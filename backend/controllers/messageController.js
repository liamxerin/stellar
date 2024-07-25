const express = require("express")
const Conversation = require( '../models/conversationModel.js')
const Message = require( '../models/messageModel.js')


const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        // Validate ObjectId
        // if (!mongoose.Types.ObjectId.isValid(senderId) || !mongoose.Types.ObjectId.isValid(receiverId)) {
        //     return res.status(400).json({ error: "Invalid sender or receiver ID" });
        // }

        // Find or create conversation
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }

        // Create and save new message
        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });

        if(newMessage){
            conversation.message.push(newMessage._id);
        }

        //SOCKET IO FUNCTIONSLITY WILL GO HERE


        // await newMessage.save();
        // await conversation.save();
            await Promise.all([conversation.save(),newMessage.save()]) // to be saved parallel

        // Send response
        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage Controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

const getMessage = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        // Find conversation
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate('message'); //NOT REF BUT ACTUAL MESSAGES

        // Check if the conversation exists
        if (!conversation) {
            return res.status(404).json({ error: "Conversation not found" });
        }
            const message = conversation.message

        // Return the populated messages
        res.status(200).json(message);
    } catch (error) {
        console.log("Error in getMessage Controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};



module.exports  = {
    
    sendMessage,
    getMessage,
}