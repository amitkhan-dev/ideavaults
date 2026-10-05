'use client';

import { useEffect, useState } from 'react';
import { MessageSquare, Send, Loader2, Trash2, X, AlertTriangle } from 'lucide-react';
import CommentItem from './CommentItem';
import { toast } from 'react-hot-toast';

export default function CommentsSection({
  ideaId,
  currentUserEmail = 'dev@example.com',
  currentUserName = 'Amit Hasan',
}) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Delete modal state
  const [deleteCommentId, setDeleteCommentId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Fetch Comments
  const fetchComments = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:5000/api/comments/idea/${ideaId}`
      );

      const result = await res.json();

      if (res.ok) {
        setComments(result.data || []);
      }
    } catch (err) {
      console.error('Failed to load comments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ideaId) {
      fetchComments();
    }
  }, [ideaId]);

  // Add Comment
  const handleAddComment = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) return;

    try {
      setSubmitting(true);

      const res = await fetch('http://localhost:5000/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ideaId,
          userName: currentUserName,
          userEmail: currentUserEmail,
          commentText: newComment,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        setNewComment('');
        fetchComments();
        // toast.success('Comment added successfully');
      } else {
        toast.error(result.message || 'Failed to add comment');
      }
    } catch (err) {
      console.error('Failed to add comment:', err);
      toast.error('Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  // Open Delete Modal
  const handleDeleteClick = (commentId) => {
    setDeleteCommentId(commentId);
  };

  // Confirm Delete
  const handleConfirmDelete = async () => {
    if (!deleteCommentId) return;

    try {
      setDeleting(true);

      const res = await fetch(
        `http://localhost:5000/api/comments/${deleteCommentId}`,
        {
          method: 'DELETE',
        }
      );

      if (res.ok) {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== deleteCommentId)
        );

        toast.success('Comment deleted successfully');
        setDeleteCommentId(null);
      } else {
        toast.error('Failed to delete comment');
      }
    } catch (err) {
      console.error('Failed to delete comment:', err);
      toast.error('Something went wrong');
    } finally {
      setDeleting(false);
    }
  };

  // Update Comment
  const handleUpdateComment = async (commentId, commentText) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/comments/${commentId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            commentText,
          }),
        }
      );

      if (res.ok) {
        setComments((prev) =>
          prev.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  commentText,
                }
              : comment
          )
        );

        toast.success('Comment updated successfully');
      } else {
        toast.error('Failed to update comment');
      }
    } catch (err) {
      console.error('Failed to update comment:', err);
      toast.error('Something went wrong');
    }
  };

  return (
    <>
      <section className="mt-10 border-t border-slate-200 pt-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
              <MessageSquare className="h-5 w-5" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Comments
              </h3>

              <p className="text-sm text-slate-500">
                {comments.length}{' '}
                {comments.length === 1 ? 'comment' : 'comments'}
              </p>
            </div>
          </div>
        </div>

        {/* Add Comment */}
        <form
          onSubmit={handleAddComment}
          className="mb-8 rounded-2xl border border-slate-200 bg-slate-50/70 p-4"
        >
          <textarea
            rows={3}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts on this idea..."
            className="w-full resize-none rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
          />

          <div className="mt-3 flex justify-end">
            <button
              type="submit"
              disabled={submitting || !newComment.trim()}
              className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}

              {submitting ? 'Posting...' : 'Post Comment'}
            </button>
          </div>
        </form>

        {/* Comments */}
        {loading ? (
          <div className="flex min-h-32 items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-teal-600" />
          </div>
        ) : comments.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center">
            <MessageSquare className="mx-auto mb-3 h-8 w-8 text-slate-300" />

            <h4 className="text-sm font-semibold text-slate-700">
              No discussion yet
            </h4>

            <p className="mt-1 text-sm text-slate-400">
              Be the first person to share feedback on this idea.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {comments.map((comment) => (
              <CommentItem
                key={comment._id}
                comment={comment}
                currentUserEmail={currentUserEmail}
                onDelete={handleDeleteClick}
                onUpdate={handleUpdateComment}
              />
            ))}
          </div>
        )}
      </section>

      {/* Delete Confirmation Modal */}
      {deleteCommentId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            {/* Modal Icon */}
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
              <AlertTriangle className="h-6 w-6" />
            </div>

            {/* Modal Content */}
            <div className="mt-4 text-center">
              <h3 className="text-lg font-bold text-slate-900">
                Delete comment?
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                This comment will be permanently removed. This action cannot
                be undone.
              </p>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setDeleteCommentId(null)}
                disabled={deleting}
                className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={deleting}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deleting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}