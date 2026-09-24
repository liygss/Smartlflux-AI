import React from 'react'
import { Activity, Zap, Boxes, Cloud } from 'lucide-react'
import { Reveal } from './ui/Reveal'

const stats = [
  {
    value: '99.9%',
    label: 'Monitoring Uptime',
    icon: Activity,
    bg: 'bg-blue-light',
    text: 'text-blue',
  },
  {
    value: '< 2s',
    label: 'Latency Deteksi',
    icon: Zap,
    bg: 'bg-blue-light',
    text: 'text-blue',
  },
  {
    value: '50+',
    label: 'Fasilitas Terpantau',
    icon: Boxes,
    bg: 'bg-blue-light',
    text: 'text-blue',
  },
  {
    value: '24/7',
    label: 'Support Aktif',
    icon: Cloud,
    bg: 'bg-blue-light',
    text: 'text-blue',
  },
]

export default function StatsBar() {
  return (
    <div className="relative overflow-hidden border-y border-gray-100 bg-white">
      <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-4">
          {stats.map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={index * 0.1}
              className="group flex flex-col items-center text-center"
            >
              <div
                className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl ${stat.bg} ${stat.text} transition-all duration-300 group-hover:-translate-y-1`}
              >
                <stat.icon size={26} />
              </div>

              <p className="tabular-nums font-display text-3xl font-extrabold tracking-tight text-navy sm:text-4xl lg:text-[2.75rem]">
                {stat.value}
              </p>

              <p className={`mt-1.5 text-sm font-medium ${stat.text}`}>{stat.label}</p>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-slate">
          <span className="demo-chip">Data demo</span>
          <span className="ml-2">Angka di atas adalah ilustrasi, bukan klaim kinerja nyata.</span>
        </p>
      </div>
    </div>
  )
}