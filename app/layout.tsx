import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { FaTelegram, FaPatreon, FaEnvelope } from 'react-icons/fa';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Contributors",
  description: "Welcome to our Contributors! We are dedicated to developing and maintaining open source projects and packages aimed at assisting developers worldwide. Our mission is to contribute to the community by creating high-quality, reliable, and innovative software solutions.",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}
      >
      {children}
      <footer className="bg-gray-800 text-white p-4 mt-8">
        <div className="container mx-auto flex justify-center space-x-4">
          <a href="https://t.me/devKaban" target="_blank" rel="noopener noreferrer">
            <FaTelegram size={24} />
          </a>
          <a href="https://www.patreon.com/Contributors" target="_blank" rel="noopener noreferrer">
            <FaPatreon size={24} />
          </a>
          <a href="mailto:alexganbert@gmail.com">
            <FaEnvelope size={24} />
          </a>
        </div>
      </footer>
      </body>
      </html>
  );
}