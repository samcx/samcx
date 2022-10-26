import './global.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>samsisle</title>
        <meta name="og:title" content="SAM KO WEB ENGINEER" />
        <meta name="description" content="SAM KO WEB ENGINEER" />
        <meta name="og:description" content="SAM KO WEB ENGINEER" />
        <link rel="icon" href="/favicon.ico" sizes="any" type="image/x-icon" />
      </head>
      <body>{children}</body>
    </html>
  )
}
