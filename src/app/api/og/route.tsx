import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
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
          background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '24px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          }}
        >
          <h1
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)',
              backgroundClip: 'text',
              color: 'transparent',
              margin: 0,
              marginBottom: '16px',
            }}
          >
            Runity
          </h1>
          <p
            style={{
              fontSize: '32px',
              color: '#374151',
              margin: 0,
              marginBottom: '8px',
              fontWeight: '600',
            }}
          >
            AI Automation & Software Solutions
          </p>
          <p
            style={{
              fontSize: '24px',
              color: '#6b7280',
              margin: 0,
              textAlign: 'center',
              maxWidth: '800px',
            }}
          >
            Build intelligent automation systems that scale your business
          </p>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span style={{ fontSize: '20px', color: 'white', opacity: 0.9 }}>
            runity.pl
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}