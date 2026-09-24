import React, { useState } from 'react'
import { BellRing, Filter } from 'lucide-react'
import { alerts } from '../data'
import { SectionCard, StatusBadge, PageTitle } from '../common'

const levelMeta = {
  critical: { label: 'Kritis', tone: 'bg-fx-critical/15 text-red-300' },
  warning: { label: 'Peringatan', tone: 'bg-fx-warning/15 text-amber-300' },
  normal: { label: 'Normal', tone: 'bg-mint/15 text-mint' },
}

export default function AlertsSection() {
  const [filter, setFilter] = useState('Semua')
  const filters = ['Semua', 'Kritis', 'Peringatan', 'Normal']
  const filtered = filter === 'Semua' ? alerts : alerts.filter((a) => levelMeta[a.level].label === filter)

  return (
    <div>
      <PageTitle
        title="Peringatan"
        description="Semua peringatan sistem dengan tingkat prioritas dan status penanganan."
        action={
          <div className="segmented">
            <span className="mr-1 hidden items-center gap-1 self-center pl-2 text-xs font-medium text-fx-secondary sm:flex">
              <Filter size={13} /> Filter:
            </span>
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="seg-opt"
                aria-pressed={filter === f}
              >
                {f}
              </button>
            ))}
          </div>
        }
      />

      <SectionCard>
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-line bg-panel/60 px-6 py-12 text-center">
            <BellRing size={28} className="mb-3 text-fx-secondary" />
            <p className="text-sm font-semibold text-fx-text">Tidak ada alert pada filter {filter}</p>
            <p className="mt-1 text-xs text-fx-secondary">Coba pilih level lain untuk melihat lebih banyak data.</p>
          </div>
        ) : (
          <ul className="space-y-2.5">
            {filtered.map((a) => {
              const meta = levelMeta[a.level]
              return (
                <li
                  key={a.id}
                  className="flex flex-wrap items-center gap-3 rounded-xl border border-line bg-panel/60 px-4 py-3.5 transition-colors hover:bg-white/5"
                >
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${meta.tone}`}>
                    <BellRing size={18} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-fx-text">{a.title}</p>
                    <p className="mt-0.5 text-xs text-fx-secondary">{a.location} · {a.time}</p>
                  </div>
                  <StatusBadge level={a.level} />
                  <span
                    className={`rounded-md px-2.5 py-1 text-[11px] font-semibold ${
                      a.status === 'Ditangani'
                        ? 'bg-mint/15 text-mint'
                        : a.status === 'Belum ditangani'
                          ? 'bg-fx-critical/15 text-red-300'
                          : 'border border-line bg-white/5 text-sky-300'
                    }`}
                  >
                    {a.status}
                  </span>
                </li>
              )
            })}
          </ul>
        )}
      </SectionCard>
    </div>
  )
}