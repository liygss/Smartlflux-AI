import React from 'react'
import { MonitorPlay } from 'lucide-react'

export default function VideoCard({ className = '', autoPlay = true }) {
  return (
    <div className={`relative ${className}`}>
      <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-navy-dark shadow-[var(--shadow-lift)]">
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

        <div className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-2 rounded-md bg-white/95 px-3 py-1.5 text-xs font-semibold text-navy shadow-sm backdrop-blur">
          <MonitorPlay size={14} className="text-blue" />
          Demo SmartFlux AI
        </div>

        <span className="pointer-events-none absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-md bg-white/95 px-3 py-1.5 text-xs font-semibold text-slate shadow-sm backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-blue" />
          Demo · Loop
        </span>
      </div>
    </div>
  )
}
