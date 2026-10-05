'use client';

import { Lightbulb, TrendingUp, Compass } from 'lucide-react';

const FEATURES = [
  {
    id: 'post-ideas',
    icon: Lightbulb,
    title: 'Post Ideas',
    description: 'Share early concepts to test traction quickly.',
  },
  {
    id: 'upvotes',
    icon: TrendingUp,
    title: 'Community Upvotes',
    description: 'Rank top ideas voted by fellow developers.',
  },
  {
    id: 'network',
    icon: Compass,
    title: 'Build Network',
    description: 'Connect with collaborators & co-founders.',
  },
];

export default function HeroFeatures() {
  return (
    <section className="bg-bg-page border-b border-border-line py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          {FEATURES.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.id}
                className="p-5 rounded-2xl bg-bg-surface border border-border-line flex items-start gap-4 hover:border-brand-primary/50 transition-all shadow-sm"
              >
                <div className="p-2.5 rounded-xl bg-bg-subtle text-brand-primary flex-shrink-0 border border-border-line">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-txt-primary">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-txt-muted mt-1 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}