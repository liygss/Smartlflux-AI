import React, { useState } from 'react'
import {
  Zap,
  Gauge,
  Activity,
  BatteryCharging,
  Waves,
} from 'lucide-react'
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
  Legend,
} from 'recharts'
import {
  realtimeElectricity,
  electricityHourly,
  electricityDaily,
  electricityWeekly,
  electricityMonthly,
  energyKpi,
  forecast,
} from '../data'
import { KpiCard, SectionCard, PageTitle } from '../common'

const gridColor = '#eef2f7'
const tooltipStyle = { fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }
const axisTick = { fontSize: 11, fill: '#667085' }

const icons = [Zap, Gauge, Activity, BatteryCharging, Waves]
const tones = ['blue', 'indigo', 'teal', 'green', 'cyan']

export default function ElectricitySection() {
  const [range, setRange] = useState('Today')
  const ranges = ['Today', '7 Days', '30 Days', 'Custom Range']
  const chartData = { Today: electricityHourly, '7 Days': electricityDaily, '30 Days': electricityMonthly }[range]

  return (
    <div>
      <PageTitle title="Electricity Monitoring" description="Tegangan, arus, daya, energi, dan faktor daya secara real-time." />

      <div className="mb-4 flex flex-wrap items-center gap-2">
        {ranges.map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
              range === r ? 'border-navy bg-navy text-white' : 'border-gray-200 bg-white text-slate hover:border-blue/40'
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        {energyKpi.map((k, i) => {
          const Icon = icons[i]
          return (
            <KpiCard key={k.label} icon={Icon} label={k.label} value={k.value} tone={tones[i]} />
          )
        })}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <SectionCard title="Real-time Power (kW)">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={realtimeElectricity} margin={{ top: 5, right: 5, bottom: 0, left: -18 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis dataKey="t" tick={axisTick} axisLine={false} tickLine={false} />
                <YAxis tick={axisTick} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="p" name="Daya (kW)" stroke="#2f5597" strokeWidth={2} dot={{ r: 3, fill: '#2f5597' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title={`Energy Consumption — ${range} (kWh)`}>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 5, bottom: 0, left: -18 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis dataKey={Object.keys(chartData[0])[0]} tick={axisTick} axisLine={false} tickLine={false} />
                <YAxis tick={axisTick} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="e" name="Energi (kWh)" fill="#2f5597" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Weekly Comparison (kWh)">
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={electricityWeekly} margin={{ top: 5, right: 5, bottom: 0, left: -18 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis dataKey="w" tick={axisTick} axisLine={false} tickLine={false} />
                <YAxis tick={axisTick} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="e" name="Energi (kWh)" fill="#3b67b0" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Monthly Consumption & Forecast (kWh)">
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={forecast} margin={{ top: 5, right: 5, bottom: 0, left: -18 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis dataKey="m" tick={axisTick} axisLine={false} tickLine={false} />
                <YAxis tick={axisTick} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="a" name="Aktual" stroke="#2f5597" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="f" name="Prediksi" stroke="#2f855a" strokeWidth={2} strokeDasharray="5 4" dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
