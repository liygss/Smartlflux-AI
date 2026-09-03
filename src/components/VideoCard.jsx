import React from 'react'
import { MonitorPlay, Sparkles } from 'lucide-react'

export default function VideoCard({ className = '', autoPlay = true }) {
  return (
    <div className={`relative ${className}`}>
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-navy-dark shadow-[var(--shadow-lift)]">
        <video
          className="aspect-[3/2] w-full object-contain"
          src="/showcase.mp4"
          autoPlay={autoPlay}
          muted
          loop
          playsInline
        >
          <div className="flex items-center justify-center gap-2 p-8 text-sm text-white">
            <MonitorPlay size={18} />
            <span>Browser Anda tidak mendukung pemutaran video.</span>
          </div>
        </video>

        <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-navy shadow-sm backdrop-blur">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-blue to-blue-soft text-white">
            <MonitorPlay size={12} />
          </span>
          Demo SmartFlux AI
        </div>

        <div className="pointer-events-none absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-green/90 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm backdrop-blur">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
          Live · Loop
        </div>
      </div>

      <span className="pointer-events-none absolute -right-3 -top-3 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-green to-blue text-white shadow-[var(--shadow-lift)]">
        <Sparkles size={20} />
      </span>
    </div>
  )
}
