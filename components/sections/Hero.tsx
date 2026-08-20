import { ArrowDown, ArrowUpRight } from 'lucide-react';
import React from 'react';
import { EXPERIENCES, HERO_NAME, HERO_ROLE_LINES, HERO_TAGS } from '../../constants';
import { heroShapes } from '../../constants/heroShapes';
import { Experience } from '../../types';
import { HeroPhotoComposition, ScrollReveal } from '../common';

const PREVIEW_COUNT = 3;
const ACCENTS = ['bg-neo-yellow', 'bg-neo-blue', 'bg-neo-pink'];

/** "mar de 2026 - o momento" -> "2026 — ATUAL"; "jun de 2024 - fev de 2026" -> "2024 — 2026" */
const shortPeriod = (period: string): string => {
  const years = period.match(/\d{4}/g) ?? [];
  const ongoing = /momento|atual|present/i.test(period);
  const start = years[0] ?? period;
  return ongoing ? `${start} — ATUAL` : `${start} — ${years[years.length - 1] ?? start}`;
};

const startYear = (exp: Experience): number =>
  Number(exp.period.match(/\d{4}/)?.[0] ?? new Date().getFullYear());

const isOngoing = (exp: Experience): boolean => /momento|atual|present/i.test(exp.period);

interface HeroProps {
  photoUrl: string | null;
}

