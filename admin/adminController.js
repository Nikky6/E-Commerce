const { Product } = require('../model/ProductModel');
const Cart = require('../model/CartModel');
const mongoose = require('mongoose');

const addProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        return res.status(201).json({ message: 'Product created', product });
    } catch (error) {
        console.log("error", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: 'Product not found' });
        return res.json({ message: 'Product updated', product: updated });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const addToCart = async (req, res) => {
    try {
        const { products } = req.body;
        const userId = req.user.id;
        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ message: 'Products array is required' });
        }
        for (const item of products) {
            if (!mongoose.Types.ObjectId.isValid(item.productId)) {
                return res.status(400).json({ message: `Invalid product ID: ${item.productId}` });
            }
            const productExists = await Product.findById(item.productId);
            if (!productExists) {
                return res.status(404).json({ message: `Product not found: ${item.productId}` });
            }
        }
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({
                userId,
                products: products.map(item => ({
                    productId: item.productId,
                    quantity: item.quantity || 1
                }))
            });
        } else {
            for (const item of products) {
                const index = cart.products.findIndex(p => p.productId.toString() === item.productId);
                if (index > -1) {
                    cart.products[index].quantity += item.quantity || 1;
                } else {
                    cart.products.push({ productId: item.productId, quantity: item.quantity || 1 });
                }
            }
        }
        await cart.save();
        return res.status(200).json({ message: 'Cart updated successfully', cart });
    } catch (error) {
        console.error("error", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { addProduct, editProduct, addToCart };