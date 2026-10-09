'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white text-[#1E1E1E] flex flex-col items-center justify-center p-6 text-center">
      <span className="text-xs font-mono uppercase tracking-widest text-muted mb-2">404</span>
      <h1 className="text-2xl font-bold mb-3">Page Not Found</h1>
      <p className="text-sm text-muted mb-6 max-w-sm">
        The requested side or track could not be found in this vinyl archive.
      </p>
      <Link
        href="/"
        className="px-4 py-2 rounded-xl bg-[#1E1E1E] text-white text-xs font-mono uppercase tracking-wider hover:bg-black/80 transition-colors"
      >
        Return to Turntable
      </Link>
    </div>
  );
}

