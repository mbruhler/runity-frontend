import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

// Convert image to base64 at build time or fetch from public URL
const LOGO_URL = '/logo.png';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Get parameters from URL
    const title = searchParams.get('title') || 'Runity';
    const description = searchParams.get('description') || 'AI Automation & Software Solutions';
    const type = searchParams.get('type') || 'default'; // default, blog, project
    
    // Determine colors based on type
    const getColors = () => {
      switch(type) {
        case 'blog':
          return {
            gradient: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
            accent: '#3b82f6'
          };
        case 'project':
          return {
            gradient: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
            accent: '#10b981'
          };
        default:
          return {
            gradient: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)',
            accent: '#f59e0b'
          };
      }
    };

    const colors = getColors();
    const logoUrl = `${request.nextUrl.origin}${LOGO_URL}`;
    
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
            background: colors.gradient,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            position: 'relative',
          }}
        >
          {/* Background pattern */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
            }}
          />
          
          {/* Main content card */}
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
              maxWidth: '1000px',
              margin: '0 40px',
              position: 'relative',
            }}
          >
            {/* Logo and company name */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                marginBottom: '32px',
              }}
            >
              <img
                src={logoUrl}
                alt="Runity Logo"
                width="300"
                height="100"
                style={{
                  objectFit: 'contain',
                }}
              />
            </div>
            
            {/* Type badge */}
            {type !== 'default' && (
              <div
                style={{
                  display: 'flex',
                  padding: '6px 16px',
                  backgroundColor: colors.accent,
                  color: 'white',
                  borderRadius: '999px',
                  fontSize: '14px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '24px',
                }}
              >
                {type}
              </div>
            )}
            
            {/* Title */}
            <h1
              style={{
                fontSize: title.length > 50 ? '48px' : '56px',
                fontWeight: 'bold',
                color: '#111827',
                margin: 0,
                marginBottom: '24px',
                textAlign: 'center',
                lineHeight: 1.2,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                maxWidth: '900px',
              }}
            >
              {title}
            </h1>
            
            {/* Description */}
            <p
              style={{
                fontSize: '24px',
                color: '#6b7280',
                margin: 0,
                textAlign: 'center',
                maxWidth: '800px',
                lineHeight: 1.5,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {description}
            </p>
          </div>
          
          {/* Footer */}
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span style={{ fontSize: '20px', color: 'white', opacity: 0.9 }}>
              runity.pl
            </span>
            {type !== 'default' && (
              <>
                <span style={{ fontSize: '20px', color: 'white', opacity: 0.7, marginLeft: '10px', marginRight: '10px' }}>•</span>
                <span style={{ fontSize: '20px', color: 'white', opacity: 0.9 }}>
                  {type === 'blog' ? 'Blog Post' : 'Case Study'}
                </span>
              </>
            )}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e) {
    console.error('OG Image generation failed:', e);
    // Fallback response
    return new Response('Failed to generate image', { status: 500 });
  }
}