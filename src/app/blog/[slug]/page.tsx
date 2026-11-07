import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarHeart, Info } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getArticle, getArticles } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import { ArticleCard } from "@/components/ui/ArticleCard";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: { type: "article", title: article.title, description: article.excerpt, publishedTime: article.date },
  };
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();
  const related = (await getArticles()).filter((a) => a.slug !== article.slug).slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    author: { "@type": "Person", name: siteConfig.professional.name, jobTitle: siteConfig.professional.title },
    mainEntityOfPage: `${siteConfig.url}/blog/${article.slug}`,
  };

  return (
    <article className="pb-24 pt-[calc(var(--nav-height)+2.5rem)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <div className="container max-w-3xl">
        <Link href="/blog" className="inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-forest hover:text-forest-deep">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Volver al blog
        </Link>
        <p className="eyebrow mt-6">{article.category}</p>
        <h1 className="mt-4 font-display text-[2.2rem] leading-tight text-ink sm:text-5xl">{article.title}</h1>
        <p className="mt-5 text-sm text-graphite">
          Por {siteConfig.professional.name} · <time dateTime={article.date}>{formatDate(article.date)}</time> · {article.readingMinutes} min de lectura
        </p>
      </div>

      <div className="container mt-10 max-w-5xl">
        <div className="relative aspect-[16/8] overflow-hidden rounded-[2rem] bg-sand">
          <Image src={article.image} alt={article.imageAlt} fill priority sizes="(min-width:1024px) 1000px, 100vw" className="object-cover" />
        </div>
      </div>

      <div className="container mt-12 max-w-3xl">
        <p className="font-display text-xl italic leading-relaxed text-forest-deep sm:text-2xl">{article.excerpt}</p>
        <div className="mt-8 space-y-5 text-[1.05rem] leading-[1.8] text-graphite">
          {article.body.map((block, i) => {
            if (block.type === "h2") return <h2 key={i} className="pt-4 font-display text-2xl text-ink">{block.text}</h2>;
            if (block.type === "ul")
              return (
                <ul key={i} className="space-y-2 pl-1">
                  {block.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-forest" />
                      {item}
                    </li>
                  ))}
                </ul>
              );
            return <p key={i}>{block.text}</p>;
          })}
        </div>

        <aside className="mt-12 flex gap-3 rounded-2xl bg-sand-light p-5 text-sm leading-relaxed text-graphite">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-forest" aria-hidden="true" />
          <p>
            Este artículo tiene fines educativos y no sustituye una evaluación ni un diagnóstico profesional. Si tienes dolor o una
            condición de salud, consulta con un profesional.
          </p>
        </aside>

        {article.sources?.length ? (
          <div className="mt-8">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-forest">Fuentes</h2>
            <ul className="mt-3 space-y-2 text-sm text-graphite">
              {article.sources.map((s) => (
                <li key={s.label}>
                  {s.url ? (
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-forest">
                      {s.label}
                    </a>
                  ) : (
                    s.label
                  )}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-14 rounded-[2rem] bg-forest p-8 text-center text-cream sm:p-10">
          <p className="font-display text-2xl sm:text-3xl">¿Quieres una valoración personalizada?</p>
          <p className="mx-auto mt-3 max-w-md text-cream/75">Solicita tu cita y conversemos sobre lo que necesitas.</p>
          <a href="/#reservar" className="btn-light mt-6">
            <CalendarHeart className="h-4 w-4" aria-hidden="true" /> Reservar una cita
          </a>
        </div>
      </div>

      {related.length > 0 && (
        <div className="container mt-20">
          <h2 className="font-display text-2xl text-ink sm:text-3xl">Sigue leyendo</h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:max-w-4xl">
            {related.map((a) => (
              <li key={a.slug}>
                <ArticleCard article={a} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
