import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'

export const alt = 'ReadmePilot — AI-Powered GitHub Documentation Generator'
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
          alignItems: 'center',
          justifyContent: 'center',
          background: '#000000',
          color: '#ffffff',
          padding: '60px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '18px',
            marginBottom: '30px',
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
              fontSize: '34px',
              fontWeight: 800,
            }}
          >
            R
          </div>

          <div
            style={{
              fontSize: '42px',
              fontWeight: 800,
            }}
          >
            ReadmePilot
          </div>
        </div>

        <div
          style={{
            fontSize: '58px',
            fontWeight: 800,
            textAlign: 'center',
            lineHeight: 1.1,
            maxWidth: '950px',
          }}
        >
          Turn GitHub repositories into great documentation.
        </div>

        <div
          style={{
            marginTop: '28px',
            fontSize: '24px',
            color: '#9ca3af',
          }}
        >
          AI-powered GitHub documentation generator
        </div>
      </div>
    ),
    {
      ...size,
    },
  )
}
