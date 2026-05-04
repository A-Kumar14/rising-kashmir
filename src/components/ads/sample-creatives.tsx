/** Sample house creatives — replace with GAM / direct sold campaigns in production. */

export function AdLeaderboardHome() {
  return (
    <a
      href="#newsletter-band"
      className="rk-ad rk-ad--leaderboard rk-ad--home"
      data-ad-kind="sample-house"
    >
      <span className="rk-ad__eyebrow">Sponsored · Heritage Walks</span>
      <span className="rk-ad__head">Discover old Srinagar lanes this weekend</span>
      <span className="rk-ad__cta">Learn more →</span>
    </a>
  );
}

export function AdLeaderboardGeneric() {
  return (
    <div
      className="rk-ad rk-ad--leaderboard rk-ad--generic"
      data-ad-kind="sample-house"
    >
      <span className="rk-ad__eyebrow">House placement</span>
      <span className="rk-ad__head">Your brand beside trusted Valley reporting</span>
      <span className="rk-ad__cta">ads@risingkashmir.example</span>
    </div>
  );
}

export function AdArticleNative() {
  return (
    <a
      href="#newsletter-band"
      className="rk-ad rk-ad--native"
      data-ad-kind="sample-house"
    >
      <span className="rk-ad__eyebrow">From our partners</span>
      <span className="rk-ad__head">Morning briefing: six stories by 7 a.m.</span>
      <span className="rk-ad__dek">
        Hand-picked for readers in Srinagar, Jammu, and the diaspora.
      </span>
    </a>
  );
}
