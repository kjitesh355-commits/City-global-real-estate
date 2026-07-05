'use client';

import {
  useEffect,
  useRef,
  useState,
  ReactNode,
  useCallback,
} from 'react';
import { motion } from 'framer-motion';

interface ScrollExpandMediaProps {
  id?: string;
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  id,
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef(0);
  const expandedRef = useRef(false);
  const touchStartRef = useRef(0);

  useEffect(() => {
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
    progressRef.current = 0;
    expandedRef.current = false;
  }, [mediaType]);

  useEffect(() => {
    const checkIfMobile = (): void => {
      setIsMobileState(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleWheel = useCallback((e: WheelEvent) => {
    if (expandedRef.current && e.deltaY < 0 && window.scrollY <= 5) {
      setMediaFullyExpanded(false);
      expandedRef.current = false;
      e.preventDefault();
    } else if (!expandedRef.current) {
      e.preventDefault();
      const scrollDelta = e.deltaY * 0.0009;
      const newProgress = Math.min(Math.max(progressRef.current + scrollDelta, 0), 1);
      progressRef.current = newProgress;
      setScrollProgress(newProgress);

      if (newProgress >= 1) {
        setMediaFullyExpanded(true);
        expandedRef.current = true;
        setShowContent(true);
      } else if (newProgress < 0.75) {
        setShowContent(false);
      }
    }
  }, []);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartRef.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!touchStartRef.current) return;
    const touchY = e.touches[0].clientY;
    const deltaY = touchStartRef.current - touchY;

    if (expandedRef.current && deltaY < -20 && window.scrollY <= 5) {
      setMediaFullyExpanded(false);
      expandedRef.current = false;
      e.preventDefault();
    } else if (!expandedRef.current) {
      e.preventDefault();
      const scrollFactor = deltaY < 0 ? 0.008 : 0.005;
      const scrollDelta = deltaY * scrollFactor;
      const newProgress = Math.min(Math.max(progressRef.current + scrollDelta, 0), 1);
      progressRef.current = newProgress;
      setScrollProgress(newProgress);

      if (newProgress >= 1) {
        setMediaFullyExpanded(true);
        expandedRef.current = true;
        setShowContent(true);
      } else if (newProgress < 0.75) {
        setShowContent(false);
      }
      touchStartRef.current = touchY;
    }
  }, []);

  const handleTouchEnd = useCallback((): void => {
    touchStartRef.current = 0;
  }, []);

  useEffect(() => {
    window.addEventListener('wheel', handleWheel as unknown as EventListener, { passive: false });
    window.addEventListener('touchstart', handleTouchStart as unknown as EventListener, { passive: true });
    window.addEventListener('touchmove', handleTouchMove as unknown as EventListener, { passive: false });
    window.addEventListener('touchend', handleTouchEnd as EventListener);

    return () => {
      window.removeEventListener('wheel', handleWheel as unknown as EventListener);
      window.removeEventListener('touchstart', handleTouchStart as unknown as EventListener);
      window.removeEventListener('touchmove', handleTouchMove as unknown as EventListener);
      window.removeEventListener('touchend', handleTouchEnd as EventListener);
    };
  }, [handleWheel, handleTouchStart, handleTouchMove, handleTouchEnd]);

  const mediaWidth = 300 + scrollProgress * (isMobileState ? 650 : 1250);
  const mediaHeight = 400 + scrollProgress * (isMobileState ? 200 : 400);
  const textTranslateX = scrollProgress * (isMobileState ? 180 : 150);

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <div
      id={id}
      ref={sectionRef}
      className='transition-colors duration-700 ease-in-out overflow-x-hidden'
    >
      <section className='relative flex flex-col items-center justify-start min-h-[100dvh]'>
        <div className='relative w-full flex flex-col items-center min-h-[100dvh]'>
          <motion.div
            className='absolute inset-0 z-0 h-full'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 - scrollProgress }}
            transition={{ duration: 0.1 }}
          >
            <img
              src={bgImageSrc}
              alt='Background'
              width={1920}
              height={1080}
              className='w-screen h-screen object-cover object-center'
              loading='eager'
            />
            <div className='absolute inset-0 bg-black/15' />
          </motion.div>

          <div className='container mx-auto flex flex-col items-center justify-start relative z-10'>
            <div className='flex flex-col items-center justify-center w-full h-[100dvh] relative'>
              <div
                className='absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl'
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: '95vw',
                  maxHeight: '85vh',
                  boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.3)',
                  willChange: 'transform, width, height',
                }}
              >
                {mediaType === 'video' ? (
                  mediaSrc.includes('youtube.com') ? (
                    <div className='relative w-full h-full pointer-events-none'>
                      <iframe
                        width='100%'
                        height='100%'
                        src={
                          mediaSrc.includes('embed')
                            ? mediaSrc +
                              (mediaSrc.includes('?') ? '&' : '?') +
                              'autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1'
                            : mediaSrc.replace('watch?v=', 'embed/') +
                              '?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=' +
                              mediaSrc.split('v=')[1]
                        }
                        className='w-full h-full rounded-xl border-none'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                      />
                      <div
                        className='absolute inset-0 z-10'
                        style={{ pointerEvents: 'none' }}
                      ></div>
                      <div
                        className='absolute inset-0 bg-black/30 rounded-xl'
                        style={{ opacity: 0.5 - scrollProgress * 0.3 }}
                      />
                    </div>
                  ) : (
                    <div className='relative w-full h-full pointer-events-none'>
                      <video
                        src={mediaSrc}
                        poster={posterSrc}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload='auto'
                        className='w-full h-full object-cover rounded-xl'
                        controls={false}
                        disablePictureInPicture
                        disableRemotePlayback
                      />
                      <div
                        className='absolute inset-0 z-10'
                        style={{ pointerEvents: 'none' }}
                      ></div>
                      <div
                        className='absolute inset-0 bg-black/30 rounded-xl'
                        style={{ opacity: 0.5 - scrollProgress * 0.3 }}
                      />
                    </div>
                  )
                ) : (
                  <div className='relative w-full h-full'>
                    <img
                      src={mediaSrc}
                      alt={title || 'Media content'}
                      width={1280}
                      height={720}
                      className='w-full h-full object-cover rounded-xl'
                    />
                    <div
                      className='absolute inset-0 bg-black/50 rounded-xl'
                      style={{ opacity: 0.7 - scrollProgress * 0.3 }}
                    />
                  </div>
                )}

                <div className='flex flex-col items-center text-center relative z-10 mt-4'>
                  {date && (
                    <p
                      className='text-2xl text-amber-200 font-serif font-semibold tracking-wide drop-shadow-md'
                      style={{ transform: `translateX(-${textTranslateX}vw)` }}
                    >
                      {date}
                    </p>
                  )}
                  {scrollToExpand && (
                    <p
                      className='text-amber-100 font-medium text-center text-xs tracking-wider uppercase mt-1 drop-shadow-sm'
                      style={{ transform: `translateX(${textTranslateX}vw)` }}
                    >
                      {scrollToExpand}
                    </p>
                  )}
                </div>
              </div>

              <div
                className={`flex items-center justify-center text-center gap-4 w-full relative z-10 flex-col ${
                  textBlend ? 'mix-blend-difference' : 'mix-blend-normal'
                }`}
              >
                <h2
                  className='text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-[#f3e5ab] tracking-wide'
                  style={{ transform: `translateX(-${textTranslateX}vw)` }}
                >
                  {firstWord}
                </h2>
                <h2
                  className='text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-center text-[#f3e5ab] tracking-wide'
                  style={{ transform: `translateX(${textTranslateX}vw)` }}
                >
                  {restOfTitle}
                </h2>
              </div>
            </div>

            <section
              className='flex flex-col w-full px-4 py-8 md:px-16 lg:py-20 relative z-20'
              style={{
                opacity: showContent ? 1 : 0,
                transition: 'opacity 0.7s ease-in-out',
              }}
            >
              {children}
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
