import React, { useEffect, useState } from 'react'
import {
  Zap,
  Droplets,
  BellRing,
  Server,
  Wifi,
  Activity,
  ArrowRight,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
  ReferenceDot,
} from 'recharts'
import { kpi, electricityHourly, waterHourly, alerts, devices } from '../data'
import { KpiCard, SectionCard, StatusBadge, PageTitle } from '../common'
import { ChartTooltip } from '../charts'
import { gridColor, gridDash, axisTick, seriesColors } from '../chartStyle'

function avg(data, key) {
  return data.reduce((s, d) => s + d[key], 0) / data.length
}

const elecBaseline = Math.round(avg(electricityHourly, 'e') * 0.88 * 10) / 10
const waterBaseline = Math.round(avg(waterHourly, 'v') * 0.9 * 10) / 10
const elecPeak = electricityHourly.reduce((m, d) => (d.e > m.e ? d : m), electricityHourly[0])
const waterPeak = waterHourly.reduce((m, d) => (d.v > m.v ? d : m), waterHourly[0])

function useLive(base, step) {
  const [v, setV] = useState(base)
  useEffect(() => {
    const id = setInterval(() => {
      setV((prev) => Math.max(0, prev + (Math.random() - 0.5) * step))
    }, 2600)
    return () => clearInterval(id)
  }, [step])
  return v
}

