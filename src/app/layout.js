import './globals.css'
import { Inter } from 'next/font/google'
import {yekan} from '@/utils/fonts'
import Layout from '@/layout/Layout'
import NextAuthProvider from '@/providers/NextAuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'سایت املاک',
  description: 'سایت خرید و فروش املاک',
  icons: {icon: './favicon.ico'}
}

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={yekan.className}>
        <NextAuthProvider>
          <Layout>{children}</Layout>  
        </NextAuthProvider>
      </body>
    </html>
  )
}
