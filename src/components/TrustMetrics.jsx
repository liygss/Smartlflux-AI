import React from 'react'
import { Zap, Layers, Activity, BellRing } from 'lucide-react'
import { motion } from 'motion/react'

const metrics = [
  { icon: Layers, value: '1 Platform', label: 'Terintegrasi Listrik + Air' },
  { icon: Zap, value: '2 Resources', label: 'Listrik & Air in real-time' },
  { icon: Activity, value: '24/7', label: 'Monitoring berkelanjutan' },
  { icon: BellRing, value: 'Real-Time', label: 'Early warning alerts' },
]

export default function TrustMetrics() {
  return (
    <div className="relative mx-auto max-w-6xl px-5 pb-16 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-2 gap-3 md:grid-cols-4"
      >
        {metrics.map((m) => (
          <div key={m.label} className="fx-card flex items-center gap-3 p-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-panel text-glow-cyan">
              <m.icon size={18} />
            </span>
            <div className="min-w-0">
              <p className="tabular-nums font-display text-lg font-bold leading-tight text-fx-text">
                {m.value}
              </p>
              <p className="truncate text-[11px] text-fx-secondary">{m.label}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}