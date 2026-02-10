import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Open_Sans, Poppins } from "next/font/google";
import "@/app/globals.css";
import { defaultLocale, isLocale } from "@/i18n/config";
// Using the automatic React JSX runtime – no need to import React.



const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
});

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.leonardojansen.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
