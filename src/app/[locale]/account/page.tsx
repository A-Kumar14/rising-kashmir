import { logoutAction } from "@/actions/auth";
import { getSession } from "@/lib/auth/get-session";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { withLocale } from "@/i18n/path";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = { params: { locale: string } };

export function generateMetadata(props: Props): Metadata {
  if (!isLocale(props.params.locale)) return { title: "Account" };
  const dict = getDictionary(props.params.locale as Locale);
  return {
    title: dict.accountPageTitle,
    robots: { index: false, follow: false },
  };
}

export default async function AccountPage(props: Props) {
  if (!isLocale(props.params.locale)) {
    redirect("/en/account");
  }
  const locale = props.params.locale as Locale;
  const dict = getDictionary(locale);
  const session = await getSession();

  if (!session) {
    const next = encodeURIComponent(withLocale(locale, "/account"));
    redirect(`${withLocale(locale, "/login")}?next=${next}`);
  }

  return (
    <div className="rk-account">
      <div className="rk-account__inner">
        <h1 className="rk-account__title">{dict.accountPageTitle}</h1>
        <p className="rk-account__line">
          <span className="rk-account__label">{dict.accountSignedInAs}</span>{" "}
          <span className="rk-account__email">{session.email}</span>
        </p>
        <p className="rk-account__note">{dict.accountSessionNote}</p>

        <form className="rk-account__logout" action={logoutAction}>
          <input type="hidden" name="locale" value={locale} />
          <input
            type="hidden"
            name="next"
            value={withLocale(locale, "/")}
          />
          <button type="submit" className="rk-account__logout-btn">
            {dict.navLogout}
          </button>
        </form>

        <p className="rk-account__back">
          <Link href={withLocale(locale, "/")}>{dict.rkBackToFront}</Link>
        </p>
      </div>
    </div>
  );
}
