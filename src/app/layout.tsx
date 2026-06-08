'use client'

import Navbar from "./_Components/navbar/Navbar";
import Footer from "./_Components/footer/Footer";
import { store } from '../lib/store'
import { Provider } from 'react-redux'
import './globals.css';




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Provider store={store}>
          <Navbar />
          <main style={{ flex: 1 }}>
            {children}
          </main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
