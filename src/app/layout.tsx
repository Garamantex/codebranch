import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@ui5/webcomponents-react';
import '../ui5.config';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
} 