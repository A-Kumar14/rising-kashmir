const AUTH_SECRET = "AUTH_SECRET";
const LEGACY_SECRET = "RK_AUTH_SECRET";

/**
 * Google OAuth is enabled when Auth.js secret and Google web client credentials exist.
 * `AUTH_SECRET` is preferred; `RK_AUTH_SECRET` is accepted for existing deployments.
 */
export function isGoogleAuthConfigured(): boolean {
  const secret =
    process.env[AUTH_SECRET]?.trim() ?? process.env[LEGACY_SECRET]?.trim();
  const id = process.env.AUTH_GOOGLE_ID?.trim();
  const clientSecret = process.env.AUTH_GOOGLE_SECRET?.trim();
  if (!secret || secret.length < 32) return false;
  if (!id || !clientSecret) return false;
  return true;
}
