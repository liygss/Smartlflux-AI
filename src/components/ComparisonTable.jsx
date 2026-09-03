import React from 'react'
import { Check, X } from 'lucide-react'
import { Reveal } from './ui/Reveal'
import { Section, SectionHeader } from './ui/Section'

export default function ComparisonTable() {
  const comparisonData = [
    ['Fitur', 'Smart Meter Biasa', 'Sistem Air Terpisah', 'Platform Enterprise', 'SmartFlux AI'],
    ['Monitoring Listrik', 'X', 'X', '✓ Basic', '✓ Advanced'],
    ['Monitoring Air', 'X', '✓ Dedicated', 'X', '✓ Integrated'],
    ['Real-Time Data', 'X', 'Partial', '✓ Delayed', '✓ Live <2s'],
    ['AI Anomaly Detection', 'X', 'X', 'Optional', '✓ Built-in'],
    ['Unified Dashboard', 'X', 'X', 'Complex', '✓ Simple & Clear'],
    ['Alert System', 'SMS Only', 'Email', '✓ Email+SMS', '✓ Multi-channel'],
    ['Predictive Analytics', 'X', 'X', 'Extra Cost', '✓ Included'],
    ['Modular Scalability', 'X', 'X', 'Hard', '✓ Easy'],
    ['Pricing', 'Low', 'Medium', 'High', '✓ Competitive'],
  ]

  return (
    <Section className="relative overflow-hidden bg-gradient-to-b from-mist/50 via-white to-white">
      {/* Background decorations */}
      <div className="pointer-events-none absolute right-[-10rem] top-1/3 h-[40rem] w-[30rem] rounded-full bg-blue/5 blur-3xl" />
      <div className="pointer-events-none absolute left-[-8rem] bottom-0 h-80 w-80 rounded-full bg-indigo-light/40 blur-3xl" />

      <SectionHeader
        eyebrow="Keunggulan Kompetitif"
        title="Perbandingan dengan Solusi Lain"
        description="SmartFlux AI menyediakan fitur lengkap yang terintegrasi untuk kebutuhan monitoring listrik dan air modern."
      />

      <Reveal>
        <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-gray-200/70 bg-white shadow-[var(--shadow-card-hover)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="bg-gradient-to-r from-navy-dark via-navy to-blue text-white">
                  <th className="px-6 py-5 text-left font-semibold">Fitur</th>
                  <th className="px-4 py-5 text-center font-medium text-blue-100">Smart Meter<br /><span className="text-xs font-normal opacity-70">(Biasa)</span></th>
                  <th className="px-4 py-5 text-center font-medium text-blue-100">Sistem Air<br /><span className="text-xs font-normal opacity-70">(Terpisah)</span></th>
                  <th className="px-4 py-5 text-center font-medium text-blue-100">Platform<br /><span className="text-xs font-normal opacity-70">Enterprise</span></th>
                  <th className="px-4 py-5 text-center font-bold">SmartFlux<br /><span className="text-xs font-normal opacity-80">AI</span></th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.slice(1).map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={`transition-colors duration-150 ${
                      rowIndex % 2 === 0 ? 'bg-white hover:bg-blue-light/30' : 'bg-gray-50/60 hover:bg-blue-light/30'
                    }`}
                  >
                    <td className="px-6 py-4 text-sm font-semibold text-navy">
                      {row[0]}
                    </td>
                    <td className="grid-cell px-4 py-4 text-center text-slate-400">
                      <X size={17} className="mx-auto" />
                    </td>
                    <td className="grid-cell px-4 py-4 text-center">
                      {row[2] === '✓ Dedicated' ? (
                        <Check size={17} className="mx-auto text-teal" />
                      ) : (
                        <X size={17} className="mx-auto text-slate-400" />
                      )}
                    </td>
                    <td className="px-4 py-4 text-center">
                      {['✓ Basic', '✓ Delayed', '✓ Optional', '✓ Complex', 'Email', 'Extra Cost', 'Hard', 'High'].includes(row[3]) && row[3] !== 'X' ? (
                        <Check size={17} className="mx-auto text-gray-400" />
                      ) : row[3] === 'SMS Only' ? (
                        <span className="text-xs text-gray-400">SMS</span>
                      ) : (
                        <X size={17} className="mx-auto text-slate-400" />
                      )}
                    </td>
                    <td className="relative bg-gradient-to-br from-blue-light/80 to-indigo-light/60 text-center">
                      <div className="flex flex-col items-center gap-1.5">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue to-indigo text-white shadow-[var(--shadow-blue-glow)]">
                          <Check size={16} />
                        </span>
                        <span className="text-[11px] font-bold uppercase tracking-wide text-blue">Best</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <p className="text-sm text-slate">
            Ingin tahu lebih detail?{' '}
            <a href="/product" className="inline-flex items-center gap-1 font-semibold text-blue transition-colors hover:text-navy">
              Lihat Fitur Lengkap →
            </a>
          </p>
        </div>
      </Reveal>
    </Section>
  )
}
