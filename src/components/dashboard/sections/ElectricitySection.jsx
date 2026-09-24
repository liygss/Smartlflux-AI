import React, { useState } from 'react'
import {
  Zap,
  Gauge,
  Activity,
  BatteryCharging,
  Waves,
} from 'lucide-react'
import {
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  ReferenceDot,
} from 'recharts'
import {
  realtimeElectricity,
  electricityHourly,
  electricityDaily,
  electricityDailyPrev,
  electricityMonthly,
  energyKpi,
  forecast,
} from '../data'
import { KpiCard, SectionCard, PageTitle } from '../common'
import { ChartTooltip } from '../charts'
import { gridColor, gridDash, axisTick, seriesColors } from '../chartStyle'

const icons = [Zap, Gauge, Activity, BatteryCharging, Waves]

const rangeBtn = () => 'seg-opt'

export default function ElectricitySection() {
  const [range, setRange] = useState('Hari Ini')
  const ranges = ['Hari Ini', '7 Hari', '30 Hari', 'Rentang Kustom']
  const chartData = { 'Hari Ini': electricityHourly, '7 Hari': electricityDaily, '30 Hari': electricityMonthly }[range]
  const barKey = Object.keys(chartData[0])[0]

  const kpiSparks = [realtimeElectricity, realtimeElectricity, realtimeElectricity, electricityHourly, [0.96, 0.97, 0.98, 0.97, 0.98, 0.98, 0.98].map((v, i) => ({ v, i }))]

  return (
    <div>
      <PageTitle
        title="Pemantauan Listrik"
        description="Tegangan, arus, daya, energi, dan faktor daya secara real-time."
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {energyKpi.map((k, i) => {
          const Icon = icons[i]
          const sparkKey = i < 3 ? 'p' : i === 3 ? 'e' : 'v'
          return (
            <KpiCard key={k.label} icon={Icon} label={k.label} value={k.value} tone="blue" spark={kpiSparks[i]} sparkKey={sparkKey} />
          )
        })}
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <SectionCard
          title="Daya Real-time"
          subtitle="Pemakaian daya saat ini"
          icon={Activity}
          footer={
            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-xs text-fx-secondary">
              <span>Daya saat ini: <span className="font-semibold text-fx-text">1.28 kW</span></span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ background: seriesColors.electricity }} /> kW
              </span>
            </div>
          }
        >
          <div className="h-56 rounded-xl border border-line bg-panel/60 p-3">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={realtimeElectricity} margin={{ top: 5, right: 5, bottom: 0, left: -18 }}>
                <defs>
                  <linearGradient id="el-realtime" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={seriesColors.electricity} stopOpacity={0.12} />
                    <stop offset="100%" stopColor={seriesColors.electricity} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray={gridDash} stroke={gridColor} vertical={false} />
                <XAxis dataKey="t" tick={axisTick} axisLine={false} tickLine={false} />
                <YAxis tick={axisTick} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip valueFormatter={(v) => `${v} kW`} />} />
                <Line type="monotone" dataKey="p" name="Daya (kW)" stroke={seriesColors.electricity} strokeWidth={2.5} fill="url(#el-realtime)" dot={false} activeDot={{ r: 5 }} />
                <ReferenceDot x={realtimeElectricity[realtimeElectricity.length - 1].t} y={realtimeElectricity[realtimeElectricity.length - 1].p} r={5} fill={seriesColors.electricity} stroke="#fff" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title={`Konsumsi Energi · ${range} (kWh)`} subtitle="Total energi berdasarkan rentang" icon={BatteryCharging}>
          <div className="h-56 rounded-xl border border-line bg-panel/60 p-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 5, bottom: 0, left: -18 }}>
                <defs>
                  <linearGradient id="el-bar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={seriesColors.electricitySoft} />
                    <stop offset="100%" stopColor={seriesColors.electricity} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray={gridDash} stroke={gridColor} vertical={false} />
                <XAxis dataKey={barKey} tick={axisTick} axisLine={false} tickLine={false} />
                <YAxis tick={axisTick} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip valueFormatter={(v) => `${v} kWh`} />} cursor={{ fill: 'rgba(59,130,246,0.10)' }} />
                <Bar dataKey="e" name="Energi (kWh)" radius={[6, 6, 0, 0]} maxBarSize={38} fill="url(#el-bar)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard
          title="Perbandingan Mingguan (kWh)"
          subtitle="Minggu ini vs minggu sebelumnya"
          icon={Gauge}
          footer={<p className="text-xs text-fx-secondary">Minggu ini <span className="font-semibold text-emerald">-6.9%</span> dari minggu sebelumnya.</p>}
        >
          <div className="h-52 rounded-xl border border-line bg-panel/60 p-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={electricityDaily} margin={{ top: 5, right: 5, bottom: 0, left: -18 }}>
                <CartesianGrid strokeDasharray={gridDash} stroke={gridColor} vertical={false} />
                <XAxis dataKey="d" tick={axisTick} axisLine={false} tickLine={false} />
                <YAxis tick={axisTick} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip valueFormatter={(v) => `${v} kWh`} />} cursor={{ fill: 'rgba(59,130,246,0.10)' }} />
                <Legend wrapperStyle={{ fontSize: 12, color: "#94a3b8" }} iconType="circle" iconSize={8} />
                <Bar dataKey="e" name="Minggu ini" fill={seriesColors.electricity} radius={[4, 4, 0, 0]} maxBarSize={20} />
                <Bar dataKey="e" name="Minggu lalu" fill={`${seriesColors.electricityDeep}22`} radius={[4, 4, 0, 0]} maxBarSize={20} data={electricityDailyPrev} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard
          title="Konsumsi & Prediksi Bulanan (kWh)"
          subtitle="Aktual, prediksi, dan kisaran"
          icon={Waves}
          footer={<p className="text-xs text-fx-secondary">Kebutuhan prediksi ditunjukkan dengan <span className="font-semibold text-indigo">pita kisaran</span> (data demo).</p>}
        >
          <div className="h-52 rounded-xl border border-line bg-panel/60 p-3">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={forecast} margin={{ top: 5, right: 5, bottom: 0, left: -18 }}>
                <defs>
                  <linearGradient id="fc-band" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={seriesColors.electricity} stopOpacity={0.14} />
                    <stop offset="100%" stopColor={seriesColors.electricity} stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray={gridDash} stroke={gridColor} vertical={false} />
                <XAxis dataKey="m" tick={axisTick} axisLine={false} tickLine={false} />
                <YAxis tick={axisTick} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip exclude={['lo', 'hi']} valueFormatter={(v) => `${v} kWh`} />} />
                <Legend wrapperStyle={{ fontSize: 12, color: "#94a3b8" }} iconType="circle" iconSize={8} />
                <Area type="monotone" dataKey="lo" stroke="none" fill="#0b1724" />
                <Area type="monotone" dataKey="hi" name="Kisaran" stroke="none" fill="url(#fc-band)" />
                <Line type="monotone" dataKey="a" name="Aktual" stroke={seriesColors.electricity} strokeWidth={2.5} dot={{ r: 3 }} connectNulls />
                <Line type="monotone" dataKey="f" name="Prediksi" stroke={seriesColors.indigo} strokeWidth={2.5} strokeDasharray="5 4" dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>
    </div>
  )
}