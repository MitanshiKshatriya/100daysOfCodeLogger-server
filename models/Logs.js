const mongoose = require('mongoose');

// create Schema
const logSchema = new mongoose.Schema({
    desc:{
type:String,
required:true
    },
    date: {
        type: Date,
        default: Date.now
    },
    day:{
        type:Number,
        default:0
    },
    userId: {
        type:String,
        required:true
    }
})

module.exports = Item = mongoose.model('log',logSchema)