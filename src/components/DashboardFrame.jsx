import React from 'react'
import { Zap, Droplets, BellRing, Server } from 'lucide-react'
import { Reveal } from './ui/Reveal'
import DashboardPreview from './DashboardPreview'

const floating = [
  { icon: Zap, label: '125.3 kWh', sub: 'Listrik hari ini', color: 'text-glow-cyan', pos: 'left-2 top-1 lg:-left-6' },
  { icon: Droplets, label: '45.5 m³', sub: 'Air hari ini', color: 'text-glow-teal', pos: 'right-2 top-24 lg:-right-6' },
  { icon: BellRing, label: '3 Active', sub: 'Alerts', color: 'text-fx-warning', pos: 'left-2 bottom-24 lg:-left-8' },
  { icon: Server, label: '3 / 3', sub: 'Devices Online', color: 'text-mint', pos: 'right-2 bottom-1 lg:-right-8' },
]

export default function DashboardFrame() {
  return (
    <div className="relative">
      {/* Glow behind frame */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/10 blur-[100px]" />

      <div className="relative overflow-hidden rounded-2xl border border-line bg-panel/80 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)]">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#f43f5e]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e]/80" />
          <span className="ml-4 hidden rounded-md border border-line bg-card px-3 py-1 text-[11px] text-fx-secondary sm:block">
            app.smartflux.ai/dashboard
          </span>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-md border border-mint/25 bg-mint/10 px-2 py-1 text-[10px] font-semibold text-mint">
            <span className="h-1.5 w-1.5 rounded-full bg-mint" />
            Real-Time
          </span>
        </div>

        <div className="relative p-4 sm:p-6">
          {/* Light product screenshot inside */}
          <div className="overflow-hidden rounded-lg ring-1 ring-line/60">
            <DashboardPreview />
          </div>
        </div>
      </div>

      {/* Floating KPI labels */}
      {floating.map((f, i) => (
        <Reveal
          key={f.label}
          delay={0.15 + i * 0.12}
          className={`absolute hidden w-40 lg:block ${f.pos}`}
        >
          <div className="fx-card flex items-center gap-2.5 p-3.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line bg-panel">
              <f.icon size={15} className={f.color} />
            </span>
            <div className="min-w-0">
              <p className={`tabular-nums font-display text-base font-bold leading-tight ${f.color}`}>
                {f.label}
              </p>
              <p className="text-[11px] text-fx-secondary">{f.sub}</p>
            </div>
          </div>
        </Reveal>
      ))}

      {/* Mobile compact stats */}
      <div className="mt-4 grid grid-cols-2 gap-3 lg:hidden">
        {floating.map((f) => (
          <div key={f.label} className="fx-card flex items-center gap-2.5 p-3">
            <f.icon size={15} className={`shrink-0 ${f.color}`} />
            <div className="min-w-0">
              <p className={`tabular-nums font-display text-sm font-bold leading-tight ${f.color}`}>{f.label}</p>
              <p className="truncate text-[10px] text-fx-secondary">{f.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}