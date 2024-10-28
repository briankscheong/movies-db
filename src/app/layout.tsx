import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {Providers} from "./providers";
import { Viewport } from "next";

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
  title: "Movies.DB",
  description: "A site to get the most up-to-date information of movies",
};

export const viewport: Viewport = {
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-svh bg-gradient-to-b from-blue-900 to-gray-950 text-white bg-fixed`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
