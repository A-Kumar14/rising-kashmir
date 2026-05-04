import { auth } from "@/auth";

export type SessionUser = { email: string; name?: string | null };

export async function getSession(): Promise<SessionUser | null> {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) return null;
  return { email, name: session?.user?.name };
}
