import React, { useState } from 'react'
import { FileText, FileSpreadsheet, Calendar, Printer, Zap, Droplets, Activity, TrendingDown } from 'lucide-react'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { SectionCard, PageTitle } from '../common'
import { ChartTooltip } from '../charts'
import { gridColor, gridDash, axisTick, seriesColors } from '../chartStyle'

const previewData = [
  { d: 'Sen', e: 118, v: 41 },
  { d: 'Sel', e: 124, v: 45 },
  { d: 'Rab', e: 112, v: 42 },
  { d: 'Kam', e: 130, v: 47 },
  { d: 'Jum', e: 122, v: 44 },
  { d: 'Sab', e: 96, v: 38 },
  { d: 'Min', e: 88, v: 34 },
]

export default function ReportsSection() {
  const [period, setPeriod] = useState('Bulanan')
  const periods = ['Harian', 'Mingguan', 'Bulanan', 'Rentang Tanggal Kustom']
  const reportRows = [
    { label: 'Total Konsumsi Listrik', value: '125.4 kWh' },
    { label: 'Total Konsumsi Air', value: '45.6 m³' },
    { label: 'Pemakaian Puncak', value: '18:00 · 52 kWh' },
    { label: 'Anomali Terdeteksi', value: '2 Potensi Anomali' },
    { label: 'Perbandingan Tren', value: '-6.7% vs baseline' },
    { label: 'Rekomendasi', value: '2 rekomendasi tersedia' },
  ]

  const tiles = [
    { label: 'Listrik', value: '125.4 kWh', sub: 'Total konsumsi', icon: Zap, tile: 'border border-line bg-white/5 text-electric' },
    { label: 'Air', value: '45.6 m³', sub: 'Total konsumsi', icon: Droplets, tile: 'border border-line bg-white/5 text-glow-teal' },
    { label: 'Pemakaian Puncak', value: '52 kWh · 18:00', sub: 'Beban tertinggi', icon: Activity, tile: 'border border-line bg-white/5 text-amber-300' },
    { label: 'Perbandingan', value: '-6.7%', sub: 'vs baseline', icon: TrendingDown, tile: 'bg-mint/15 text-mint' },
  ]

  const exportCsv = () => {
    const header = 'Laporan,Periode'
    const rows = reportRows.map((r) => `"${r.label}","${r.value}"`).join('\n')
    const blob = new Blob([`${header}\n${period},Demo\n\n${rows}\n`], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `smartflux-report-${period.toLowerCase().replace(' ', '-')}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const exportPdf = () => {
    window.print()
  }

  return (
    <div>
      <PageTitle
        title="Laporan"
        description="Buat dan unduh laporan konsumsi listrik dan air."
        action={
          <div className="segmented">
            <Calendar size={14} className="ml-2 hidden self-center text-fx-secondary sm:block" />
            {periods.map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className="seg-opt"
                aria-pressed={period === p}
              >
                {p}
              </button>
            ))}
          </div>
        }
      />

      <div className="grid gap-4 xl:grid-cols-3">
        <SectionCard
          title={`Ringkasan Laporan · ${period}`}
          subtitle="Rekap konsumsi listrik dan air pada periode ini"
          icon={FileText}
          className="xl:col-span-2"
          footer={
            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-xs text-fx-secondary">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ background: seriesColors.electricity }} /> Listrik
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ background: seriesColors.water }} /> Air
              </span>
              <span>Mode Demo</span>
            </div>
          }
        >
          {/* Stat tiles */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {tiles.map((t) => (
              <div key={t.label} className="rounded-xl border border-line bg-panel/50 p-4">
                <span className={`mb-2.5 flex h-9 w-9 items-center justify-center rounded-lg ${t.tile}`}>
                  <t.icon size={16} />
                </span>
                <p className="tabular-nums font-display text-lg font-bold leading-tight text-fx-text">{t.value}</p>
                <p className="mt-0.5 text-xs font-medium text-fx-secondary">{t.label}</p>
                <p className="text-[11px] text-muted">{t.sub}</p>
              </div>
            ))}
          </div>

          {/* Chart panel */}
          <div className="mt-4 rounded-xl border border-line bg-panel/60 p-3">
            <div className="mb-2 flex items-center justify-between px-1 text-xs text-fx-secondary">
              <span className="font-semibold text-fx-text">Tren mingguan konsumsi</span>
              <span className="text-muted">{period}</span>
            </div>
            <div className="h-36">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={previewData} margin={{ top: 5, right: 5, bottom: 0, left: -22 }}>
                  <defs>
                    <linearGradient id="rp-el" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={seriesColors.electricitySoft} />
                      <stop offset="100%" stopColor={seriesColors.electricity} />
                    </linearGradient>
                    <linearGradient id="rp-wt" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={seriesColors.waterSoft} />
                      <stop offset="100%" stopColor={seriesColors.water} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray={gridDash} stroke={gridColor} vertical={false} />
                  <XAxis dataKey="d" tick={axisTick} axisLine={false} tickLine={false} />
                  <YAxis tick={axisTick} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(59,130,246,0.10)' }} />
                  <Bar dataKey="e" name="Listrik (kWh)" fill="url(#rp-el)" radius={[4, 4, 0, 0]} maxBarSize={18} />
                  <Bar dataKey="v" name="Air (m³)" fill="url(#rp-wt)" radius={[4, 4, 0, 0]} maxBarSize={18} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Detail rows */}
          <div className="mt-4 overflow-hidden rounded-xl border border-line">
            <div className="divide-y divide-line">
              {reportRows.map((r) => (
                <div key={r.label} className="flex items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-panel/60">
                  <span className="text-sm text-fx-secondary">{r.label}</span>
                  <span className="text-sm font-semibold text-fx-text">{r.value}</span>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>

        <div className="space-y-4">
          <SectionCard title="Ekspor" icon={FileSpreadsheet}>
            <div className="grid gap-3">
              <button onClick={exportPdf} className="btn-gradient-fx flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-white">
                <Printer size={16} /> Cetak / Simpan PDF
              </button>
              <button onClick={exportCsv} className="flex w-full items-center justify-center gap-2 rounded-lg border border-line bg-card px-4 py-3 text-sm font-semibold text-fx-text shadow-sm transition-all hover:-translate-y-0.5 hover:border-glow-cyan/50 hover:bg-panel">
                <FileSpreadsheet size={16} /> Ekspor CSV
              </button>
            </div>
            <p className="mt-4 text-xs text-fx-secondary">
              Data yang diekspor adalah contoh demo. Simpan PDF melalui dialog cetak browser.
            </p>
          </SectionCard>

          <div className="grid grid-cols-2 gap-4">
            <div className="dash-card flex flex-col items-center justify-center p-4 text-center">
              <span className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-white/5 text-electric">
                <Zap size={18} />
              </span>
              <p className="tabular-nums font-display text-lg font-bold text-fx-text">125.4</p>
              <p className="text-[11px] text-fx-secondary">kWh listrik</p>
            </div>
            <div className="dash-card flex flex-col items-center justify-center p-4 text-center">
              <span className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-white/5 text-glow-teal">
                <Droplets size={18} />
              </span>
              <p className="tabular-nums font-display text-lg font-bold text-fx-text">45.6</p>
              <p className="text-[11px] text-fx-secondary">m³ air</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}