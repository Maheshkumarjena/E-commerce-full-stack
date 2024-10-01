import Product from '@/models/product';
import { connectToDatabase } from '@/lib/mongoDb';
export default async function handler(req, res) {
    const { method } = req;

    await connectToDatabase();

    if (method === 'GET') {
        const products = await Product.find({});
        res.status(200).json(products);
    }

    if (method === 'POST') {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    }

    // Implement other methods (PUT, DELETE) for updates, deletion
}
