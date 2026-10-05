'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { useSession } from '@/lib/auth-client';
import ProfileHeader from '@/components/Profile/ProfileHeader';
import StatsOverview from '@/components/Profile/StatsOverview';
import UserIdeasSection from '@/components/Profile/UserIdeasSection';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const DynamicProfilePage = () => {
  const { data: session, isPending: sessionLoading } = useSession();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({ name: '', email: '', image: '', joinedDate: '' });
  const [myIdeas, setMyIdeas] = useState([]);
  const [stats, setStats] = useState({ totalIdeas: 0, totalComments: 0 });

  useEffect(() => {
    if (sessionLoading) return;

    let currentUser = session?.user;
    if (!currentUser) {
      const storedUser = localStorage.getItem('user') || localStorage.getItem('authUser');
      if (storedUser) {
        try { currentUser = JSON.parse(storedUser); } catch (e) { console.error(e); }
      }
    }

    if (!currentUser) {
      setLoading(false);
      return;
    }

    const email = currentUser.email || '';
    setUser({
      name: currentUser.name || 'User',
      email,
      image: currentUser.image || currentUser.avatar || '',
      joinedDate: currentUser.createdAt
        ? new Date(currentUser.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        : 'Member',
    });

    if (email) fetchUserContent(email);
    else setLoading(false);
  }, [session, sessionLoading]);

  const fetchUserContent = async (email) => {
    try {
      setLoading(true);
      const encodedEmail = encodeURIComponent(email);
      const [ideasRes, commentsRes] = await Promise.all([
        fetch(`${API_URL}/api/ideas/user/${encodedEmail}`, { credentials: 'include' }),
        fetch(`${API_URL}/api/comments/user/${encodedEmail}`, { credentials: 'include' }),
      ]);

      const ideasResult = ideasRes.ok ? await ideasRes.json() : null;
      const commentsResult = commentsRes.ok ? await commentsRes.json() : null;

      const ideas = ideasResult?.data || [];
      const comments = commentsResult?.data || [];

      setMyIdeas(ideas);
      setStats({ totalIdeas: ideas.length, totalComments: comments.length });
    } catch (error) {
      console.error('Error fetching profile data:', error);
      setMyIdeas([]);
      setStats({ totalIdeas: 0, totalComments: 0 });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteIdea = async (ideaId) => {
    if (!window.confirm('Are you sure you want to delete this idea?')) return;

    try {
      const res = await fetch(`${API_URL}/api/ideas/${ideaId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const result = await res.json();

      if (!res.ok) throw new Error(result?.message || 'Failed to delete idea');

      setMyIdeas((prev) => prev.filter((idea) => idea._id !== ideaId));
      setStats((prev) => ({
        ...prev,
        totalIdeas: Math.max(0, prev.totalIdeas - 1),
      }));
    } catch (error) {
      alert(error.message || 'Failed to delete idea. Please try again.');
    }
  };

  if (sessionLoading || loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
        <p className="text-slate-500 text-sm">Loading profile data...</p>
      </div>
    );
  }

  if (!user.email) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <h1 className="text-xl font-bold text-slate-900">Please login to view your profile</h1>
          <Link href="/login" className="inline-flex items-center px-4 py-2 rounded-xl bg-teal-600 text-white text-sm font-medium hover:bg-teal-700">
            Login
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
      <div className="bg-white rounded-3xl border border-teal-900/10 shadow-sm overflow-hidden">
        <ProfileHeader user={user} />
        <div className="px-6 sm:px-8 pb-6">
          <StatsOverview stats={stats} />
        </div>
      </div>
      <UserIdeasSection ideas={myIdeas} onDeleteIdea={handleDeleteIdea} />
    </main>
  );
};

export default DynamicProfilePage;