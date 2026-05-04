"use server";

export type NewsletterState =
  | { status: "idle" }
  | { status: "ok" }
  | { status: "error"; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function subscribeNewsletter(
  _prev: NewsletterState,
  formData: FormData,
): Promise<NewsletterState> {
  if ((formData.get("company") ?? "").toString().trim() !== "") {
    return { status: "ok" };
  }

  const email = (formData.get("email") ?? "").toString().trim();
  if (!EMAIL_RE.test(email)) {
    return { status: "error", message: "A valid email is required." };
  }

  // TODO: hand off to ESP (Mailchimp / Brevo / Beehiiv) for double opt-in.
  // Until then we log and confirm — the user sees success but no email is
  // actually delivered. Wire transport before launch.
  console.log("[newsletter] subscribe", { email });

  return { status: "ok" };
}
