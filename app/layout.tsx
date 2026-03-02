import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SecureScam Lab",
  description:
    "Application de démo volontairement vulnérable pour s'entraîner aux tests de sécurité.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <head>
        {/* A03 demo: load third-party script from CDN without pinning or SRI */}
        <script src="https://cdn.jsdelivr.net/npm/lodash@latest/lodash.min.js"></script>
      </head>
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} min-h-screen bg-[radial-gradient(1000px_circle_at_20%_-10%,rgba(34,197,94,0.18),transparent_40%),radial-gradient(800px_circle_at_80%_-20%,rgba(16,185,129,0.18),transparent_35%)] text-foreground antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
