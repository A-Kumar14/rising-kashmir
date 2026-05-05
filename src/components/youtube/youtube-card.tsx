"use client";

import type { YoutubeVideo } from "@/lib/youtube";

function embedSrc(video: YoutubeVideo): string {
  const base = "https://www.youtube-nocookie.com/embed";
  if (video.kind === "short") {
    // Shorts also work with the standard embed endpoint.
    return `${base}/${video.id}`;
  }
  return `${base}/${video.id}`;
}

export function YoutubeCard({
  video,
  dense = false,
}: {
  video: YoutubeVideo;
  dense?: boolean;
}) {
  const ratioClass =
    video.kind === "short" ? "rk-yt__frame rk-yt__frame--short" : "rk-yt__frame";

  return (
    <article className="rk-yt__card">
      <div className={ratioClass}>
        <iframe
          src={embedSrc(video)}
          title={video.title}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      <div className={`rk-yt__meta ${dense ? "rk-yt__meta--dense" : ""}`}>
        <h3 className="rk-yt__title">{video.title}</h3>
        {video.dek ? <p className="rk-yt__dek">{video.dek}</p> : null}
      </div>
    </article>
  );
}

