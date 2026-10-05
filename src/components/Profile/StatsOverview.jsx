'use client';

import React from 'react';
import { Lightbulb, MessageSquare } from 'lucide-react';

const StatsOverview = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-100">
      <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
        <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase">
          <Lightbulb className="w-4 h-4 text-amber-500" />
          Total Ideas
        </div>
        <p className="text-2xl font-black text-slate-900 mt-1">{stats.totalIdeas}</p>
      </div>

      <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
        <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase">
          <MessageSquare className="w-4 h-4 text-teal-600" />
          Interactions
        </div>
        <p className="text-2xl font-black text-slate-900 mt-1">{stats.totalComments}</p>
      </div>
    </div>
  );
};

export default StatsOverview;