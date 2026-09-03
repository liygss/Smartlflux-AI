import React from 'react'
import { Zap, Droplets, Wifi, Microchip, ArrowRight } from 'lucide-react'

export default function DeviceMockup() {
  return (
    <div className="relative">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-blue-light via-white to-green-light" />

      {/* Main device frame */}
      <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
        {/* Device header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy text-blue-light">
              <Zap size={20} />
            </span>
            <div>
              <p className="font-display text-sm font-bold text-navy">SmartFlux Node</p>
              <p className="text-[11px] text-slate">ESP32 · Edge AI</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-light px-2.5 py-1 text-[11px] font-semibold text-green">
            <span className="h-1.5 w-1.5 rounded-full bg-green" />
            Online
          </span>
        </div>

        {/* Device body */}
        <div className="rounded-2xl border border-slate-200 bg-mist p-5">
          {/* Board / PCB visual */}
          <div className="relative mx-auto flex items-center justify-center rounded-xl border border-slate-200 bg-navy-dark p-5">
            <Microchip className="text-blue-light/80" size={64} strokeWidth={1.2} />
            {/* Tiny dots acting as traces */}
            <div className="absolute inset-4 grid grid-cols-4 gap-2 opacity-40">
              {Array.from({ length: 16 }).map((_, i) => (
                <span key={i} className="rounded-full bg-blue-light/60" style={{ width: 3, height: 3 }} />
              ))}
            </div>
            <span className="absolute bottom-2 right-3 text-[10px] font-semibold uppercase tracking-widest text-blue-light/70">
              SmartFlux AI
            </span>
          </div>

          {/* Ports */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            <PortLabel icon={Zap} label="Listrik" value="PZEM-004T" />
            <PortLabel icon={Droplets} label="Air" value="YF-S201" />
            <PortLabel icon={Wifi} label="Jaringan" value="Wi-Fi" />
          </div>
        </div>

        {/* Data readout */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <Readout color="blue" label="Listrik" value="230 V · 1,2 kWh" />
          <Readout color="green" label="Air" value="8 L/mnt" />
        </div>

        {/* Flow caption */}
        <div className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-blue-light px-3 py-2.5 text-xs font-semibold text-navy">
          <span>Sensor</span>
          <ArrowRight size={14} className="text-green" />
          <span>Node</span>
          <ArrowRight size={14} className="text-green" />
          <span>Cloud</span>
          <ArrowRight size={14} className="text-green" />
          <span>Dashboard</span>
        </div>
      </div>

      {/* Floating badges */}
      <div className="absolute -left-3 top-8 hidden -rotate-6 rounded-xl border border-slate-100 bg-white px-3 py-2 shadow-md sm:block">
        <p className="text-[11px] text-slate">Deteksi Anomali</p>
        <p className="text-sm font-bold text-green">Peringatan Dini</p>
      </div>
      <div className="absolute -right-3 top-8 hidden rotate-6 rounded-xl border border-slate-100 bg-white px-3 py-2 shadow-md sm:block">
        <p className="text-[11px] text-slate">Konsumsi Real-Time</p>
        <p className="text-sm font-bold text-navy">Listrik + Air</p>
      </div>
    </div>
  )
}

function PortLabel({ icon: Icon, label, value }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-3 text-center">
      <Icon size={18} className="text-blue" />
      <p className="text-[11px] font-semibold text-navy">{label}</p>
      <p className="text-[10px] text-slate">{value}</p>
    </div>
  )
}

function Readout({ color, label, value }) {
  const tone = color === 'blue' ? 'bg-blue-light text-blue' : 'bg-green-light text-green'
  return (
    <div className="rounded-xl border border-slate-100 bg-mist p-3">
      <p className="text-[11px] font-medium text-slate">{label}</p>
      <p className="font-display text-lg font-bold text-navy">{value}</p>
      <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${tone}`}>
        Normal
      </span>
    </div>
  )
}
