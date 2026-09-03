import React from 'react'
import { Activity, Zap, Boxes, Cloud } from 'lucide-react'
import { Reveal } from './ui/Reveal'

const stats = [
  {
    value: '99.9%',
    label: 'Monitoring Uptime',
    icon: Activity,
    gradient: 'from-blue to-blue-soft',
    bg: 'bg-blue-light/70',
    text: 'text-blue',
  },
  {
    value: '< 2s',
    label: 'Latency Deteksi',
    icon: Zap,
    gradient: 'from-emerald to-teal',
    bg: 'bg-emerald-light/70',
    text: 'text-emerald',
  },
  {
    value: '50+',
    label: 'Fasilitas Terpantau',
    icon: Boxes,
    gradient: 'from-violet to-indigo',
    bg: 'bg-violet-light/70',
    text: 'text-violet',
  },
  {
    value: '24/7',
    label: 'Support Aktif',
    icon: Cloud,
    gradient: 'from-cyan to-sky',
    bg: 'bg-cyan-light/70',
    text: 'text-sky',
  },
]

export default function StatsBar() {
  return (
    <div className="relative overflow-hidden border-y border-gray-100 bg-white">
      <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-[40rem] -translate-x-1/2 rounded-full bg-blue-light/50 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-4">
          {stats.map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={index * 0.1}
              className="group flex flex-col items-center text-center"
            >
              <div
                className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.gradient} text-white shadow-lg transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-110`}
              >
                <stat.icon size={26} />
              </div>

              <p className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl lg:text-[2.75rem]">
                {stat.value}
              </p>

              <p className={`mt-1.5 text-sm font-medium ${stat.text}`}>{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue/20 to-transparent" />
    </div>
  )
}
