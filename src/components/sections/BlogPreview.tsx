import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Article } from "@/types/content";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function BlogPreview({ articles }: { articles: Article[] }) {
  if (!articles.length) return null;
  return (
    <section id="blog" aria-labelledby="blog-title" className="section bg-sand-light">
      <div className="container">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="blog-title"
            align="left"
            eyebrow="Blog y consejos"
            title="Consejos para moverte mejor"
            description="Información educativa sobre salud postural, movilidad y bienestar. No sustituye una evaluación profesional."
          />
          <Link href="/blog" className="btn-outline shrink-0 self-start md:self-auto">
            Ver todos los artículos
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.slice(0, 3).map((a, i) => (
            <Reveal as="li" key={a.slug} delay={i * 70} className={i === 2 ? "sm:hidden lg:block" : undefined}>
              <ArticleCard article={a} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
