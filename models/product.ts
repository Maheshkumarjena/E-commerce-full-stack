import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Name of the product
    description: { type: String, required: true }, // Description of the product
    price: { type: Number, required: true }, // Price of the product
    stock: { type: Number, required: true }, // Number of items in stock
    category: { type: String, }, // Category the product belongs to
    image: { type: String }, // URL or path to the product image
    createdAt: { type: Date, default: Date.now }, // When the product was added
    updatedAt: { type: Date, default: Date.now }, // Last updated time
});

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;


