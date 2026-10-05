'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function MobileMenu({ isOpen, onClose, links, session }) {
  const pathname = usePathname();
  const router = useRouter();

  if (!isOpen) return null;

  const handleProtectedClick = (e, href, isPrivate) => {
    if (isPrivate && !session) {
      e.preventDefault();
      onClose();
      router.push(`/login?redirectTo=${encodeURIComponent(href)}`);
    } else {
      onClose();
    }
  };

  return (
    <>
      {/* Outside Click Overlay */}
      <div 
        className="fixed inset-0 z-40 bg-black/20 lg:hidden" 
        onClick={onClose}
      />

      {/* Compact Dropdown Card directly under Navbar */}
      <div className="absolute top-16 right-4 left-4 sm:left-auto sm:w-72 bg-white dark:bg-slate-900 border border-border-line rounded-xl shadow-xl p-3 z-50 lg:hidden transition-all">
        <nav className="flex flex-col gap-1">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleProtectedClick(e, link.href, link.isPrivate)}
                className={`px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                  isActive
                    ? 'bg-bg-subtle text-brand-primary font-semibold'
                    : 'text-txt-primary hover:bg-bg-subtle'
                }`}
              >
                <span>{link.label}</span>
                {link.isPrivate && !session && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-bg-subtle text-txt-muted border border-border-line">
                    Private
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}