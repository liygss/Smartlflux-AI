import React from 'react'
import { TrendingDown, TrendingUp, Minus } from 'lucide-react'

export function KpiCard({ icon: Icon, label, value, sublabel, delta, tone = 'blue', good = true }) {
  const toneMap = {
    blue: 'bg-blue-light text-blue',
    green: 'bg-green-light text-green',
    amber: 'bg-amber-light text-amber',
    indigo: 'bg-indigo-light text-indigo',
    teal: 'bg-teal-light text-teal',
    cyan: 'bg-cyan-light text-cyan',
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${toneMap[tone]}`}>
          <Icon size={18} />
        </span>
        {delta && (
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
              good ? 'bg-green-light text-green' : 'bg-critical-light text-critical'
            }`}
          >
            {delta.startsWith('+') ? <TrendingUp size={12} /> : delta.startsWith('-') ? <TrendingDown size={12} /> : <Minus size={12} />}
            {delta}
          </span>
        )}
      </div>
      <p className="mt-3 text-xs font-medium text-slate">{label}</p>
      <p className="font-display text-2xl font-bold text-ink">{value}</p>
      {sublabel && <p className="mt-0.5 text-[11px] text-slate">{sublabel}</p>}
    </div>
  )
}

export function SectionCard({ title, action, children, className = '' }) {
  return (
    <div className={`rounded-xl border border-gray-200 bg-white p-5 shadow-sm ${className}`}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-ink">{title}</h3>
        {action}
      </div>
      {children}
    </div>
  )
}

export function StatusBadge({ level }) {
  const map = {
    normal: { cls: 'bg-green-light text-green', dot: 'bg-green', label: 'Normal' },
    warning: { cls: 'bg-warning-light text-warning', dot: 'bg-warning', label: 'Warning' },
    critical: { cls: 'bg-critical-light text-critical', dot: 'bg-critical', label: 'Critical' },
    online: { cls: 'bg-green-light text-green', dot: 'bg-green', label: 'Online' },
    offline: { cls: 'bg-gray-200 text-slate', dot: 'bg-gray-400', label: 'Offline' },
  }
  const s = map[level] || map.normal
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${s.cls}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  )
}

export function PageTitle({ title, description }) {
  return (
    <div className="mb-5">
      <h1 className="font-display text-xl font-bold text-ink">{title}</h1>
      {description && <p className="mt-1 text-sm text-slate">{description}</p>}
    </div>
  )
}
