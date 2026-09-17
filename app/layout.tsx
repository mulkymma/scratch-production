import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Scratch Production — Creating. Capturing. Connecting.',
  description: 'Scratch Production is a creative media studio for photography, content creation, and social media storytelling.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/work/work image 1.jpeg',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/work/work image 2.jpeg',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/work/Work image 3.jpeg',
      },
    ],
    apple: '/work/work image 4.jpeg',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
