import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Internship Search | Internshala Replica',
  description: 'Explore and filter internships dynamically in real time. Built as a production-grade assignment for SDE (Web) Internship.',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
