'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Tag, ShieldCheck, Loader2 } from 'lucide-react';

export default function TrendingIdeas() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTrendingIdeas = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const res = await fetch('http://localhost:5000/api/ideas', {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error(`Server returned status: ${res.status}`);
        }

        const responseData = await res.json();
        
        if (Array.isArray(responseData)) {
          setIdeas(responseData);
        } else if (Array.isArray(responseData.ideas)) {
          setIdeas(responseData.ideas);
        } else if (Array.isArray(responseData.data)) {
          setIdeas(responseData.data);
        } else {
          setIdeas([]);
        }

      } catch (err) {
        console.error('Failed to load ideas:', err);
        setError(err.message || 'Failed to fetch trending ideas.');
      } finally {
        setLoading(false);
      }
    };

    getTrendingIdeas();
  }, []);

  if (loading) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[300px]">
          <Loader2 className="w-10 h-10 animate-spin text-brand-primary mb-4" />
          <p className="text-txt-muted text-sm animate-pulse">Loading trending ideas...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center py-10 px-6 rounded-2xl bg-bg-surface border border-status-error/30 text-status-error">
          <p className="font-semibold text-lg mb-2">Oops! Something went wrong.</p>
          <p className="text-sm opacity-80">{error}</p>
        </div>
      </section>
    );
  }

  const ideaList = Array.isArray(ideas) ? ideas : [];

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-subtle border border-border-line text-brand-primary text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Community Choice</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-txt-primary">
            Trending Project Ideas
          </h2>
        </div>

        <Link
          href="/ideas"
          className="inline-flex items-center gap-2 text-sm font-bold text-brand-primary hover:text-brand-hover transition-colors group"
        >
          <span>Explore All Ideas</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Ideas Cards Grid */}
      {ideaList.length === 0 ? (
        <div className="text-center py-12 bg-bg-surface rounded-2xl border border-border-line text-txt-muted">
          No trending ideas found at the moment.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideaList.slice(0, 6).map((idea) => (
            <div
              key={idea._id || idea.id}
              className="flex flex-col justify-between p-6 rounded-2xl bg-bg-surface border border-border-line hover:border-border-active shadow-sm hover:shadow-xl transition-all duration-200 group"
            >
              <div>
                {/* Category / Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-bg-subtle text-txt-secondary border border-border-line text-xs font-medium">
                    <Tag className="w-3 h-3 text-brand-primary" />
                    {idea.category || 'General'}
                  </span>
                  {idea.status && (
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-status-success flex items-center gap-1 bg-bg-subtle px-2 py-0.5 rounded border border-border-line">
                      <ShieldCheck className="w-3 h-3" />
                      {idea.status}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-txt-primary group-hover:text-brand-primary transition-colors line-clamp-1 mb-2">
                  {idea.title}
                </h3>

                {/* Description */}
                <p className="text-txt-secondary text-sm line-clamp-3 mb-6 leading-relaxed">
                  {idea.shortDescription || idea.description || 'No description provided for this startup concept.'}
                </p>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-border-line flex items-center justify-between text-xs text-txt-muted">
                <span className="font-medium text-txt-secondary">
                  By {idea.authorName || 'Anonymous'}
                </span>
                <Link
                  href={`/ideas/${idea._id || idea.id}`}
                  className="font-semibold text-brand-primary hover:text-brand-hover flex items-center gap-1 transition-colors"
                >
                  View Details
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}