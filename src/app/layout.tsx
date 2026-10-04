import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import { SITE_NAME, SITE_URL } from "@/constants";
import "./globals.css";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: "Place to be",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${notoSans.variable} h-full bg-[#1d5f7a]`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
