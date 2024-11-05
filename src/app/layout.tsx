import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthSessionProvider from "@/providers/sessionProvider";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Compre e venda perto de você",
  description:
    "OLX - Rápido e fácil para comprar e desapegar. Vender e comprar nunca foi tão fácil.",
  openGraph: {
    images: [
      {
        url: "/logometa.png",
        width: 400,
        height: 300,
        alt: "olx logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
      </body>
    </html>
  );
}
