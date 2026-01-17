import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat') || '20.5937'; // Default to India center
    const lon = searchParams.get('lon') || '78.9629';

    const apiKey = process.env.AMBEE_API_KEY;
    
    // Log for debugging (remove in production)
    console.log('Ambee API Key exists:', !!apiKey);
    console.log('Ambee API Key first 10 chars:', apiKey?.substring(0, 10));

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Ambee API key not configured' },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://api.ambeedata.com/natural-disasters?lat=${lat}&lon=${lon}`,
      {
        headers: {
          'x-api-key': apiKey,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Ambee API Response Status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Ambee API Error:', response.status, errorText);
      
      // Return empty data instead of throwing error to prevent page crash
      return NextResponse.json({
        data: [],
        error: `Ambee API returned ${response.status}`,
        message: 'Using alternative data sources'
      });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching Ambee disaster data:', error);
    // Return empty data instead of error to prevent page crash
    return NextResponse.json({
      data: [],
      error: 'Failed to fetch disaster data',
      message: 'Using alternative data sources'
    });
  }
}