export const Hero: React.FC<HeroProps> = ({ photoUrl }) => {
  const preview = EXPERIENCES.slice(0, PREVIEW_COUNT);
  const base = EXPERIENCES[0]?.location.split(',')[0]?.trim() ?? '';
  const since = Math.min(...EXPERIENCES.map(startYear));

  return (
    <section
      id="hero"
      className="relative overflow-x-hidden pt-32 pb-0 md:pt-28 scroll-mt-24 md:scroll-mt-20"
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-12 flex flex-col lg:grid lg:grid-cols-12 lg:gap-x-10 lg:items-start">
        {/* Identity */}
          <ScrollReveal direction="left" className="order-1 lg:order-none lg:col-span-7 w-full min-w-0">
            <ul className="flex flex-wrap gap-2 mb-4 md:mb-5 list-none p-0">
              {HERO_TAGS.map((tag, i) => (
                <li
                  key={tag}
                  className={`
                    border-2 border-black px-2 py-1 font-mono text-[0.6rem] md:text-xs font-bold uppercase
                    tracking-wider text-black shadow-neo-sm ${ACCENTS[i % ACCENTS.length]}
                    ${i % 2 === 0 ? '-rotate-1' : 'rotate-1'}
                  `}
                >
                  {tag}
                </li>
              ))}
            </ul>

            <p className="font-mono text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-[var(--muted)] mb-2">
              {HERO_NAME}
            </p>

            <h1 className="uppercase font-black leading-[0.95] md:leading-[0.85] text-[var(--text)] break-words">
              {HERO_ROLE_LINES.map((line, i) => (
                <span
                  key={line}
                  className={`
                    block text-[clamp(1.75rem,4.6vw,4rem)]
                    ${i === HERO_ROLE_LINES.length - 1
                      ? 'text-black bg-neo-yellow border-4 border-black px-2 shadow-neo w-fit mt-1'
                      : 'drop-shadow-[3px_3px_0_var(--pink)]'}
                  `}
                >
                  {line}
                </span>
              ))}
            </h1>

            <p className="mt-5 font-mono text-sm md:text-base lg:text-lg bg-[var(--surface)] text-[var(--text)] border-4 border-black p-3 md:p-4 shadow-neo max-w-xl">
              {EXPERIENCES[0]?.summary}
            </p>

            <div className="mt-6 flex flex-wrap gap-3 md:gap-4">
              <a
                href="#projects"
                className="
                  inline-flex items-center gap-2 bg-neo-blue text-black border-4 border-black px-5 py-3
                  font-mono font-bold text-sm md:text-base uppercase tracking-wider shadow-neo
                  hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-sm
                  focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-neo-pink
                  active:translate-x-[5px] active:translate-y-[5px] active:shadow-none transition-all
                "
              >
                Ver projetos <ArrowUpRight size={18} aria-hidden />
              </a>
              <a
                href="#contact"
                className="
                  inline-flex items-center gap-2 bg-[var(--surface)] text-[var(--text)] border-4 border-black px-5 py-3
                  font-mono font-bold text-sm md:text-base uppercase tracking-wider shadow-neo
                  hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-sm
                  focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-neo-pink
                  active:translate-x-[5px] active:translate-y-[5px] active:shadow-none transition-all
                "
              >
                Contato
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal
            direction="right"
            delay={150}
            className="order-3 lg:order-none lg:col-span-5 w-full flex justify-center lg:justify-end mt-10 lg:mt-0"
          >
            <HeroPhotoComposition
              imageSrc={photoUrl || ''}
              imageAlt="Foto pessoal aleatória"
              shapes={heroShapes}
              className="w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 xl:w-80 xl:h-80"
            >
              <div className="absolute inset-0 border-4 border-black z-10 overflow-hidden shadow-neo-lg">
                {photoUrl && (
                  <img src={photoUrl} alt="Foto pessoal aleatória" className="w-full h-full object-cover" />
                )}
              </div>
              <div className="absolute inset-0 bg-neo-yellow border-4 border-black z-0 translate-x-2 translate-y-2 md:translate-x-4 md:translate-y-4" />
              <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-[var(--surface)] text-[var(--text)] border-4 border-black p-2 z-20 shadow-neo font-mono font-bold text-xs md:text-sm">
                System.out.println("Opa, bão?!");
              </div>
            </HeroPhotoComposition>
          </ScrollReveal>

        {/* Work experience preview */}
        <ScrollReveal
          direction="up"
          delay={250}
          className="order-2 lg:order-none lg:col-span-12 mt-10 md:mt-12 pb-10 md:pb-14"
        >
          <div className="flex flex-wrap items-end gap-x-4 gap-y-2 mb-4 md:mb-5">
            <h2 className="bg-neo-pink text-black border-4 border-black px-3 py-1 font-black uppercase text-base md:text-2xl shadow-neo -rotate-1">
              Work_Experience
            </h2>
            <p className="font-mono text-[0.6rem] md:text-xs font-bold uppercase tracking-widest text-[var(--muted)] mb-1">
              base: {base}, br · desde {since}
            </p>
            <a
              href="#experience"
              className="
                ml-auto mb-1 inline-flex items-center gap-2 border-2 border-black bg-[var(--surface)] text-[var(--text)]
                px-3 py-2 font-mono text-[0.65rem] md:text-xs font-bold uppercase tracking-wider shadow-neo-sm
                hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none
                focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-neo-pink transition-all
              "
            >
              Ver tudo <ArrowDown size={14} aria-hidden />
            </a>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 list-none p-0">
            {preview.map((exp, i) => (
              <li key={exp.id} className={i % 2 === 1 ? 'lg:translate-y-3' : ''}>
                <a
                  href="#experience"
                  className="
                    group block h-full border-4 border-black bg-[var(--surface)] shadow-neo
                    hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none
                    focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-neo-pink
                    transition-all duration-200
                  "
                >
                  <div className={`h-3 border-b-4 border-black ${ACCENTS[i % ACCENTS.length]}`} />
                  <div className="p-4 md:p-5">
                    <p className="font-mono text-[0.6rem] md:text-xs font-bold uppercase tracking-widest text-[var(--muted)]">
                      {isOngoing(exp) && <span className="text-neo-pink">▸ </span>}
                      {shortPeriod(exp.period)}
                    </p>
                    <h3 className="mt-2 font-black uppercase text-sm md:text-base leading-tight text-[var(--text)]">
                      {exp.role}
                    </h3>
                    <p className="mt-1 font-mono text-xs md:text-sm text-[var(--muted)]">{exp.company}</p>
                    <p className="mt-3 font-mono text-[0.6rem] md:text-xs font-bold uppercase text-[var(--text)] border-t-2 border-black pt-2">
                      {exp.techStack.slice(0, 2).join(' · ')}
                    </p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
};
