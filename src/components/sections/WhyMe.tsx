import type { Reason } from "@/types/content";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function WhyMe({ reasons }: { reasons: Reason[] }) {
  if (!reasons.length) return null;
  return (
    <section aria-labelledby="why-title" className="section relative overflow-hidden bg-forest-deep text-cream">
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-0 h-[28rem] w-[28rem] rounded-full bg-forest blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 right-0 h-[24rem] w-[24rem] rounded-full bg-sage/20 blur-3xl" />
      <div className="container relative">
        <SectionHeading
          id="why-title"
          inverted
          eyebrow="¿Por qué elegirme?"
          title={
            <>
              Un acompañamiento <em className="text-sage">cercano</em> y profesional
            </>
          }
        />
        <ul className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-cream/10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <Reveal as="li" key={r.id} delay={(i % 3) * 70} className="bg-forest-deep p-7 transition-colors duration-500 hover:bg-forest/60 sm:p-9">
              <Icon name={r.icon} className="h-8 w-8 text-sage" />
              <h3 className="mt-6 font-display text-[1.35rem] text-cream">{r.title}</h3>
              <p className="mt-2 leading-relaxed text-cream/70">{r.description}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
