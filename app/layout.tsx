import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hangman Game",
  description: "A fun and interactive Hangman word guessing game",
  viewport: {
    width: "device-width",
    initialScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700">
      <body className={`${geistSans.className} min-h-screen overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
