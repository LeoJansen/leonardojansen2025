import type { Metadata } from "next";
import { Open_Sans, Poppins } from "next/font/google";
import "./globals.css";
// Using the automatic React JSX runtime – no need to import React.

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});



export const metadata: Metadata = {
  title: "Leo Jansen | Portfólio de Projetos Web",
  description: "Explore o portfólio de projetos de Leonardo Jansen. Uma coleção de aplicações web modernas, construídas com as tecnologias mais recentes do mercado, como Next.js.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.variable} ${poppins.variable}  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
