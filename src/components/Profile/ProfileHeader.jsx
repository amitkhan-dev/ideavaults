'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Calendar, Plus } from 'lucide-react';

const ProfileHeader = ({ user }) => {
  return (
    <div className="bg-white rounded-3xl border border-teal-900/10 shadow-sm overflow-hidden">
      <div className="h-32 sm:h-40 bg-gradient-to-r from-teal-600 to-slate-900" />
      <div className="px-6 sm:px-8 pb-6 relative">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 mb-6 gap-4">
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl border-4 border-white shadow-md bg-slate-100 overflow-hidden">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name}
                fill
                sizes="128px"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-teal-700 text-white flex items-center justify-center font-bold text-3xl uppercase">
                {user.name.charAt(0)}
              </div>
            )}
          </div>

          <Link
            href="/add-idea"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 text-white font-medium text-sm hover:bg-teal-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Post New Idea
          </Link>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{user.name}</h1>
          <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm text-slate-500 pt-1">
            {user.email && (
              <div className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-slate-400" />
                <span>{user.email}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Joined {user.joinedDate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;