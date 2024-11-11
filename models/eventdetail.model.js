
const mongoose = require('mongoose');
const schema = mongoose.Schema({
    Title:String,
    Description:String,
    Date:{
        type: Date,
        default: Date.now
    },
    Duration:Number,
    Venue:String,
    Prize:String

});

module.exports= mongoose.model('EventDetail', schema);
