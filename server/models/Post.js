const mongoose = require('mongoose')


const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    photo:{
        type: String,
        default: "no photo"
    },
    postById:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post