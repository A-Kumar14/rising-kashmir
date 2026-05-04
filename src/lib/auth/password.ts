import { scryptSync, timingSafeEqual } from "node:crypto";

/**
 * Verifies a password against a stored scrypt hash (hex) and salt (hex).
 * Uses timing-safe comparison to reduce timing oracle risk.
 */
export function verifyScryptPassword(
  password: string,
  saltHex: string,
  storedHashHex: string,
): boolean {
  try {
    const salt = Buffer.from(saltHex, "hex");
    const expected = Buffer.from(storedHashHex, "hex");
    if (salt.length < 8 || expected.length < 32) return false;
    const derived = scryptSync(password, salt, expected.length);
    if (derived.length !== expected.length) return false;
    return timingSafeEqual(derived, expected);
  } catch {
    return false;
  }
}
