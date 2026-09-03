import React from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'
import { Droplets, Zap, AlertTriangle, TrendingUp } from 'lucide-react'

const trendData = [
  { t: '00', l: 0.9, w: 420 },
  { t: '03', l: 0.4, w: 300 },
  { t: '06', l: 1.2, w: 700 },
  { t: '09', l: 2.8, w: 1280 },
  { t: '12', l: 3.1, w: 1350 },
  { t: '15', l: 3.0, w: 1300 },
  { t: '18', l: 2.9, w: 1400 },
  { t: '21', l: 2.2, w: 1150 },
  { t: '24', l: 1.1, w: 480 },
]

const cards = [
  { icon: Zap, label: 'Listrik Hari Ini', value: '1.245 kWh', sub: '+16% vs penggunaan normal', tone: 'blue' },
  { icon: Droplets, label: 'Air Hari Ini', value: '8.420 L', sub: 'Potensi anomali terdeteksi', tone: 'green', alert: true },
  { icon: AlertTriangle, label: 'Alert', value: 'Pemakaian malam', sub: 'Pola abnormal terdeteksi', tone: 'amber', alert: true },
  { icon: TrendingUp, label: 'Prediksi', value: '+12%', sub: 'Proyeksi pemakaian bulanan', tone: 'indigo' },
]

const toneMap = {
  blue: 'bg-blue text-white',
  green: 'bg-green text-white',
  amber: 'bg-amber-500 text-white',
  indigo: 'bg-indigo-500 text-white',
}

export function DashboardCards() {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {cards.map((c) => (
        <div
          key={c.label}
          className="rounded-xl border border-slate-100 bg-white p-4 shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-lift)]"
        >
          <div className="mb-3 flex items-center gap-2">
            <span className={`flex h-8 w-8 items-center justify-center rounded-lg shadow-sm ${toneMap[c.tone]}`}>
              <c.icon size={16} />
            </span>
            <span className="text-xs font-medium text-slate">{c.label}</span>
          </div>
          <p className="font-display text-xl font-bold text-navy">{c.value}</p>
          <p className={`mt-1 text-xs ${c.alert ? 'font-semibold text-green' : 'text-slate'}`}>
            {c.sub}
          </p>
        </div>
      ))}
    </div>
  )
}

export default function DashboardPreview() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-lg">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-300" />
          <span className="h-3 w-3 rounded-full bg-amber-300" />
          <span className="h-3 w-3 rounded-full bg-green-300" />
        </div>
        <span className="text-xs font-medium text-slate">SmartFlux AI · Dashboard Energi &amp; Air</span>
      </div>

      <div className="space-y-4 p-5">
        <DashboardCards />

        <div className="rounded-xl border border-slate-100 bg-mist p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate">
            Tren konsumsi harian
          </p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 5, right: 5, bottom: 0, left: -18 }}>
                <defs>
                  <linearGradient id="electricity" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2F5597" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#2F5597" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2F855A" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#2F855A" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="t" tick={{ fontSize: 11, fill: '#667085' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#667085' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }} />
                <Area type="monotone" dataKey="l" name="Listrik (kWh)" stroke="#2F5597" fill="url(#electricity)" strokeWidth={2} />
                <Area type="monotone" dataKey="w" name="Air (L)" stroke="#2F855A" fill="url(#water)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-green/20 bg-green-light p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-green">Wawasan</p>
            <p className="mt-1 text-sm text-ink">
              Konsumsi listrik meningkat signifikan antara pukul 18.00–22.00.
            </p>
          </div>
          <div className="rounded-xl border border-blue/20 bg-blue-light p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue">Rekomendasi</p>
            <p className="mt-1 text-sm text-ink">
              Tinjau jam operasional sistem pendingin pada periode tersebut.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
