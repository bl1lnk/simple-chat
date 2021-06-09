const express = require('express')
const  {registerUser, userAuth, getUserProfile, muteUser, getNotifications} = require('../controllers/userControllers')
const {protect} = require("../middleware/authMiddleware")

const router = express.Router()

router.post('/', registerUser);
router.post('/login', userAuth);
router.route('/profile').get(protect, getUserProfile)
router.route('/notifications').get(protect, getNotifications)
router.put('/:id',protect,muteUser)


module.exports = router
