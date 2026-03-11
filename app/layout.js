import './globals.css';

export const metadata = {
  title: 'Apex Quantum — Checkout',
  description: 'Finalize sua assinatura da Apex Quantum AI Trading System.',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
