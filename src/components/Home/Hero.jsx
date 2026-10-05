'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { 
  ChevronLeft, 
  ChevronRight, 
  PlusCircle, 
  Compass, 
  Search, 
  Sparkles, 
  Lightbulb, 
  Users, 
  Rocket,
  ArrowRight
} from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    badge: 'Collaborative Hub',
    title: 'Share Your Next Big Idea & Get Instant Feedback',
    subtitle: 'IdeaVault is a community platform where developers and creators share early concepts, gather validation, and refine project roadmaps.',
    ctaPrimary: { label: 'Share An Idea', href: '/add-idea' },
    ctaSecondary: { label: 'Explore Feed', href: '/ideas' },
    icon: Lightbulb,
    statNumber: '500+',
    statLabel: 'Shared Concepts',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Team collaborating on tech ideas',
  },
  {
    id: 2,
    badge: 'Community Driven',
    title: 'Discover Innovative Projects & Upvote The Best',
    subtitle: 'Explore trending ideas across AI, SaaS, E-commerce, and EdTech. Vote for concepts you love and support indie creators.',
    ctaPrimary: { label: 'Explore Ideas', href: '/ideas' },
    ctaSecondary: { label: 'View Top Rated', href: '/ideas?sort=popular' },
    icon: Users,
    statNumber: '1,200+',
    statLabel: 'Active Creators',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Developers discussing project architecture',
  },
  {
    id: 3,
    badge: 'Build & Scale',
    title: 'Turn Early Concepts Into Real-World Products',
    subtitle: 'Connect with potential co-founders, early adopters, and collaborators to bring your software and business projects to life.',
    ctaPrimary: { label: 'Start Building', href: '/add-idea' },
    ctaSecondary: { label: 'Learn More', href: '/about' },
    icon: Rocket,
    statNumber: '3,500+',
    statLabel: 'Upvotes & Feedback',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Product dashboard and analytics preview',
  },
];

const QUICK_TAGS = ['AI & Tech', 'SaaS', 'E-commerce', 'Health & Wellness', 'EdTech'];

const formatSearchQuery = (text) => {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-');
};

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const cleanSearchTerm = formatSearchQuery(searchQuery);
      router.push(`/ideas?search=${cleanSearchTerm}`);
    }
  };

  const handleTagClick = (tag) => {
    const cleanCategory = formatSearchQuery(tag);
    router.push(`/ideas?category=${cleanCategory}`);
  };

  return (
    <section className="relative bg-bg-page border-b border-border-line py-12 lg:py-16 transition-colors overflow-hidden">
      
      {/* Background Subtle Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-20">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-primary/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Swiper Carousel Container */}
        <div className="relative rounded-3xl bg-bg-surface border border-border-line shadow-xl p-6 sm:p-10 lg:p-12 overflow-hidden group">
          
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              el: '.custom-swiper-pagination',
            }}
            navigation={{
              nextEl: '.custom-swiper-button-next',
              prevEl: '.custom-swiper-button-prev',
            }}
            modules={[Autoplay, Pagination, Navigation]}
            className="w-full"
          >
            {SLIDES.map((slide) => {
              const SlideIcon = slide.icon;
              return (
                <SwiperSlide key={slide.id}>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[380px] pb-8">
                    
                    {/* Left Column: Details */}
                    <div className="lg:col-span-7 text-center lg:text-left flex flex-col justify-center">
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-bg-subtle border border-border-line text-brand-primary text-xs sm:text-sm font-semibold mb-6 w-fit mx-auto lg:mx-0 shadow-sm">
                        <Sparkles className="w-4 h-4 text-brand-primary" />
                        <span>{slide.badge}</span>
                      </div>

                      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-txt-primary tracking-tight leading-tight">
                        {slide.title}
                      </h1>

                      <p className="mt-4 text-base sm:text-lg text-txt-secondary font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
                        {slide.subtitle}
                      </p>

                      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                        <Link
                          href={slide.ctaPrimary.href}
                          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-brand-primary hover:bg-brand-hover text-white text-sm font-semibold shadow-md transition-all flex items-center justify-center gap-2"
                        >
                          <PlusCircle className="w-5 h-5" />
                          <span>{slide.ctaPrimary.label}</span>
                        </Link>

                        <Link
                          href={slide.ctaSecondary.href}
                          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-bg-subtle hover:bg-bg-subtle/80 text-txt-primary border border-border-line text-sm font-semibold transition-all flex items-center justify-center gap-2"
                        >
                          <Compass className="w-5 h-5 text-brand-primary" />
                          <span>{slide.ctaSecondary.label}</span>
                        </Link>
                      </div>
                    </div>

                    {/* Right Column: Dynamic Visual Image */}
                    <div className="lg:col-span-5 flex justify-center">
                      <div className="relative w-full max-w-md h-64 sm:h-80 rounded-2xl overflow-hidden border border-border-line shadow-lg group-hover:scale-[1.01] transition-transform duration-300">
                        
                        <Image
                          src={slide.image}
                          alt={slide.imageAlt}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover transition-transform duration-700 hover:scale-105"
                          priority={slide.id === 1}
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-bg-surface/90 backdrop-blur-md border border-border-line flex items-center gap-4 shadow-xl">
                          <div className="p-3 rounded-lg bg-bg-subtle text-brand-primary border border-border-line">
                            <SlideIcon className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-black text-txt-primary">{slide.statNumber}</h3>
                            <p className="text-xs text-txt-muted font-medium">{slide.statLabel}</p>
                          </div>
                        </div>

                      </div>
                    </div>

                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Slider Bottom Controls */}
          <div className="pt-4 border-t border-border-line flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="custom-swiper-pagination flex items-center gap-1.5 [&_.swiper-pagination-bullet]:bg-border-line [&_.swiper-pagination-bullet-active]:bg-brand-primary [&_.swiper-pagination-bullet-active]:w-6 [&_.swiper-pagination-bullet]:transition-all [&_.swiper-pagination-bullet]:rounded-full" />

            <div className="flex items-center gap-2">
              <button
                className="custom-swiper-button-prev p-2.5 rounded-xl bg-bg-subtle hover:bg-border-line text-txt-primary border border-border-line transition-all cursor-pointer"
                aria-label="Previous Slide"
                type="button"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                className="custom-swiper-button-next p-2.5 rounded-xl bg-bg-subtle hover:bg-border-line text-txt-primary border border-border-line transition-all cursor-pointer"
                aria-label="Next Slide"
                type="button"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

        {/* Global Search Bar */}
        <form 
          onSubmit={handleSearch} 
          className="mt-8 max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-2 p-2 bg-bg-surface border border-border-line rounded-2xl shadow-lg focus-within:border-brand-primary transition-all"
        >
          <div className="flex items-center gap-3 px-3 w-full text-txt-muted">
            <Search className="w-5 h-5 text-brand-primary flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ideas, tech stacks, or keywords..."
              className="w-full bg-transparent text-txt-primary text-sm focus:outline-none placeholder:text-txt-muted py-2"
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 bg-brand-primary hover:bg-brand-hover text-white text-sm font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-sm flex-shrink-0"
          >
            <span>Explore</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Filter Tags */}
        <div className="mt-6 flex items-center justify-center flex-wrap gap-2 text-xs sm:text-sm">
          <span className="text-txt-muted font-medium mr-1">Popular:</span>
          {QUICK_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              type="button"
              className="px-3 py-1 rounded-lg bg-bg-subtle text-txt-secondary hover:text-brand-primary hover:border-brand-primary border border-border-line transition-all"
            >
              {tag}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}