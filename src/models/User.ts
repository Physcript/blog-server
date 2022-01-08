

import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    password: {
        type: String
    },
    name: {
        type: String
    },
    token: {
        type: String
    },
    uid: {
        type: String
    }
},{ timestamps: true })

export default mongoose.model('User',userSchema)