const Order = require('../model/OrderModel');
const Cart = require('../model/CartModel')

const createOrder = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
        if (!cart || cart.items.length === 0) return res.status(400).json({ message: 'Cart is empty' });

        const total = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
        const order = new Order({
            user: req.user.id,
            items: cart.items.map(item => ({
                product: item.product._id,
                quantity: item.quantity
            })),
            total
        });
        await order.save();
        cart.items = [];
        await cart.save();
        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getUsersOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).populate('items.product');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


module.exports = { createOrder, getUsersOrders }