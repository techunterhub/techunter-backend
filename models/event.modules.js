const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required:[true, 'Name is required'],
  },
  email: {
    type: String,
    required:[true, 'Email is required'],
    unique: true
  },
  why_join: {
    type: String,
    required:[true, 'Why join is required'],
  },
  know_about: {
    type: String,
    required:[true, 'Know about is required'],
  }

});

const User = mongoose.model('Event', userSchema);
module.exports = User;