import React from 'react'
import { BarChart3, Layers, CheckCircle2 } from 'lucide-react'
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts'
import { analyticsTrend, efficiency } from '../data'
import { SectionCard, PageTitle } from '../common'

const gridColor = '#eef2f7'
const tooltipStyle = { fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }
const axisTick = { fontSize: 11, fill: '#667085' }

const peakData = [
  { slot: '18:00', v: 52 },
  { slot: '21:00', v: 45 },
  { slot: '12:00', v: 35 },
  { slot: '15:00', v: 33 },
]

export default function AnalyticsSection() {
  const level = efficiency.level
  const levelColor = level === 'Efficient' ? 'text-green' : level === 'Normal' ? 'text-blue' : 'text-warning'

  return (
    <div>
      <PageTitle
        title="Analytics"
        description="Analisis data historis: tren konsumsi, peak usage, perbandingan baseline, dan indikator efisiensi."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <SectionCard title="Consumption Trend — Listrik & Air" className="lg:col-span-2">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={analyticsTrend} margin={{ top: 5, right: 5, bottom: 0, left: -14 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis dataKey="m" tick={axisTick} axisLine={false} tickLine={false} />
                <YAxis yAxisId="left" tick={axisTick} axisLine={false} tickLine={false} />
                <YAxis yAxisId="right" orientation="right" tick={axisTick} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar yAxisId="left" dataKey="l" name="Listrik (kWh)" fill="#2f5597" radius={[3, 3, 0, 0]} />
                <Bar yAxisId="right" dataKey="w" name="Air (m³)" fill="#2f855a" radius={[3, 3, 0, 0]} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <div className="space-y-4">
          <SectionCard title="Efficiency Indicator">
            <div className="flex items-center gap-4">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-green bg-green-light text-xl font-bold text-green">
                {efficiency.score}
              </span>
              <div>
                <p className={`font-display text-lg font-bold ${levelColor}`}>{level}</p>
                <p className="text-xs text-slate">Dibandingkan pola normal</p>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Peak Usage">
            <ul className="space-y-2">
              {peakData.map((p) => (
                <li key={p.slot} className="flex items-center justify-between rounded-lg bg-mist px-3 py-2 text-sm">
                  <span className="flex items-center gap-2 text-slate">
                    <BarChart3 size={14} className="text-blue" /> {p.slot}
                  </span>
                  <span className="font-semibold text-ink">{p.v} kWh</span>
                </li>
              ))}
            </ul>
          </SectionCard>
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <SectionCard title="Baseline Comparison">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-light text-indigo">
              <Layers size={18} />
            </span>
            <div>
              <p className="text-sm font-semibold text-ink">Konsumsi saat ini</p>
              <p className={`text-xs font-semibold ${levelColor}`}>-6.7% vs baseline</p>
            </div>
          </div>
        </SectionCard>
        <SectionCard title="Anomaly Detection">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning-light text-warning">
              <BarChart3 size={18} />
            </span>
            <div>
              <p className="text-sm font-semibold text-ink">Potential Anomaly</p>
              <p className="text-xs text-slate">2 pola abnormal dalam 7 hari</p>
            </div>
          </div>
        </SectionCard>
        <SectionCard title="Prediksi 7 Hari">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-light text-green">
              <CheckCircle2 size={18} />
            </span>
            <div>
              <p className="text-sm font-semibold text-ink">Listrik ~875 kWh</p>
              <p className="text-xs text-slate">Air ~318 m³ · bersifat estimasi</p>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
