"use client";

import type { YoutubeVideo } from "@/lib/youtube";
import { useMemo, useRef } from "react";
import { YoutubeCard } from "./youtube-card";

function scrollByAmount(el: HTMLElement, dir: 1 | -1) {
  const amount = Math.max(320, Math.floor(el.clientWidth * 0.85));
  el.scrollBy({ left: amount * dir, behavior: "smooth" });
}

export function YoutubeRail({
  title,
  videos,
  id,
  denseMeta = false,
}: {
  title: string;
  videos: YoutubeVideo[];
  id: string;
  denseMeta?: boolean;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const safeVideos = useMemo(() => videos.slice(0, 12), [videos]);

  if (safeVideos.length === 0) return null;

  return (
    <section className="rk-yt" aria-labelledby={id}>
      <header className="rk-yt__head">
        <h2 className="rk-yt__h" id={id}>
          {title}
        </h2>
        <div className="rk-yt__controls" aria-label="Scroll videos">
          <button
            type="button"
            className="rk-yt__btn"
            onClick={() => {
              const el = scrollerRef.current;
              if (el) scrollByAmount(el, -1);
            }}
            aria-label="Scroll left"
          >
            ‹
          </button>
          <button
            type="button"
            className="rk-yt__btn"
            onClick={() => {
              const el = scrollerRef.current;
              if (el) scrollByAmount(el, 1);
            }}
            aria-label="Scroll right"
          >
            ›
          </button>
        </div>
      </header>

      <div className="rk-yt__scroller" ref={scrollerRef}>
        {safeVideos.map((video) => (
          <div className="rk-yt__item" key={`${video.id}-${video.kind}`}>
            <YoutubeCard video={video} dense={denseMeta} />
          </div>
        ))}
      </div>
    </section>
  );
}

