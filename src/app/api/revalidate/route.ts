import { revalidatePath, revalidateTag } from "next/cache";

/**
 * On-demand revalidation endpoint. Call from CMS webhook on publish/update:
 *   POST /api/revalidate?secret=...&path=/article/foo
 *   POST /api/revalidate?secret=...&tag=articles
 *
 * Secret comes from REVALIDATE_SECRET env var. Returns 401 if missing/wrong.
 */
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return Response.json(
      { revalidated: false, error: "REVALIDATE_SECRET not configured" },
      { status: 500 },
    );
  }

  const { searchParams } = new URL(request.url);
  if (searchParams.get("secret") !== secret) {
    return Response.json(
      { revalidated: false, error: "invalid secret" },
      { status: 401 },
    );
  }

  const path = searchParams.get("path");
  const tag = searchParams.get("tag");

  if (!path && !tag) {
    return Response.json(
      { revalidated: false, error: "path or tag required" },
      { status: 400 },
    );
  }

  if (path) revalidatePath(path);
  if (tag) revalidateTag(tag);

  return Response.json({ revalidated: true, path, tag, now: Date.now() });
}
