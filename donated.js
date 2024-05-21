const mongoose=require('mongoose')
const Donor = require('./schema')
const { Schema, Types } = mongoose;

const DonatedSchema=new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    id:{
        type:Types.ObjectId,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    hospitalname:{
        type:String,
        required:true,
    },
    hospitaladdress:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        required:true,
    }

})

const Donated=mongoose.model("Donated",DonatedSchema)
module.exports=Donated
