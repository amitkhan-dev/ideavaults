'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, UserPlus, User, Mail, Loader2, Image as ImageIcon } from 'lucide-react';
import { signUp, signIn } from '@/lib/auth-client';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    photoURL: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Client-side Password Validation
  const validatePassword = (password) => {
    if (password.length < 6) {
      return 'Password must be at least 6 characters long.';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter.';
    }
    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter.';
    }
    return null;
  };

  //Email & Password Registration Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Password verification rule
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    setLoading(true);

    await signUp.email(
      {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        image: formData.photoURL || undefined,
      },
      {
        onSuccess: () => {
          toast.success('Account created successfully!');
          router.push('/');
          router.refresh();
        },
        onError: (ctx) => {
          const errorMsg = ctx.error?.message || 'Registration failed. Email might already exist.';
          setError(errorMsg);
          toast.error(errorMsg);
          setLoading(false);
        },
      }
    );
  };

  // Google Sign Up Handler
  const handleGoogleSignUp = async () => {
    setGoogleLoading(true);
    setError('');

    const fullCallbackUrl = typeof window !== 'undefined'
      ? `${window.location.origin}/`
      : '/';

    await signIn.social({
      provider: 'google',
      callbackURL: fullCallbackUrl,
    });
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1920&auto=format&fit=crop"
          alt="Developer Workspace Background"
          fill
          priority
          className="object-cover object-center filter blur-[2px] scale-105"
        />
        <div className="absolute inset-0 bg-slate-950/65 backdrop-blur-[2px]" />
      </div>

      <div className="w-full max-w-md bg-white/10 dark:bg-slate-900/40 backdrop-blur-md border border-white/20 dark:border-slate-700/50 rounded-3xl p-8 sm:p-10 shadow-2xl text-white">
        
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Create Account
          </h1>
          <p className="text-sm font-medium text-brand-primary mt-1">
            IdeaVault
          </p>
          <p className="text-xs text-slate-300 mt-1">
            Join us to explore and validate the best project concepts
          </p>
        </div>

        {/* Dynamic Error Message Display */}
        {error && (
          <div className="mb-4 p-3.5 rounded-xl bg-red-500/20 border border-red-500/50 text-red-100 text-xs text-center font-medium shadow-inner animate-fade-in">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900/60 border border-slate-700/60 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all pr-10"
              />
              <User className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900/60 border border-slate-700/60 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all pr-10"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password (Min 6 chars, A-Z, a-z)"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900/60 border border-slate-700/60 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                aria-label="Toggle Password Visibility"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
              Image URL <span className="text-slate-400 lowercase font-normal">(optional)</span>
            </label>
            <div className="relative">
              <input
                type="url"
                name="photoURL"
                value={formData.photoURL}
                onChange={handleChange}
                placeholder="https://example.com/photo.jpg"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900/60 border border-slate-700/60 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all pr-10"
              />
              <ImageIcon className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full mt-3 py-3 px-4 rounded-xl bg-brand-primary hover:bg-brand-hover text-white text-sm font-semibold shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>Registration</span>
                <UserPlus className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="relative my-5 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-700/60" />
          </div>
          <span className="relative px-3 bg-transparent text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
            OR
          </span>
        </div>

        <button
          type="button"
          onClick={handleGoogleSignUp}
          disabled={loading || googleLoading}
          className="w-full py-2.5 px-4 rounded-xl bg-white text-slate-900 hover:bg-slate-100 text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2.5 shadow-md cursor-pointer disabled:opacity-50"
        >
          {googleLoading ? (
            <Loader2 className="w-4 h-4 animate-spin text-slate-900" />
          ) : (
            <>
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>SignUp With Google</span>
            </>
          )}
        </button>

        <p className="mt-5 text-center text-xs text-slate-300">
          Already have an account?{' '}
          <Link href="/login" className="text-brand-primary font-semibold hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default RegisterPage;