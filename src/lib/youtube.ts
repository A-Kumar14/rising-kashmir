export type YoutubeVideo = {
  /** YouTube ID (not full URL). */
  id: string;
  title: string;
  /** Optional description shown under title. */
  dek?: string;
  /** For embed/aspect decisions. */
  kind: "video" | "short";
};

export function parseYouTubeId(url: string): { id: string; kind: "video" | "short" } | null {
  try {
    const u = new URL(url.trim());
    const host = u.hostname.replace(/^www\./, "");
    if (host !== "youtube.com" && host !== "m.youtube.com" && host !== "youtu.be") return null;

    if (host === "youtu.be") {
      const id = u.pathname.split("/").filter(Boolean)[0];
      if (!id) return null;
      return { id, kind: "video" };
    }

    const parts = u.pathname.split("/").filter(Boolean);
    if (parts[0] === "watch") {
      const id = u.searchParams.get("v");
      if (!id) return null;
      return { id, kind: "video" };
    }

    if (parts[0] === "shorts" && parts[1]) {
      return { id: parts[1], kind: "short" };
    }

    if (parts[0] === "embed" && parts[1]) {
      return { id: parts[1], kind: "video" };
    }

    // Fallback: try v=
    const v = u.searchParams.get("v");
    if (v) return { id: v, kind: "video" };
    return null;
  } catch {
    return null;
  }
}

export function dedupeById<T extends { id: string }>(items: T[]): T[] {
  const seen = new Set<string>();
  const out: T[] = [];
  for (const it of items) {
    if (seen.has(it.id)) continue;
    seen.add(it.id);
    out.push(it);
  }
  return out;
}

