const asyncHandler = require('express-async-handler');
const { findByIdAndUpdate } = require('../models/messageModel');
const User = require('../models/userModel')
const Notification = require('../models/notificationModel')
const generateToken = require('../utils/generateToken')


const registerUser = async(req,res)=>{
    const {name, email, password} = req.body

    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({name, email, password})
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
            muted: user.muted,
            muteDuration: user.muteDuration,

        })
    }else{
        res.stauts(400)
        throw new Error('Invalid user data')
    }
}

const userAuth = async(req,res)=>{
    const {email, password} = req.body

    const user = await User.findOne({email})

    if(user && await user.matchPassword(password)){
        res.status(200).json({
            _id:user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
            muted: user.muted,
            muteDuration : user.muteDuration
        })
    }else{
        res.status(401)
        throw new Error('Email not found')
    }
}

const getUserProfile = async(req,res)=>{

    const user = await User.findById(req.user._id)
    if(user){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            muted: user.muted,
            token: generateToken(user._id),
            muteDuration: user.muteDuration,
        })
    }else{
        res.status(404)
        throw new Error('User not found')
    }
}


const muteUser = async(req, res)=>{
   
    let {muteDuration} = req.body
    const userId = req.params.id

    const user = await User.findById(userId)
    let muted;
    if(!muteDuration){
        muteDuration = 0
        muted = false
    }else{
        muteDuration = parseInt(muteDuration)
        muted = true
    }

    let updatedUser;
    if(user.muted){
        updatedUser = await User.findByIdAndUpdate(req.params.id, {muteDuration:0, muted: false}, {new:true})
        .catch(error=>{
            console.log(error)
            res.sendStatus(400)
        })
 
    }else{
        updatedUser = await User.findByIdAndUpdate(req.params.id, {muteDuration, muted: true}, {new: true})
        .catch(error=>{
            console.log(error)
            res.sendStatus(400)
        })
        notification = await Notification.create({userTo:userId, userFrom:req.user._id, notificationType: 'error'})
        console.log(notification)
    }
    res.status(200).json(updatedUser)



    // const User= = 
    //

    
    // const option = mute 
    // if(mute){
        
    // }
}

const getNotifications = async(req, res)=>{
   
  notifications = await Notification.find({userTo: req.user._id})
                .catch((error)=>{
                    console.log(error)
                    res.sendStatus(400)
                })

    if(notifications){
        res.status(200).json(notifications)
    }else{
        res.status(400)
        throw new Error('Notificatinos not found')
    }
}



module.exports  = {registerUser, userAuth, getUserProfile, muteUser, getNotifications}