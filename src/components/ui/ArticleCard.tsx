import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Article } from "@/types/content";
import { formatDate } from "@/lib/utils";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-soft transition-shadow duration-500 hover:shadow-lift">
      <div className="relative aspect-[16/10] overflow-hidden bg-sand">
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-forest backdrop-blur">
          {article.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="text-xs text-graphite">
          <time dateTime={article.date}>{formatDate(article.date)}</time> · {article.readingMinutes} min de lectura
        </p>
        <h3 className="mt-3 font-display text-[1.3rem] leading-snug text-ink">
          <Link href={`/blog/${article.slug}`} className="after:absolute after:inset-0">
            {article.title}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-graphite">{article.excerpt}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-forest">
          Leer más
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </article>
  );
}
