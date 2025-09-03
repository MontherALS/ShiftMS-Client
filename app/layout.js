import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/app/components/NavBar";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Shift Managment System",
  description: "A smart platform for managing employee shifts and group using",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-bl from-blue-50 to-indigo-100`}
      >
        <main className="min-h-screen flex flex-col">{children}</main>
      </body>
    </html>
  );
}
