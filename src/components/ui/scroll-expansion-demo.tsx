'use client';

import { useState, useEffect } from 'react';
import ScrollExpandMedia from './scroll-expansion-hero';

interface MediaAbout {
  overview: string;
  conclusion: string;
}

interface MediaContentItem {
  src: string;
  poster?: string;
  background: string;
  title: string;
  date: string;
  scrollToExpand: string;
  about: MediaAbout;
}

interface MediaContentCollection {
  [key: string]: MediaContentItem;
}

const sampleMediaContent: MediaContentCollection = {
  video: {
    src: 'https://api2.mp4.to/static/uploads/c5e53649-1895-4dbc-90ca-3512b80a84da/kling_20260704_VIDEO_A_breathta_4177_0.mp4',
    poster:
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1280&auto=format&fit=crop',
    background:
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1920&auto=format&fit=crop',
    title: 'Immersive Video Experience',
    date: 'Dubai Horizon',
    scrollToExpand: 'Scroll to Expand Cinematic Experience',
    about: {
      overview:
        'This is a demonstration of the ScrollExpandMedia component with a high-definition cinematic capture of Dubai. As you scroll or swipe, the central video expands smoothly to fill the screen, delivering a rich spatial experience.',
      conclusion:
        'The ScrollExpandMedia component acts as an ultra-premium visual gateway, ideal for presenting state-of-the-art architectures and world-class developments.',
    },
  },
  image: {
    src: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1280&auto=format&fit=crop',
    background:
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1920&auto=format&fit=crop',
    title: 'Dynamic Image Showcase',
    date: 'Dubai Sunset',
    scrollToExpand: 'Scroll to Expand High-Resolution Image',
    about: {
      overview:
        'This is a demonstration of the ScrollExpandMedia component with an ultra-high-resolution photograph of the Dubai skyline at sunset. It demonstrates the exact same fluid transformation and layout-blending effects without requiring video streams.',
      conclusion:
        'Ideal for showcasing static assets, photography series, and rendering models with luxurious, uninhibited scale.',
    },
  },
};

const MediaContent = ({ mediaType, theme }: { mediaType: 'video' | 'image'; theme?: string }) => {
  const currentMedia = sampleMediaContent[mediaType];

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h2 className={`text-3xl font-serif font-bold mb-6 transition-colors duration-300 ${
        theme === 'dark' ? 'text-[#f3e5ab]' : 'text-[#aa7c11]'
      }`}>
        {currentMedia.title}
      </h2>
      <p className={`text-base mb-6 leading-relaxed transition-colors duration-300 ${
        theme === 'dark' ? 'text-gray-300' : 'text-stone-700'
      }`}>
        {currentMedia.about.overview}
      </p>
      <p className={`text-base leading-relaxed transition-colors duration-300 ${
        theme === 'dark' ? 'text-gray-400' : 'text-stone-600'
      }`}>
        {currentMedia.about.conclusion}
      </p>
    </div>
  );
};

export const VideoExpansionTextBlend = ({ theme }: { theme?: string }) => {
  const mediaType = 'video';
  const currentMedia = sampleMediaContent[mediaType];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <ScrollExpandMedia
        mediaType={mediaType}
        mediaSrc={currentMedia.src}
        posterSrc={currentMedia.poster}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
        textBlend
      >
        <MediaContent mediaType={mediaType} theme={theme} />
      </ScrollExpandMedia>
    </div>
  );
};

export const ImageExpansionTextBlend = ({ theme }: { theme?: string }) => {
  const mediaType = 'image';
  const currentMedia = sampleMediaContent[mediaType];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <ScrollExpandMedia
        mediaType={mediaType}
        mediaSrc={currentMedia.src}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
        textBlend
      >
        <MediaContent mediaType={mediaType} theme={theme} />
      </ScrollExpandMedia>
    </div>
  );
};

export const VideoExpansion = ({ theme }: { theme?: string }) => {
  const mediaType = 'video';
  const currentMedia = sampleMediaContent[mediaType];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <ScrollExpandMedia
        mediaType={mediaType}
        mediaSrc={currentMedia.src}
        posterSrc={currentMedia.poster}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
      >
        <MediaContent mediaType={mediaType} theme={theme} />
      </ScrollExpandMedia>
    </div>
  );
};

export const ImageExpansion = ({ theme }: { theme?: string }) => {
  const mediaType = 'image';
  const currentMedia = sampleMediaContent[mediaType];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <ScrollExpandMedia
        mediaType={mediaType}
        mediaSrc={currentMedia.src}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
      >
        <MediaContent mediaType={mediaType} theme={theme} />
      </ScrollExpandMedia>
    </div>
  );
};

const Demo = ({ theme }: { theme?: string }) => {
  const [mediaType, setMediaType] = useState<'video' | 'image'>('video');
  const currentMedia = sampleMediaContent[mediaType];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [mediaType]);

  return (
    <div className="min-h-screen relative">
      <div className="fixed top-24 right-4 z-50 flex gap-2">
        <button
          onClick={() => setMediaType('video')}
          className={`cursor-pointer px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider shadow-md transition-all ${
            mediaType === 'video'
              ? 'bg-[#d4af37] text-black'
              : 'bg-black/50 text-white border border-white/20 hover:bg-black/70'
          }`}
        >
          Cinematic Video
        </button>

        <button
          onClick={() => setMediaType('image')}
          className={`cursor-pointer px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider shadow-md transition-all ${
            mediaType === 'image'
              ? 'bg-[#d4af37] text-black'
              : 'bg-black/50 text-white border border-white/20 hover:bg-black/70'
          }`}
        >
          Skyline Image
        </button>
      </div>

      <ScrollExpandMedia
        mediaType={mediaType}
        mediaSrc={currentMedia.src}
        posterSrc={mediaType === 'video' ? currentMedia.poster : undefined}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
      >
        <MediaContent mediaType={mediaType} theme={theme} />
      </ScrollExpandMedia>
    </div>
  );
};

export default Demo;
