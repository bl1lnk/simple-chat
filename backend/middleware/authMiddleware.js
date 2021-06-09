const jwt = require('jsonwebtoken');
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')

const protect = asyncHandler(async(req,res,next)=>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
           token = req.headers.authorization.split(' ')[1]
           const decoded = jwt.verify(token, process.env.JWT_TOKEN) 
           req.user = await User.findById(decoded.id).select('-password')
      
           next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('not authorized, token failed')
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

const admin = (req,res, next)=>{
    if(req.user && req.user.isAdmin){
        next()
    }else{
        res.status(401)
        throw new Error('Not authorized as a admin')
    }
}

module.exports  = {admin, protect,}