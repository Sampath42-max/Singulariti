import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ category: string }> }
) {
  try {
    const resolvedParams = await params;
    const categoryName = resolvedParams.category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#09090b', // zinc-950
            backgroundImage: 'radial-gradient(circle at 25px 25px, #27272a 2%, transparent 0%), radial-gradient(circle at 75px 75px, #27272a 2%, transparent 0%)',
            backgroundSize: '100px 100px',
            fontFamily: 'Inter, sans-serif',
            color: 'white',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(24, 24, 27, 0.8)', // zinc-900 with opacity
              border: '1px solid #3f3f46', // zinc-700
              padding: '60px 100px',
              borderRadius: '24px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  backgroundColor: '#3b82f6', // blue-500
                  marginRight: '20px',
                }}
              />
              <span style={{ fontSize: '32px', fontWeight: 600, color: '#a1a1aa' }}>
                Singulariti
              </span>
            </div>
            
            <h1
              style={{
                fontSize: '72px',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                margin: '0',
                color: '#ffffff',
                textAlign: 'center',
                lineHeight: 1.1,
              }}
            >
              {categoryName}
            </h1>
            
            <p
              style={{
                fontSize: '28px',
                color: '#a1a1aa', // zinc-400
                marginTop: '24px',
                fontWeight: 400,
                textAlign: 'center',
              }}
            >
              Free Browser-Based Utility Tools
            </p>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.error(e);
    return new Response('Failed to generate image', { status: 500 });
  }
}
