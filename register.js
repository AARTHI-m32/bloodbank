const mongoose = require('mongoose');

const registerSchema=new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },password:{
        type:String,
        required:true
    }
})

const Register=mongoose.model("Register",registerSchema)
module.exports = Register