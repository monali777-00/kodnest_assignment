import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiUrl = process.env.INTERNSHALA_API_URL || 'https://internshala.com/hiring/search';
    const res = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json',
      },
      next: { revalidate: 300 }, // Cache response for 5 minutes
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Failed to fetch data: ${res.statusText}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error proxying internships API:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
