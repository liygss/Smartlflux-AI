import React from 'react'
import { TrendingDown, TrendingUp, Minus } from 'lucide-react'
import { MiniArea } from './charts'

const sparkMap = {
  blue: '#3b82f6',
  green: '#22c55e',
  amber: '#f59e0b',
  indigo: '#818cf8',
  teal: '#22d3ee',
  cyan: '#22d3ee',
}

export function KpiCard({ icon: Icon, label, value, sublabel, delta, tone = 'blue', good = true, spark, sparkKey }) {
  const sparkColor = sparkMap[tone] || sparkMap.blue

  return (
    <div className="dash-card group p-5 hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-white/5 text-electric">
          <Icon size={19} strokeWidth={2} />
        </span>
        {delta && (
          <span
            className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold ${
              good ? 'bg-mint/15 text-mint' : 'bg-fx-critical/15 text-red-300'
            }`}
          >
            {delta.startsWith('+') ? <TrendingUp size={12} /> : delta.startsWith('-') ? <TrendingDown size={12} /> : <Minus size={12} />}
            {delta}
          </span>
        )}
      </div>
      <p className="mt-4 text-[13px] font-medium text-fx-secondary">{label}</p>
      <p className="tabular-nums mt-1 font-display text-[28px] font-semibold leading-tight tracking-tight text-fx-text">
        {value}
      </p>
      {sublabel && <p className="mt-1 text-xs text-fx-secondary">{sublabel}</p>}
      {spark && <div className="mt-3"><MiniArea data={spark} dataKey={sparkKey || 'v'} color={sparkColor} id={`spark-${label.replace(/\s+/g, '-').toLowerCase()}`} /></div>}
    </div>
  )
}

export function SectionCard({ title, subtitle, icon: Icon, action, children, footer, className = '' }) {
  return (
    <div className={`dash-card flex flex-col p-5 ${className}`}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          {Icon && (
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-white/5 text-electric">
              <Icon size={16} strokeWidth={2} />
            </span>
          )}
          <div className="min-w-0">
            <h3 className="font-display text-lg font-semibold leading-tight text-fx-text">{title}</h3>
            {subtitle && <p className="mt-0.5 truncate text-xs text-fx-secondary">{subtitle}</p>}
          </div>
        </div>
        {action}
      </div>
      <div className="flex-1">{children}</div>
      {footer && <div className="mt-4 border-t border-line pt-4">{footer}</div>}
    </div>
  )
}

export function StatusBadge({ level, label }) {
  const map = {
    normal: { cls: 'bg-mint/15 text-mint', dot: 'bg-mint', label: 'Normal' },
    warning: { cls: 'bg-fx-warning/15 text-amber-300', dot: 'bg-fx-warning', label: 'Peringatan' },
    critical: { cls: 'bg-fx-critical/15 text-red-300', dot: 'bg-fx-critical', label: 'Kritis' },
    online: { cls: 'bg-mint/15 text-mint', dot: 'bg-mint', label: 'Terhubung' },
    offline: { cls: 'bg-white/10 text-fx-muted', dot: 'bg-gray-500', label: 'Terputus' },
  }
  const s = map[level] || map.normal
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold ${s.cls}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {label || s.label}
    </span>
  )
}

export function PageTitle({ title, description, action }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-3xl font-semibold leading-tight tracking-tight text-fx-text">{title}</h1>
        {description && <p className="mt-1.5 max-w-2xl text-[15px] text-fx-secondary">{description}</p>}
      </div>
      {action}
    </div>
  )
}