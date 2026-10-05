'use client';

import React from 'react';
import Link from 'next/link';
import { ExternalLink, Trash2 } from 'lucide-react';

const InteractionsTable = ({ activeTab, interactions, onDeleteClick }) => {
  return (
    <div className="bg-white rounded-3xl border border-teal-900/10 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <th className="py-4 px-6">Idea Title</th>
              <th className="py-4 px-6">Category</th>
              <th className="py-4 px-6">Date</th>
              <th className="py-4 px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {interactions.map((item) => (
              <tr key={item._id} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-6 max-w-xs">
                  <Link
                    href={`/ideas/${item.ideaId || item._id}`}
                    className="font-bold text-slate-900 hover:text-teal-600 transition-colors inline-flex items-center gap-1.5"
                  >
                    {item.ideaTitle || item.title || 'View Idea'}
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </Link>
                  {activeTab === 'comments' && (
                    <p className="text-xs text-slate-500 mt-1 italic">"{item.commentText}"</p>
                  )}
                </td>

                <td className="py-4 px-6 text-slate-600 whitespace-nowrap">
                  {item.category || 'General'}
                </td>

                <td className="py-4 px-6 text-slate-500 whitespace-nowrap text-xs">
                  {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}
                </td>

                <td className="py-4 px-6 whitespace-nowrap text-right">
                  <button
                    onClick={() => onDeleteClick(item._id)}
                    className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InteractionsTable;