const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    productId:
    {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
});

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    items: [cartItemSchema],
});
const Cart = mongoose.model('Cart',cartSchema)
module.exports = Cart