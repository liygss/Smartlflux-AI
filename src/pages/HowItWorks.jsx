import React from 'react'
import { ArrowRight } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import PilotCTA from '../components/PilotCTA'
import { Reveal, Stagger, StaggerItem } from '../components/ui/Reveal'
import { howItWorksSteps } from '../data/content'

export default function HowItWorks() {
  return (
    <>
      <PageHeader
        breadcrumb="Cara Kerja"
        eyebrow="Cara Kerja"
        title="Dari Sensor ke Tindakan"
        description="SmartFlux AI memindahkan data listrik dan air secara andal dari titik penggunaan ke dashboard yang dapat ditindaklanjuti."
      />

      <section className="mx-auto max-w-4xl px-5 py-12 sm:px-8">
        <Reveal>
          <div className="fx-card mb-10 p-5 text-center">
            <p className="text-sm font-semibold tracking-wide text-fx-text">
              Sensor Listrik &amp; Air <span className="text-glow-teal">→</span> SmartFlux Node{' '}
              <span className="text-glow-teal">→</span> Internet <span className="text-glow-teal">→</span> Cloud{' '}
              <span className="text-glow-teal">→</span> Dashboard <span className="text-glow-teal">→</span> Tindakan
            </p>
          </div>
        </Reveal>

        <Stagger className="space-y-4" gap={0.1}>
          {howItWorksSteps.map((s, i) => (
            <StaggerItem key={s.step}>
              <div className="fx-card fx-card-hover flex gap-5 p-6 sm:p-7">
                <div className="flex flex-col items-center">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line bg-panel font-display text-sm font-bold text-glow-cyan shadow-md">
                    {s.step}
                  </span>
                  {i < howItWorksSteps.length - 1 && (
                    <span className="mt-2 hidden h-full w-px bg-gradient-to-b from-line to-transparent sm:block" />
                  )}
                </div>
                <div className="flex-1 pb-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="font-display text-xl font-bold text-fx-text">{s.title}</h2>
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-panel text-glow-teal">
                      <s.icon size={17} />
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-fx-secondary">{s.text}</p>
                  <ul className="mt-3 grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-sm text-fx-text">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-mint" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {i < howItWorksSteps.length - 1 && (
                <div className="my-1 flex justify-center text-glow-teal">
                  <ArrowRight size={18} className="rotate-90" />
                </div>
              )}
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-10" delay={0.05}>
          <div className="relative overflow-hidden rounded-2xl border border-line bg-panel p-6">
            <span className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-electric/15 blur-2xl" />
            <h3 className="mb-2 font-display text-lg font-bold text-fx-text">Fokus MVP</h3>
            <p className="text-sm leading-relaxed text-fx-secondary">
              Produk viable minimum membuktikan alur inti: mengumpulkan data listrik
              dan air, mentransmisikannya dengan andal, menampilkannya di dashboard,
              mendeteksi pola abnormal dasar, dan menghasilkan alert yang bermakna.
            </p>
          </div>
        </Reveal>
      </section>

      <PilotCTA />
    </>
  )
}