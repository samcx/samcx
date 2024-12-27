import type { Metadata } from 'next'
import Footer from '@/components/footer'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sam Ko',
  description: 'SAM KO',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  )
}
