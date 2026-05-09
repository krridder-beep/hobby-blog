import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "HobbyVerse - 요리, 자동차, 코딩의 모든 것",
  description: "당신의 열정을 깨우는 화려한 취미 블로그",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Navbar />
        <main style={{ paddingTop: '100px' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
