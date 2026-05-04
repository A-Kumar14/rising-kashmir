import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const secret =
  process.env.AUTH_SECRET?.trim() ?? process.env.RK_AUTH_SECRET?.trim();

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  secret: secret || undefined,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID ?? "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET ?? "",
      authorization: { params: { prompt: "select_account" } },
    }),
  ],
});
