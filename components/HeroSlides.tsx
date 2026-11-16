"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Slide = { src: string; alt: string; pos: string };

/**
 * Hero photos that cross-fade every few seconds.
 * Has a pause button (WCAG 2.2.2) and stays still for people who prefer reduced motion.
 */
export default function HeroSlides({ slides, labels }: { slides: Slide[]; labels: { pause: string; play: string; show: string } }) {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPlaying(false);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setI((n) => (n + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, [playing, slides.length]);

  return (
    <>
      <div className="absolute inset-0 -z-20">
        {slides.map((s, n) => (
          <Image
            key={s.src}
            src={s.src}
            alt={n === i ? s.alt : ""}
            aria-hidden={n === i ? undefined : true}
            fill
            priority={n === 0}
            sizes="100vw"
            className={`hero-slide object-cover transition-opacity duration-[1400ms] ease-out ${n === i ? "is-active opacity-100" : "opacity-0"}`}
            style={{ objectPosition: s.pos }}
          />
        ))}
      </div>
      <div className="absolute right-3 top-3 z-10 flex items-center gap-1 sm:bottom-8 sm:right-8 sm:top-auto sm:gap-2">
        {slides.map((s, n) => (
          <button
            key={s.src}
            type="button"
            onClick={() => setI(n)}
            aria-label={`${labels.show} ${n + 1}`}
            aria-current={n === i ? "true" : undefined}
            className="flex h-11 w-6 items-center justify-center"
          >
            <span className={`block h-2.5 rounded-full transition-all ${n === i ? "w-6 bg-gold" : "w-2.5 bg-white/60"}`} />
          </button>
        ))}
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? labels.pause : labels.play}
          className="ml-1 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/50 text-white hover:bg-white/10"
        >
          {playing ? (
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><rect x="3" y="2" width="3.5" height="12" rx="1" /><rect x="9.5" y="2" width="3.5" height="12" rx="1" /></svg>
          ) : (
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M4 2.5v11l9-5.5z" /></svg>
          )}
        </button>
      </div>
    </>
  );
}
