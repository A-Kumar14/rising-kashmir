import { LoginForm } from "@/components/auth/login-form";
import { isDemoAuthConfigured } from "@/lib/auth/config";
import { getSession } from "@/lib/auth/get-session";
import { safeLocalePath } from "@/lib/auth/safe-redirect";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { withLocale } from "@/i18n/path";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {
  params: { locale: string };
  searchParams?: { next?: string };
};

export function generateMetadata(props: Props): Metadata {
  if (!isLocale(props.params.locale)) return { title: "Sign in" };
  const dict = getDictionary(props.params.locale as Locale);
  return {
    title: dict.loginPageTitle,
    description: dict.loginPageDescription,
    robots: { index: false, follow: false },
  };
}

export default async function LoginPage(props: Props) {
  if (!isLocale(props.params.locale)) {
    redirect("/en/login");
  }
  const locale = props.params.locale as Locale;
  const dict = getDictionary(locale);
  const session = await getSession();
  if (session) {
    redirect(withLocale(locale, "/account"));
  }

  const nextParam = props.searchParams?.next;
  const defaultNext = withLocale(locale, "/account");
  const nextPath =
    typeof nextParam === "string"
      ? safeLocalePath(nextParam, locale)
      : defaultNext;

  const configured = isDemoAuthConfigured();

  return (
    <div className="rk-login">
      <div className="rk-login__inner">
        <header className="rk-login__head">
          <p className="rk-login__kicker">— {dict.loginKicker}</p>
          <h1 className="rk-login__title">{dict.loginPageTitle}</h1>
          <p className="rk-login__dek">{dict.loginPageDescription}</p>
        </header>

        {configured ? (
          <LoginForm locale={locale} dict={dict} defaultNext={nextPath} />
        ) : (
          <div className="rk-login__panel rk-login__panel--warn">
            <p className="rk-login__warn-title">{dict.authNotConfiguredTitle}</p>
            <p className="rk-login__warn-body">{dict.authNotConfiguredBody}</p>
          </div>
        )}

        <section className="rk-login__security" aria-labelledby="sec-h">
          <h2 id="sec-h" className="rk-login__sec-title">
            {dict.loginSecurityHeading}
          </h2>
          <ul className="rk-login__sec-list">
            {dict.loginSecurityPoints.map((p) => (
              <li key={p.slice(0, 40)}>{p}</li>
            ))}
          </ul>
        </section>

        <p className="rk-login__fine">
          {dict.loginFinePrint}{" "}
          <Link href={withLocale(locale, "/privacy")}>{dict.footerPrivacy}</Link>
          {" · "}
          <Link href={withLocale(locale, "/cookies")}>{dict.footerCookies}</Link>
        </p>
      </div>
    </div>
  );
}
