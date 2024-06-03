import { Metadata } from 'next';
import { Jost } from 'next/font/google';
import { AdminBar } from './_components/AdminBar';
import { Footer } from './_components/Footer';
import { Header } from './_components/Header';
import { Providers } from './_providers';
import { InitTheme } from './_providers/Theme/InitTheme';
import { mergeOpenGraph } from './_utilities/mergeOpenGraph';

import './_css/app.scss';

const jost = Jost({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-jost',
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link rel="icon" href="/favicon.jpg" sizes="32x32" type="image/jpeg" />
      </head>
      <body className={jost.variable}>
        <Providers>
          <AdminBar />
          <Header />
          <main className="main">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://resovalie.fr'),
  openGraph: mergeOpenGraph(),
};
