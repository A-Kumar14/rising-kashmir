"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  DEMO_EMAIL_VAR,
  DEMO_HASH_VAR,
  DEMO_SALT_VAR,
  SESSION_COOKIE,
  SESSION_MAX_AGE_SEC,
} from "@/lib/auth/constants";
import { isDemoAuthConfigured } from "@/lib/auth/config";
import { assertLoginRateAllowed, resetLoginRate } from "@/lib/auth/login-rate-limit";
import { verifyScryptPassword } from "@/lib/auth/password";
import { safeLocalePath } from "@/lib/auth/safe-redirect";
import { signSessionToken } from "@/lib/auth/session-token";
import type { Locale } from "@/i18n/config";
import { isLocale } from "@/i18n/config";

export type LoginState =
  | { status: "idle" }
  | { status: "error"; message: string };

const initial: LoginState = { status: "idle" };

function clientKey(): string {
  const h = headers();
  const fwd = h.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || h.get("x-real-ip") || "anon";
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  if (!isDemoAuthConfigured()) {
    return { status: "error", message: "not_configured" };
  }

  if ((formData.get("website") ?? "").toString().trim() !== "") {
    return { status: "idle" };
  }

  const email = (formData.get("email") ?? "").toString().trim().toLowerCase();
  const password = (formData.get("password") ?? "").toString();
  const rawLocale = (formData.get("locale") ?? "").toString();
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const nextRaw = (formData.get("next") ?? "").toString();
  const nextPath = safeLocalePath(nextRaw, locale);

  if (!EMAIL_RE.test(email)) {
    return { status: "error", message: "invalid_credentials" };
  }

  const rateKey = `${clientKey()}:${email}`;
  try {
    assertLoginRateAllowed(rateKey);
  } catch {
    return { status: "error", message: "rate_limited" };
  }

  const demoEmail = process.env[DEMO_EMAIL_VAR]!.trim().toLowerCase();
  const hash = process.env[DEMO_HASH_VAR]!.trim();
  const salt = process.env[DEMO_SALT_VAR]!.trim();

  const ok =
    email === demoEmail &&
    verifyScryptPassword(password, salt, hash);

  if (!ok) {
    return { status: "error", message: "invalid_credentials" };
  }

  resetLoginRate(rateKey);

  const token = await signSessionToken(email);
  cookies().set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SEC,
  });

  redirect(nextPath);
}

export async function logoutAction(formData: FormData) {
  const rawLocale = (formData.get("locale") ?? "").toString();
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const nextRaw = (formData.get("next") ?? "").toString();
  const nextPath = safeLocalePath(nextRaw, locale);

  cookies().delete({ name: SESSION_COOKIE, path: "/" });

  redirect(nextPath);
}
