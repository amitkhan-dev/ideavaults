'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import CommentsSection from '@/components/CommentsSection';
import {
  ArrowLeft,
  Tag,
  Calendar,
  User,
  DollarSign,
  Loader2,
  Sparkles,
  MessageCircle,
} from 'lucide-react';
import { useSession } from '@/lib/auth-client';

const IdeaDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const { data: session } = useSession();

  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIdeaDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`http://localhost:5000/api/ideas/${id}`);
        const result = await res.json();

        if (res.ok) {
          const fetchedData = result.data || result;
          setIdea(fetchedData);
        } else {
          setError(result.message || 'Idea not found!');
        }
      } catch (err) {
        console.error('Failed to fetch idea details:', err);
        setError('Server network error. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchIdeaDetails();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
          <p className="text-sm text-slate-500">
            Loading idea details...
          </p>
        </div>
      </main>
    );
  }

  if (error || !idea) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
            <span className="text-lg text-red-500">!</span>
          </div>

          <h2 className="text-lg font-bold text-slate-900">
            Unable to load this idea
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            {error || 'Idea not found!'}
          </p>

          <p className="mt-2 text-xs text-slate-400">
            Requested ID: {id}
          </p>

          <button
            onClick={() => router.back()}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>
        </div>
      </main>
    );
  }

  const ideaId = idea._id || idea.id || id;

  return (
    <main className="min-h-screen bg-slate-50/50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <button
          onClick={() => router.back()}
          className="mb-4 btn border p-2 rounded-md inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-teal-600">
          <ArrowLeft className="h-4 w-4" /> Back to Ideas
        </button>

        {/* Main Card */}
        <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-6 sm:px-10 sm:py-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-700">
              <Sparkles className="h-3.5 w-3.5" /> Community Idea
            </div>
            {/* Budget */}
            <div className="mb-4 flex flex-wrap items-center gap-2.5">
              {idea.category && (
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-teal-100 bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-700">
                  <Tag className="h-3.5 w-3.5" />{idea.category}
                  </span>
              )}
              {idea.estimatedBudget && (
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                  <DollarSign className="h-3.5 w-3.5" /> Estimated Budget: ${idea.estimatedBudget} </span>
              )}
            </div>
            <h1 className="max-w-4xl text-3xl font-extrabold  tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"> {idea.title || 'Untitled Idea'} </h1>
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-50 text-teal-600">
                  <User className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-[11px] text-slate-400">Shared by
                  </p>
                  <p className="font-semibold text-slate-700">
                    {idea.authorName || idea.authorEmail |'Anonymous'}
                  </p>
                </div>
              </div>
              <div className="hidden h-8 w-px bg-slate-200 sm:block" />
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500"> <Calendar className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-[11px] text-slate-400"> Published
                  </p>
                  <p className="font-medium text-slate-600">
                    {idea.createdAt
                      ? new Date(idea.createdAt).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          }
                        )
                      : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-4 py-6 sm:px-10 sm:py-10">
            <section>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-6 w-1 rounded-full bg-teal-600" />

                <h2 className="text-lg font-bold text-slate-900">
                  About this idea
                </h2>
              </div>
              <p className="max-w-4xl whitespace-pre-line text-[15px] leading-7 text-slate-600 sm:text-base sm:leading-8">
                {idea.fullDescription ||
                  idea.shortDescription ||
                  idea.description ||
                  'No detailed description provided.'}
              </p>
            </section>

            {/* Tags */}
            {idea.tags && idea.tags.length > 0 && (
              <section className="mt-10 border-t border-slate-100 pt-7">
                <div className="mb-3 flex items-center gap-2">
                  <Tag className="h-4 w-4 text-teal-600" />
                  <h3 className="text-sm font-bold text-slate-800">
                    Topics
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {idea.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-teal-50 hover:text-teal-700"> #{tag}
                    </span>
                  ))}
                </div>
              </section>
            )}
            <div className=" border-t border-slate-100 pt-8">
              <CommentsSection
                ideaId={ideaId}
                currentUserEmail={session?.user?.email || ''}
                currentUserName={session?.user?.name || 'Anonymous'}
              />
            </div>
          </div>
        </article>
      </div>
    </main>
  );
};

export default IdeaDetailsPage;