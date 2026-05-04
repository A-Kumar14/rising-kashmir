"use client";

import { useReportWebVitals } from "next/web-vitals";

/**
 * Reports Core Web Vitals (LCP, INP, CLS, FCP, TTFB). Today: console only.
 * When analytics ship, replace the body with a `navigator.sendBeacon` POST to
 * `/api/vitals` or a direct GA4/Plausible call. Keep mount cheap; avoid
 * importing heavy SDKs here.
 */
export function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    if (process.env.NODE_ENV !== "production") return;
    // TODO: ship to analytics endpoint (consent-gated).
    console.log("[web-vitals]", metric.name, metric.value, metric.id);
  });
  return null;
}
