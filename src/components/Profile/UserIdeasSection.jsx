'use client';

import React from 'react';
import Link from 'next/link';
import { Lightbulb, ExternalLink, Trash2 } from 'lucide-react';

const UserIdeasSection = ({ ideas, onDeleteIdea }) => {
  return (
    <div className="bg-white rounded-3xl border border-teal-900/10 shadow-sm p-6 sm:p-8 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-teal-600" />
          My Posted Ideas
        </h2>
        <span className="text-xs font-semibold text-slate-400">
          {ideas.length} {ideas.length === 1 ? 'Idea' : 'Ideas'}
        </span>
      </div>

      {ideas.length === 0 ? (
        <div className="text-center py-12 space-y-3">
          <p className="text-slate-500 text-sm">You haven't posted any ideas yet.</p>
          <Link href="/add-idea" className="inline-block text-xs font-bold text-teal-600 hover:underline">
            + Create your first idea
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {ideas.map((idea) => (
            <div
              key={idea._id}
              className="p-5 rounded-2xl border border-slate-100 hover:border-teal-200 hover:bg-teal-50/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <Link
                    href={`/ideas/${idea._id}`}
                    className="font-bold text-slate-900 hover:text-teal-600 transition-colors inline-flex items-center gap-1.5"
                  >
                    {idea.title}
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </Link>
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-semibold">
                    {idea.category || 'General'}
                  </span>
                </div>

                <p className="text-xs text-slate-500 line-clamp-2">
                  {idea.shortDescription || idea.description || 'No description available'}
                </p>

                {idea.createdAt && (
                  <p className="text-[11px] text-slate-400 pt-1">
                    Posted on: {new Date(idea.createdAt).toLocaleDateString()}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={() => onDeleteIdea(idea._id)}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                  title="Delete Idea"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserIdeasSection;