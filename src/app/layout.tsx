import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/components/layout/ThemeProvider";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Knowledge Hub - 통합 지식 관리 시스템",
  description: "여러 플랫폼의 업무 기록과 문서를 하나의 지식 그래프로 통합하는 웹 서비스",
  keywords: ["지식관리", "통합검색", "AI검색", "업무관리", "문서관리"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="antialiased font-pretendard">
        <ThemeProvider>
          <div className="grid grid-cols-[280px_1fr] min-h-screen max-w-[100vw] overflow-x-hidden">
            <Sidebar />
            <div className="flex flex-col min-w-0 bg-[var(--bg-primary)]">
              <Header />
              <main className="p-8 lg:p-12 max-w-7xl w-full mx-auto">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

