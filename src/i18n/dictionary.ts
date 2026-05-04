import type { Locale } from "./config";

export type UiDictionary = {
  skipToContent: string;
  utilityWeather: string;
  utilityEpaper: string;
  utilitySignIn: string;
  utilityLangEn: string;
  utilityLangUr: string;
  mastheadEyebrow: string;
  mastheadTitle: string;
  navHome: string;
  navMore: string;
  navMenu: string;
  breakingLabel: string;
  opinionHeading: string;
  sectionMore: string;
  relatedHeading: string;
  articleMinRead: string;
  paginationPrevious: string;
  paginationNext: string;
  paginationAria: string;
  sectionColumnistsTeaser: string;
  sectionColumnistsLink: string;
  opinionSectionIntro: string;
  homeTitle: string;
  homeDescription: string;
  footerAbout: string;
  footerAboutLink: string;
  footerContact: string;
  footerSections: string;
  footerColumnists: string;
  columnistsMetaDescription: string;
  columnistsIntro: string;
  columnCountOne: string;
  columnCountMany: string;
  footerNewsletter: string;
  footerNewsletterBlurb: string;
  footerPrivacy: string;
  footerTerms: string;
  footerCookies: string;
  footerRss: string;
  footerRights: string;
  newsletterEmailLabel: string;
  newsletterPlaceholder: string;
  newsletterSubscribe: string;
  newsletterSuccess: string;
  newsletterPending: string;
  adLabel: string;
  signInTitle: string;
  sectionLabels: Record<string, string>;
  moreMenu: { label: string; hrefSuffix: string }[];
  aboutPageTitle: string;
  aboutPageDescription: string;
  aboutP1: string;
  aboutBeforeContactLink: string;
  aboutContactLink: string;
  aboutAfterContactLink: string;
  contactPageTitle: string;
  contactPageDescription: string;
  contactIntro: string;
  contactFormName: string;
  contactFormEmail: string;
  contactFormMessage: string;
  contactFormSend: string;
  contactFormSending: string;
  contactFormSuccess: string;
  notFoundTitle: string;
  notFoundDescription: string;
  notFoundHome: string;
  privacyMetaDescription: string;
  termsPageH1: string;
  termsMetaDescription: string;
  cookiesMetaDescription: string;
  todayLine: string;
  rkSearchPlaceholder: string;
  rkSubscribe: string;
  rkBackToFront: string;
  rkStampVol: string;
  rkStampNo: string;
  rkStampSrinagar: string;
  rkStampEst: string;
  rkStampPrintWeb: string;
  rkEditionLate: string;
  rkAlsoOnFront: string;
  rkOpinionColumnKicker: string;
  rkOpinionStripSub: string;
  rkNewsletterKicker: string;
  rkNewsletterTitle: string;
  rkNewsletterDek: string;
  rkNewsletterSuccessBand: string;
  rkFooterAddress: string;
  rkFooterAddressAlt: string;
  rkFooterTagline: string;
  rkHeroWireRule: string;
  rkBy: string;
  rkThemeLight: string;
  rkThemeDark: string;
  rkThemeSepia: string;
  rkSectionMoreLong: string;
  rkSectionMoreLongUr: string;
  rkHeroEditorial: string;
  rkHeroMagazine: string;
  rkHeroWire: string;
  rkArticleInThisStory: string;
};

