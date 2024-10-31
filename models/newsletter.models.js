// models/subscriber.js
const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address']
  }
},
{
  timestamps: true
});

module.exports = mongoose.model('Subscriber', subscriberSchema);
