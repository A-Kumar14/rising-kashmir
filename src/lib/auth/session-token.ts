import { SignJWT, jwtVerify } from "jose";
import { getAuthSecretBytes } from "./config";
import { SESSION_MAX_AGE_SEC } from "./constants";

const ISS = "rising-kashmir";
const AUD = "rk-web";

export type SessionPayload = {
  sub: string;
};

export async function signSessionToken(email: string): Promise<string> {
  const secret = getAuthSecretBytes();
  return await new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(email.toLowerCase().trim())
    .setIssuer(ISS)
    .setAudience(AUD)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE_SEC}s`)
    .sign(secret);
}

export async function verifySessionToken(
  token: string,
): Promise<SessionPayload | null> {
  try {
    const secret = getAuthSecretBytes();
    const { payload } = await jwtVerify(token, secret, {
      issuer: ISS,
      audience: AUD,
      algorithms: ["HS256"],
    });
    const sub = payload.sub;
    if (!sub || typeof sub !== "string") return null;
    return { sub };
  } catch {
    return null;
  }
}
