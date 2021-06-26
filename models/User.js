const mongoose = require('mongoose');

// create Schema
const userSchema = new mongoose.Schema({
    name:{
type:String,
required:true
    },
email:{
    type:String,
    required:true,
    unique:true
    },
password:{
    type:String,
    required:true
    },
    date: {
        type: Date,
        default: Date.now
    },
    goals:[{
        _id:String,
        goal:String,
        completed:{
            type:Boolean,
            default:false
        }
    }],
days_completed:{
        type:Number,
        default:0
    }
})

module.exports = User = mongoose.model('user',userSchema)