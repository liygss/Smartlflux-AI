import React, { useState } from 'react'
import { Droplets, Gauge, Waves, TrendingUp, AlertTriangle } from 'lucide-react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'
import { waterFlow, waterHourly, waterDaily, waterMonthly, waterKpi } from '../data'
import { KpiCard, SectionCard, PageTitle } from '../common'

const gridColor = '#eef2f7'
const tooltipStyle = { fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }
const axisTick = { fontSize: 11, fill: '#667085' }
const icons = [Droplets, Gauge, Waves, TrendingUp]
const tones = ['cyan', 'teal', 'green', 'indigo']

export default function WaterSection() {
  const [range, setRange] = useState('Today')
  const ranges = ['Today', '7 Days', '30 Days', 'Custom Range']
  const chartData = { Today: waterHourly, '7 Days': waterDaily, '30 Days': waterMonthly }[range]

  return (
    <div>
      <PageTitle title="Water Monitoring" description="Laju aliran, total volume, konsumsi harian, dan indikasi abnormal air." />

      <div className="mb-4 flex flex-wrap items-center gap-2">
        {ranges.map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
              range === r ? 'border-navy bg-navy text-white' : 'border-gray-200 bg-white text-slate hover:border-teal/40'
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {waterKpi.map((k, i) => {
          const Icon = icons[i]
          return <KpiCard key={k.label} icon={Icon} label={k.label} value={k.value} tone={tones[i]} />
        })}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <SectionCard title="Real-time Flow Rate (L/mnt)">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={waterFlow} margin={{ top: 5, right: 5, bottom: 0, left: -18 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis dataKey="t" tick={axisTick} axisLine={false} tickLine={false} />
                <YAxis tick={axisTick} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="f" name="Flow (L/mnt)" stroke="#14b8a6" strokeWidth={2} dot={{ r: 3, fill: '#14b8a6' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title={`Water Consumption — ${range} (m³)`}>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 5, bottom: 0, left: -18 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis dataKey={Object.keys(chartData[0])[0]} tick={axisTick} axisLine={false} tickLine={false} />
                <YAxis tick={axisTick} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="v" name="Air (m³)" fill="#2f855a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      {/* Abnormal indicator */}
      <div className="mt-4 rounded-xl border border-warning/30 bg-warning-light p-4">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-warning text-white">
            <AlertTriangle size={18} />
          </span>
          <div>
            <p className="text-sm font-semibold text-ink">Potential Anomaly — penggunaan air di luar pola normal</p>
            <p className="mt-0.5 text-xs text-slate">
              Penggunaan air pada pukul 01:00–03:00 berada di atas pola normal. Lakukan pengecekan pada area dengan penggunaan air kontinu.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
