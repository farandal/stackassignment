import mongoose, { Schema } from 'mongoose'
import { env } from '../../config'

// Basic User Schema for Google Authentication
const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'email required'],
        unique: [true, 'email already registered']
    },
    googleId: {
        type: String,
        default: null
    }
});

module.exports = mongoose.model('User', userSchema);