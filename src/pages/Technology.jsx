import React from 'react'
import {
  Activity,
  Wifi,
  Database,
  Cloud,
  Droplets,
  HardDrive,
  Gauge,
  Microchip,
  Package,
  Upload,
} from 'lucide-react'
import PageHeader from '../components/PageHeader'
import { Section, SectionHeader, Card } from '../components/ui/Section'
import { Reveal, Stagger, StaggerItem } from '../components/ui/Reveal'
import PilotCTA from '../components/PilotCTA'
import { deviceComponents } from '../data/content'

const layers = [
  { icon: Activity, title: 'Sensor IoT', items: ['Listrik: PZEM-004T', 'Aliran air: YF-S201'], color: 'text-glow-cyan' },
  { icon: Microchip, title: 'Edge AI · SmartFlux Node', items: ['ESP32', 'Filter & validasi lokal', 'Penyimpanan sementara'], color: 'text-electric' },
  { icon: Wifi, title: 'Konektivitas', items: ['Wi-Fi', 'MQTT / HTTP'], color: 'text-glow-teal' },
  { icon: Cloud, title: 'Platform Cloud', items: ['Penyimpanan historis', 'Analitik', 'Manajemen pengguna & perangkat', 'Pelaporan'], color: 'text-glow-violet' },
]

const mvpHardware = [
  { icon: Microchip, label: 'ESP32' },
  { icon: Activity, label: 'PZEM-004T' },
  { icon: Droplets, label: 'YF-S201' },
  { icon: Gauge, label: 'Power supply' },
  { icon: HardDrive, label: 'microSD opsional' },
  { icon: Package, label: 'Enclosure & kabel' },
]

const mvpSoftware = [
  { icon: Upload, label: 'MQTT / HTTP' },
  { icon: Database, label: 'Backend API' },
  { icon: Database, label: 'Database' },
  { icon: Gauge, label: 'Dashboard real-time' },
  { icon: Activity, label: 'Grafik historis' },
  { icon: HardDrive, label: 'Alert & status perangkat' },
]

export default function Technology() {
  return (
    <>
      <PageHeader
        breadcrumb="Teknologi"
        eyebrow="Teknologi"
        title="IoT + Edge AI + Analitik Cloud"
        description="SmartFlux AI menggabungkan perangkat keras praktis dan modular dengan analitik cloud untuk mengubah data sensor menjadi wawasan yang dapat ditindaklanjuti."
      />

      <Section variant="dark">
        <SectionHeader
          dark
          eyebrow="Arsitektur"
          title="Jalur Data yang Sederhana dan Andal"
          description="Dari penginderaan di lokasi hingga wawasan di cloud."
        />
        <Stagger className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {layers.map((l) => (
            <StaggerItem key={l.title} className="h-full">
              <div className="fx-card fx-card-hover flex h-full flex-col p-6">
                <span className={`mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-panel ${l.color}`}>
                  <l.icon size={22} strokeWidth={1.8} />
                </span>
                <h3 className="mb-3 font-display text-lg font-bold text-fx-text">{l.title}</h3>
                <ul className="space-y-1.5">
                  {l.items.map((it) => (
                    <li key={it} className="flex items-start gap-2 text-sm text-fx-secondary">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-mint" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section variant="dark">
        <SectionHeader
          dark
          eyebrow="Komponen"
          title="Komponen Prototipe"
          description="Blok penyusun penerapan SmartFlux AI pada tahap MVP."
        />
        <Stagger className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {deviceComponents.map((c) => (
            <StaggerItem key={c.title} className="h-full">
              <Card dark className="h-full p-6 text-center">
                <span className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-panel text-glow-cyan">
                  <c.icon size={22} strokeWidth={1.8} />
                </span>
                <h4 className="font-display text-sm font-bold text-fx-text">{c.title}</h4>
                <p className="mt-1 text-xs text-fx-secondary">{c.detail}</p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section variant="dark">
        <SectionHeader
          dark
          eyebrow="MVP"
          title="Produk Viable Minimum"
          description="Buktikan alur inti sebelum membangun fitur yang lebih kompleks: kumpulkan, kirim, tampilkan, deteksi, dan beri alert."
        />
        <Reveal><div className="grid gap-5 md:grid-cols-2">
          <Card dark className="p-6">
            <h3 className="mb-4 font-display text-lg font-bold text-fx-text">MVP Hardware</h3>
            <div className="grid grid-cols-3 gap-3">
              {mvpHardware.map((h) => (
                <div key={h.label} className="flex flex-col items-center gap-2 rounded-xl border border-line bg-panel p-3 text-center">
                  <h.icon size={20} className="text-glow-cyan" />
                  <span className="text-xs font-medium text-fx-text">{h.label}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card dark className="p-6">
            <h3 className="mb-4 font-display text-lg font-bold text-fx-text">MVP Software + AI</h3>
            <div className="grid grid-cols-3 gap-3">
              {mvpSoftware.map((s) => (
                <div key={s.label} className="flex flex-col items-center gap-2 rounded-xl border border-line bg-panel p-3 text-center">
                  <s.icon size={20} className="text-mint" />
                  <span className="text-xs font-medium text-fx-text">{s.label}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 rounded-lg border border-line bg-panel p-3 text-xs text-fx-secondary">
              Fokus AI pada MVP: pemodelan baseline dan deteksi anomali dasar.
              Prediksi dan rekomendasi dikembangkan setelah alur inti tervalidasi.
            </p>
          </Card>
        </div></Reveal>
      </Section>

      <PilotCTA />
    </>
  )
}