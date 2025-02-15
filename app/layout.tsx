import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Tp Amigo Oculto",
  description: "Site para sorteio de Amigo Oculto.",
  icons: 'img/logo.jpg'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`dark bg-background`}
      >
        {children}
        <Toaster/>
      </body>
    </html>
  );
}
