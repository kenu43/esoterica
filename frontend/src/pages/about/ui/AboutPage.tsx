import { HandHeart, Heart, ShieldCheck, Truck } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { BRANCHES } from "@/entities/branch";
import { SITE } from "@/shared/config";
import { useSeo } from "@/shared/hooks";
import {
  BlurText,
  Container,
  LotusBloom,
  NumberTicker,
  Reveal,
  SakuraBranch,
  SectionHeading,
} from "@/shared/ui";
import { CustomOrderCta } from "@/widgets/custom-order-cta";
import { PageHeader } from "@/widgets/page-header";

const VALUES = [
  {
    icon: Heart,
    title: "Atención de familia",
    text: "Te atiende la misma familia que empezó hace más de 40 años. Aquí nadie es un número.",
  },
  {
    icon: HandHeart,
    title: "Asesoría honesta",
    text: "Te explicamos para qué sirve cada cosa y cómo usarla. Si no lo necesitas, te lo decimos.",
  },
  {
    icon: ShieldCheck,
    title: "Preparado con respeto",
    text: "Velones, baños y amuletos se preparan en la tienda, con oración y con la tradición de siempre.",
  },
  {
    icon: Truck,
    title: "Hasta donde estés",
    text: "Enviamos a cualquier ciudad de Colombia, bien empacado y con instrucciones de uso.",
  },
];

const TIMELINE = BRANCHES.slice()
  .sort((a, b) => a.foundedYear - b.foundedYear)
  .map((b) => ({
    year: b.foundedYear,
    title: b.name,
    text:
      b.id === "el-sortilegio"
        ? "Doña Cielo abre El Sortilegio en la Carrera 3. Figuras de santos, velones y trabajos preparados a mano: aquí nace la tradición familiar."
        : b.id === "la-colonia"
          ? "Con Giomara, su hija, llega La Colonia en la misma cuadra: baños, riegos, esencias y todo para las limpiezas."
          : "La nueva generación abre Loto & Nirvana, dedicada a la suerte, el oriente y la meditación.",
  }));

export function AboutPage() {
  useSeo({
    title: "Nuestra historia: una familia esotérica desde 1981",
    description:
      "Doña Cielo fundó El Sortilegio en 1981 en Ibagué. Con su hija Giomara crecieron hasta La Colonia (2004) y Loto & Nirvana (2023).",
  });
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const years = new Date().getFullYear() - SITE.foundedYear;

  return (
    <>
      <PageHeader
        eyebrow="Nuestra historia"
        title="Tres generaciones, una misma esencia"
        highlight={["esencia"]}
        description={`Desde ${SITE.foundedYear} acompañamos a las familias de Ibagué con protección, suerte y tradición.`}
      />

      <Container className="relative grid items-center gap-12 py-12 lg:grid-cols-2">
        <div
          ref={imgRef}
          className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border"
        >
          <motion.img
            style={{ y, scale: 1.15 }}
            src="/images/sobre-nosotros.webp"
            alt="Doña Cielo, fundadora de El Sortilegio"
            className="size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <p className="absolute inset-x-6 bottom-6 text-xl italic text-white">
            “Ofrecemos más que un producto: creamos puentes entre tu espacio y
            lo Etéreo.” — Doña Cielo, fundadora de El Sortilegio, 1981
          </p>
        </div>

        <div className="space-y-6">
          <BlurText
            text="Empezó con Doña Cielo"
            highlight={["Cielo"]}
            className="text-3xl sm:text-4xl"
          />
          <Reveal className="space-y-4 leading-relaxed text-muted">
            <p>
              En {SITE.foundedYear}, Doña Cielo abrió El Sortilegio en el centro
              de Ibagué. Lo que empezó como una pequeña tienda de santos,
              velones y trabajos preparados a mano se volvió un lugar de
              confianza para quienes buscaban protección, un consejo o
              simplemente alguien que los escuchara.
            </p>
            <p>
              Su hija Giomara aprendió el oficio a su lado y en 2004 abrió La
              Colonia, a pocos pasos, especializada en baños, riegos y
              limpiezas. En 2023 la familia sumó Loto & Nirvana, con todo lo de
              la suerte, el oriente y la meditación. Cada tienda tiene su dueña
              y su estilo, pero la tradición es la misma.
            </p>
          </Reveal>
          <dl className="grid grid-cols-3 gap-3 pt-2">
            {[
              { value: years, suffix: "", label: "años de tradición" },
              { value: 3, suffix: "", label: "tiendas en el centro" },
              { value: 3, suffix: "", label: "generaciones" },
            ].map((s) => (
              <div
                key={s.label}
                className="flex flex-col-reverse rounded-xl border border-border bg-surface p-4 text-center"
              >
                <dt className="text-xs text-muted">{s.label}</dt>
                <dd className="font-display text-3xl text-gold">
                  <NumberTicker value={s.value} suffix={s.suffix} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>

      <section className="relative isolate overflow-hidden py-20">
        <SakuraBranch className="absolute -left-8 top-6 -z-10 w-72 text-foreground/50 opacity-50" />
        <Container className="space-y-12">
          <SectionHeading
            eyebrow="Así crecimos"
            title="Una tienda, luego tres"
            highlight={["tres"]}
          />
          <ol className="relative mx-auto max-w-2xl border-l border-gold/30 pl-8">
            {TIMELINE.map((t, i) => (
              <Reveal
                key={t.year}
                delay={i * 0.1}
                className="relative pb-10 last:pb-0"
              >
                <span className="absolute -left-[41px] top-1 grid size-5 place-items-center rounded-full border-2 border-gold bg-background">
                  <span className="size-2 rounded-full bg-gold" />
                </span>
                <p className="font-display text-lg text-gold">{t.year}</p>
                <h3 className="text-xl">{t.title}</h3>
                <p className="mt-1 text-muted">{t.text}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section className="relative isolate overflow-hidden py-20">
        <LotusBloom className="absolute bottom-0 left-1/2 -z-10 w-[560px] max-w-full -translate-x-1/2 opacity-20" />
        <Container className="space-y-12">
          <SectionHeading
            eyebrow="Por qué nos eligen"
            title="Lo que nos diferencia"
            highlight={["diferencia"]}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-border bg-surface p-6">
                  <v.icon className="mb-4 size-6 text-gold" aria-hidden />
                  <h3 className="font-sans text-base font-semibold">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CustomOrderCta />
    </>
  );
}
