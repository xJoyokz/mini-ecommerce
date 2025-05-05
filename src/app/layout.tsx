import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/global.css'
import Header from '@/components/Header/Header'
import AntdProvider from '@/providers/AntdProvider'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Charavibe',
  description: 'Ecommerce',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className} antialiased md:px-28 md:py-6`}>
        <AntdProvider>
          <Header />
          {children}
        </AntdProvider>
      </body>
    </html>
  )
}