const en: UiDictionary = {
  skipToContent: "Skip to content",
  utilityWeather: "Srinagar · Weather unavailable",
  utilityEpaper: "E-Paper",
  utilitySignIn: "Sign in",
  utilityLangEn: "English",
  utilityLangUr: "اردو",
  mastheadEyebrow: "Founded 2008 · Srinagar",
  mastheadTitle: "Rising Kashmir",
  navHome: "Home",
  navMore: "More",
  navMenu: "Menu",
  breakingLabel: "Breaking",
  opinionHeading: "Opinion",
  sectionMore: "More →",
  relatedHeading: "Related",
  articleMinRead: "min read",
  paginationPrevious: "Previous",
  paginationNext: "Next",
  paginationAria: "Pagination",
  sectionColumnistsTeaser: "Looking for columnists?",
  sectionColumnistsLink: "Browse the columnist index",
  opinionSectionIntro:
    "Columns from Srinagar, Jammu, and contributors on policy, society, and the region.",
  homeTitle: "Home",
  homeDescription:
    "Breaking news and reporting from Kashmir, Jammu, India, and the world — Rising Kashmir.",
  footerAbout: "About",
  footerAboutLink: "About / Masthead",
  footerContact: "Contact",
  footerSections: "Sections",
  footerColumnists: "Columnists",
  columnistsMetaDescription:
    "Opinion writers and their columns at Rising Kashmir.",
  columnistsIntro:
    "Regular voices on politics, society, and culture — organised by writer.",
  columnCountOne: "column",
  columnCountMany: "columns",
  footerNewsletter: "Newsletter",
  footerNewsletterBlurb:
    "Morning headlines for Srinagar and J&K. We will only use this address for the digest.",
  footerPrivacy: "Privacy",
  footerTerms: "Terms",
  footerCookies: "Cookies",
  footerRss: "RSS",
  footerRights: "All rights reserved.",
  newsletterEmailLabel: "Email",
  newsletterPlaceholder: "you@example.com",
  newsletterSubscribe: "Subscribe",
  newsletterSuccess: "Thanks — check your inbox to confirm.",
  newsletterPending: "…",
  adLabel: "Advertisement",
  signInTitle: "Account access is not available in this preview",
  sectionLabels: {
    kashmir: "Kashmir",
    jammu: "Jammu",
    india: "India",
    world: "World",
    opinion: "Opinion",
    sports: "Sports",
    business: "Business",
    "sci-tech": "Sci / Tech",
    travel: "Travel",
    entertainment: "Entertainment",
  },
  aboutPageTitle: "About Rising Kashmir",
  aboutPageDescription:
    "About Rising Kashmir — Srinagar's English daily.",
  aboutP1:
    "Rising Kashmir is a regional English-language daily published from Srinagar. This prototype demonstrates the redesigned information architecture, typography, and templates planned for the public site.",
  aboutBeforeContactLink: "Editorial inquiries should route through the",
  aboutContactLink: "contact page",
  aboutAfterContactLink:
    ". Subscription and account flows are out of scope for this frontend milestone.",
  contactPageTitle: "Contact",
  contactPageDescription: "Contact Rising Kashmir.",
  contactIntro:
    "For reader feedback, corrections, and editorial correspondence, use the form below.",
  contactFormName: "Name",
  contactFormEmail: "Email",
  contactFormMessage: "Message",
  contactFormSend: "Send",
  contactFormSending: "Sending…",
  contactFormSuccess: "Thanks — your message has been received.",
  notFoundTitle: "Page not found",
  notFoundDescription:
    "The story or section you requested is unavailable in this preview.",
  notFoundHome: "Return home",
  privacyMetaDescription: "Privacy policy for Rising Kashmir.",
  termsPageH1: "Terms of use",
  termsMetaDescription: "Terms of use for Rising Kashmir.",
  cookiesMetaDescription: "Cookie policy for Rising Kashmir.",
  todayLine: "Late edition",
  rkSearchPlaceholder: "Search the Valley…",
  rkSubscribe: "Subscribe",
  rkBackToFront: "← Back to front page",
  rkStampVol: "VOL. XIX",
  rkStampNo: "№ 124",
  rkStampSrinagar: "SRINAGAR",
  rkStampEst: "EST. 2008",
  rkStampPrintWeb: "PRINT · WEB",
  rkEditionLate: "LATE EDITION",
  rkAlsoOnFront: "Also on the front",
  rkOpinionColumnKicker: "Opinion & columnists",
  rkOpinionStripSub:
    "Voices from the Valley, the plains, and the diaspora — three columns this week.",
  rkNewsletterKicker: "Morning dispatch",
  rkNewsletterTitle: "Six stories from the Valley, in your inbox by 7 a.m.",
  rkNewsletterDek:
    "Hand-picked by the RK desk. Free, ad-free, unsubscribe anytime.",
  rkNewsletterSuccessBand: "You're on the list — see you in the morning.",
  rkFooterAddress: "Press Enclave, Polo View\nSrinagar, J&K · 190001",
  rkFooterAddressAlt: "news@risingkashmir.example\n+91-194-XXXX-XXX",
  rkFooterTagline: "An independent voice from the Valley since 2008.",
  rkHeroWireRule: "Front page",
  rkBy: "By",
  rkThemeLight: "Light",
  rkThemeDark: "Dark",
  rkThemeSepia: "Sepia",
  rkSectionMoreLong: "More in section →",
  rkSectionMoreLongUr: "← مزید پڑھیں",
  rkHeroEditorial: "Editorial",
  rkHeroMagazine: "Magazine",
  rkHeroWire: "Wire",
  rkArticleInThisStory: "In this story",
  moreMenu: [
    { label: "Business", hrefSuffix: "/section/business" },
    { label: "Sci / Tech", hrefSuffix: "/section/sci-tech" },
    { label: "Travel", hrefSuffix: "/section/travel" },
    { label: "Entertainment", hrefSuffix: "/section/entertainment" },
    { label: "Editorial", hrefSuffix: "/section/opinion" },
    { label: "Video", hrefSuffix: "/section/entertainment" },
    { label: "E-Paper", hrefSuffix: "/e-paper" },
  ],
};

