import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from './components/Navbar';
import SessionWrapper from "./components/SessionWrapper"; 
import { InventoryProvider } from "./context/InventoryContext"; 
import { WasteProvider } from "./context/WasteContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EcoEats",
  description: "Track and manage your food waste",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-green-50 text-green-900`}>
        <InventoryProvider>
          <WasteProvider>
            <SessionWrapper>
              <Navbar />
              {children}
            </SessionWrapper>
          </WasteProvider>
        </InventoryProvider>
      </body>
    </html>
  );
}
