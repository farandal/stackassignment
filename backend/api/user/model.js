import mongoose, { Schema } from 'mongoose';
import mongooseKeywords from 'mongoose-keywords';
import { env } from '../../config';
const roles = ['user', 'admin'];

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
  },
  refreshToken: {
    type: String
  },
  calendarId: {
    type: String
  },
  role: {
    type: String,
    enum: roles,
    default: 'user'
  }
});

userSchema.methods = {
  view(full) {
    let view = {};
    let fields = ['id', 'email', 'googleId', 'calendarId'];

    if (full) {
      fields = [...fields, 'accessToken', 'createdAt'];
    }

    fields.forEach(field => {
      view[field] = this[field];
    });

    return view;
  }
};

userSchema.statics = {
  roles
};

userSchema.plugin(mongooseKeywords, { paths: ['email', 'googleId'] });

const model = mongoose.model('User', userSchema);

export const schema = model.schema;
export default model;
