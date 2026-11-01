import type { Metadata, Viewport } from 'next'
import { preload } from 'react-dom'
import { fontPreloads } from './fonts.generated'
import './fonts.generated.css'
import './globals.css'

export const metadata: Metadata = {
  description: 'Sam Ko',
  title: 'Sam Ko',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  for (const href of fontPreloads) {
    preload(href, { as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' })
  }

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
