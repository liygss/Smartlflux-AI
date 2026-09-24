import React from 'react'
import { BarChart3, Layers, CheckCircle2, TrendingUp, AlertTriangle } from 'lucide-react'
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts'
import { analyticsTrend, efficiency } from '../data'
import { SectionCard, PageTitle } from '../common'
import { ChartTooltip } from '../charts'
import { gridColor, gridDash, axisTick, seriesColors } from '../chartStyle'

const peakData = [
  { slot: '18:00', v: 52 },
  { slot: '21:00', v: 45 },
  { slot: '12:00', v: 35 },
  { slot: '15:00', v: 33 },
]

function EfficiencyRing({ score, ringColor }) {
  const r = 52
  const c = 2 * Math.PI * r
  return (
    <div className="relative flex h-32 w-32 items-center justify-center">
      <svg viewBox="0 0 120 120" className="h-32 w-32 -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" stroke="#1f3142" strokeWidth="12" />
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke={ringColor}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (c * score) / 100}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <span className="absolute font-display text-2xl font-extrabold text-fx-text">{score}</span>
    </div>
  )
}

export default function AnalyticsSection() {
  const level = efficiency.level
  const levelColor = level === 'Efisien' ? 'text-mint' : level === 'Normal' ? 'text-electric' : 'text-fx-warning'
  const ringColor = level === 'Efisien' ? seriesColors.emerald : level === 'Normal' ? seriesColors.electricity : '#f59e0b'

  return (
    <div>
      <PageTitle
        title="Analitik"
        description="Analisis data historis: tren konsumsi, peak usage, perbandingan baseline, dan indikator efisiensi."
      />

      <div className="grid gap-4 xl:grid-cols-3">
        <SectionCard title="Tren Konsumsi: Listrik & Air" icon={BarChart3} className="xl:col-span-2">
          <div className="rounded-xl border border-line bg-panel/60 p-3">
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={analyticsTrend} margin={{ top: 5, right: 5, bottom: 0, left: -14 }}>
                  <defs>
                    <linearGradient id="an-el" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={seriesColors.electricitySoft} />
                      <stop offset="100%" stopColor={seriesColors.electricity} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray={gridDash} stroke={gridColor} vertical={false} />
                  <XAxis dataKey="m" tick={axisTick} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="left" tick={axisTick} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="right" orientation="right" tick={axisTick} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(59,130,246,0.10)' }} />
                  <Legend wrapperStyle={{ fontSize: 12, color: "#94a3b8" }} iconType="circle" iconSize={8} />
                  <Bar yAxisId="left" dataKey="l" name="Listrik (kWh)" fill="url(#an-el)" radius={[4, 4, 0, 0]} maxBarSize={30} />
                  <Line yAxisId="right" type="monotone" dataKey="w" name="Air (m³)" stroke={seriesColors.water} strokeWidth={2.5} dot={{ r: 3, fill: seriesColors.water, strokeWidth: 0 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </SectionCard>

        <div className="space-y-4">
          <SectionCard title="Indikator Efisiensi" icon={TrendingUp}>
            <div className="flex items-center gap-5">
              <EfficiencyRing score={efficiency.score} ringColor={ringColor} />
              <div>
                <p className={`font-display text-lg font-bold ${levelColor}`}>{level}</p>
                <p className="mt-0.5 text-xs text-fx-secondary">Dibandingkan pola normal</p>
                <p className="mt-2 text-[11px] text-fx-secondary">Skor dihitung dari efisiensi pemakaian relatif terhadap baseline (demo).</p>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Pemakaian Puncak" icon={BarChart3}>
            <ul className="space-y-2">
              {peakData.map((p, i) => (
                <li key={p.slot} className="flex items-center justify-between rounded-lg bg-panel px-3 py-2 text-sm">
                  <span className="flex items-center gap-2 font-medium text-fx-text">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/10 text-xs font-bold text-white">{i + 1}</span>
                    {p.slot}
                  </span>
                  <span className="font-semibold text-fx-text">{p.v} kWh</span>
                </li>
              ))}
            </ul>
          </SectionCard>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="dash-card flex items-center gap-4 p-5">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-line bg-white/5 text-indigo-300">
            <Layers size={20} />
          </span>
          <div>
            <p className="text-sm font-semibold text-fx-text">Konsumsi saat ini</p>
            <p className={`text-xs font-semibold ${levelColor}`}>-6.7% vs baseline</p>
          </div>
        </div>
        <div className="dash-card flex items-center gap-4 p-5">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-fx-warning/15 text-amber-300">
            <AlertTriangle size={20} />
          </span>
          <div>
            <p className="text-sm font-semibold text-fx-text">Potensi Anomali</p>
            <p className="text-xs text-fx-secondary">2 pola abnormal dalam 7 hari</p>
          </div>
        </div>
        <div className="dash-card flex items-center gap-4 p-5">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-mint/15 text-mint">
            <CheckCircle2 size={20} />
          </span>
          <div>
            <p className="text-sm font-semibold text-fx-text">Prediksi 7 hari</p>
            <p className="text-xs text-fx-secondary">Listrik ~875 kWh · Air ~318 m³</p>
          </div>
        </div>
      </div>
    </div>
  )
}