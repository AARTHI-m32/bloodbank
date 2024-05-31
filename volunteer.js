const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    fullName:
     { type: String, 
       required: true 
    },
    dob:
     { type: Date,
       required: true 
    },
    phoneNumber:
     { type: String,
       required: true 
    },
    email:
     { type: String, 
       required: true,
       unique: true 
    },
    role: 
    { type: String,
      required: true 
    },
    agreement:
     { type: Boolean, 
      required: true 
    },
    camp: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Camp', required:
         true }
});

const Volunteer = mongoose.model('Volunteer', volunteerSchema);
module.exports = Volunteer;