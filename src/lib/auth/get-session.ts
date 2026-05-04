import { cookies } from "next/headers";
import { isDemoAuthConfigured } from "./config";
import { SESSION_COOKIE } from "./constants";
import { verifySessionToken } from "./session-token";

export type SessionUser = { email: string };

export async function getSession(): Promise<SessionUser | null> {
  if (!isDemoAuthConfigured()) return null;
  try {
    const token = cookies().get(SESSION_COOKIE)?.value;
    if (!token) return null;
    const payload = await verifySessionToken(token);
    if (!payload?.sub) return null;
    return { email: payload.sub };
  } catch {
    return null;
  }
}
