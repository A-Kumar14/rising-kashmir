#!/usr/bin/env node
/**
 * Generate scrypt hash + salt for RK_DEMO_PASSWORD_HASH / RK_DEMO_PASSWORD_SALT.
 * Usage: node scripts/hash-password.mjs "YourStrongPassword"
 */
import crypto from "node:crypto";

const password = process.argv[2];
if (!password || password.length < 12) {
  console.error("Usage: node scripts/hash-password.mjs \"YourStrongPassword\"");
  console.error("Password should be at least 12 characters.");
  process.exit(1);
}

const salt = crypto.randomBytes(16);
const hash = crypto.scryptSync(password, salt, 64);

console.log("\nAdd to .env.local (do not commit secrets):\n");
console.log(`RK_DEMO_PASSWORD_SALT=${salt.toString("hex")}`);
console.log(`RK_DEMO_PASSWORD_HASH=${hash.toString("hex")}`);
console.log("\nThen set RK_AUTH_SECRET (32+ chars) and RK_DEMO_USER_EMAIL.\n");
