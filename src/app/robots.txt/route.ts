import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    // Read the robots.txt file from the public directory
    const robotsPath = join(process.cwd(), 'public', 'robots.txt');
    const robotsContent = readFileSync(robotsPath, 'utf8');
    
    // Return the robots.txt content with the correct content type
    return new NextResponse(robotsContent, {
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400', // Cache for 1 day
      },
    });
  } catch (error) {
    console.error('Error serving robots.txt:', error);
    return new NextResponse('Error loading robots.txt', { status: 500 });
  }
}