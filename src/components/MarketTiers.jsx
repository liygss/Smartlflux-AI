import React from 'react'
import { Section } from './ui/Section'
import { SectionHeader } from './ui/Section'
import { Reveal } from './ui/Reveal'

const tiers = [
  {
    label: 'TAM',
    value: '42K+',
    detail: 'facilities',
    region: 'Indonesia',
    ring: 'w-[26rem] h-[26rem]',
    text: 'text-[44px] leading-none',
  },
  {
    label: 'SAM',
    value: '5K–8K',
    detail: 'facilities',
    region: 'Pulau Jawa',
    ring: 'w-[18rem] h-[18rem]',
    text: 'text-[36px] leading-none',
  },
  {
    label: 'SOM',
    value: '10–20',
    detail: 'facilities',
    region: 'Surabaya & Sidoarjo',
    ring: 'w-[10rem] h-[10rem]',
    text: 'text-[28px] leading-none',
  },
]

export default function MarketTiers() {
  return (
    <Section variant="dark" className="overflow-hidden">
      <SectionHeader
        dark
        eyebrow="Fokus Pasar"
        title="Jalur Pasar yang Realistis"
        description="Dari total peluang di Indonesia hingga target pilot awal yang dapat dimenangkan lebih dahulu."
      />

      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Concentric rings */}
        <Reveal>
          <div className="relative mx-auto h-[26rem] w-[26rem] max-w-full">
            {tiers.map((t) => (
              <div
                key={t.label}
                className={`tier-ring shadow-[inset_0_0_60px_rgba(34,211,238,0.06)] ${t.ring}`}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div
                  className="absolute flex flex-col items-center text-center"
                  style={{ left: '50%', top: t.label === 'SOM' ? '50%' : '22%', transform: 'translate(-50%, -50%)' }}
                >
                  <span className="font-display font-extrabold tracking-tight text-fx-text tabular-nums" style={{ fontSize: t.label === 'SOM' ? '2.2rem' : '1.6rem' }}>
                    {t.value}
                  </span>
                  <span className="text-[11px] font-medium text-fx-secondary">{t.detail}</span>
                  <span className="mt-0.5 rounded-full border border-line bg-panel px-2.5 py-0.5 text-[10px] font-semibold text-glow-cyan">
                    {t.label} · {t.region}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Legend cards */}
        <div className="space-y-3">
          {tiers.map((t, i) => (
            <Reveal key={t.label} delay={i * 0.08}>
              <div className="fx-card fx-card-hover flex items-center gap-4 p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-panel font-display text-xs font-bold text-glow-cyan">
                  {t.label}
                </span>
                <div className="min-w-0">
                  <p className="font-display text-xl font-bold leading-tight text-fx-text">
                    {t.value} <span className="text-sm font-normal text-fx-secondary">{t.detail}</span>
                  </p>
                  <p className="mt-0.5 text-xs text-fx-secondary">{t.region}</p>
                </div>
              </div>
            </Reveal>
          ))}
          <Reveal delay={0.28}>
            <p className="pt-1 text-xs text-fx-muted">
              Estimasi pasar industri, berdasarkan data publik dan proyeksi tim.
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}