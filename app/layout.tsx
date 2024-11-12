// app/layout.tsx
import Navigation from "@/components/Navigation";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <div className="min-h-screen">
            <Navigation />
            <main>{children}</main>
            <Toaster position="top-right" />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
