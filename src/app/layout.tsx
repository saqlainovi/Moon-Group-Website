import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Moon Group | Leading Builder & Real Estate Developer in Bangladesh",
  description:
    "Moon Group of Industries Ltd — Moon Bangladesh Limited. Premium construction, residential & commercial real estate development under Al-haj Mizanur Rahman.",
  keywords: [
    "Moon Group Bangladesh",
    "Moon Bangladesh Limited",
    "construction company Bangladesh",
    "real estate developer Dhaka",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
