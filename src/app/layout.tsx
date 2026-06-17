import type { Metadata } from 'next'
import Navbar from './_Components/navbar/Navbar'
import Footer from './_Components/footer/Footer'
import ThemeRegistry from './_Components/ThemeRegistry'
import ReduxProvider from './_Components/ReduxProvider'
import { Toaster } from 'react-hot-toast'
import './globals.css'

export const metadata: Metadata = {
  title: 'MyApp | E-Commerce',
  description: 'Best products at the best prices',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <ReduxProvider>
          <ThemeRegistry>
            <Navbar />
            <main style={{ flex: 1, paddingTop: '80px' }}>
              {children}
            </main>
            <Footer />
            <Toaster position="bottom-right" />
          </ThemeRegistry>
        </ReduxProvider>
      </body>
    </html>
  )
}