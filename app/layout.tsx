import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Footer } from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '2025년 정책자금 - 중소기업/소상공인 정책자금',
  description: '최대금리 최대30년 정책자금 무료 컨설팅',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        {/* Danggeun Market Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var script = document.createElement('script');
                script.src = 'https://karrot-pixel.business.daangn.com/0.4/karrot-pixel.umd.js';
                script.onload = function() {
                  window.karrotPixel.init('1754445139599400001');
                  window.karrotPixel.track('ViewPage');
                };
                document.head.appendChild(script);
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
        <Footer />
      </body>
    </html>
  )
}