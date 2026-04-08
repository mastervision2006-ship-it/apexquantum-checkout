import './globals.css';
import { Cormorant_Garamond, DM_Sans, Barlow_Condensed } from 'next/font/google';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-ui',
  display: 'swap',
});

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-price',
  display: 'swap',
});

export const metadata = {
  title: 'Apex Quantum — Checkout',
  description: 'Finalize sua assinatura da Apex Quantum AI Trading System.',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${dmSans.variable} ${barlowCondensed.variable}`}>
      <body>{children}</body>
    </html>
  );
}
