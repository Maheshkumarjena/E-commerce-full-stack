import { NextResponse } from 'next/server';
import Product from '@/models/product';
import { connectToDatabase } from '@/lib/mongoDb';

console.log(
    "reaced to route.ts file"
)
NextResponse.json({message:"failed to fetch products"})
export async function GET() {
    await connectToDatabase();
    try {
        const products = await Product.find({});
        return NextResponse.json(products);
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return NextResponse.json({ message: 'Failed to fetch products' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    await connectToDatabase();
    try {
        const body = await request.json();
        console.log("Incoming product data:", body); // Log incoming data

        // Validate incoming data if necessary
        if (!body.name || !body.price || !body.description) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        const product = await Product.create(body);
        console.log("Created product:", product); // Log created product

        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        console.error("Failed to create product:", error); // Log the error for debugging

        return NextResponse.json({ message: 'Failed to create product', error: error.message }, { status: 500 });
    }
}


// You can implement PUT and DELETE similarly if needed
