import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import { SITE_NAME, SITE_URL } from "@/constants";
import "./globals.css";

// Segoe UI is the Windows 7 font; Noto Sans stands in on systems without it
const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: "Jesse's portfolio",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${notoSans.variable} h-full`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
