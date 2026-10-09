import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Aniq Hariz Afief | Portfolio',
  description:
    'An interactive personal album and creative developer portfolio inspired by physical vinyl record playback and minimalist editorial design.',
  keywords: ['Portfolio', 'Creative Developer', 'Three.js', 'WebGL', 'Vinyl Record', 'Interactive Audio'],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-white text-[#1E1E1E]">
      <body className="min-h-full antialiased bg-white text-[#1E1E1E] selection:bg-[#1E1E1E] selection:text-white">
        {children}
      </body>
    </html>
  );
}

