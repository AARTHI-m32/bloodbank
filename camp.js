const mongoose = require('mongoose');

const CampSchema = new mongoose.Schema({
    organisation: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    }
}, {
    timestamps: true 
});

const Camp = mongoose.model('Camp', CampSchema);
module.exports = Camp;
