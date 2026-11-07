import {
  getArticles,
  getBookingServices,
  getFaq,
  getGallery,
  getReasons,
  getSpecialties,
  getTestimonials,
  getTreatments,
} from "@/lib/content";
import { buildStructuredData } from "@/lib/structured-data";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Specialties } from "@/components/sections/Specialties";
import { Treatments } from "@/components/sections/Treatments";
import { WhyMe } from "@/components/sections/WhyMe";
import { Gallery } from "@/components/sections/Gallery";
import { Testimonials } from "@/components/sections/Testimonials";
import { Booking } from "@/components/sections/Booking";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";

export default async function HomePage() {
  const [specialties, treatments, reasons, gallery, testimonials, services, articles, faq] = await Promise.all([
    getSpecialties(),
    getTreatments(),
    getReasons(),
    getGallery(),
    getTestimonials(),
    getBookingServices(),
    getArticles(),
    getFaq(),
  ]);

  const structuredData = buildStructuredData(specialties.map((s) => s.name));
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq
      .filter((f) => !/\[[^\]]*\]/.test(f.answer))
      .map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData).replace(/</g, "\\u003c") }} />
      <Hero specialties={specialties} />
      <About specialties={specialties} />
      <Specialties specialties={specialties} />
      <Treatments treatments={treatments} />
      <WhyMe reasons={reasons} />
      <Gallery images={gallery} />
      <Testimonials testimonials={testimonials} />
      <Booking services={services} />
      <BlogPreview articles={articles} />
      <Faq items={faq} />
      <Contact />
    </>
  );
}
