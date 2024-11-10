const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    select:false,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    default: 'user'
  },
  isadmin: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;