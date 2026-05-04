/** HttpOnly session cookie (signed JWT, no PII beyond email in payload). */
export const SESSION_COOKIE = "rk_session";

/** Session lifetime (seconds). */
export const SESSION_MAX_AGE_SEC = 60 * 60 * 24 * 7;

export const DEMO_EMAIL_VAR = "RK_DEMO_USER_EMAIL";
export const DEMO_HASH_VAR = "RK_DEMO_PASSWORD_HASH";
export const DEMO_SALT_VAR = "RK_DEMO_PASSWORD_SALT";
export const AUTH_SECRET_VAR = "RK_AUTH_SECRET";
