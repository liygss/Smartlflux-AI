import React from 'react'
import { Server, Wifi, SignalHigh, Tag } from 'lucide-react'
import { devices } from '../data'
import { SectionCard, StatusBadge, PageTitle } from '../common'

export default function DevicesSection() {
  return (
    <div>
      <PageTitle title="Devices" description="Kelola seluruh SmartFlux Node beserta status koneksi dan detail perangkat." />

      <SectionCard>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-xs uppercase tracking-wide text-slate">
                <th className="px-3 py-3">Device</th>
                <th className="px-3 py-3">Location</th>
                <th className="px-3 py-3">Connection</th>
                <th className="px-3 py-3">Last Update</th>
                <th className="px-3 py-3">Signal</th>
                <th className="px-3 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((d) => (
                <tr key={d.id} className="border-b border-gray-50 last:border-0">
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2 font-medium text-ink">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy text-white">
                        <Server size={15} />
                      </span>
                      <div>
                        <p>{d.name}</p>
                        <p className="text-[11px] font-normal text-slate">{d.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-slate">{d.location}</td>
                  <td className="px-3 py-3 text-slate">
                    <span className="inline-flex items-center gap-1.5">
                      <Wifi size={14} className="text-blue" /> {d.connection}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-slate">{d.lastUpdate}</td>
                  <td className="px-3 py-3">
                    <span className={`inline-flex items-center gap-1.5 text-slate ${d.signal < -70 ? 'text-warning' : ''}`}>
                      <SignalHigh size={14} /> {d.signal} dBm
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <StatusBadge level={d.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        {devices.map((d) => (
          <div key={d.id} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-navy to-blue text-white">
                <Server size={18} />
              </span>
              <StatusBadge level={d.status} />
            </div>
            <p className="font-display text-sm font-bold text-ink">{d.name}</p>
            <div className="mt-3 space-y-1.5 text-xs">
              <p className="flex justify-between text-slate"><span>Device ID</span><span className="font-medium text-ink">{d.id}</span></p>
              <p className="flex justify-between text-slate"><span>Firmware</span><span className="font-medium text-ink">{d.firmware}</span></p>
              <p className="flex justify-between text-slate"><span>IP Address</span><span className="font-medium text-ink">{d.ip}</span></p>
              <p className="flex justify-between text-slate"><span>Last Sync</span><span className="font-medium text-ink">{d.lastSync}</span></p>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {d.sensors.map((s) => (
                <span key={s} className="inline-flex items-center gap-1 rounded-full bg-blue-light px-2 py-0.5 text-[10px] font-semibold text-blue">
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
