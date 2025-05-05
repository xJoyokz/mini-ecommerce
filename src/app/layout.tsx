import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import '@/styles/global.css'
import Header from '@/components/Header/Header'
import AntdProvider from '@/providers/AntdProvider'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins', // This makes it available as a CSS variable
  display: 'swap', // For better font loading
})

export const metadata: Metadata = {
  title: 'Mini E-commerce',
  description: 'E-commerce application',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${poppins.className} antialiased md:px-28 md:py-6`}>
        <AntdProvider>
          <Header />
          {children}
        </AntdProvider>
      </body>
    </html>
  )
}
