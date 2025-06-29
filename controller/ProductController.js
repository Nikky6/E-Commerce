const {Product} = require("../model/ProductModel");



const createProduct = async (req, res) => {
    try {
        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
            imageUrl: req.body.imageUrl,
            merchantId: req.body.merchantId
        });
        await product.save();
        return res.status(201).json(product);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const getProducts = async (req, res) => {
    try {
        const {
            name,
            minPrice,
            maxPrice,
            merchantId,
            sortBy = 'createdAt',
            sortOrder = 'desc',
            page = 1,
            limit = 10,
            search, 
        } = req.query;

        const filter = {};

        if (name) {
            filter.name = { $regex: name, $options: 'i' }; 
        }

        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        if (merchantId) {
            filter.merchantId = merchantId;
        }

        if (search) {
            filter.$text = { $search: search };
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const sortDirection = sortOrder === 'asc' ? 1 : -1;

        const products = await Product.find(filter)
            .sort({ [sortBy]: sortDirection })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Product.countDocuments(filter);

        return res.status(200).json({
            total,
            page: parseInt(page),
            limit: parseInt(limit),
            products,
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            console.log('no product found');
            return res.status(404).json({ message: 'No product Found' })
        }
        return res.status(200).json({message:"product",product})
    } catch (error) {
        return res.status(500).json({ error: error.message });

    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({
            message: "Product updated successfully",
            product: updatedProduct,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });

    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({
            message: "Product deleted successfully",
            product: deletedProduct,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });

    }
}

module.exports = { createProduct, getProducts, getProductById, updateProduct, deleteProduct }