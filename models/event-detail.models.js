
const mongoose = require('mongoose');

const eventCreation = new mongoose.Schema({
    user:{
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId
    },
    Title:{
        type: String,
        required: [true, 'Title is required']
    },
    Description:{
        type: String,
        required: [true, 'Description is required']
    },
    Date:{
        type: Date,
        default: Date.now()
    },
    Duration:{
        type: String,
        required: [true, 'Duration is required']
    },
    Venue:{
        type: String,
        required: [true, 'Venue is required']
    },
    Prize:{
        type: Number,
        required: [true, 'Prize is required']
    }

});

const EventManagement = mongoose.model('EventDetail', eventCreation);
module.exports= EventManagement
