import React, { useState } from 'react'
import { BellRing, Filter } from 'lucide-react'
import { alerts } from '../data'
import { SectionCard, StatusBadge, PageTitle } from '../common'

const levelMeta = {
  critical: 'Critical',
  warning: 'Warning',
  normal: 'Normal',
}

export default function AlertsSection() {
  const [filter, setFilter] = useState('All')
  const filters = ['All', 'Critical', 'Warning', 'Normal']
  const filtered = filter === 'All' ? alerts : alerts.filter((a) => levelMeta[a.level] === filter)

  return (
    <div>
      <PageTitle
        title="Alerts"
        description="Semua peringatan sistem dengan tingkat prioritas dan status penanganan."
      />

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="mr-1 flex items-center gap-1.5 text-xs font-semibold text-slate">
          <Filter size={14} /> Filter:
        </span>
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
              filter === f ? 'border-navy bg-navy text-white' : 'border-gray-200 bg-white text-slate hover:border-blue/40'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <SectionCard>
        <ul className="space-y-2">
          {filtered.map((a) => (
            <li
              key={a.id}
              className="flex flex-wrap items-center gap-3 rounded-lg border border-gray-100 bg-mist px-4 py-3"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy text-white">
                <BellRing size={16} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-ink">{a.title}</p>
                <p className="text-xs text-slate">{a.location}</p>
              </div>
              <span className="text-xs text-slate">{a.time}</span>
              <StatusBadge level={a.level} />
              <span className="rounded-full border border-gray-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate">
                {a.status}
              </span>
            </li>
          ))}
        </ul>
      </SectionCard>
    </div>
  )
}
