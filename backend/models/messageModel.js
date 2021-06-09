const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    sender:{type: Schema.Types.ObjectId, ref:'User'},
    content: {type: String, trim: true},
    readBy: [{type: Schema.Types.ObjectId, ref:'User'}]
},{
    timestamps: true
})

const Message= mongoose.model('Messsage', messageSchema)

module.exports = Message