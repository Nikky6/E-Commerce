const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'merchant', 'customer'],
        default: 'customer'
    },
    createdAt: { type: Date, default: Date.now }

}, { timesStamps: true });
const User = mongoose.model('User', userSchema);
module.exports = { User }