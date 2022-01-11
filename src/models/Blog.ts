


import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({

    title: String,
    
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String
    },
    headline: {
        type: String
    },
    picture: {
        type: String
    }

}, { timestamps: true })

const Blog = mongoose.model('Blog',blogSchema)

export default Blog