const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    donorname: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    bloodgroup: {
        type: String,
        required: true,
      
        validate: {
            validator: function(value) {
               
                return /^(A|B|AB|O)[+-]$/.test(value);
            },
            message: props => `${props.value} is not a valid blood group!`
        }
    },
    gender: {
        type: String,
        required: true,
      
        enum: ['Male', 'Female', 'Other']
    },
    address: {
        type: String,
        required: true
    },
    phoneno: {
        type: String,
        required: true,
    },
    
});

const Donor = mongoose.model("Donor", donorSchema);
module.exports = Donor;
