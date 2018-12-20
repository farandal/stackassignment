import mongoose, { Schema } from 'mongoose'
//import { env } from '../../config'

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
    },
    accessToken: {
    	type: String
    }
});

userSchema.methods = {
  view (full) {
    
    let view = {}
    let fields = ['id', 'name', 'picture']

    if (full) {
      fields = [...fields, 'email', 'createdAt']
    }

    fields.forEach((field) => { view[field] = this[field] })

    return view
  }
}


module.exports = mongoose.model('User', userSchema);