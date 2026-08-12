import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Report from '@/models/Report';

// GET /api/reports - Fetch all reports, sorted newest first
export async function GET() {
  try {
    await connectDB();
    const reports = await Report.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, count: reports.length, data: reports });
  } catch (error: any) {
    console.error('Error fetching reports:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch reports', error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/reports - Create a new disaster report
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, type, status, latitude, longitude } = body;

    if (!title || !description || latitude === undefined || longitude === undefined) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields: title, description, latitude, longitude' },
        { status: 400 }
      );
    }

    await connectDB();

    const report = await Report.create({
      title,
      description,
      type: type || 'Other',
      status: status || 'Active',
      latitude: Number(latitude),
      longitude: Number(longitude),
    });

    return NextResponse.json(
      { success: true, message: 'Report created successfully', data: report },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating report:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create report', error: error.message },
      { status: 500 }
    );
  }
}
