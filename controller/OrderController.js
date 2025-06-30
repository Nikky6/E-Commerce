const Order = require('../model/OrderModel');

const createOrder = async (req, res) => {
    try {
        const { userId, items, total } = req.body;
        const order = new Order({ userId, items, total });
        await order.save();
        return res.status(201).json(order);
    } catch (error) {
        return res.status(500).json({ message: 'internal server error' })

    }
};

const getOrdersByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ userId });
       return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).json({ message: 'internal server error' })
    }
};

const getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        return res.status(200).send(order);
    } catch (error) {
        return res.status(500).json({ message: 'internal server error' })

    }
};

module.exports = { createOrder, getOrdersByUser, getOrder }