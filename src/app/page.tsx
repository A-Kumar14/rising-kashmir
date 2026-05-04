import { AdSlot } from "@/components/ad-slot";
import { BreakingBanner } from "@/components/breaking-banner";
import { Hero } from "@/components/hero";
import { OpinionStrip } from "@/components/opinion-strip";
import { SectionStrip } from "@/components/section-strip";
import {
  getBreakingArticles,
  getBySection,
  getHomeSecondary,
  getLeadStory,
  getOpinionFeatured,
} from "@/lib/cms";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Breaking news and reporting from Kashmir, Jammu, India, and the world — Rising Kashmir.",
};

export default function HomePage() {
  const lead = getLeadStory();
  const secondaries = getHomeSecondary();
  const breaking = getBreakingArticles();
  const opinion = getOpinionFeatured();
  const kashmir = getBySection("kashmir", 4);
  const sports = getBySection("sports", 3);
  const world = getBySection("world", 3);

  return (
    <>
      <BreakingBanner articles={breaking} />
      <Hero lead={lead} secondaries={secondaries} />
      <OpinionStrip columnists={opinion} />
      <AdSlot name="home-mid-1" />
      <SectionStrip
        title="Kashmir"
        sectionSlug="kashmir"
        articles={kashmir}
        layout="four-up"
      />
      <div className="mx-auto max-w-container px-4 pb-8 md:px-6">
        <div className="grid gap-8 md:grid-cols-2">
          <SectionStrip
            embedded
            title="Sports"
            sectionSlug="sports"
            articles={sports}
            layout="list"
          />
          <SectionStrip
            embedded
            title="World"
            sectionSlug="world"
            articles={world}
            layout="list"
          />
        </div>
      </div>
    </>
  );
}
