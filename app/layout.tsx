import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import FloatingButtons from "./components/WhatsAppButton";
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sivakasi Crackers",
  description: "Premium quality crackers for your celebrations",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>
        {/* Background Pattern Container */}
        <div
          className="fixed inset-0 z-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage: 'url("/dark-container-grid.svg")',
            backgroundSize: "50px 50px",
            backgroundRepeat: "repeat",
            backgroundColor: "#ffffff",
          }}
        />

        {/* Content Container */}
        <div className="relative z-10">
          <AuthProvider>
            <CartProvider>
              <Header />
              <div className="flex-grow">
                {children}
              </div>
              <Footer />
              <FloatingButtons />
            </CartProvider>
          </AuthProvider>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
