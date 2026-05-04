"use server";

export type ContactState =
  | { status: "idle" }
  | { status: "ok" }
  | { status: "error"; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot. Real users leave this empty; bots fill every field.
  if ((formData.get("company") ?? "").toString().trim() !== "") {
    return { status: "ok" };
  }

  const name = (formData.get("name") ?? "").toString().trim();
  const email = (formData.get("email") ?? "").toString().trim();
  const message = (formData.get("message") ?? "").toString().trim();

  if (name.length < 2 || name.length > 200) {
    return { status: "error", message: "Name is required." };
  }
  if (!EMAIL_RE.test(email)) {
    return { status: "error", message: "A valid email is required." };
  }
  if (message.length < 10 || message.length > 5000) {
    return { status: "error", message: "Message must be 10–5000 characters." };
  }

  // TODO: deliver to inbox (SES/Postmark/Resend) or CRM webhook.
  // Keep this server action stable; only the transport below changes.
  console.log("[contact] submission", { name, email, length: message.length });

  return { status: "ok" };
}
