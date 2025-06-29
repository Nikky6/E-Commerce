const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        default: 0
    },
    imageUrl: {
        type: String
    },
    merchantId: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    createdAt: { type: Date, default: Date.now }

}, { timestamps: true });

productSchema.index({ name: 'text', description: 'text' });

const Product = mongoose.model('Product', productSchema);
module.exports = { Product }
