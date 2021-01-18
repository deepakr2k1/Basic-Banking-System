const mongoose = require('mongoose');

const user = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        min: 6,
        required: true,
    },
    balance: {
        type: Number,
        required: true,
        default: 100.00,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('User', user);