const express = require("express")
const User = require("../models/userModel")

const getUsersForSidebar = async (req,res)=>{

    try{

        const loggedInUserId =  req.user._id

        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password") // unable to see ourselves in chat

        res.status(200).json(filteredUsers);

    }catch(error){
        console.error("Error in getUsersForSidebar Controller: ", error.message)
        res.status(500).json({error: "Internal server error"})
    }

}

const sendFriendRequest = async (req, res) => {
    try {
        
        const { userId, friendId } = req.body;
        if (userId == friendId) {
             return res.status(400).json({ message: 'Cannot send a friend request to yourself' });
        }
        const user = await User.findById(userId);
        const friend = await User.findById(friendId)

        if (!user || !friend) {
            return res.status(404).json({ message: 'User or Friend not found' })
            
        }
         if (user.sentRequests.includes(friendId)) {
        return res.status(400).json({ message: 'Friend request already sent' });
         }
        
            user.sentRequests.push(friendId);
            friend.receivedRequests.push(userId);
        
         await user.save();
    await friend.save();

    res.status(200).json({ message: 'Friend request sent successfully' });

    } catch (error) {
       console.error('Error in sendFriendRequest Controller: ', err.message);
    res.status(500).json({ message: err.message });
    }
}

const respondToFriendRequest = async (req, res) => {
  try {
    const { userId, friendId, action } = req.body; // action: 'accept' or 'reject'
    
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: 'User or Friend not found' });
    }

    if (!user.receivedRequests.includes(friendId)) {
      return res.status(400).json({ message: 'No friend request from this user' });
    }

    // Remove request from user's receivedRequests and friend's sentRequests
    user.receivedRequests = user.receivedRequests.filter(id => id.toString() !== friendId);
    friend.sentRequests = friend.sentRequests.filter(id => id.toString() !== userId);

    if (action === 'accept') {
      // Add friend to both users' friends lists
      if (!user.friends.includes(friendId)) {
        user.friends.push(friendId);
      }
      if (!friend.friends.includes(userId)) {
        friend.friends.push(userId);
      }
    }

    await user.save();
    await friend.save();
    
    res.status(200).json({ message: action === 'accept' ? 'Friend request accepted' : 'Friend request rejected' });
  } catch (error) {
    console.error('Error in respondToFriendRequest Controller: ', error.message);
    res.status(500).json({ message: error.message });
  }
};


module.exports = { getUsersForSidebar, sendFriendRequest, respondToFriendRequest };