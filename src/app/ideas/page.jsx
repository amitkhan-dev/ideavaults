'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Tag, ArrowRight, Loader2, ThumbsUp, Bookmark } from 'lucide-react';
import { useSession } from '@/lib/auth-client';

export default function IdeasPage() {
  const { data: session } = useSession();
  const [ideas, setIdeas] = useState([]);
  const [userInteractions, setUserInteractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'SaaS', 'Productivity', 'GreenTech', 'Sports', 'E-Commerce', 'Developer Tools'];

  const userEmail = session?.user?.email;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:5000/api/ideas');
        const data = await res.json();
        setIdeas(data.data || data || []);

        if (userEmail) {
          const upvotedRes = await fetch(`http://localhost:5000/api/interactions/upvoted?email=${userEmail}`);
          const bookmarkedRes = await fetch(`http://localhost:5000/api/interactions/bookmarks?email=${userEmail}`);
          
          const upvotedData = await upvotedRes.json();
          const bookmarkedData = await bookmarkedRes.json();

          const combined = [
            ...(upvotedData.data || []),
            ...(bookmarkedData.data || [])
          ];
          setUserInteractions(combined);
        }
      } catch (err) {
        console.error('Failed to fetch data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userEmail]);

  const handleInteraction = async (ideaId, type) => {
    if (!userEmail) {
      alert('Please log in to interact!');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/interactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ideaId, userEmail, type }),
      });

      const result = await res.json();

      if (res.ok) {
        if (result.data?.action === 'added') {
          setUserInteractions((prev) => [...prev, { ideaId, type }]);
        } else {
          setUserInteractions((prev) =>
            prev.filter((item) => !(item.ideaId === ideaId && item.type === type))
          );
        }
      }
    } catch (err) {
      console.error('Interaction failed:', err);
    }
  };

  const isInteracted = (ideaId, type) => {
    return userInteractions.some(
      (item) => (item.ideaId === ideaId || item.ideaId?._id === ideaId) && item.type === type
    );
  };

  const filteredIdeas = ideas.filter((idea) => {
    const matchesSearch =
      idea.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      idea.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || idea.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen py-12 px-4 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Explore Startup Ideas</h1>
        <p className="text-slate-600 text-sm">Discover validated business concepts and early stage projects.</p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-teal-900/10 bg-white text-sm focus:outline-none focus:border-teal-500"
          />
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedCategory === cat
                  ? 'bg-teal-600 text-white'
                  : 'bg-white text-slate-600 border border-teal-900/10 hover:bg-teal-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Ideas Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
        </div>
      ) : filteredIdeas.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-teal-900/10 text-slate-500">
          No ideas found matching your criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIdeas.map((idea) => {
            const hasUpvoted = isInteracted(idea._id, 'upvoted');
            const hasBookmarked = isInteracted(idea._id, 'bookmarks');

            return (
              <div
                key={idea._id}
                className="p-6 rounded-2xl bg-white border border-teal-900/10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-medium">
                      <Tag className="w-3 h-3" /> {idea.category || 'General'}
                    </span>

                    {/* Upvote & Bookmark Quick Action Buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleInteraction(idea._id, 'upvoted')}
                        className={`p-1.5 rounded-lg border transition-all ${
                          hasUpvoted
                            ? 'bg-teal-600 text-white border-teal-600'
                            : 'border-slate-200 text-slate-500 hover:border-teal-500 hover:text-teal-600'
                        }`}
                        title="Upvote"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleInteraction(idea._id, 'bookmarks')}
                        className={`p-1.5 rounded-lg border transition-all ${
                          hasBookmarked
                            ? 'bg-amber-500 text-white border-amber-500'
                            : 'border-slate-200 text-slate-500 hover:border-amber-500 hover:text-amber-600'
                        }`}
                        title="Bookmark"
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2">{idea.title}</h3>
                  <p className="text-slate-600 text-sm line-clamp-2 mb-4">
                    {idea.shortDescription || idea.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">By {idea.authorName || 'Anonymous'}</span>
                  <Link
                    href={`/ideas/${idea._id}`}
                    className="font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1"
                  >
                    View Details <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}