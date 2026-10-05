'use client';

import { useState } from 'react';
import { Edit2, Trash2, Check, X } from 'lucide-react';

export default function CommentItem({
  comment,
  currentUserEmail,
  onDelete,
  onUpdate,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.commentText || '');
  const [updating, setUpdating] = useState(false);

  const isOwner = comment.userEmail === currentUserEmail;

  const handleUpdate = async () => {
    if (!editText.trim()) return;

    try {
      setUpdating(true);

      await onUpdate(comment._id, editText);

      setIsEditing(false);
    } finally {
      setUpdating(false);
    }
  };

  const handleCancel = () => {
    setEditText(comment.commentText || '');
    setIsEditing(false);
  };

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-teal-200 hover:shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          {/* Avatar */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-700">
            {comment.userName?.charAt(0)?.toUpperCase() || 'U'}
          </div>

          <div className="min-w-0">
            <h4 className="truncate text-sm font-semibold text-slate-900">{comment.userName || 'Anonymous'}</h4>
            <p className="text-xs text-slate-400"> {comment.createdAt
                ? new Date(comment.createdAt).toLocaleDateString()
                : 'Just now'}
            </p>
          </div>
        </div>

  
        {isOwner && !isEditing && (
          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="rounded-lg p-2 text-slate-400 transition hover:bg-teal-50 hover:text-teal-600"
              title="Edit comment">
              <Edit2 className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => onDelete(comment._id)}
              className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
              title="Delete comment"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Comment Body */}
      <div className="mt-3 pl-12">
        {isEditing ? (
          <div className="space-y-3">
            <textarea
              rows={3}
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full resize-none rounded-xl border border-teal-200 bg-slate-50 p-3 text-sm text-slate-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"/>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={handleCancel}
                disabled={updating}
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-100"> 
                <X className="h-3.5 w-3.5" /> Cancel
              </button>

              <button
                type="button"
                onClick={handleUpdate}
                disabled={updating || !editText.trim()}
                className="inline-flex items-center gap-1.5 rounded-lg bg-teal-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50">
                <Check className="h-3.5 w-3.5" />
                {updating ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        ) : (
          <p className="whitespace-pre-line text-sm leading-6 text-slate-700">
            {comment.commentText}
          </p>
        )}
      </div>
    </article>
  );
}