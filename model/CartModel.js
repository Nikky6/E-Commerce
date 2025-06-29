const mongoose = require('mongoose');
const cartSchema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Types.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                default: 1
            }
        }

    ],
    createdAt: { type: Date, default: Date.now }

}, { timestamp: true });

const Cart = mongoose.model('Cart', cartSchema);
module.exports = { Cart }