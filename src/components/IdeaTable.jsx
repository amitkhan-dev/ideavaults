'use client';

import Link from 'next/link';
import {
  Trash2,
  Edit3,
  Tag,
  DollarSign,
  Eye,
} from 'lucide-react';

export default function IdeaTable({ ideas, onDelete }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      
      {/* Desktop Table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/80">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                Idea Details
              </th>

              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                Category
              </th>

              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                Budget
              </th>

              <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {ideas.map((item) => (
              <tr
                key={item._id}
                className="group transition hover:bg-slate-50/70"
              >
                {/* Idea */}
                <td className="max-w-md px-6 py-5">
                  <Link
                    href={`/ideas/${item._id}`}
                    className="block font-bold text-slate-900 transition hover:text-teal-600"
                  >
                    {item.title}
                  </Link>

                  <p className="mt-1 line-clamp-1 text-xs text-slate-500">
                    {item.shortDescription ||
                      item.description ||
                      'No description available'}
                  </p>

                  {item.createdAt && (
                    <p className="mt-2 text-[11px] text-slate-400">
                      Posted{' '}
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  )}
                </td>

                {/* Category */}
                <td className="px-6 py-5">
                  <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-700">
                    <Tag className="h-3 w-3" />
                    {item.category || 'General'}
                  </span>
                </td>

                {/* Budget */}
                <td className="px-6 py-5">
                  {item.estimatedBudget ? (
                    <span className="inline-flex items-center gap-0.5 font-semibold text-emerald-600">
                      <DollarSign className="h-3.5 w-3.5" />
                      {item.estimatedBudget}
                    </span>
                  ) : (
                    <span className="text-xs text-slate-400">
                      Not specified
                    </span>
                  )}
                </td>

                {/* Actions */}
                <td className="px-6 py-5">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/ideas/${item._id}`}
                      title="View Idea"
                      className="rounded-xl p-2.5 text-slate-400 transition hover:bg-teal-50 hover:text-teal-600"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>

                    <Link
                      href={`/edit-idea/${item._id}`}
                      title="Edit Idea"
                      className="rounded-xl p-2.5 text-slate-400 transition hover:bg-teal-50 hover:text-teal-600"
                    >
                      <Edit3 className="h-4 w-4" />
                    </Link>

                    <button
                      onClick={() => onDelete(item)}
                      title="Delete Idea"
                      className="rounded-xl p-2.5 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="divide-y divide-slate-100 md:hidden">
        {ideas.map((item) => (
          <div key={item._id} className="p-5">
            
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <Link
                  href={`/ideas/${item._id}`}
                  className="line-clamp-2 font-bold text-slate-900 hover:text-teal-600"
                >
                  {item.title}
                </Link>

                <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
                  {item.shortDescription ||
                    item.description ||
                    'No description available'}
                </p>
              </div>

              <span className="shrink-0 rounded-full bg-teal-50 px-2.5 py-1 text-[10px] font-semibold text-teal-700">
                {item.category || 'General'}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-600">
                {item.estimatedBudget
                  ? `$${item.estimatedBudget}`
                  : 'Budget N/A'}
              </span>

              <div className="flex items-center gap-1">
                <Link
                  href={`/ideas/${item._id}`}
                  className="rounded-lg p-2 text-slate-400 hover:bg-teal-50 hover:text-teal-600"
                >
                  <Eye className="h-4 w-4" />
                </Link>

                <Link
                  href={`/edit-idea/${item._id}`}
                  className="rounded-lg p-2 text-slate-400 hover:bg-teal-50 hover:text-teal-600"
                >
                  <Edit3 className="h-4 w-4" />
                </Link>

                <button
                  onClick={() => onDelete(item)}
                  className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}