import React from 'react'
import { Link } from 'react-router-dom'
import { Check, X } from 'lucide-react'
import { Reveal } from './ui/Reveal'
import { Section, SectionHeader } from './ui/Section'

const rows = [
  { feature: 'Monitoring Listrik', meter: 'x', water: 'x', enterprise: 'Basic', smartflux: 'Advanced' },
  { feature: 'Monitoring Air', meter: 'x', water: 'Dedicated', enterprise: 'x', smartflux: 'Integrated' },
  { feature: 'Real-Time Data', meter: 'x', water: 'Partial', enterprise: 'Delayed', smartflux: 'Live <2s' },
  { feature: 'AI Anomaly Detection', meter: 'x', water: 'x', enterprise: 'Opsional', smartflux: 'Built-in' },
  { feature: 'Unified Dashboard', meter: 'x', water: 'x', enterprise: 'Complex', smartflux: 'Simple & Clear' },
  { feature: 'Alert System', meter: 'SMS', water: 'Email', enterprise: 'Email + SMS', smartflux: 'Multi-channel' },
  { feature: 'Predictive Analytics', meter: 'x', water: 'x', enterprise: 'Extra Cost', smartflux: 'Included' },
  { feature: 'Modular Scalability', meter: 'x', water: 'x', enterprise: 'Hard', smartflux: 'Easy' },
  { feature: 'Pricing', meter: 'Low', water: 'Medium', enterprise: 'High', smartflux: 'Competitive' },
]

function Cell({ value }) {
  if (value === 'x') {
    return <X size={17} className="mx-auto text-slate-400" />
  }
  return (
    <span className="inline-block rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-medium text-gray-500">
      {value}
    </span>
  )
}

export default function ComparisonTable() {
  return (
    <Section className="relative overflow-hidden bg-mist/50">
      <SectionHeader
        eyebrow="Keunggulan Kompetitif"
        title="Perbandingan dengan Solusi Lain"
        description="SmartFlux AI menyediakan fitur lengkap yang terintegrasi untuk kebutuhan monitoring listrik dan air modern."
      />

      <Reveal>
        <div className="mx-auto max-w-6xl overflow-hidden rounded-xl border border-gray-200/70 bg-white shadow-[var(--shadow-card-hover)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px]">
              <thead>
                <tr className="bg-navy-deep text-white">
                  <th className="px-6 py-5 text-left font-semibold">Fitur</th>
                  <th className="px-4 py-5 text-center font-medium text-blue-100">Smart Meter<br /><span className="text-xs font-normal opacity-70">(Biasa)</span></th>
                  <th className="px-4 py-5 text-center font-medium text-blue-100">Sistem Air<br /><span className="text-xs font-normal opacity-70">(Terpisah)</span></th>
                  <th className="px-4 py-5 text-center font-medium text-blue-100">Platform<br /><span className="text-xs font-normal opacity-70">Enterprise</span></th>
                  <th className="px-4 py-5 text-center font-bold">SmartFlux<br /><span className="text-xs font-normal opacity-80">AI</span></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr
                    key={row.feature}
                    className={`transition-colors duration-150 ${
                      rowIndex % 2 === 0 ? 'bg-white hover:bg-blue-light/30' : 'bg-gray-50/60 hover:bg-blue-light/30'
                    }`}
                  >
                    <td className="px-6 py-4 text-sm font-semibold text-navy">
                      {row.feature}
                    </td>
                    <td className="px-4 py-4 text-center"><Cell value={row.meter} /></td>
                    <td className="px-4 py-4 text-center"><Cell value={row.water} /></td>
                    <td className="px-4 py-4 text-center"><Cell value={row.enterprise} /></td>
                    <td className="relative bg-blue-light/40 text-center">
                      <div className="flex flex-col items-center gap-1.5">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-bright text-white">
                          <Check size={16} />
                        </span>
                        <span className="text-[11px] font-bold uppercase tracking-wide text-blue">{row.smartflux}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-slate">
            Ingin tahu lebih detail?{' '}
            <Link to="/product" className="inline-flex items-center gap-1 font-semibold text-blue transition-colors hover:text-navy">
              Lihat Fitur Lengkap
            </Link>
          </p>
        </div>
      </Reveal>
    </Section>
  )
}