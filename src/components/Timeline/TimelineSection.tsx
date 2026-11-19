import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { timelineData } from './TimelineData';
import TimelineMonth from './TimelineMonth';
import { AnniversaryLetter } from './AnniversaryLetter';

gsap.registerPlugin(ScrollTrigger);

export const TimelineSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate timeline cards on scroll
      const cards = gsap.utils.toArray<HTMLElement>('.timeline-card');
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 50,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Animate timeline nodes
      const nodes = gsap.utils.toArray<HTMLElement>('.timeline-node');
      nodes.forEach((node) => {
        gsap.fromTo(
          node,
          {
            scale: 0.3,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: node,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Subtle celestial stars parallax
      gsap.to('.celestial-star', {
        y: -40,
        stagger: 0.1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Romantic transition background: Constellations & Warm glows */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft romantic ambient gradient */}
        <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-transparent via-[#881337]/10 to-transparent" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-[#881337]/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-[120px]" />

        {/* Scattered constellation stars */}
        {[
          { top: '10%', left: '15%', size: 3, delay: '0s' },
          { top: '25%', left: '85%', size: 2, delay: '1s' },
          { top: '40%', left: '10%', size: 4, delay: '2s' },
          { top: '55%', left: '90%', size: 2.5, delay: '0.5s' },
          { top: '70%', left: '20%', size: 3, delay: '1.5s' },
          { top: '85%', left: '80%', size: 4, delay: '2.5s' },
        ].map((star, i) => (
          <div
            key={i}
            className="celestial-star absolute rounded-full bg-[#F0D978] shadow-[0_0_10px_#D4AF37]"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: 0.6,
              animation: `float 4s ease-in-out infinite alternate ${star.delay}`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs uppercase tracking-widest font-jakarta">
            <span>Capítulo Final</span>
            <span className="w-1 h-1 rounded-full bg-[#FDA4AF]" />
            <span>Nuestra Línea del Tiempo</span>
          </div>

          <h2 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-bold tracking-wide gold-shimmer">
            NUESTRA HISTORIA
          </h2>

          <p className="font-playfair text-lg sm:text-xl text-[#FDA4AF] italic max-w-xl mx-auto">
            10 meses juntos — cada día, cada risa y cada batalla valió la pena 💛
          </p>
        </div>

        {/* Timeline Months Container */}
        <div ref={containerRef} className="relative">
          {timelineData.map((data) => (
            <TimelineMonth
              key={data.month}
              month={data.month}
              title={data.title}
              category={data.category}
              description={data.description}
              isSpecial={data.isSpecial}
            />
          ))}
        </div>

        {/* Anniversary Letter & Boarding Pass Finale */}
        <AnniversaryLetter />
      </div>
    </section>
  );
};

export default TimelineSection;
