import { signOutAction } from "@/actions/auth";
import { getSession } from "@/lib/auth/get-session";
import type { Locale } from "@/i18n/config";
import type { UiDictionary } from "@/i18n/dictionary";
import { withLocale } from "@/i18n/path";
import Link from "next/link";

export async function UtilityAuthSlot({
  locale,
  dict,
}: {
  locale: Locale;
  dict: UiDictionary;
}) {
  const session = await getSession();

  if (session) {
    return (
      <span className="rk-util__auth">
        <Link
          href={withLocale(locale, "/account")}
          className="rk-util__link"
          title={dict.accountPageTitle}
        >
          {dict.navAccount}
        </Link>
        <span className="rk-util__sep" aria-hidden>
          │
        </span>
        <form className="rk-util__logout" action={signOutAction}>
          <input type="hidden" name="locale" value={locale} />
          <input type="hidden" name="next" value={withLocale(locale, "/")} />
          <button type="submit" className="rk-util__link">
            {dict.navLogout}
          </button>
        </form>
      </span>
    );
  }

  return (
    <Link
      href={withLocale(locale, "/login")}
      className="rk-util__link"
      title={dict.loginPageTitle}
    >
      {dict.utilitySignIn}
    </Link>
  );
}
