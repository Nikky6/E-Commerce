const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
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
            quantity: Number
        }
    ],
    totalAmount: { type: Number },
    status: {
        type: String,
        enum: ['pending', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    createdAt: { type: Date, default: Date.now },

    paymentId: String
}, { timestamp: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = { Order };