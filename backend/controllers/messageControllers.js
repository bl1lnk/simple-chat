const asyncHandler = require('express-async-handler');
const Message = require('../models/messageModel')
const User = require('../models/userModel')


const createMessage = async(req,res)=>{
    const {content} = req.body

    if(!content && content == ""){
        res.status(400)
        throw new Error("You can't send a empty message")
    }

     let msg = await Message.create({sender:req.user._id, content})
     msg = await User.populate(msg, {path:'sender'})
    res.status(200).json(msg)
    
}

const listMessages = async(req,res)=>{
    messages = await Message.find({}).populate("sender").sort({updatedAt:-1})
    if(!messages){
        res.status(404)
        throw new Error('No message exists! ')
    }
    res.status(200).json(messages)
    
}

module.exports  = {createMessage, listMessages}