import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-white text-neutral-900">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:z-50 focus:top-4 focus:left-4 focus:p-3 focus:bg-white focus:border focus:rounded-lg"
        >
          Skip to main content
        </a>
        <Navigation aria-label="Main navigation" />
        <main id="main-content" className="flex-grow scroll-mt-20">
          {children}
        </main>
        <Footer aria-label="Footer" />
      </body>
      {process.env.NODE_ENV === 'production' && (
        <>
          <GoogleAnalytics gaId="G-4MLJN88VXV" />
          <GoogleTagManager gtmId="GTM-MMP9CTB6" />
        </>
      )}
    </html>
  );
}
