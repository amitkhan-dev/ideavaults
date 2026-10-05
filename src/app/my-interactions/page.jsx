'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Loader2, HeartHandshake } from 'lucide-react';
import { useSession } from '@/lib/auth-client';

import InteractionModalAndToast from '@/components/InteractionModalAndToast';
import InteractionNavTabs from '@/components/InteractionNavTabs';
import InteractionsTable from '@/components/InteractionsTable';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const MyInteractionsPage = () => {
  const { data: session, isPending: sessionLoading } = useSession();
  const [activeTab, setActiveTab] = useState('upvoted');
  const [interactions, setInteractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');

  const [deleteModal, setDeleteModal] = useState({ open: false, id: null });
  const [isDeleting, setIsDeleting] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 3500);
  };

  useEffect(() => {
    if (session?.user?.email) {
      setUserEmail(session.user.email);
    } else {
      const storedUser = localStorage.getItem('user') || localStorage.getItem('authUser');
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          setUserEmail(parsed.email || parsed?.user?.email || '');
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, [session]);

  useEffect(() => {
    const fetchInteractions = async () => {
      if (!userEmail) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const apiUrl =
          activeTab === 'comments'
            ? `${BASE_URL}/api/comments/user/${userEmail}`
            : `${BASE_URL}/api/interactions/${activeTab}?email=${userEmail}`;

        const res = await fetch(apiUrl);

        // ✅ HTML বা ভুল রেসপন্স আসলে হ্যান্ডেল করার নিরাপদ উপায়
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          console.error('Expected JSON, but received HTML or other format from server.');
          setInteractions([]);
          return;
        }

        const result = await res.json();

        if (res.ok) {
          setInteractions(result.data || (Array.isArray(result) ? result : []));
        } else {
          setInteractions([]);
        }
      } catch (err) {
        console.error('Fetch interaction error:', err);
        setInteractions([]);
      } finally {
        setLoading(false);
      }
    };

    if (userEmail) {
      fetchInteractions();
    } else if (!sessionLoading) {
      setLoading(false);
    }
  }, [userEmail, activeTab, sessionLoading]);

  const confirmRemove = async () => {
    const id = deleteModal.id;
    if (!id) return;

    try {
      setIsDeleting(true);
      const deleteUrl =
        activeTab === 'comments'
          ? `${BASE_URL}/api/comments/${id}`
          : `${BASE_URL}/api/interactions/${id}`;

      const res = await fetch(deleteUrl, { method: 'DELETE' });

      if (res.ok) {
        setInteractions((prev) => prev.filter((item) => item._id !== id));
        showToast('Interaction removed successfully!', 'success');
      } else {
        showToast('Failed to delete item. Please try again.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('An error occurred while deleting.', 'error');
    } finally {
      setIsDeleting(false);
      setDeleteModal({ open: false, id: null });
    }
  };

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative">
      <InteractionModalAndToast
        toast={toast}
        setToast={setToast}
        deleteModal={deleteModal}
        isDeleting={isDeleting}
        onCloseModal={() => setDeleteModal({ open: false, id: null })}
        onConfirmDelete={confirmRemove}
      />

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">My Interactions</h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          Track all the startup ideas you have upvoted, bookmarked, or commented on.
        </p>
      </div>

      <InteractionNavTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
        </div>
      ) : !userEmail ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-teal-900/10 shadow-sm space-y-4">
          <p className="text-slate-600 dark:text-slate-300 font-medium">Please log in to view your interactions.</p>
          <Link href="/login" className="inline-flex items-center gap-2 text-teal-600 font-semibold text-sm hover:underline">
            Go to Login Page
          </Link>
        </div>
      ) : interactions.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-teal-900/10 shadow-sm space-y-3">
          <HeartHandshake className="w-10 h-10 text-slate-400 mx-auto" />
          <p className="text-slate-600 dark:text-slate-300 font-medium">No {activeTab} activity found yet.</p>
          <Link href="/ideas" className="inline-flex items-center gap-2 text-teal-600 font-semibold text-sm hover:underline">
            Explore Startup Ideas
          </Link>
        </div>
      ) : (
        <InteractionsTable
          activeTab={activeTab}
          interactions={interactions}
          onDeleteClick={(id) => setDeleteModal({ open: true, id })}
        />
      )}
    </main>
  );
};

export default MyInteractionsPage;