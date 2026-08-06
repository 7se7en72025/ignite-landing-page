import { Inter } from "next/font/google";
import siteContent from "@/data/siteContent";
import SmoothScroll from "@/components/ui/smooth-scroll";
import Cursor from "@/components/ui/cursor";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: siteContent.meta.title,
  description: siteContent.meta.description,
  openGraph: {
    title: siteContent.meta.title,
    description: siteContent.meta.description,
    images: [siteContent.meta.ogImage],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Cursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
