import type { Metadata } from "next";
import { Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import PageTransitionWrapper from "@/components/page-transition-wrapper";

const shareTechMono = Share_Tech_Mono({
  weight: "400",
  variable: "--font-share-tech-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Daniel Kliewer",
  description: "A modern developer portfolio built with Next.js, Tailwind CSS, and Framer Motion.",
  openGraph: {
    title: "Daniel Kliewer",
    description: "A modern developer portfolio built with Next.js, Tailwind CSS, and Framer Motion.",
    type: "website",
    url: "https://danielkliewer.com",
    images: [
      {
        url: "https://danielkliewer.com/art/cap.JPG",
        width: 1200,
        height: 630,
        alt: "Daniel Kliewer Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daniel Kliewer",
    description: "A modern developer portfolio built with Next.js, Tailwind CSS, and Framer Motion.",
    images: ["https://danielkliewer.com/art/cap.JPG"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${shareTechMono.variable} font-mono antialiased flex flex-col min-h-screen`}
        suppressHydrationWarning={true}
      >
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <PageTransitionWrapper>{children}</PageTransitionWrapper>
        </main>
        <Footer />
      </body>
    </html>
  );
}
