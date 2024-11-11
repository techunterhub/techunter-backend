const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, match: /.+@.+\..+/ },
  password: { type: String, required: true, minlength: 8 },
  username: { type: String, required: true, minlength: 3, unique: true },
  role: { type: String, default: 'user' },
  isadmin: { type: Boolean, default: false },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
