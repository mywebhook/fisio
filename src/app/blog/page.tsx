import type { Metadata } from "next";
import { getArticles } from "@/lib/content";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Blog y consejos de bienestar",
  description: "Artículos educativos sobre salud postural, prevención de lesiones, movilidad, recuperación física y ejercicio terapéutico.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const articles = await getArticles();
  const categories = Array.from(new Set(articles.map((a) => a.category)));

  return (
    <section className="pb-24 pt-[calc(var(--nav-height)+3rem)] sm:pb-32">
      <div className="container">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Blog</p>
          <h1 className="mt-4 font-display text-[2.4rem] leading-tight text-ink sm:text-5xl">Consejos de bienestar y movimiento</h1>
          <p className="mt-5 text-lg leading-relaxed text-graphite">
            Información educativa para cuidar tu cuerpo en el día a día. Estos artículos no sustituyen una evaluación profesional.
          </p>
        </Reveal>

        <ul className="mt-10 flex flex-wrap gap-2" aria-label="Categorías">
          {categories.map((c) => (
            <li key={c} className="rounded-full border border-forest/20 px-4 py-1.5 text-sm text-forest">
              {c}
            </li>
          ))}
        </ul>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a, i) => (
            <Reveal as="li" key={a.slug} delay={(i % 3) * 70}>
              <ArticleCard article={a} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
