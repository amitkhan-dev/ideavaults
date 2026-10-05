'use client';

import React, { useEffect, useState } from 'react';
import { Award, Lightbulb, ThumbsUp, Trophy, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function TopContributors() {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopContributors = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch('http://localhost:5000/api/ideas/top-contributors');
        const result = await res.json();

        if (res.ok) {
          const fetchedData = result.data || result;
          setContributors(Array.isArray(fetchedData) ? fetchedData : []);
        } else {
          throw new Error(result.message || 'Failed to fetch top contributors');
        }
      } catch (err) {
        console.error('Error fetching top contributors:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopContributors();
  }, []);

  const getRankBadge = (index) => {
    switch (index) {
      case 0:
        return {
          bg: 'bg-amber-500/10 border-amber-500/30 text-amber-500',
          icon: <Trophy className="w-4 h-4 text-amber-500" />,
          label: '1st Leader',
        };
      case 1:
        return {
          bg: 'bg-slate-300/10 border-slate-400/30 text-slate-400',
          icon: <Award className="w-4 h-4 text-slate-400" />,
          label: '2nd Rank',
        };
      case 2:
        return {
          bg: 'bg-amber-700/10 border-amber-700/30 text-amber-600',
          icon: <Award className="w-4 h-4 text-amber-600" />,
          label: '3rd Rank',
        };
      default:
        return {
          bg: 'bg-bg-subtle border-border-line text-txt-muted',
          icon: null,
          label: `#${index + 1}`,
        };
    }
  };

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-subtle border border-border-line text-brand-primary text-xs font-medium mb-3">
            <Trophy className="w-3.5 h-3.5" /> Community Leaders
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-txt-primary">Top Contributors</h2>
          <p className="text-txt-secondary text-sm mt-1 max-w-md">
            Meet the innovative minds sharing the highest quality startup concepts.</p>
        </div>

        <Link
          href="/ideas"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-primary hover:text-brand-hover transition-colors">Explore All Ideas <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-7 h-7 animate-spin text-brand-primary" />
        </div>
      ) : error ? (
        <div className="p-6 text-center text-sm text-txt-muted bg-bg-surface border border-border-line rounded-2xl">
          Unable to load top contributors right now.
        </div>
      ) : contributors.length === 0 ? (
        <div className="p-6 text-center text-sm text-txt-muted bg-bg-surface border border-border-line rounded-2xl">
          No contributors found yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contributors.map((user, index) => {
            const rank = getRankBadge(index);
            const initial = user.name ? user.name.charAt(0).toUpperCase() : 'U';

            return (
              <div
                key={user._id || index}
                className="relative p-6 rounded-2xl bg-bg-surface border border-border-line hover:border-border-active shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-5">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold ${rank.bg}`}>
                      {rank.icon}
                      {rank.label}
                    </span>
                    <span className="text-xs font-medium text-txt-muted bg-bg-subtle px-2.5 py-1 rounded-md border border-border-line">
                      {user.role || 'Contributor'}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-extrabold text-lg flex items-center justify-center shrink-0">
                      {initial}
                    </div>
                    <div className="overflow-hidden">
                      <h3 className="text-lg font-bold text-txt-primary truncate">{user.name}</h3>
                      <p className="text-xs text-txt-muted truncate">
                        {user.email ? `${user.email.split('@')[0]}@***` : 'Verified Innovator'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border-line text-center">
                  <div className="p-2.5 rounded-xl bg-bg-subtle border border-border-line">
                    <div className="flex items-center justify-center gap-1 text-xs text-txt-muted mb-1">
                      <Lightbulb className="w-3.5 h-3.5 text-brand-primary" /> Shared
                    </div>
                    <span className="text-base font-bold text-txt-primary">
                      {user.ideasCount || 0} Ideas
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-bg-subtle border border-border-line">
                    <div className="flex items-center justify-center gap-1 text-xs text-txt-muted mb-1">
                      <ThumbsUp className="w-3.5 h-3.5 text-brand-primary" /> Upvotes
                    </div>
                    <span className="text-base font-bold text-txt-primary">
                      {user.totalUpvotes || 0}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}