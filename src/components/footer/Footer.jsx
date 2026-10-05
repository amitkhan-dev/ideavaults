import React from 'react';
import Link from 'next/link';
import { Lightbulb, Heart } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-surface border-t border-border-line text-txt-secondary transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">

          {/* Brand Info */}
          <div className="lg:col-span-2">
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-2.5 text-txt-primary hover:opacity-90 transition-opacity"
              >
                <div className="p-2 rounded-xl bg-brand-primary text-white shadow-md">
                  <Lightbulb className="w-5 h-5" />
                </div>

                <span className="text-xl font-extrabold tracking-tight">
                  Idea<span className="text-brand-primary">Vault</span>
                </span>
              </Link>

              <p className="mt-4 text-sm text-txt-muted leading-relaxed max-w-sm">
                A community platform for developers, creators, and indie
                hackers to share early project concepts, validate ideas,
                and build products together.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="IdeaVault on GitHub"
                className="p-2.5 rounded-xl bg-bg-subtle text-txt-muted border border-border-line hover:text-brand-primary hover:border-brand-primary hover:-translate-y-0.5 transition-all"
              >
                <FaGithub className="w-4 h-4" />
              </a>

              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="IdeaVault on X"
                className="p-2.5 rounded-xl bg-bg-subtle text-txt-muted border border-border-line hover:text-brand-primary hover:border-brand-primary hover:-translate-y-0.5 transition-all"
              >
                <FaXTwitter className="w-4 h-4" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="IdeaVault on LinkedIn"
                className="p-2.5 rounded-xl bg-bg-subtle text-txt-muted border border-border-line hover:text-brand-primary hover:border-brand-primary hover:-translate-y-0.5 transition-all"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-xs font-semibold text-txt-primary uppercase tracking-wider mb-4">
              Explore
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/ideas"
                  className="text-txt-muted hover:text-brand-primary transition-colors"
                >
                  All Ideas
                </Link>
              </li>

              <li>
                <Link
                  href="/ideas?sort=popular"
                  className="text-txt-muted hover:text-brand-primary transition-colors"
                >
                  Top Voted
                </Link>
              </li>

              <li>
                <Link
                  href="/add-idea"
                  className="text-txt-muted hover:text-brand-primary transition-colors"
                >
                  Submit Concept
                </Link>
              </li>

              <li>
                <Link
                  href="/categories"
                  className="text-txt-muted hover:text-brand-primary transition-colors"
                >
                  Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xs font-semibold text-txt-primary uppercase tracking-wider mb-4">
              Categories
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/ideas?category=ai-tech"
                  className="text-txt-muted hover:text-brand-primary transition-colors"
                >
                  AI & Tech
                </Link>
              </li>

              <li>
                <Link
                  href="/ideas?category=saas"
                  className="text-txt-muted hover:text-brand-primary transition-colors"
                >
                  SaaS Solutions
                </Link>
              </li>

              <li>
                <Link
                  href="/ideas?category=e-commerce"
                  className="text-txt-muted hover:text-brand-primary transition-colors"
                >
                  E-Commerce
                </Link>
              </li>

              <li>
                <Link
                  href="/ideas?category=health-wellness"
                  className="text-txt-muted hover:text-brand-primary transition-colors"
                >
                  Health & Wellness
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-xs font-semibold text-txt-primary uppercase tracking-wider mb-4">
              Platform
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-txt-muted hover:text-brand-primary transition-colors"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/guidelines"
                  className="text-txt-muted hover:text-brand-primary transition-colors"
                >
                  Community Rules
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy"
                  className="text-txt-muted hover:text-brand-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/terms"
                  className="text-txt-muted hover:text-brand-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border-line flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-txt-muted">
          <p>
            © {currentYear} IdeaVault. All rights reserved.
          </p>

          <p className="flex items-center gap-1">
            <span>Built with</span>

            <Heart
              className="w-3.5 h-3.5 text-red-500 fill-red-500"
              aria-hidden="true"
            />

            <span>for indie developers.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;