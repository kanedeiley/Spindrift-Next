import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Providers from "./providers";
import {ClerkProvider} from '@clerk/nextjs';
import SpotsBar from "@/components/spotsbar/SpotsBar";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spindrift",
  description: "Surf Analytics, Forecasting & Personalization",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        <Providers>
        <Navbar>
        </Navbar>
        <SpotsBar />
        <main className="px-20 py-10">{children}</main>
        </Providers>
        </body>
    </html>
    </ClerkProvider>
  );
}
