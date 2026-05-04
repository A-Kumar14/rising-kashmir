import type { Article } from "@/lib/article";
import { ArticleCard } from "./article-card";

type Props = {
  lead: Article;
  secondaries: Article[];
};

export function Hero({ lead, secondaries }: Props) {
  return (
    <section className="border-b border-theme bg-[var(--bg-primary)] py-8">
      <div className="mx-auto max-w-container px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr] lg:items-start lg:gap-10">
          <ArticleCard article={lead} variant="hero" />
          <aside className="flex flex-col gap-6 border-t border-theme pt-6 lg:border-t-0 lg:pt-0">
            {secondaries.map((a) => (
              <ArticleCard key={a.id} article={a} variant="secondary" />
            ))}
          </aside>
        </div>
      </div>
    </section>
  );
}
