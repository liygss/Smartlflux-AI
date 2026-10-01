import React from 'react'
import { Zap, Droplets, TrendingUp, TrendingDown, Minus, Target, LineChart } from 'lucide-react'
import { domainMeta, confidenceMeta } from './predictions'

const domainIcon = { electricity: Zap, water: Droplets }
const domainTone = { electricity: 'text-electric', water: 'text-glow-teal' }

const trendIcon = { up: TrendingUp, down: TrendingDown, flat: Minus }
const trendTone = { up: 'text-amber-300', down: 'text-mint', flat: 'text-fx-secondary' }
const trendLabel = { up: 'Naik', down: 'Turun', flat: 'Stabil' }

export function ConfidenceBadge({ score }) {
  const meta = confidenceMeta(score)
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-semibold ${meta.tone}`}
      title={`Tingkat keyakinan ${score}%`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
      Keyakinan {score}%
    </span>
  )
}

function PredictionFrame({ pred, children }) {
  const Icon = domainIcon[pred.domain] ?? LineChart
  return (
    <div className="rounded-xl border border-line bg-panel/60 p-4 transition-colors hover:bg-white/5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-white/5 ${domainTone[pred.domain] ?? 'text-electric'}`}
          >
            <Icon size={16} />
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="rounded-md border border-line bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-fx-muted">
                {domainMeta[pred.domain]?.label ?? pred.domain}
              </span>
              <span className="rounded-md border border-electric/30 bg-electric/15 px-2 py-0.5 text-[10px] font-semibold text-sky-300">
                {pred.horizon}
              </span>
            </div>
            <p className="mt-1 text-sm font-semibold leading-snug text-fx-text">{pred.title}</p>
          </div>
        </div>
        <ConfidenceBadge score={pred.confidence} />
      </div>
      {children}
    </div>
  )
}

export function PredictionCard({ pred }) {
  const TrendIcon = trendIcon[pred.trend] ?? Minus
  return (
    <PredictionFrame pred={pred}>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="tabular-nums font-display text-2xl font-bold leading-tight tracking-tight text-fx-text">
            {pred.value}
          </p>
          <p className="mt-0.5 text-[11px] text-fx-secondary">
            Rentang {pred.range}
          </p>
        </div>
        <span
          className={`inline-flex items-center gap-1.5 rounded-md border border-line bg-white/5 px-2.5 py-1 text-[11px] font-semibold ${trendTone[pred.trend] ?? 'text-fx-secondary'}`}
        >
          <TrendIcon size={12} />
          {trendLabel[pred.trend] ?? 'Stabil'}
        </span>
      </div>
    </PredictionFrame>
  )
}

export function PredictionDetailList({ items }) {
  return (
    <div className="space-y-2.5">
      {items.map((pred) => (
        <PredictionFrame key={pred.id} pred={pred}>
          <div className="mt-3 grid gap-3 border-t border-line pt-3 sm:grid-cols-[minmax(0,1fr)_auto]">
            <div className="min-w-0 space-y-2">
              <p className="tabular-nums font-display text-xl font-bold leading-tight text-fx-text">
                {pred.value}
              </p>
              <p className="text-xs text-fx-secondary">Rentang prediksi: {pred.range}</p>
              <p className="text-xs leading-relaxed text-fx-secondary">{pred.detail}</p>
            </div>
            <dl className="grid shrink-0 gap-2 text-[11px] sm:w-64">
              <div className="rounded-lg border border-line bg-white/5 px-3 py-2">
                <dt className="flex items-center gap-1.5 font-semibold text-fx-text">
                  <Target size={12} /> Dasar data
                </dt>
                <dd className="mt-0.5 text-fx-secondary">{pred.basis}</dd>
              </div>
              <div className="rounded-lg border border-line bg-white/5 px-3 py-2">
                <dt className="flex items-center gap-1.5 font-semibold text-fx-text">
                  <LineChart size={12} /> Metode
                </dt>
                <dd className="mt-0.5 text-fx-secondary">{pred.method}</dd>
              </div>
            </dl>
          </div>
        </PredictionFrame>
      ))}
    </div>
  )
}

export function PredictionGrid({ items }) {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {items.map((pred) => (
        <PredictionCard key={pred.id} pred={pred} />
      ))}
    </div>
  )
}