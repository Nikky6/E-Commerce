const Cart = require('../model/CartModel');

const addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    let cart = await Cart.findOne({ userId });
    if (!cart) cart = new Cart({ userId, items: [] });
    const itemIndex = cart.items.findIndex(i => i.productId.equals(productId));
    if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
    } else {
        cart.items.push({ productId, quantity });
    }
    await cart.save();
    res.json(cart);
};

const getCart = async (req, res) => {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId });
    res.json(cart || { items: [] });
};


const removeFromCart = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });
        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex === -1) return res.status(404).json({ message: 'Product not in cart' });
        cart.items.splice(itemIndex, 1); 
        await cart.save();
        res.json({ message: 'Item removed', cart });
    } catch (err) {
        res.status(500).json({ error: 'Server error', details: err.message });
    }
};


module.exports = { getCart, addToCart, removeFromCart }