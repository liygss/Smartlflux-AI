import React from 'react'
import { Server, Wifi, SignalHigh, Tag } from 'lucide-react'
import { devices } from '../data'
import { SectionCard, StatusBadge, PageTitle } from '../common'

const statusTint = {
  online: 'border-mint/25',
  warning: 'border-fx-warning/30',
  offline: 'border-line',
}

function SignalBars({ value }) {
  const weak = value < -70
  return (
    <span className={`inline-flex items-end gap-0.5 ${weak ? 'text-fx-warning' : 'text-mint'}`}>
      {[1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className={`w-1 rounded-sm ${i <= Math.max(1, Math.round((value + 80) / 5)) ? 'bg-current' : 'bg-white/10'}`}
          style={{ height: `${i * 3 + 3}px` }}
        />
      ))}
      <span className="ml-1 text-[10px] font-medium text-fx-secondary">{value} dBm</span>
    </span>
  )
}

export default function DevicesSection() {
  return (
    <div>
      <PageTitle title="Perangkat" description="Kelola seluruh SmartFlux Node beserta status koneksi dan detail perangkat." />

      <SectionCard className="hidden lg:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wide text-fx-secondary">
                <th className="px-3 py-3">Perangkat</th>
                <th className="px-3 py-3">Lokasi</th>
                <th className="px-3 py-3">Koneksi</th>
                <th className="px-3 py-3">Pembaruan Terakhir</th>
                <th className="px-3 py-3">Sinyal</th>
                <th className="px-3 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((d) => (
                <tr key={d.id} className="border-b border-white/5 transition-colors last:border-0 hover:bg-white/5">
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2 font-medium text-fx-text">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-white/10 text-electric">
                        <Server size={15} />
                      </span>
                      <div>
                        <p>{d.name}</p>
                        <p className="text-[11px] font-normal text-fx-secondary">{d.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-fx-secondary">{d.location}</td>
                  <td className="px-3 py-3 text-fx-secondary">
                    <span className="inline-flex items-center gap-1.5">
                      <Wifi size={14} className="text-electric" /> {d.connection}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-fx-secondary">{d.lastUpdate}</td>
                  <td className="px-3 py-3">
                    <span className={`inline-flex items-center gap-1.5 text-fx-secondary ${d.signal < -70 ? 'text-fx-warning' : ''}`}>
                      <SignalHigh size={14} /> {d.signal} dBm
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <StatusBadge level={d.status} label={d.status === 'warning' ? 'Perlu diperiksa' : undefined} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 lg:mt-4">
        {devices.map((d) => (
          <div
            key={d.id}
            className={`dash-card p-5 ${statusTint[d.status] || statusTint.online}`}
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-white/10 text-electric">
                <Server size={18} />
              </span>
              <div className="flex flex-col items-end gap-1">
                <StatusBadge level={d.status} label={d.status === 'warning' ? 'Perlu diperiksa' : undefined} />
                <SignalBars value={d.signal} />
              </div>
            </div>
            <p className="font-display text-sm font-bold text-fx-text">{d.name}</p>
            <div className="mt-3 space-y-1.5 text-xs">
              <p className="flex justify-between text-fx-secondary"><span>ID Perangkat</span><span className="font-medium text-fx-text">{d.id}</span></p>
              <p className="flex justify-between text-fx-secondary"><span>Firmware</span><span className="font-medium text-fx-text">{d.firmware}</span></p>
              <p className="flex justify-between text-fx-secondary"><span>Alamat IP</span><span className="font-medium text-fx-text">{d.ip}</span></p>
              <p className="flex justify-between text-fx-secondary"><span>Sinkronisasi Terakhir</span><span className="font-medium text-fx-text">{d.lastSync}</span></p>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {d.sensors.map((s) => (
                <span key={s} className="inline-flex items-center gap-1 rounded-md border border-line bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-sky-300">
                  <Tag size={10} /> {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
