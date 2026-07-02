import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Blog",
  description: "Thoughts, tutorials, and stories about building with Next.js and modern web development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <div className="min-h-screen bg-[#fafafa]">
          <div className="max-w-[1120px] mx-auto px-6">
            <header className="py-10 border-b border-[#e5e5e5]">
              <div className="flex items-center justify-between">
                <Link href="/" className="text-sm font-medium tracking-[0.2em] uppercase text-[#1a1a1a]">
                  The Journal
                </Link>
                <nav className="flex gap-8">
                  <Link
                    href="/"
                    className="text-sm text-[#666] hover:text-[#1a1a1a] transition-colors"
                  >
                    Articles
                  </Link>
                  <Link
                    href="/blog"
                    className="text-sm text-[#666] hover:text-[#1a1a1a] transition-colors"
                  >
                    Archive
                  </Link>
                </nav>
              </div>
            </header>

            <main className="py-16">{children}</main>

            <footer className="py-10 border-t border-[#e5e5e5]">
              <div className="flex items-center justify-between">
                <p className="text-xs text-[#999] tracking-wide">
                  &copy; {new Date().getFullYear()} The Journal. All rights reserved.
                </p>
                <p className="text-xs text-[#999]">Made with Next.js</p>
              </div>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
