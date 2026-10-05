'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { User, Lightbulb, Folder, MessageSquare, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';

export default function UserDropdown({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success('Logged out successfully!'); 
            router.push('/login');
            router.refresh();
          },
          onError: () => {
            toast.error('Failed to log out!');
          }
        },
      });
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  return (
    <div className="relative inline-block text-left">
      {/* Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-9 h-9 rounded-full border border-border-line overflow-hidden flex items-center justify-center bg-bg-subtle focus:outline-none hover:ring-2 hover:ring-brand-primary/50 transition-all cursor-pointer"
        aria-label="User menu"
      >
        {user?.image ? (
          <Image
            src={user.image}
            alt={user.name || 'User'}
            width={36}
            height={36}
            className="object-cover w-full h-full rounded-full"
            unoptimized
          />
        ) : (
          <span className="font-semibold text-sm text-brand-primary">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Outside Click Overlay */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)} 
          />

          <div className="absolute right-0 mt-2 w-56 bg-bg-surface border border-border-line rounded-xl shadow-xl p-2 z-50">
            {/* User Profile Info */}
            <div className="px-3 py-2 border-b border-border-line mb-1">
              <p className="font-semibold text-sm text-txt-primary truncate">
                {user?.name || 'User'}
              </p>
              <p className="text-xs text-txt-secondary truncate">
                {user?.email || ''}
              </p>
            </div>

            {/* Menu Links */}
            <div className="space-y-0.5">
              <Link
                href="/my-profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-txt-primary hover:bg-bg-subtle hover:text-brand-primary transition-colors"
              >
                <User className="w-4 h-4 text-brand-primary" />
                Profile
              </Link>

              <Link
                href="/my-ideas"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-txt-primary hover:bg-bg-subtle hover:text-brand-primary transition-colors"
              >
                <Folder className="w-4 h-4 text-brand-primary" />
                My Ideas
              </Link>

              <Link
                href="/my-interactions"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-txt-primary hover:bg-bg-subtle hover:text-brand-primary transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-brand-primary" />
                My Interactions
              </Link>

              <Link
                href="/add-idea"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-txt-primary hover:bg-bg-subtle hover:text-brand-primary transition-colors"
              >
                <Lightbulb className="w-4 h-4 text-brand-primary" />
                Add Idea
              </Link>
            </div>

            {/* Logout Button */}
            <div className="border-t border-border-line mt-1 pt-1">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-red-600" />
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}