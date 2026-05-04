import {
  AUTH_SECRET_VAR,
  DEMO_EMAIL_VAR,
  DEMO_HASH_VAR,
  DEMO_SALT_VAR,
} from "./constants";

/**
 * Demo auth is enabled only when all secrets are present.
 * Production should replace this with OAuth / IdP and a real user store.
 */
export function isDemoAuthConfigured(): boolean {
  const secret = process.env[AUTH_SECRET_VAR]?.trim();
  const email = process.env[DEMO_EMAIL_VAR]?.trim();
  const hash = process.env[DEMO_HASH_VAR]?.trim();
  const salt = process.env[DEMO_SALT_VAR]?.trim();
  if (!secret || secret.length < 32) return false;
  if (!email || !hash || !salt) return false;
  if (!/^[0-9a-f]+$/i.test(hash) || !/^[0-9a-f]+$/i.test(salt)) return false;
  return true;
}

export function getAuthSecretBytes(): Uint8Array {
  const raw = process.env[AUTH_SECRET_VAR]?.trim();
  if (!raw || raw.length < 32) {
    throw new Error(`${AUTH_SECRET_VAR} must be set to a random string of at least 32 characters`);
  }
  return new TextEncoder().encode(raw);
}