export default function OverviewSection({ onNavigate, role = 'admin' }) {
  const liveElec = useLive(125.4, 0.6)
  const liveWater = useLive(45.6, 0.4)

  const alertTone = {
    critical: 'bg-fx-critical/15 text-red-300',
    warning: 'bg-fx-warning/15 text-amber-300',
    normal: 'bg-mint/15 text-mint',
  }
  const deviceTone = {
    online: 'bg-mint/15 text-mint',
    warning: 'bg-fx-warning/15 text-amber-300',
  }

  return (
    <div>
      <PageTitle
        title="Ringkasan"
        description="Pantau konsumsi listrik, air, peringatan aktif, dan status perangkat dalam satu tampilan."
        action={
          <span className="inline-flex items-center gap-1.5 rounded-md border border-mint/25 bg-mint/10 px-3 py-1.5 text-xs font-semibold text-mint">
            <Activity size={13} />
            Sistem aktif
          </span>
        }
      />

      {/* KPI */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          icon={Zap}
          label="Total Listrik Hari Ini"
          value={`${liveElec.toFixed(1)} kWh`}
          delta={kpi.electricityToday.delta}
          good={kpi.electricityToday.good}
          tone="blue"
          spark={electricityHourly}
          sparkKey="e"
        />
        <KpiCard
          icon={Droplets}
          label="Total Air Hari Ini"
          value={`${liveWater.toFixed(1)} m³`}
          delta={kpi.waterToday.delta}
          good={kpi.waterToday.good}
          tone="teal"
          spark={waterHourly}
          sparkKey="v"
        />
        <KpiCard
          icon={BellRing}
          label="Peringatan Aktif"
          value={kpi.activeAlerts.value}
          sublabel={kpi.activeAlerts.sublabel}
          good={kpi.activeAlerts.good}
          tone="amber"
          spark={[5, 4, 6, 3, 5, 3, 4, 3, 3, 4, 3, 3].map((v, i) => ({ v, i }))}
        />
        <KpiCard
          icon={Server}
          label="Status Perangkat"
          value={kpi.deviceStatus.value}
          sublabel={kpi.deviceStatus.sublabel}
          good={true}
          tone="green"
          spark={[2, 2, 3, 2, 3, 3, 3, 2, 3, 3, 3, 3].map((v, i) => ({ v, i }))}
        />
      </div>

      {/* Charts */}
      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <SectionCard
          title="Konsumsi Listrik"
          subtitle="Pemakaian energi hari ini"
          icon={Zap}
          footer={
            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-xs text-fx-secondary">
              <span>Puncak hari ini: <span className="font-semibold text-fx-text">52 kWh · 18:00</span></span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ background: seriesColors.electricity }} /> Hari ini
              </span>
            </div>
          }
        >
          <div className="rounded-xl border border-line bg-panel/60 p-3">
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={electricityHourly} margin={{ top: 5, right: 5, bottom: 0, left: -18 }}>
                <defs>
                  <linearGradient id="ov-elec" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={seriesColors.electricity} stopOpacity={0.12} />
                    <stop offset="100%" stopColor={seriesColors.electricity} stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray={gridDash} stroke={gridColor} vertical={false} />
                <XAxis dataKey="t" tick={axisTick} axisLine={false} tickLine={false} />
                <YAxis tick={axisTick} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip baselineValue={elecBaseline} valueFormatter={(v) => `${v} kWh`} />} />
                <ReferenceLine y={elecBaseline} stroke={seriesColors.amber} strokeDasharray="4 4" strokeOpacity={0.7} label={{ value: 'Baseline', position: 'insideTopRight', fontSize: 10, fill: '#98a2b3' }} />
                <ReferenceDot x={elecPeak.t} y={elecPeak.e} r={4} fill={seriesColors.electricity} stroke="#fff" strokeWidth={2} />
                <Area type="monotone" dataKey="e" name="Listrik" stroke={seriesColors.electricity} fill="url(#ov-elec)" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
              </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Konsumsi Air"
          subtitle="Pemakaian air hari ini"
          icon={Droplets}
          footer={
            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-xs text-fx-secondary">
              <span>Puncak hari ini: <span className="font-semibold text-fx-text">14 m³ · 18:00</span></span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ background: seriesColors.water }} /> Hari ini
              </span>
            </div>
          }
        >
          <div className="rounded-xl border border-line bg-panel/60 p-3">
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={waterHourly} margin={{ top: 5, right: 5, bottom: 0, left: -18 }}>
                <defs>
                  <linearGradient id="ov-water" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={seriesColors.water} stopOpacity={0.12} />
                    <stop offset="100%" stopColor={seriesColors.water} stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray={gridDash} stroke={gridColor} vertical={false} />
                <XAxis dataKey="t" tick={axisTick} axisLine={false} tickLine={false} />
                <YAxis tick={axisTick} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip baselineValue={waterBaseline} valueFormatter={(v) => `${v} m³`} />} />
                <ReferenceLine y={waterBaseline} stroke={seriesColors.amber} strokeDasharray="4 4" strokeOpacity={0.7} label={{ value: 'Baseline', position: 'insideTopRight', fontSize: 10, fill: '#98a2b3' }} />
                <ReferenceDot x={waterPeak.t} y={waterPeak.v} r={4} fill={seriesColors.water} stroke="#fff" strokeWidth={2} />
                <Area type="monotone" dataKey="v" name="Air" stroke={seriesColors.water} fill="url(#ov-water)" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
              </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Alerts + Devices */}
      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <SectionCard
          title="Peringatan Terbaru"
          icon={BellRing}
          action={
            <button
              onClick={() => onNavigate('alerts')}
              className="inline-flex items-center gap-1 rounded-lg px-2.5 py-2 text-xs font-semibold text-electric transition-colors hover:bg-white/5"
            >
              Lihat Semua <ArrowRight size={13} />
            </button>
          }
        >
          <ul className="space-y-2.5">
            {alerts.slice(0, 4).map((a) => (
              <li key={a.id} className="flex items-start gap-3 rounded-xl border border-line bg-panel/60 px-3.5 py-3 transition-colors hover:bg-white/5">
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${alertTone[a.level]}`}>
                  <BellRing size={16} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-fx-text">{a.title}</p>
                  <p className="text-xs text-fx-secondary">{a.location}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs text-fx-secondary">{a.time}</span>
                  <StatusBadge level={a.level} />
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard
          title="Status Perangkat"
          icon={Server}
          action={
            role === 'admin' ? (
              <button
                onClick={() => onNavigate('devices')}
                className="inline-flex items-center gap-1 rounded-lg px-2.5 py-2 text-xs font-semibold text-electric transition-colors hover:bg-white/5"
              >
                Lihat Perangkat <ArrowRight size={13} />
              </button>
            ) : undefined
          }
        >
          <ul className="space-y-2.5">
            {devices.map((d) => (
              <li key={d.id} className="flex items-center gap-3 rounded-xl border border-line bg-panel/60 px-3.5 py-3 transition-colors hover:bg-white/5">
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${deviceTone[d.status] || 'border border-line bg-white/5 text-mint'}`}>
                  <Wifi size={16} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-fx-text">{d.name}</p>
                  <p className="text-xs text-fx-secondary">{d.location} · {d.lastUpdate}</p>
                </div>
                <StatusBadge level={d.status} label={d.status === 'warning' ? 'Perlu diperiksa' : undefined} />
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </div>
  )
}