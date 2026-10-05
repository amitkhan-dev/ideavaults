import React from 'react';
import Link from 'next/link';
import { Home, Compass, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen w-full bg-bg-page flex items-center justify-center p-4 transition-colors">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Card */}
      <div className="relative w-full max-w-md bg-bg-surface border border-border-line rounded-3xl p-8 sm:p-10 text-center shadow-xl">
        
        {/* Colorful Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-bg-subtle border border-border-line text-brand-primary text-xs font-semibold mb-6">
          <Compass className="w-4 h-4 text-brand-primary" />
          <span>ERROR 404</span>
        </div>

        {/* Vibrant Gradient 404 Text */}
        <h1 className="text-7xl sm:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-brand-primary to-fuchsia-500 mb-2">
          404
        </h1>

        <h2 className="text-xl sm:text-2xl font-bold text-txt-primary">
          Page Not Found
        </h2>

        <p className="text-xs sm:text-sm text-slate-500 mt-3 leading-relaxed max-w-sm mx-auto">
          Oops! The concept or page you are looking for doesn&apos;t exist or has been moved to another vault.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-primary hover:bg-brand-hover text-white text-sm font-semibold shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Back To Home</span>
          </Link>

          <Link
            href="/ideas"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-bg-subtle hover:bg-border-line text-txt-primary border border-border-line text-sm font-semibold transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Explore Ideas</span>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default NotFound;