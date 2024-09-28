
import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

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
  title: 'Somnio Software - Online Store',
  description: 'Online Store of Somnio Software',
  icons: {
    icon: '/images/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/favicon.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.className} antialiased bg-gray-100 text-gray-500`}
      >
        {children}
      </body>
    </html>
  );
}
