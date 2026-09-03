import React from 'react'
import {
  Zap,
  Droplets,
  BellRing,
  Server,
  Wifi,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'
import { kpi, electricityHourly, waterHourly, alerts, devices } from '../data'
import { KpiCard, SectionCard, StatusBadge, PageTitle } from '../common'

const gridColor = '#eef2f7'

export default function OverviewSection() {
  return (
    <div>
      <PageTitle
        title="Overview"
        description="Ringkasan konsumsi listrik dan air, alert aktif, serta status perangkat hari ini."
      />

      {/* KPI */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          icon={Zap}
          label="Total Electricity Today"
          value={kpi.electricityToday.value}
          delta={kpi.electricityToday.delta}
          good={kpi.electricityToday.good}
          tone="blue"
        />
        <KpiCard
          icon={Droplets}
          label="Total Water Today"
          value={kpi.waterToday.value}
          delta={kpi.waterToday.delta}
          good={kpi.waterToday.good}
          tone="teal"
        />
        <KpiCard
          icon={BellRing}
          label="Active Alerts"
          value={kpi.activeAlerts.value}
          sublabel={kpi.activeAlerts.sublabel}
          good={kpi.activeAlerts.good}
          tone="amber"
        />
        <KpiCard
          icon={Server}
          label="Device Status"
          value={kpi.deviceStatus.value}
          sublabel={kpi.deviceStatus.sublabel}
          good={true}
          tone="green"
        />
      </div>

      {/* Charts */}
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <SectionCard title="Electricity Consumption (kWh)">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={electricityHourly} margin={{ top: 5, right: 5, bottom: 0, left: -18 }}>
                <defs>
                  <linearGradient id="ovl" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2f5597" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#2f5597" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis dataKey="t" tick={{ fontSize: 11, fill: '#667085' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#667085' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={tooltipStyle}
                />
                <Area type="monotone" dataKey="e" name="Listrik (kWh)" stroke="#2f5597" fill="url(#ovl)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Water Consumption (m³)">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={waterHourly} margin={{ top: 5, right: 5, bottom: 0, left: -18 }}>
                <defs>
                  <linearGradient id="ovw" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2f855a" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#2f855a" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis dataKey="t" tick={{ fontSize: 11, fill: '#667085' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#667085' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="v" name="Air (m³)" stroke="#2f855a" fill="url(#ovw)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      {/* Alerts + Devices */}
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <SectionCard title="Latest Alerts">
          <ul className="space-y-3">
            {alerts.slice(0, 4).map((a) => (
              <li key={a.id} className="flex items-start gap-3 rounded-lg border border-gray-100 bg-mist px-3 py-2.5">
                <StatusBadge level={a.level} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">{a.title}</p>
                  <p className="text-xs text-slate">{a.location}</p>
                </div>
                <span className="text-xs text-slate">{a.time}</span>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Device Status">
          <ul className="space-y-3">
            {devices.map((d) => (
              <li key={d.id} className="flex items-center gap-3 rounded-lg border border-gray-100 bg-mist px-3 py-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy text-white">
                  <Wifi size={16} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">{d.name}</p>
                  <p className="text-xs text-slate">{d.location} · {d.lastUpdate}</p>
                </div>
                <StatusBadge level={d.status} />
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </div>
  )
}

const tooltipStyle = {
  fontSize: 12,
  borderRadius: 8,
  border: '1px solid #e2e8f0',
  boxShadow: '0 8px 24px rgba(23,54,93,0.12)',
}
