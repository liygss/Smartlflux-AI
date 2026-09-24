import React from 'react'
import { Activity, Boxes, Cloud, ScanSearch, LayoutDashboard, ArrowRight } from 'lucide-react'
import { Section } from './ui/Section'
import { SectionHeader } from './ui/Section'
import { Stagger, StaggerItem } from './ui/Reveal'

const steps = [
  { icon: Activity, title: 'Sensors', text: 'Sensor listrik & air mengambil data di titik penggunaan.' },
  { icon: Boxes, title: 'SmartFlux Node', text: 'Pemrosesan edge lokal dan komunikasi IoT.' },
  { icon: Cloud, title: 'Cloud & Database', text: 'Penyimpanan historis dan analitik terpusat.' },
  { icon: ScanSearch, title: 'Analytics', text: 'Deteksi anomali dan perbandingan baseline.' },
  { icon: LayoutDashboard, title: 'Dashboard & Alert', text: 'Wawasan real-time dan early warning.' },
]

export default function SolutionFlow() {
  return (
    <Section variant="dark">
      <SectionHeader
        dark
        eyebrow="Solution"
        title="From Raw Data to Actionable Insight"
        description="Data mentah diproses di edge, dianalisis di cloud, lalu disajikan sebagai wawasan dan peringatan yang dapat ditindaklanjuti."
      />

      <Stagger className="relative">
        <div className="grid gap-3 lg:grid-cols-5">
          {steps.map((s, i) => (
            <StaggerItem key={s.title} className="h-full">
              <div className="fx-card fx-card-hover flex h-full flex-col p-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-panel text-glow-cyan">
                    <s.icon size={20} strokeWidth={1.8} />
                  </span>
                  <span className="font-display text-xs font-bold text-fx-muted">0{i + 1}</span>
                </div>
                <h3 className="text-sm font-semibold text-fx-text">{s.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-fx-secondary">{s.text}</p>
              </div>
            </StaggerItem>
          ))}
        </div>

        {/* Connector arrows (desktop overlay) */}
        <div className="pointer-events-none absolute inset-x-0 top-1/2 hidden -translate-y-1/2 lg:block">
          <div className="flex justify-between px-[9%]">
            {steps.slice(0, -1).map((s) => (
              <ArrowRight key={s.title} size={18} className="text-glow-cyan/70" />
            ))}
          </div>
        </div>
      </Stagger>
    </Section>
  )
}