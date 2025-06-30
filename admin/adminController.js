const { Product } = require('../model/ProductModel');

const addProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        return res.status(201).json({ message: 'Product created', product });
    } catch (error) {
        console.log("error",error)
        return res.status(500).json({ message: 'Internal server error' })
    }
};

const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: 'Product not found' });
        return res.json({ message: 'Product updated', product: updated });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' })

    }
};

module.exports = {addProduct,editProduct}