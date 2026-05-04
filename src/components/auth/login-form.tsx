"use client";

import { useFormState, useFormStatus } from "react-dom";
import { loginAction, type LoginState } from "@/actions/auth";
import type { Locale } from "@/i18n/config";
import type { UiDictionary } from "@/i18n/dictionary";
import { withLocale } from "@/i18n/path";

const initial: LoginState = { status: "idle" };

function Submit({ dict }: { dict: UiDictionary }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="rk-login__submit" disabled={pending}>
      {pending ? "…" : dict.loginSubmit}
    </button>
  );
}

function messageFor(code: string, dict: UiDictionary): string {
  switch (code) {
    case "invalid_credentials":
      return dict.loginErrorInvalid;
    case "rate_limited":
      return dict.loginErrorRateLimited;
    case "not_configured":
      return dict.loginErrorNotConfigured;
    default:
      return dict.loginErrorInvalid;
  }
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
  const [state, formAction] = useFormState(loginAction, initial);

  return (
    <form className="rk-login__form" action={formAction}>
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
      <label className="rk-login__label">
        <span>{dict.loginEmailLabel}</span>
        <input
          name="email"
          type="email"
          required
          autoComplete="username"
          className="rk-login__input"
        />
      </label>
      <label className="rk-login__label">
        <span>{dict.loginPasswordLabel}</span>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="rk-login__input"
        />
      </label>
      {state.status === "error" ? (
        <p className="rk-login__err" role="alert">
          {messageFor(state.message, dict)}
        </p>
      ) : null}
      <Submit dict={dict} />
      <p className="rk-login__hint">
        <a href={withLocale(locale, "/")}>{dict.rkBackToFront}</a>
      </p>
    </form>
  );
}
