const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    country: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Users', UsersSchema);