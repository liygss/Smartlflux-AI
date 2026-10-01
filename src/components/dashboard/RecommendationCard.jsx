import React, { useState } from 'react'
import {
  Zap,
  Droplets,
  Server,
  TrendingUp,
  BellRing,
  ChevronDown,
  Lightbulb,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'
import { domainMeta, priorityMeta, recStatusMeta, recStatusOrder } from './recommendations'

const domainIcon = {
  electricity: Zap,
  water: Droplets,
  device: Server,
  forecast: TrendingUp,
  alert: BellRing,
}

const domainTone = {
  electricity: 'text-electric',
  water: 'text-glow-teal',
  device: 'text-sky-300',
  forecast: 'text-glow-violet',
  alert: 'text-amber-300',
}

export function PriorityBadge({ level }) {
  const meta = priorityMeta[level] ?? priorityMeta.low
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-semibold ${meta.tone}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
      {meta.label}
    </span>
  )
}

export function RecommendationCard({ rec, status, onStatusChange, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  const Icon = domainIcon[rec.domain] ?? Lightbulb
  const current = status ?? rec.status
  const statusMeta = recStatusMeta[current] ?? recStatusMeta.new
  const step = recStatusOrder.indexOf(current)
  const isDone = current === 'done'

  return (
    <li
      className={`rounded-xl border bg-panel/60 transition-colors hover:bg-white/5 ${
        isDone ? 'border-mint/25' : 'border-line'
      }`}
    >
      <div className="flex flex-wrap items-start gap-3 px-4 py-3.5">
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-white/5 ${domainTone[rec.domain] ?? 'text-electric'}`}
        >
          <Icon size={16} />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md border border-line bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-fx-muted">
              {domainMeta[rec.domain]?.label ?? rec.domain}
            </span>
            <PriorityBadge level={rec.priority} />
            {isDone && (
              <span className="inline-flex items-center gap-1 rounded-md bg-mint/15 px-2 py-0.5 text-[11px] font-semibold text-mint">
                <CheckCircle2 size={11} />
                Dituntaskan
              </span>
            )}
          </div>

          <p
            className={`mt-1.5 text-sm font-semibold ${isDone ? 'text-fx-secondary line-through decoration-mint/50' : 'text-fx-text'}`}
          >
            {rec.title}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-fx-secondary">{rec.reason}</p>

          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {rec.evidence.map((item) => (
              <span
                key={item}
                className="rounded-md border border-line bg-white/5 px-2 py-0.5 text-[10.5px] font-medium text-fx-secondary"
              >
                {item}
              </span>
            ))}
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="mt-2.5 inline-flex items-center gap-1 text-xs font-semibold text-electric transition-colors hover:underline"
            aria-expanded={open}
          >
            {open ? 'Sembunyikan' : 'Lihat'} langkah penanganan
            <ChevronDown size={13} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>

          {open && (
            <ol className="mt-2.5 space-y-2 border-l-2 border-electric/30 pl-3.5">
              {rec.actions.map((action, i) => (
                <li key={action} className="flex gap-2.5 text-xs leading-relaxed text-fx-secondary">
                  <span className="tabular-nums font-semibold text-electric">{i + 1}.</span>
                  <span>{action}</span>
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="flex w-full flex-wrap items-center justify-between gap-2 border-t border-line px-4 py-2.5 sm:w-auto sm:border-0 sm:px-0 sm:py-0">
          <span className="text-[11px] text-fx-muted">
            <span className="font-semibold text-fx-secondary">{rec.impact.label}:</span>{' '}
            {rec.impact.value}
          </span>
          <div className="flex items-center gap-2">
            {rec.source && (
              <span className="hidden text-[11px] text-fx-muted xl:inline">
                Sumber: {rec.source.label}
              </span>
            )}
            <span
              className={`inline-flex items-center rounded-md px-2.5 py-1 text-[11px] font-semibold ${statusMeta.tone}`}
            >
              {statusMeta.label}
            </span>
            {onStatusChange && !isDone && (
              <button
                onClick={() => onStatusChange(rec.id, recStatusOrder[step + 1] ?? 'done')}
                className="inline-flex items-center gap-1 rounded-md border border-line bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-fx-secondary transition-colors hover:bg-white/10 hover:text-fx-text"
              >
                {step === 0 ? 'Ikuti' : 'Tuntaskan'}
                <ArrowRight size={11} />
              </button>
            )}
          </div>
        </div>
      </div>
    </li>
  )
}

export function RecommendationList({ items, statuses = {}, onStatusChange, emptyLabel }) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-line bg-panel/60 px-6 py-12 text-center">
        <Lightbulb size={28} className="mb-3 text-fx-secondary" />
        <p className="text-sm font-semibold text-fx-text">{emptyLabel ?? 'Tidak ada rekomendasi'}</p>
        <p className="mt-1 text-xs text-fx-secondary">
          Rekomendasi muncul otomatis dari pola konsumsi yang menyimpang.
        </p>
      </div>
    )
  }

  return (
    <ul className="space-y-2.5">
      {items.map((rec) => (
        <RecommendationCard
          key={rec.id}
          rec={rec}
          status={statuses[rec.id]}
          onStatusChange={onStatusChange}
        />
      ))}
    </ul>
  )
}