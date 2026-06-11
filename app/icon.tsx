import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: '#5A7250',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#F5F0E8',
          fontSize: 22,
          fontFamily: 'Georgia, serif',
          paddingBottom: 2,
        }}
      >
        P
      </div>
    ),
    { ...size }
  )
}
