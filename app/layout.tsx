import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tp Amigo Secreto",
  description: "Site para sorteio de Amigo Secreto.",
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
      </body>
    </html>
  );
}
