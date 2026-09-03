import React, { useEffect, useRef, useState } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import {
  Zap,
  Droplets,
  BellRing,
  ScanSearch,
  TrendingUp,
  TrendingDown,
  Activity,
  Wifi,
  ShieldCheck,
} from 'lucide-react'
import { Section, SectionHeader } from './ui/Section'
import { Reveal } from './ui/Reveal'

// Live simulation data generator
function makePoint(i, base) {
  return {
    time: `${String(i).padStart(2, '0')}:00`,
    listrik: Math.round((base + Math.sin(i / 1.7) * 90 + Math.random() * 50) * 10) / 10,
    air: Math.round((base / 5 + Math.cos(i / 1.3) * 12 + Math.random() * 8) * 10) / 10,
  }
}

const initialData = Array.from({ length: 24 }, (_, i) => makePoint(i, 420))

const notifications = [
  { id: 1, icon: ScanSearch, text: 'Anomali terdeteksi di Gedung B · zona 3', color: 'text-rose', bg: 'bg-rose-light' },
  { id: 2, icon: Droplets, text: 'Aliran air normal di lantai 2', color: 'text-teal', bg: 'bg-teal-light' },
  { id: 3, icon: Zap, text: 'Beban puncak tercapai · 1.2 kW', color: 'text-indigo', bg: 'bg-indigo-light' },
]

