import React, { useState } from 'react'
import { FileText, Download, FileSpreadsheet, Calendar } from 'lucide-react'
import { SectionCard, PageTitle } from '../common'

export default function ReportsSection() {
  const [period, setPeriod] = useState('Monthly')
  const periods = ['Daily', 'Weekly', 'Monthly', 'Custom Date']
  const reportRows = [
    { label: 'Total Electricity Consumption', value: '125.4 kWh' },
    { label: 'Total Water Consumption', value: '45.6 m³' },
    { label: 'Peak Usage', value: '18:00 · 52 kWh' },
    { label: 'Detected Anomaly', value: '2 Potential Anomaly' },
    { label: 'Trend Comparison', value: '-6.7% vs baseline' },
    { label: 'Recommendation', value: '2 rekomendasi tersedia' },
  ]

  return (
    <div>
      <PageTitle title="Reports" description="Buat dan unduh laporan konsumsi listrik dan air." />

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Calendar size={15} className="mr-1 text-slate" />
        {periods.map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
              period === p ? 'border-navy bg-navy text-white' : 'border-gray-200 bg-white text-slate hover:border-blue/40'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <SectionCard title={`Laporan ${period} — Ringkasan`} className="lg:col-span-2">
          <div className="space-y-1">
            {reportRows.map((r) => (
              <div
                key={r.label}
                className="flex items-center justify-between rounded-lg border-b border-gray-100 py-2.5 last:border-0"
              >
                <span className="text-sm text-slate">{r.label}</span>
                <span className="text-sm font-semibold text-ink">{r.value}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        <div className="space-y-4">
          <SectionCard title="Export">
            <div className="grid gap-3">
              <button className="flex items-center justify-center gap-2 rounded-lg bg-navy px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue">
                <Download size={16} /> Export PDF
              </button>
              <button className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-blue/40 hover:bg-mist">
                <FileSpreadsheet size={16} /> Export CSV
              </button>
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-mist p-3">
              <FileText size={16} className="text-blue" />
              <div>
                <p className="text-xs font-semibold text-ink">smartflux-report</p>
                <p className="text-[10px] text-slate">PDF · 240 kB · siap</p>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  )
}
