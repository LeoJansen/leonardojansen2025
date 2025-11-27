import type { Metadata } from "next";
import { Open_Sans, Poppins } from "next/font/google";
import type { ReactNode } from "react";
import "@/app/globals.css";
import { defaultLocale, isLocale } from "@/i18n/config";
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
  title: "Leo Jansen",
  description:
    "Portfólio digital de Leonardo Jansen com projetos web modernos construídos em Next.js.",
    icons: {
    icon: "/assets/favicon.ico",
    apple: "/apple-touch-icon.png",          
    },
};

type RootLayoutProps = {
  children: ReactNode;
  params: Promise<Record<string, string | undefined>>;
};

export default async function RootLayout({
  children,
  params,
}: Readonly<RootLayoutProps>) {
  const resolvedParams = await params;
  const locale = isLocale(resolvedParams?.locale) ? resolvedParams.locale : defaultLocale;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${openSans.variable} ${poppins.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
