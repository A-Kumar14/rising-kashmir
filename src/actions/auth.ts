"use server";

import { signIn, signOut } from "@/auth";
import { safeLocalePath } from "@/lib/auth/safe-redirect";
import type { Locale } from "@/i18n/config";
import { isLocale } from "@/i18n/config";

/** Honeypot field name — leave empty (bots often fill hidden fields). */
function isBotSubmission(formData: FormData): boolean {
  return (formData.get("website") ?? "").toString().trim() !== "";
}

export async function googleSignInAction(formData: FormData) {
  if (isBotSubmission(formData)) return;

  const rawLocale = (formData.get("locale") ?? "").toString();
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const nextRaw = (formData.get("next") ?? "").toString();
  const nextPath = safeLocalePath(nextRaw, locale);

  await signIn("google", { redirectTo: nextPath });
}

export async function signOutAction(formData: FormData) {
  const rawLocale = (formData.get("locale") ?? "").toString();
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const nextRaw = (formData.get("next") ?? "").toString();
  const nextPath = safeLocalePath(nextRaw, locale);

  await signOut({ redirectTo: nextPath });
}
