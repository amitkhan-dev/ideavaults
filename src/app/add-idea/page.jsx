'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Lightbulb, Loader2, Plus, Tag, DollarSign, FileText, User, Mail } from 'lucide-react';
import { useSession } from '@/lib/auth-client';
import toast from 'react-hot-toast';

const page = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    shortDescription: '',
    fullDescription: '',
    estimatedBudget: '',
    tags: '',
    authorName: '',
    authorEmail: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (session?.user) {
      setFormData((prev) => ({
        ...prev,
        authorName: session.user.name || '',
        authorEmail: session.user.email || '',
      }));
      return;
    }

    const storedUser = localStorage.getItem('user') || localStorage.getItem('authUser');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setFormData((prev) => ({
          ...prev,
          authorName: parsed.name || parsed?.user?.name || '',
          authorEmail: parsed.email || parsed?.user?.email || '',
        }));
      } catch (e) {
        console.error('Error reading stored user:', e);
      }
    }
  }, [session]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    // Dynamic Tag Array 
    const tagsArray = formData.tags
      ? formData.tags.split(',').map((tag) => tag.trim()).filter((tag) => tag.length > 0)
      : [];

    const ideaPayload = {
      title: formData.title,
      category: formData.category,
      shortDescription: formData.shortDescription,
      fullDescription: formData.fullDescription,
      estimatedBudget: formData.estimatedBudget ? Number(formData.estimatedBudget) : 0,
      tags: tagsArray,
      authorName: formData.authorName || 'Anonymous',
      authorEmail: formData.authorEmail || 'unregistered@example.com',
    };

    try {
      const res = await fetch('http://localhost:5000/api/ideas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ideaPayload),
      });

      const result = await res.json();

      if (res.ok && (result.success || res.status === 201)) {
        toast.success('Startup idea posted successfully!');
        
        setTimeout(() => {
          router.push('/my-ideas');
        }, 1000);
      } else {
        throw new Error(result.message || 'Failed to submit idea');
      }
    } catch (err) {
      console.error('Submit error:', err);
      toast.error(err.message || 'Failed to submit idea');
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-sm text-teal-700 font-semibold mb-6 hover:underline"
      >
        <ArrowLeft className="w-4 h-4" /> Go Back
      </button>

      {/* Main Form Container */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-teal-900/10 shadow-sm space-y-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold mb-3 border border-teal-100">
            <Lightbulb className="w-3.5 h-3.5" /> Share Your Vision
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Add New Startup Idea</h1>
          <p className="text-slate-600 text-sm mt-1">
            Fill out the details below to publish your startup concept to the community.
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Idea Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. AI-Powered Personal Bookkeeper"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-sm transition-all"
            />
          </div>

          {/* Category & Budget */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-sm bg-white transition-all"
              >
                <option value="">Select Category</option>
                <option value="SaaS & Web Software">SaaS & Web Software</option>
                <option value="Fintech & E-Commerce">Fintech & E-Commerce</option>
                <option value="AI & Automation">AI & Automation</option>
                <option value="Health & Wellness">Health & Wellness</option>
                <option value="Hardware & Renewable Energy">Hardware & Renewable Energy</option>
                <option value="EdTech">EdTech</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Estimated Budget ($)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <DollarSign className="w-4 h-4" />
                </span>
                <input
                  type="number"
                  name="estimatedBudget"
                  value={formData.estimatedBudget}
                  onChange={handleChange}
                  placeholder="e.g. 5000"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-sm transition-all"
                />
              </div>
            </div>
          </div>

          {/*Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Short Pitch / Hook <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="shortDescription"
              required
              value={formData.shortDescription}
              onChange={handleChange}
              placeholder="A one-sentence summary of your concept"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-sm transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Detailed Overview
            </label>
            <textarea
              name="fullDescription"
              rows={5}
              value={formData.fullDescription}
              onChange={handleChange}
              placeholder="Explain the problem, solution, business model, and implementation details..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-sm transition-all resize-y"
            ></textarea>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Tags (Comma separated)
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="e.g. react, nextjs, mongodb, startup"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-sm transition-all"
            />
          </div>

          {/* Author  Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Author Name</label>
              <div className="flex items-center gap-2 text-slate-800 text-sm font-semibold">
                <User className="w-4 h-4 text-teal-600" />
                <span>{formData.authorName || 'Not Logged In'}</span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Author Email</label>
              <div className="flex items-center gap-2 text-slate-800 text-sm font-semibold">
                <Mail className="w-4 h-4 text-teal-600" />
                <span>{formData.authorEmail || 'Not Logged In'}</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 px-6 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:bg-teal-300 text-white font-semibold text-sm transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" /> Publish Startup Idea
              </>
            )}
          </button>
        </form>
      </div>
    </main>
  );
};

export default page;