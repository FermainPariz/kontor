import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Kicker } from "@/components/ui/kicker";
import { GoldRule } from "@/components/ui/gold-rule";
import { ImageOverlay } from "@/components/ui/image-overlay";
import { Reveal } from "@/components/ui/reveal";
import { ChapterNav } from "@/components/chapter-nav";
import { ChapterOutro } from "@/components/chapter-outro";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "club.philosophie" });
  return { title: t("titel") };
}

export default async function PhilosophiePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("club.philosophie");

  const absaetze = t.raw("absaetze") as string[];

  return (
    <>
      <ImageOverlay
        src="/images/muenster-prinzipalmarkt.jpg"
        alt="Giebelhäuser am Prinzipalmarkt in Münster"
        overlay="strong"
        priority
        heightClassName="min-h-[42vh]"
        align="end"
      >
        <Kicker tone="dark">{t("kicker")}</Kicker>
        <h1 className="mt-5 max-w-3xl font-serif text-4xl font-semibold leading-tight text-champagner sm:text-5xl">
          {t("titel")}
        </h1>
        <GoldRule diamonds className="mx-0 mt-6" />
      </ImageOverlay>

      <ChapterNav groupKey="club" />

      <Section background="pergament">
        <Container variant="text">
          <Reveal>
            <p className="font-sans text-xl font-light leading-relaxed text-tinte/85">
              {t("intro")}
            </p>
          </Reveal>

          <Reveal>
            <blockquote className="my-12 border-l-2 border-gold pl-6 font-serif text-2xl leading-snug text-koenigsblau sm:text-3xl">
              {t("zitat")}
            </blockquote>
          </Reveal>

          <div className="mt-10 flex flex-col gap-6">
            {absaetze.map((absatz, index) => (
              <Reveal key={index} delay={index * 80}>
                <p className="font-sans text-lg leading-relaxed text-tinte/90">
                  {absatz}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <ChapterOutro groupKey="club" />
    </>
  );
}
