import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServiceWorkerRegistration } from "@/components/ServiceWorkerRegistration";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Seacret Beach Club | Tsilivi, Zakynthos",
  description:
    "The absolute all-day beach bar & restaurant in Tsilivi, Zakynthos. Discover environment, innovative cuisine & a unique beach experience.",
  keywords: "beach club, Zakynthos, Tsilivi, restaurant, beach bar, Seacret",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased`}>
        <ServiceWorkerRegistration />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