export default function LiveDemo() {
  const [data, setData] = useState(initialData)
  const [tick, setTick] = useState(0)
  const [activeAlert, setActiveAlert] = useState(0)
  const ticksRef = useRef(0)

  // Update live data on an interval
  useEffect(() => {
    const id = setInterval(() => {
      ticksRef.current += 1
      setData((prev) => {
        const next = [...prev.slice(1)]
        next.push(makePoint(prev.length + ticksRef.current, 420 + ticksRef.current * 2))
        return next
      })
      setTick((t) => (t + 1) % 100)
    }, 1400)
    return () => clearInterval(id)
  }, [])

  // Cycle active alert notification
  useEffect(() => {
    const id = setInterval(() => {
      setActiveAlert((a) => (a + 1) % notifications.length)
    }, 2600)
    return () => clearInterval(id)
  }, [])

  const current = data[data.length - 1]
  const trendListrik = tick % 2 === 0
  const trendAir = tick % 3 !== 0

  return (
    <Section variant="mist" className="relative overflow-hidden">
      {/* Background decorations */}
      <div className="pointer-events-none absolute left-1/2 top-[-8rem] h-[30rem] w-[40rem] -translate-x-1/2 rounded-full bg-blue/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-[-6rem] h-72 w-72 rounded-full bg-indigo-light/50 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 right-[-6rem] h-72 w-72 rounded-full bg-teal-light/50 blur-3xl" />

      <SectionHeader
        eyebrow="Live Demo"
        title="Saksikan Monitoring Real-Time"
        description="Simulasi langsung bagaimana SmartFlux AI memantau listrik dan air secara terus-menerus, mendeteksi anomali, dan memberi peringatan dini."
      />

      <Reveal>
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-3xl border border-gray-200/70 bg-white shadow-[var(--shadow-card-hover)]">
            {/* Browser top bar */}
            <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/80 px-5 py-3">
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-rose/80" />
                <span className="h-3 w-3 rounded-full bg-amber/80" />
                <span className="h-3 w-3 rounded-full bg-emerald/80" />
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium text-slate shadow-sm">
                <Wifi size={12} className="text-emerald" />
                smartflux.ai/dashboard · live
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald pulse-ring" />
                LIVE
              </div>
            </div>

            <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
              {/* Left: Live chart */}
              <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-display text-lg font-bold text-navy">
                    Konsumsi Energi · Real-Time
                  </h3>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-light/70 px-3 py-1 text-xs font-semibold text-blue">
                    <Activity size={13} />
                    Streaming
                  </span>
                </div>

                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 0, left: -12 }}>
                      <defs>
                        <linearGradient id="gListrik" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#2f5597" stopOpacity={0.35} />
                          <stop offset="100%" stopColor="#2f5597" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="gAir" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.3} />
                          <stop offset="100%" stopColor="#14b8a6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" vertical={false} />
                      <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#9ca3af' }} tickLine={false} axisLine={false} interval={3} />
                      <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} tickLine={false} axisLine={false} width={36} />
                      <Tooltip
                        contentStyle={{
                          borderRadius: 12,
                          border: '1px solid #e5e7eb',
                          boxShadow: '0 8px 30px rgba(23,54,93,0.12)',
                          fontSize: 12,
                        }}
                      />
                      <Area type="monotone" dataKey="listrik" stroke="#2f5597" strokeWidth={2.5} fill="url(#gListrik)" name="Listrik (W)" isAnimationActive animationDuration={600} />
                      <Area type="monotone" dataKey="air" stroke="#14b8a6" strokeWidth={2} fill="url(#gAir)" name="Air (L/mnt)" isAnimationActive animationDuration={600} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Legend */}
                <div className="mt-3 flex items-center gap-5 text-xs text-slate">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-blue" /> Listrik
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-teal" /> Air
                  </span>
                  <span className="ml-auto inline-flex items-center gap-1 text-emerald">
                    <ShieldCheck size={13} /> Deteksi aktif
                  </span>
                </div>
              </div>

              {/* Right: Live stats + alerts */}
              <div className="flex flex-col gap-4 border-t border-gray-100 p-6 lg:border-l lg:border-t-0">
                <h3 className="font-display text-lg font-bold text-navy">Status Terkini</h3>

                {/* Listrik stat */}
                <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-blue-light/40 to-white p-4">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm font-semibold text-navy">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue to-blue-soft text-white">
                        <Zap size={16} />
                      </span>
                      Listrik
                    </span>
                    <span className={`flex items-center gap-1 text-xs font-semibold ${trendListrik ? 'text-emerald' : 'text-rose'}`}>
                      {trendListrik ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                      {trendListrik ? '+3.2%' : '-1.4%'}
                    </span>
                  </div>
                  <p className="mt-3 font-display text-3xl font-extrabold text-navy">
                    {current.listrik.toFixed(1)}
                    <span className="ml-1 text-sm font-medium text-slate">W</span>
                  </p>
                </div>

                {/* Air stat */}
                <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-teal-light/30 to-white p-4">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm font-semibold text-navy">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan to-teal text-white">
                        <Droplets size={16} />
                      </span>
                      Air
                    </span>
                    <span className={`flex items-center gap-1 text-xs font-semibold ${trendAir ? 'text-emerald' : 'text-amber'}`}>
                      {trendAir ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                      {trendAir ? 'Normal' : 'Naik'}
                    </span>
                  </div>
                  <p className="mt-3 font-display text-3xl font-extrabold text-navy">
                    {current.air.toFixed(1)}
                    <span className="ml-1 text-sm font-medium text-slate">L/mnt</span>
                  </p>
                </div>

                {/* Alert box */}
                <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-gray-50/70 p-4">
                  <span className="scan-line pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-blue/15 to-transparent" />
                  <div className="flex items-center gap-2 text-sm font-semibold text-navy">
                    <BellRing size={15} className="text-indigo" />
                    Peringatan
                    <span className="ml-auto text-xs font-medium text-slate">terbaru</span>
                  </div>
                  <div key={activeAlert} className="mt-3 flex items-start gap-3 animate-[pulse-soft_0.4s_ease-in-out]">
                    {notifications.map((n, i) => {
                      if (i !== activeAlert) return null
                      return (
                        <React.Fragment key={n.id}>
                          <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${n.bg} ${n.color}`}>
                            <n.icon size={18} />
                          </span>
                          <p className="text-sm leading-snug text-slate">{n.text}</p>
                        </React.Fragment>
                      )
                    })}
                  </div>
                  {/* Progress dots */}
                  <div className="mt-3 flex items-center gap-1.5">
                    {notifications.map((n, i) => (
                      <span
                        key={n.id}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i === activeAlert ? 'w-5 bg-indigo' : 'w-1.5 bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
