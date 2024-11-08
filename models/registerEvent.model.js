const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  whyJoin: {
    type: String,
  },
 
knowAbout : {
    type : String,
}

});

const User = mongoose.model('Registered-Users', userSchema);
module.exports = User;