const Stripe = require('stripe');
require('dotenv').config()
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const payment = async (req, res) => {
    try {
        const { items } = req.body; // items: [{ productId, quantity }]
        const lineItems = items.map(item => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/success`,
            cancel_url: `${process.env.CLIENT_URL}/cancel`
        });

        res.json({ url: session.url });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { payment }