import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClientShell } from "@/components/layout/ClientShell";
import { AuthProvider } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Hire Buddy - Bharat's Trusted Hiring Network",
  description: "Find verified buddies for daily help, companionship, and tasks. No middlemen. Fast hiring.",
  openGraph: {
    title: "Hire Buddy - Bharat's Trusted Hiring Network",
    description: "Find verified buddies for daily help, companionship, and tasks. No middlemen.",
    url: 'https://hirebuddy.app',
    siteName: 'Hire Buddy',
    images: [
      {
        url: 'https://hirebuddy.app/og-image.jpg', // Placeholder
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Inline script: apply theme before paint to prevent FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||t==="light"){document.documentElement.setAttribute("data-theme",t)}else{document.documentElement.setAttribute("data-theme","light")}}catch(e){document.documentElement.setAttribute("data-theme","light")}document.documentElement.setAttribute("data-theme-loading","");requestAnimationFrame(function(){requestAnimationFrame(function(){document.documentElement.removeAttribute("data-theme-loading")})})})();`,
          }}
        />
      </head>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased overflow-x-hidden",
        inter.variable,
        outfit.variable
      )}>
        <AuthProvider>
          <Navbar />
          <main className="flex-1 min-h-[calc(100vh-4rem)] pt-16 md:pt-20">
            <ClientShell>{children}</ClientShell>
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
