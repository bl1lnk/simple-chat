const express = require('express')
const  {createMessage,listMessages} = require('../controllers/messageControllers')
const {protect} = require("../middleware/authMiddleware")

const router = express.Router()

router.route('/')
    .post(protect, createMessage)
    .get(protect, listMessages)



module.exports = router
