'use client';

import React from 'react';
import { ThumbsUp, Bookmark, MessageSquare } from 'lucide-react';

const InteractionNavTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'upvoted', label: 'Upvoted Ideas', icon: ThumbsUp },
    { id: 'bookmarked', label: 'Bookmarked', icon: Bookmark },
    { id: 'comments', label: 'My Comments', icon: MessageSquare },
  ];

  return (
    <div className="flex border-b border-slate-200 mb-8 space-x-6">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-4 text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors ${
              isActive
                ? 'border-teal-600 text-teal-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Icon className="w-4 h-4" /> {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default InteractionNavTabs;