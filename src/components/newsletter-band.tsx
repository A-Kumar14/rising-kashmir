"use client";

import { useFormState, useFormStatus } from "react-dom";
import {
  subscribeNewsletter,
  type NewsletterState,
} from "@/lib/newsletter-actions";
import type { UiDictionary } from "@/i18n/dictionary";

const initial: NewsletterState = { status: "idle" };

function BandSubmit({ dict }: { dict: UiDictionary }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? dict.newsletterPending : dict.newsletterSubscribe}
    </button>
  );
}

export function NewsletterBand({ dict }: { dict: UiDictionary }) {
  const [state, formAction] = useFormState(subscribeNewsletter, initial);

  return (
    <section id="newsletter-band" className="rk-news" aria-labelledby="rk-newsletter-h">
      <div className="rk-news__inner">
        <div className="rk-news__copy">
          <p id="rk-newsletter-h" className="rk-news__kicker">
            ★ {dict.rkNewsletterKicker.toUpperCase()}
          </p>
          <h3 className="rk-news__title">{dict.rkNewsletterTitle}</h3>
          <p className="rk-news__dek">{dict.rkNewsletterDek}</p>
        </div>
        {state.status === "ok" ? (
          <p className="rk-news__done">✓ {dict.rkNewsletterSuccessBand}</p>
        ) : (
          <div className="rk-news__form-stack">
            <form className="rk-news__form" action={formAction}>
              <input
                type="text"
                name="company"
                tabIndex={-1}
                className="hidden"
                aria-hidden
              />
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder={dict.newsletterPlaceholder}
                aria-label={dict.newsletterEmailLabel}
              />
              <BandSubmit dict={dict} />
            </form>
            {state.status === "error" ? (
              <p className="rk-news__err" role="alert">
                {state.message}
              </p>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}
