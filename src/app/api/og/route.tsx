import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { LOGO_BASE64 } from './logo-base64';

export const runtime = 'edge';

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
    
    // Special design for default/root domain
    if (type === 'default') {
      return new ImageResponse(
        (
          <div
            style={{
              height: '100%',
              width: '100%',
              display: 'flex',
              background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Animated gradient background effect */}
            <div
              style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: 'radial-gradient(circle at 30% 50%, rgba(245, 158, 11, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(234, 88, 12, 0.15) 0%, transparent 50%)',
              }}
            />
            
            {/* Grid pattern overlay */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
                backgroundSize: '50px 50px',
              }}
            />
            
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '100%',
                padding: '80px',
              }}
            >
              {/* Logo */}
              <div style={{ display: 'flex' }}>
                <img
                  src={LOGO_BASE64}
                  alt="Runity Logo"
                  width="180"
                  height="60"
                  style={{
                    objectFit: 'contain',
                  }}
                />
              </div>
              
              {/* Main content */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '32px',
                  maxWidth: '900px',
                }}
              >
                {/* Tagline */}
                <div
                  style={{
                    display: 'inline-flex',
                    padding: '8px 20px',
                    background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)',
                    borderRadius: '999px',
                    fontSize: '18px',
                    fontWeight: '600',
                    color: 'white',
                    alignSelf: 'flex-start',
                    letterSpacing: '0.5px',
                  }}
                >
                  AI AUTOMATION EXPERTS
                </div>
                
                {/* Main headline */}
                <h1
                  style={{
                    fontSize: '72px',
                    fontWeight: 'bold',
                    color: 'white',
                    margin: 0,
                    lineHeight: 1.1,
                    letterSpacing: '-1px',
                  }}
                >
                  Build AI-Powered Systems
                  <br />
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)',
                      backgroundClip: 'text',
                      color: 'transparent',
                    }}
                  >
                    That Scale Your Business
                  </span>
                </h1>
                
                {/* Description */}
                <p
                  style={{
                    fontSize: '26px',
                    color: '#94a3b8',
                    margin: 0,
                    lineHeight: 1.4,
                    maxWidth: '800px',
                  }}
                >
                  Custom AI solutions that save time, reduce costs, and accelerate growth. 
                  From intelligent automation to advanced machine learning.
                </p>
                
                {/* Features */}
                <div
                  style={{
                    display: 'flex',
                    gap: '40px',
                    marginTop: '16px',
                  }}
                >
                  {['LLM Integration', 'Workflow Automation', 'Custom AI Agents'].map((feature, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        fontSize: '20px',
                        color: '#cbd5e1',
                      }}
                    >
                      <div
                        style={{
                          width: '24px',
                          height: '24px',
                          background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <span style={{ color: 'white', fontSize: '14px' }}>✓</span>
                      </div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Footer */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '20px',
                  color: '#64748b',
                }}
              >
                <span>runity.pl</span>
                <span style={{ fontSize: '18px' }}>Transform Your Business with AI</span>
              </div>
            </div>
          </div>
        ),
        {
          width: 1200,
          height: 630,
        },
      );
    }
    
    // Design for blog and project pages
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
                src={LOGO_BASE64}
                alt="Runity Logo"
                width="300"
                height="100"
                style={{
                  objectFit: 'contain',
                }}
              />
            </div>
            
            {/* Type badge */}
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