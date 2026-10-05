'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Plus,
  Loader2,
  AlertCircle,
  Lightbulb,
} from 'lucide-react';

import { useSession } from '@/lib/auth-client';
import { toast } from 'react-hot-toast';

import IdeaTable from '@/components/IdeaTable';
import ConfirmModal from '@/components/ConfirmModal';

const MyIdeasPage = () => {
  const { data: session, isPending: sessionLoading } = useSession();

  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userEmail, setUserEmail] = useState('');

  const [deleteModal, setDeleteModal] = useState({
    open: false,
    idea: null,
  });

  const [deleting, setDeleting] = useState(false);

  // Get user email
  useEffect(() => {
    if (session?.user?.email) {
      setUserEmail(session.user.email);
      return;
    }

    const storedUser =
      localStorage.getItem('user') ||
      localStorage.getItem('authUser');

    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);

        const email =
          parsed.email ||
          parsed?.user?.email ||
          parsed?.data?.email;

        if (email) {
          setUserEmail(email);
        }
      } catch (err) {
        console.error('Error parsing user:', err);
      }
    }
  }, [session]);

  // Fetch user ideas
  const fetchMyIdeas = async (email) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        `http://localhost:5000/api/ideas/user/${encodeURIComponent(email)}`
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(
          result.message || 'Failed to fetch your ideas'
        );
      }

      const data =
        result.data ||
        (Array.isArray(result) ? result : []);

      setIdeas(data);
    } catch (err) {
      console.error('Error fetching ideas:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userEmail) {
      fetchMyIdeas(userEmail);
    } else if (!sessionLoading) {
      setLoading(false);
    }
  }, [userEmail, sessionLoading]);

  // Open delete modal
  const handleDeleteClick = (idea) => {
    setDeleteModal({
      open: true,
      idea,
    });
  };

  // Close delete modal
  const closeDeleteModal = () => {
    if (deleting) return;

    setDeleteModal({
      open: false,
      idea: null,
    });
  };

  // Confirm delete
  const handleConfirmDelete = async () => {
    const idea = deleteModal.idea;

    if (!idea?._id) return;

    try {
      setDeleting(true);

      const res = await fetch(
        `http://localhost:5000/api/ideas/${idea._id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(
          result.message || 'Failed to delete idea'
        );
      }

      // Remove from UI 
      setIdeas((prev) =>
        prev.filter((item) => item._id !== idea._id)
      );

      // Close modal
      setDeleteModal({
        open: false,
        idea: null,
      });

      // Toast
      toast.success('Idea deleted successfully');
    } catch (err) {
      console.error('Delete error:', err);
      toast.error(err.message || 'Failed to delete idea');
    } finally {
      setDeleting(false);
    }
  };

  // Loading
  if (sessionLoading && loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
      </div>
    );
  }

  return (
    <>
      <main className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">

          {/* Header */}
          <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
                <Lightbulb className="h-3.5 w-3.5" />
                Your Contributions
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                My Startup Ideas
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                Manage your ideas, review your concepts, and keep
                building something meaningful.
              </p>
            </div>

            <Link
              href="/add-idea"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700"
            >
              <Plus className="h-4 w-4" />
              Add New Idea
            </Link>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Loading */}
          {loading ? (
            <div className="flex min-h-64 items-center justify-center rounded-3xl border border-slate-200 bg-white">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-7 w-7 animate-spin text-teal-600" />
                <p className="text-sm text-slate-400">
                  Loading your ideas...
                </p>
              </div>
            </div>
          ) : !userEmail ? (
            /* Not logged in */
            <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
              <Lightbulb className="mx-auto mb-4 h-10 w-10 text-slate-300" />

              <h2 className="font-bold text-slate-800">
                Sign in to view your ideas
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Your submitted startup ideas will appear here.
              </p>

              <Link
                href="/login"
                className="mt-5 inline-flex text-sm font-semibold text-teal-600 hover:underline"
              >
                Go to Login
              </Link>
            </div>
          ) : ideas.length === 0 ? (
            /* Empty state */
            <div className="rounded-3xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
                <Lightbulb className="h-7 w-7" />
              </div>

              <h2 className="mt-5 text-lg font-bold text-slate-800">
                Your idea vault is empty
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                You haven't shared a startup idea yet. Have a
                concept in mind? Put it out there and let the
                community discover it.
              </p>

              <Link
                href="/add-idea"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
              >
                <Plus className="h-4 w-4" />
                Create Your First Idea
              </Link>
            </div>
          ) : (
            /* Ideas */
            <IdeaTable
              ideas={ideas}
              onDelete={handleDeleteClick}
            />
          )}
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        open={deleteModal.open}
        title="Delete Startup Idea?"
        message={
          deleteModal.idea
            ? `"${deleteModal.idea.title}" will be permanently removed from your ideas. This action cannot be undone.`
            : ''
        }
        onConfirm={handleConfirmDelete}
        onCancel={closeDeleteModal}
        loading={deleting}
      />
    </>
  );
};

export default MyIdeasPage;