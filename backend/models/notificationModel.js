const mongoose = require('mongoose')

const Schema = mongoose.Schema

const notificationSchema = new Schema({
    userTo: {type: Schema.Types.ObjectId, ref:'User'},
    userFrom :{type: Schema.Types.ObjectId, ref: 'User'},
    notificationType: {type:String, default:'info'},
}, {
    timestamp: true
})

const Notification = mongoose.model('Notification', notificationSchema)
module.exports = Notification