import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt =
  'ReadmePilot — AI-Powered GitHub Documentation Generator'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#000000',
          color: '#ffffff',
          padding: '70px',
          position: 'relative',
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: 'absolute',
            width: '700px',
            height: '700px',
            borderRadius: '9999px',
            background:
              'radial-gradient(circle, rgba(6,182,212,0.18), transparent 65%)',
            top: '-350px',
            left: '250px',
          }}
        />

        {/* Branding */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '18px',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: '#06b6d4',
              color: '#000000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px',
              fontWeight: 900,
            }}
          >
            R
          </div>

          <div
            style={{
              fontSize: '38px',
              fontWeight: 800,
            }}
          >
            ReadmePilot
          </div>
        </div>

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '80px',
          }}
        >
          <div
            style={{
              fontSize: '58px',
              fontWeight: 800,
              lineHeight: 1.08,
              maxWidth: '1000px',
            }}
          >
            Turn GitHub repositories into great documentation.
          </div>

          <div
            style={{
              marginTop: '30px',
              fontSize: '26px',
              color: '#9ca3af',
            }}
          >
            AI-powered README and developer documentation generator
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: 'auto',
            fontSize: '21px',
            color: '#6b7280',
          }}
        >
          Analyze • Generate • Document
        </div>
      </div>
    ),
    {
      ...size,
    },
  )
}