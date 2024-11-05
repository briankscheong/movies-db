import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import {Providers} from "./providers";
import { Viewport } from "next";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-b from-blue-950 to-black text-white bg-fixed`}>
        {/* min-h-svh */}
        {/* <meta name="theme-color" content="#1e3a8a"/> */}
        <Providers>
          {children}
        </Providers>
      </body>
      <footer className="bg-gray-950 text-white py-4 pb-3 text-center shadow-md text-xs"> 
        {/* bg-slate-100  */}
        <div className="container mx-auto">
          &copy; {new Date().getFullYear()} Movies.db. All rights reserved.
          <div className="mt-2">
            {"</> with 🤍 by Brian Cheong."}
          </div>
        </div>
        <div className="flex flex-row items-center justify-center">
          <div className="mx-4 my-3">
            <Link href="https://www.linkedin.com/in/brian-cheong-computer-software/" aria-label="LinkedIn Profile" rel="noopener noreferrer" target="_blank">
              <FaLinkedin size={25}/>
            </Link>
          </div>
          <div className="mx-4 my-3">
            <Link href="https://github.com/briankscheong/" aria-label="GitHub Profile" rel="noopener noreferrer" target="_blank">
              <FaGithub size={25}/>
            </Link>
          </div>
          <div className="mx-4 my-3">
            <Link href="https://www.instagram.com/brian_cheong/" aria-label="Instagram Profile" rel="noopener noreferrer" target="_blank">
              <FaInstagram size={25}/>
            </Link>
          </div>
        </div>
      </footer>
    </html>
  );
}
