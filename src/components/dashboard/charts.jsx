import React from 'react'
import {
  Area,
  AreaChart,
  ResponsiveContainer,
} from 'recharts'

// Custom rich tooltip shared across all charts
export function ChartTooltip({ active, payload, label, labelFormatter, valueFormatter, baselineValue, exclude }) {
  if (!active || !payload || payload.length === 0) return null

  const rows = exclude && exclude.length ? payload.filter((p) => !exclude.includes(p.dataKey)) : payload
  if (rows.length === 0) return null

  return (
    <div className="rounded-xl border border-line bg-card px-3.5 py-2.5 shadow-[0_14px_34px_-8px_rgba(0,0,0,0.7)]">
      {label && (
        <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-fx-secondary">
          {labelFormatter ? labelFormatter(label, payload) : label}
        </p>
      )}
      <div className="space-y-1">
        {rows.map((entry) => (
          <div key={entry.dataKey} className="flex items-center justify-between gap-6">
            <span className="flex items-center gap-1.5 text-xs text-fx-secondary">
              <span className="h-2 w-2 rounded-full" style={{ background: entry.color || entry.fill }} />
              {entry.name}
            </span>
            <span className="text-xs font-bold text-fx-text">
              {valueFormatter ? valueFormatter(entry.value) : entry.value}
            </span>
          </div>
        ))}
        {baselineValue !== undefined && (
          <div className="flex items-center justify-between gap-6 border-t border-line pt-1.5">
            <span className="flex items-center gap-1.5 text-xs text-fx-secondary">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              Baseline
            </span>
            <span className="text-xs font-semibold text-fx-text">
              {valueFormatter ? valueFormatter(baselineValue) : baselineValue}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

// Tiny inline sparkline used inside KPI cards
export function MiniArea({ data, dataKey, color, id }) {
  const gid = id || `spark-${dataKey}`
  return (
    <div className="h-9 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.12} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} fill={`url(#${gid})`} dot={false} isAnimationActive animationDuration={800} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}