const ur: UiDictionary = {
  skipToContent: "مواد پر جائیں",
  utilityWeather: "سری نگر · موسم دستیاب نہیں",
  utilityEpaper: "ای پیپر",
  utilitySignIn: "سائن ان",
  utilityLangEn: "English",
  utilityLangUr: "اردو",
  mastheadEyebrow: "قیام ۲۰۰۸ · سری نگر",
  mastheadTitle: "رائزنگ کشمیر",
  navHome: "صفحۂ اول",
  navMore: "مزید",
  navMenu: "فہرست",
  breakingLabel: "فوری",
  opinionHeading: "رائے",
  sectionMore: "مزید ←",
  relatedHeading: "متعلقہ",
  articleMinRead: "منٹ",
  paginationPrevious: "پچھلا",
  paginationNext: "اگلا",
  paginationAria: "صفحات",
  sectionColumnistsTeaser: "کالم نگاروں کی فہرست؟",
  sectionColumnistsLink: "فہرست دیکھیں",
  opinionSectionIntro:
    "سری نگر، جموں اور خطے کی پالیسی، معاشرے اور دیگر موضوعات پر کالم۔",
  homeTitle: "صفحۂ اول",
  homeDescription:
    "کشمیر، جموں، بھارت اور دنیا کی تازہ خبریں اور رپورٹنگ — رائزنگ کشمیر۔",
  footerAbout: "تعارف",
  footerAboutLink: "تعارف / ایڈیٹوریل بورڈ",
  footerContact: "رابطہ",
  footerSections: "باب",
  footerColumnists: "کالم نگار",
  columnistsMetaDescription:
    "رائزنگ کشمیر کے رائے کے کالم نگار اور ان کی تحریریں۔",
  columnistsIntro:
    "سیاست، معاشرے اور ثقافت پر مستقل آوازیں — مصنف کے حساب سے۔",
  columnCountOne: "کالم",
  columnCountMany: "کالم",
  footerNewsletter: "خبروں کا خلاصہ",
  footerNewsletterBlurb:
    "سری نگر اور جموں وکشمیر کی صبح کی سرخیاں۔ ہم صرف یہ پتہ استعمال کریں گے۔",
  footerPrivacy: "رازداری",
  footerTerms: "شرائط",
  footerCookies: "کوکیز",
  footerRss: "آر ایس ایس",
  footerRights: "جملہ حقوق محفوظ۔",
  newsletterEmailLabel: "ای میل",
  newsletterPlaceholder: "you@example.com",
  newsletterSubscribe: "سبسکرائب",
  newsletterSuccess: "شکریہ — تصدیق کے لیے اپنا ان باکس چیک کریں۔",
  newsletterPending: "…",
  adLabel: "اشتہار",
  signInTitle: "اس پیش نظارے میں اکاؤنٹ دستیاب نہیں",
  sectionLabels: {
    kashmir: "کشمیر",
    jammu: "جموں",
    india: "بھارت",
    world: "دنیا",
    opinion: "رائے",
    sports: "کھیل",
    business: "کاروبار",
    "sci-tech": "سائنس / ٹیکنالوجی",
    travel: "سفر",
    entertainment: "تفریح",
  },
  aboutPageTitle: "رائزنگ کشمیر کا تعارف",
  aboutPageDescription:
    "رائزنگ کشمیر — سری نگر کا انگریزی روزنامہ۔",
  aboutP1:
    "رائزنگ کشمیر علاقائی انگریزی روزنامہ ہے جو سری نگر سے شائع ہوتا ہے۔ یہ پیش نظارہ عوامی سائٹ کے لیے نئے ڈھانچے، ٹائپوگرافی اور سانچوں کی مثال ہے۔",
  aboutBeforeContactLink: "اداریاتی مراسلے کے لیے",
  aboutContactLink: "رابطے کا صفحہ",
  aboutAfterContactLink:
    " دیکھیں۔ سبسکرپشن اور اکاؤنٹ کے مراحل اس فرنٹ اینڈ کے دائرے میں نہیں۔",
  contactPageTitle: "رابطہ",
  contactPageDescription: "رائزنگ کشمیر سے رابطہ۔",
  contactIntro:
    "قارئین کی رائے، اصلاحات اور اداریاتی مراسلے کے لیے نیچے دیا گیا فارم استعمال کریں۔",
  contactFormName: "نام",
  contactFormEmail: "ای میل",
  contactFormMessage: "پیغام",
  contactFormSend: "بھیجیں",
  contactFormSending: "بھیجا جا رہا ہے…",
  contactFormSuccess: "شکریہ — آپ کا پیغام موصول ہو گیا۔",
  notFoundTitle: "صفحہ نہیں ملا",
  notFoundDescription:
    "جو کہانی یا باب آپ نے مانگا ہے یہ پیش نظارے میں دستیاب نہیں۔",
  notFoundHome: "واپس صفحۂ اول پر",
  privacyMetaDescription: "رائزنگ کشمیر کے لیے رازداری کی پالیسی۔",
  termsPageH1: "استعمال کی شرائط",
  termsMetaDescription: "رائزنگ کشمیر کے استعمال کی شرائط۔",
  cookiesMetaDescription: "رائزنگ کشمیر کے کوکی کے بارے میں پالیسی۔",
  todayLine: "تاخیری اشاعت",
  rkSearchPlaceholder: "تلاش کریں…",
  rkSubscribe: "سبسکرائب",
  rkBackToFront: "← صفحۂ اول پر واپس",
  rkStampVol: "جلد ۱۹",
  rkStampNo: "شمارہ ۱۲۴",
  rkStampSrinagar: "سری نگر",
  rkStampEst: "قیام ۲۰۰۸",
  rkStampPrintWeb: "چھپائی · ویب",
  rkEditionLate: "تاخیری اشاعت",
  rkAlsoOnFront: "صفحۂ اول پر مزید",
  rkOpinionColumnKicker: "رائے و کالم نگار",
  rkOpinionStripSub:
    "وادی، میدان اور بیرون ملک کی آوازیں — اس ہفتے تین کالم۔",
  rkNewsletterKicker: "صبح کا خلاصہ",
  rkNewsletterTitle: "وادی کی چھ خبریں، صبح ۷ بجے تک آپ کے ان باکس میں۔",
  rkNewsletterDek:
    "RK ڈیسک کا انتخاب۔ مفت، بغیر اشتہار، کسی بھی وقت رکیں۔",
  rkNewsletterSuccessBand: "فہرست میں شامل — صبح ملتے ہیں۔",
  rkFooterAddress: "پریس انکلیو، پولو ویو\nسری نگر، جے اینڈ کے · ۱۹۰۰۰۱",
  rkFooterAddressAlt: "news@risingkashmir.example\n+۹۱-۱۹۴-XXXX-XXX",
  rkFooterTagline: "۲۰۰۸ سے وادی کی آزاد آواز۔",
  rkHeroWireRule: "صفحۂ اول",
  rkBy: "از",
  rkThemeLight: "روشن",
  rkThemeDark: "تاریک",
  rkThemeSepia: "سیپیا",
  rkSectionMoreLong: "More in section →",
  rkSectionMoreLongUr: "← مزید پڑھیں",
  rkHeroEditorial: "اداری",
  rkHeroMagazine: "میگزین",
  rkHeroWire: "وائر",
  rkArticleInThisStory: "اس کہانی میں",
  moreMenu: [
    { label: "کاروبار", hrefSuffix: "/section/business" },
    { label: "سائنس و ٹیکنالوجی", hrefSuffix: "/section/sci-tech" },
    { label: "سفر", hrefSuffix: "/section/travel" },
    { label: "تفریح", hrefSuffix: "/section/entertainment" },
    { label: "اداریہ", hrefSuffix: "/section/opinion" },
    { label: "ویڈیو", hrefSuffix: "/section/entertainment" },
    { label: "ای پیپر", hrefSuffix: "/e-paper" },
  ],
};

const map: Record<Locale, UiDictionary> = { en, ur };

export function getDictionary(locale: Locale): UiDictionary {
  return map[locale] ?? en;
}
