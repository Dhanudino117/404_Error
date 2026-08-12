import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Resource from '@/models/Resource';

// GET /api/resources - Fetch all resources
export async function GET() {
  try {
    await connectDB();
    const resources = await Resource.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, count: resources.length, data: resources });
  } catch (error: any) {
    console.error('Error fetching resources:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch resources', error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/resources - Save a new resource
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, quantity, category, location } = body;

    if (!name || quantity === undefined || !location) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields: name, quantity, location' },
        { status: 400 }
      );
    }

    await connectDB();

    const resource = await Resource.create({
      name,
      quantity: Number(quantity),
      category: category || 'General',
      location,
    });

    return NextResponse.json(
      { success: true, message: 'Resource created successfully', data: resource },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating resource:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create resource', error: error.message },
      { status: 500 }
    );
  }
}
