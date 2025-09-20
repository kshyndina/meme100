import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'degenNews';
    
    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            fontSize: 60,
            color: 'black',
            background: 'white',
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '40px',
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: 'bold',
              marginBottom: 20,
              background: 'linear-gradient(to right, #1a202c, #2d3748)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            degenNews
          </div>
          <div
            style={{
              fontSize: 50,
              textAlign: 'center',
              maxWidth: '80%',
              color: '#4a5568',
            }}
          >
            {title}
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: 40,
              fontSize: 24,
              color: '#718096',
            }}
          >
            Crypto Security News & Trading Insights
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('Error generating OG image:', error);
    return new Response('Failed to generate OG image', { status: 500 });
  }
}