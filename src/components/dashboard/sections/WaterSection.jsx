import React, { useState } from 'react'
import { Droplets, Gauge, Waves, TrendingUp, AlertTriangle, ArrowRight } from 'lucide-react'
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
  ReferenceDot,
} from 'recharts'
import { waterFlow, waterHourly, waterDaily, waterMonthly, waterKpi } from '../data'
import { KpiCard, SectionCard, PageTitle } from '../common'
import { ChartTooltip } from '../charts'
import { gridColor, gridDash, axisTick, seriesColors } from '../chartStyle'

const icons = [Droplets, Gauge, Waves, TrendingUp]

const rangeBtn = () => 'seg-opt'

export default function WaterSection({ onNavigate }) {
  const [range, setRange] = useState('Hari Ini')
  const ranges = ['Hari Ini', '7 Hari', '30 Hari', 'Rentang Kustom']
  const chartData = { 'Hari Ini': waterHourly, '7 Hari': waterDaily, '30 Hari': waterMonthly }[range]

  const kpiSparks = [waterFlow, waterHourly, waterDaily, waterMonthly]

  return (
    <div>
      <PageTitle
        title="Pemantauan Air"
        description="Laju aliran, total volume, konsumsi harian, dan indikasi abnormal air."
        action={
          <div className="segmented">
            {ranges.map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={rangeBtn(range === r)}
                aria-pressed={range === r}
              >
                {r}
              </button>
            ))}
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {waterKpi.map((k, i) => {
          const Icon = icons[i]
          const sparkKey = i === 0 ? 'f' : i === 1 ? 'v' : i === 2 ? 'v' : 'v'
          return (
            <KpiCard key={k.label} icon={Icon} label={k.label} value={k.value} tone="teal" spark={kpiSparks[i]} sparkKey={sparkKey} />
          )
        })}
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <SectionCard
          title="Laju Aliran Real-time"
          subtitle="Pemakaian air hari ini"
          icon={Waves}
          footer={
            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-xs text-fx-secondary">
              <span>Aliran saat ini: <span className="font-semibold text-fx-text">12.4 L/mnt</span></span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ background: seriesColors.water }} /> L/mnt
              </span>
            </div>
          }
        >
          <div className="h-56 rounded-xl border border-line bg-panel/60 p-3">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={waterFlow} margin={{ top: 5, right: 5, bottom: 0, left: -18 }}>
                <defs>
                  <linearGradient id="wt-realtime" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={seriesColors.water} stopOpacity={0.12} />
                    <stop offset="100%" stopColor={seriesColors.water} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray={gridDash} stroke={gridColor} vertical={false} />
                <XAxis dataKey="t" tick={axisTick} axisLine={false} tickLine={false} />
                <YAxis tick={axisTick} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip valueFormatter={(v) => `${v} L/mnt`} />} />
                <Line type="monotone" dataKey="f" name="Aliran (L/mnt)" stroke={seriesColors.water} strokeWidth={2.5} fill="url(#wt-realtime)" dot={false} activeDot={{ r: 5 }} />
                <ReferenceDot x={waterFlow[waterFlow.length - 1].t} y={waterFlow[waterFlow.length - 1].f} r={5} fill={seriesColors.water} stroke="#fff" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title={`Konsumsi Air · ${range} (m³)`} subtitle="Total volume berdasarkan rentang" icon={Droplets}>
          <div className="h-56 rounded-xl border border-line bg-panel/60 p-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 5, bottom: 0, left: -18 }}>
                <defs>
                  <linearGradient id="wt-bar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={seriesColors.waterSoft} />
                    <stop offset="100%" stopColor={seriesColors.water} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray={gridDash} stroke={gridColor} vertical={false} />
                <XAxis dataKey={Object.keys(chartData[0])[0]} tick={axisTick} axisLine={false} tickLine={false} />
                <YAxis tick={axisTick} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip valueFormatter={(v) => `${v} m³`} />} cursor={{ fill: 'rgba(34,211,238,0.08)' }} />
                <Bar dataKey="v" name="Air (m³)" radius={[6, 6, 0, 0]} maxBarSize={38} fill="url(#wt-bar)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      {/* Abnormal indicator */}
      <div className="mt-4 overflow-hidden rounded-2xl border border-fx-warning/30 bg-fx-warning/10 p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-600 text-white">
              <AlertTriangle size={22} />
            </span>
            <div>
              <p className="font-display text-base font-bold text-fx-text">Potensi Anomali: penggunaan air di luar pola normal</p>
              <p className="mt-1 max-w-2xl text-sm text-fx-secondary">
                Penggunaan air pada pukul 01:00–03:00 berada di atas pola normal. Lakukan pengecekan pada area dengan penggunaan air kontinu.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('alerts')}
            className="inline-flex items-center gap-1.5 rounded-lg bg-amber-700 px-4 py-2 text-xs font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Cek Peringatan <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}