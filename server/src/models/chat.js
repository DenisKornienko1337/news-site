const mongoose = require('mongoose')
const Schema = mongoose.Schema
const chatSchema = new Schema({
    time: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    }
})

const ChatModel = mongoose.model('Chat', chatSchema)

module.exports = ChatModel