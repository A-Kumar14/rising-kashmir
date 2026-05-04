"use client";

import { useFormStatus } from "react-dom";
import { googleSignInAction } from "@/actions/auth";
import type { Locale } from "@/i18n/config";
import type { UiDictionary } from "@/i18n/dictionary";
import { withLocale } from "@/i18n/path";

function Submit({ dict }: { dict: UiDictionary }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="rk-login__submit" disabled={pending}>
      {pending ? "…" : dict.loginGoogleButton}
    </button>
  );
}

export function LoginForm({
  locale,
  dict,
  defaultNext,
}: {
  locale: Locale;
  dict: UiDictionary;
  defaultNext: string;
}) {
  return (
    <form className="rk-login__form" action={googleSignInAction}>
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="next" value={defaultNext} />
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="rk-login__hp"
      />
      <p className="rk-login__dek rk-login__google-dek">{dict.loginGoogleHint}</p>
      <Submit dict={dict} />
      <p className="rk-login__hint">
        <a href={withLocale(locale, "/")}>{dict.rkBackToFront}</a>
      </p>
    </form>
  );
}
