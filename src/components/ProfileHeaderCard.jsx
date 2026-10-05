'use client';

import React from 'react';
import Image from 'next/image';
import { Mail, MapPin, Laptop, Github, Linkedin, ExternalLink, Calendar } from 'lucide-react';

const ProfileHeaderCard = ({ user }) => {
  return (
    <div className="bg-white rounded-3xl border border-teal-900/10 shadow-sm overflow-hidden mb-8">
      {/* Cover Banner */}
      <div className="h-32 sm:h-44 bg-gradient-to-r from-teal-600 via-teal-500 to-slate-800 relative" />

      {/* Profile Details Section */}
      <div className="px-6 sm:px-8 pb-8 relative">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 sm:-mt-20 mb-6 gap-4">
          {/* Profile Picture */}
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-3xl border-4 border-white shadow-md overflow-hidden bg-slate-100 flex-shrink-0">
            <Image
              src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'}
              alt={user.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Action Buttons / Socials */}
          <div className="flex items-center gap-3">
            <a
              href={user.githubUrl || '#'}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:border-teal-600 hover:text-teal-600 transition-colors"
              title="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={user.linkedinUrl || '#'}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:border-teal-600 hover:text-teal-600 transition-colors"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="/settings"
              className="px-4 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-colors"
            >
              Edit Profile
            </a>
          </div>
        </div>

        {/* User Meta Info */}
        <div className="space-y-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{user.name}</h1>
            <p className="text-teal-600 font-semibold text-sm sm:text-base mt-0.5">{user.title}</p>
          </div>

          <p className="text-slate-600 text-sm max-w-2xl leading-relaxed">
            {user.bio}
          </p>

          <div className="flex flex-wrap gap-y-2 gap-x-5 text-xs sm:text-sm text-slate-500 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-slate-400" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span>{user.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Laptop className="w-4 h-4 text-slate-400" />
              <span>{user.device}</span>
            </div>
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

export default ProfileHeaderCard;