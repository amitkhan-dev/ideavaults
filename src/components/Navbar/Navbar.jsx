'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSession, authClient } from '@/lib/auth-client';
import { Lightbulb, Menu, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';
import ThemeToggle from './ThemeToggle';
import UserDropdown from './UserDropdown';
import MobileMenu from './MobileMenu';

const NAV_LINKS = [
  { label: 'Home', href: '/', isPrivate: false },
  { label: 'Ideas', href: '/ideas', isPrivate: false },
  { label: 'Add Idea', href: '/add-idea', isPrivate: true },
  { label: 'My Ideas', href: '/my-ideas', isPrivate: true },
  { label: 'My Interactions', href: '/my-interactions', isPrivate: true },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleNavClick = (e, href, isPrivate) => {
    if (isPrivate && !session) {
      e.preventDefault();
      router.push(`/login?redirectTo=${encodeURIComponent(href)}`);
    }
  };

  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success('Logged out successfully');
            router.push('/login');
            router.refresh();
          },
        },
      });
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  if (!isMounted) return null;

  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-slate-900 border-b border-border-line shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-2 font-bold text-xl text-txt-primary hover:opacity-90"
        >
          <div className="p-1.5 rounded-lg bg-bg-subtle text-brand-primary">
            <Lightbulb className="w-5 h-5 fill-current" />
          </div>
          <span>IdeaVault</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, link.isPrivate)}
                className={`px-3.5 py-2 rounded-md text-sm font-medium transition-all ${
                  isActive
                    ? 'text-brand-primary bg-bg-subtle font-semibold'
                    : 'text-txt-primary hover:text-brand-primary hover:bg-bg-subtle/50'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          <div className="h-4 w-px bg-border-line mx-1" />

          {isPending ? (
            <div className="w-9 h-9 rounded-full bg-bg-subtle animate-pulse" />
          ) : session?.user ? (
            <div className="flex items-center gap-2">
              <UserDropdown user={session.user} />
              
              {/* Direct Logout Button next to Image */}
              <button
                onClick={handleLogout}
                className="p-2 flex items-center rounded-lg text-red-800 hover:bg-red-300  bg-red-200   dark:hover:bg-red-950/30 transition-colors"
                title="Logout"
                aria-label="Logout"
              >  <LogOut className="w-5 h-5" />Logout
                
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-3.5 py-1.5 rounded-md text-sm font-medium text-txt-primary hover:bg-bg-subtle"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-1.5 rounded-md text-sm font-medium text-white bg-brand-primary hover:bg-brand-hover rounded-lg shadow-sm"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />

          {isPending ? (
            <div className="w-8 h-8 rounded-full bg-bg-subtle animate-pulse" />
          ) : session?.user ? (
            <div className="flex items-center gap-1">
              <UserDropdown user={session.user} />
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
                title="Logout"
              >
                <span>Logout</span>
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : null}

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg text-txt-primary hover:bg-bg-subtle focus:outline-none"
            aria-label="Toggle Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={NAV_LINKS}
        session={session}
      />
    </header>
  );
}