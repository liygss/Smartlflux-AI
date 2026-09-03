import React from 'react'
import { Link } from 'react-router-dom'
import {
  Activity,
  Boxes,
  Cloud,
  LayoutDashboard,
  Check,
  Star,
  Hotel,
  GraduationCap,
  Building2,
  Store,
  ArrowRight,
} from 'lucide-react'
import PageHeader from '../components/PageHeader'
import { Section, SectionHeader, Card } from '../components/ui/Section'
import { Reveal, Stagger, StaggerItem } from '../components/ui/Reveal'
import PilotCTA from '../components/PilotCTA'
import { features, packages } from '../data/content'
import { DashboardCards } from '../components/DashboardPreview'

const components = [
  { icon: Activity, title: 'SmartFlux Sensors', text: 'Menangkap data penggunaan listrik dan air di titik pemakaian.' },
  { icon: Boxes, title: 'SmartFlux Node', text: 'Pemrosesan edge lokal dan komunikasi IoT.' },
  { icon: Cloud, title: 'SmartFlux Cloud', text: 'Menyimpan data historis dan menjalankan analitik.' },
  { icon: LayoutDashboard, title: 'SmartFlux Dashboard', text: 'Mengubah data menjadi informasi monitoring, alert, prediksi, dan rekomendasi.' },
]

const useCases = [
  {
    icon: Hotel,
    title: 'Hotel',
    text: 'Pantau penggunaan listrik dan air di kamar, food & beverage, dan pendingin. Deteksi anomali malam hari dan operasi yang tidak efisien sejak awal.',
    needs: ['Pemantauan konsumsi malam hari', 'Penggunaan air di seluruh fasilitas', 'Penggunaan sistem pendingin'],
  },
  {
    icon: GraduationCap,
    title: 'Kampus',
    text: 'Pantau konsumsi di berbagai gedung dan deteksi pola abnormal di ruang kuliah, laboratorium, dan asrama.',
    needs: ['Visibilitas multi-gedung', 'Pola penggunaan terjadwal', 'Alert anomali untuk laboratorium'],
  },
  {
    icon: Building2,
    title: 'Gedung Perkantoran',
    text: 'Pahami penggunaan hari kerja dibanding akhir pekan dan identifikasi jam operasional atau sistem yang perlu perhatian.',
    needs: ['Konsumsi di luar jam kerja', 'Pola penggunaan HVAC', 'Perbandingan baseline'],
  },
  {
    icon: Store,
    title: 'Fasilitas Komersial',
    text: 'Pantau penggunaan sumber daya secara andal di seluruh operasi dan temukan potensi masalah sebelum membesar.',
    needs: ['Pemantauan real-time', 'Deteksi potensi anomali', 'Pelaporan penggunaan'],
  },
]

const marketTiers = [
  {
    label: 'TAM',
    title: 'Total Addressable Market',
    text: 'Gedung komersial, institusi, dan fasilitas operasional di seluruh Indonesia dengan konsumsi listrik dan air relatif tinggi yang membutuhkan pemantauan terus-menerus.',
    includes: ['Hotel', 'Rumah sakit', 'Kampus', 'Gedung perkantoran', 'Pusat perbelanjaan', 'Apartemen', 'Fasilitas industri'],
  },
  {
    label: 'SAM',
    title: 'Serviceable Available Market',
    text: 'Bagian pasar yang dapat dilayani SmartFlux AI secara realistis saat ini berdasarkan kemampuan produknya.',
    includes: 'Hotel, kampus, gedung perkantoran, dan fasilitas komersial menengah-besar di Pulau Jawa.',
  },
  {
    label: 'SOM',
    title: 'Serviceable Obtainable Market',
    text: 'Bagian paling realistis untuk tahap awal: 10–20 fasilitas early adopter ditargetkan untuk pilot, validasi, dan studi kasus awal.',
    includes: 'Hotel, kampus, dan gedung perkantoran di Surabaya dan Sidoarjo.',
    star: true,
  },
]

export default function Product() {
  return (
    <>
      <PageHeader
        breadcrumb="Produk"
        eyebrow="Produk"
        title="SmartFlux AI"
        description="SmartFlux AI adalah produk utama SmartFlux: sistem pemantauan sumber daya cerdas terintegrasi untuk listrik dan air."
      />

      {/* Components */}
      <Section>
        <SectionHeader title="Produk Dibangun dari Empat Bagian" />
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {components.map((c) => (
            <StaggerItem key={c.title} className="h-full">
              <Card className="h-full">
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-navy to-blue text-white">
                  <c.icon size={22} />
                </span>
                <h3 className="mb-2 font-display text-lg font-bold text-navy">{c.title}</h3>
                <p className="text-sm leading-relaxed text-slate">{c.text}</p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Features */}
      <Section variant="light" id="features">
        <SectionHeader
          eyebrow="Fitur"
          title="Inteligensi yang Bertindak dari Data Anda"
          description="Dari pemantauan real-time hingga peringatan dini dan rekomendasi."
        />
        <Stagger className="grid gap-5 sm:grid-cols-2">
          {features.map((f) => (
            <StaggerItem key={f.title} className="h-full">
              <Card className="h-full">
                <div className="flex gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-navy to-blue text-white">
                    <f.icon size={22} />
                  </span>
                  <div>
                    <h3 className="mb-1.5 font-display text-lg font-bold text-navy">{f.title}</h3>
                    <p className="text-sm leading-relaxed text-slate">{f.text}</p>
                  </div>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mx-auto mt-10 max-w-3xl" delay={0.05}>
          <Card hover={false}>
            <h4 className="mb-3 font-display font-bold text-navy">Contoh Deteksi Anomali</h4>
            <div className="space-y-3 text-sm">
              <div className="rounded-xl border border-blue/20 bg-blue-light p-3.5">
                <p className="text-slate">Konsumsi listrik malam hari normal: 200–300 W</p>
                <p className="font-semibold text-navy">Saat ini: 850 W → penggunaan listrik abnormal terdeteksi</p>
              </div>
              <div className="rounded-xl border border-green/20 bg-green-light p-3.5">
                <p className="text-slate">Aliran malam yang diharapkan: 0 L/mnt</p>
                <p className="font-semibold text-navy">Saat ini: 4 L/mnt terus-menerus → potensi aliran air abnormal terdeteksi</p>
              </div>
              <p className="text-xs text-slate">
                Wording sengaja bersifat sugestif — potensi anomali, pola abnormal, peringatan dini — bukan diagnosis mutlak.
              </p>
            </div>
          </Card>
        </Reveal>
      </Section>

      {/* Segmen / Solusi */}
      <Section id="solusi">
        <SectionHeader
          eyebrow="Solusi"
          title="Dirancang untuk Fasilitas dengan Konsumsi Sumber Daya yang Bermakna"
          description="SmartFlux AI didesain berdasarkan realitas harian pengelolaan fasilitas di berbagai jenis bangunan — dimulai dari hotel, kampus, gedung perkantoran, dan fasilitas komersial di Surabaya dan Sidoarjo."
        />
        <Stagger className="grid gap-5 sm:grid-cols-2">
          {useCases.map((c) => (
            <StaggerItem key={c.title} className="h-full">
              <Card className="h-full">
                <div className="flex gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-navy to-blue text-white">
                    <c.icon size={24} />
                  </span>
                  <div>
                    <h3 className="mb-1.5 font-display text-lg font-bold text-navy">{c.title}</h3>
                    <p className="text-sm leading-relaxed text-slate">{c.text}</p>
                  </div>
                </div>
                <ul className="mt-4 space-y-1.5 border-t border-slate-100 pt-4">
                  {c.needs.map((n) => (
                    <li key={n} className="flex items-center gap-2 text-sm text-ink">
                      <span className="h-1.5 w-1.5 rounded-full bg-green" />
                      {n}
                    </li>
                  ))}
                </ul>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Dashboard */}
      <Section variant="mist">
        <SectionHeader
          eyebrow="Dashboard"
          title="Yang Akan Dilihat Tim Anda"
          description="Satu dashboard untuk listrik dan air: ringkasan, tren, alert, prediksi, rekomendasi, dan status perangkat."
        />
        <Reveal>
          <DashboardCards />
        </Reveal>
      </Section>

      {/* Packages */}
      <Section id="packages">
        <SectionHeader
          eyebrow="Paket"
          title="Opsi Modular yang Tumbuh Bersama Anda"
          description="Mulai dengan monitoring inti dan perluas sesuai kebutuhan. Harga masih placeholder hingga tervalidasi."
        />
        <Stagger className="grid gap-5 md:grid-cols-3">
          {packages.map((p) => (
            <StaggerItem key={p.name} className="h-full">
              <Card
                hover={false}
                className={`relative flex h-full flex-col ${
                  p.featured
                    ? 'border-navy shadow-[var(--shadow-lift)] ring-2 ring-navy/20'
                    : ''
                }`}
              >
                {p.featured && (
                  <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-gradient-to-r from-green to-blue px-3 py-1 text-xs font-semibold text-white shadow">
                    <Star size={12} fill="currentColor" />
                    Direkomendasikan
                  </span>
                )}
                <h3 className="font-display text-xl font-bold text-navy">{p.name}</h3>
                <p className="mt-1 text-sm text-slate">{p.tagline}</p>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-ink">
                      <Check size={16} className="mt-0.5 shrink-0 text-green" />
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-xs text-slate">Harga akan dikonfirmasi</p>
                <Link
                  to="/contact"
                  className={`mt-3 rounded-full px-5 py-2.5 text-center text-sm font-semibold transition-all hover:-translate-y-0.5 ${
                    p.featured
                      ? 'bg-navy text-white shadow-[var(--shadow-soft)] hover:bg-blue'
                      : 'border border-navy text-navy hover:bg-blue-light'
                  }`}
                >
                  Ajukan Pilot
                </Link>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Fokus Pasar */}
      <Section variant="light" id="pasar">
        <SectionHeader
          eyebrow="Fokus Pasar"
          title="Jalur Realistis dari Indonesia ke Early Adopter"
          description="SmartFlux AI mendefinisikan pasarnya secara jelas — dari total peluang hingga customer yang dapat dimenangkan terlebih dahulu."
        />
        <Stagger className="grid gap-5 md:grid-cols-3">
          {marketTiers.map((t) => (
            <StaggerItem key={t.label} className="h-full">
              <Card
                hover={false}
                className={`flex h-full flex-col ${
                  t.star ? 'border-navy shadow-[var(--shadow-lift)] ring-2 ring-navy/20' : ''
                }`}
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="rounded-full bg-gradient-to-r from-navy to-blue px-3 py-1 text-xs font-bold text-white">
                    {t.label}
                  </span>
                  {t.star && (
                    <span className="rounded-full bg-green-light px-2.5 py-1 text-[11px] font-semibold text-green">
                      Customer pertama
                    </span>
                  )}
                </div>
                <h3 className="font-display text-lg font-bold text-navy">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{t.text}</p>
                {Array.isArray(t.includes) ? (
                  <ul className="mt-4 space-y-1.5">
                    {t.includes.map((i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-ink">
                        <span className="h-1.5 w-1.5 rounded-full bg-green" />
                        {i}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 rounded-lg bg-mist p-3 text-sm text-ink">{t.includes}</p>
                )}
              </Card>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mx-auto mt-10 max-w-3xl" delay={0.05}>
          <div className="mb-6 rounded-2xl border border-blue/20 bg-blue-light p-6">
            <h3 className="mb-2 font-display text-lg font-bold text-navy">Pernyataan Positioning</h3>
            <p className="text-sm text-ink">
              SmartFlux AI adalah solusi monitoring sumber daya cerdas yang membantu manajer
              fasilitas memantau listrik dan air secara real-time, mendeteksi konsumsi abnormal
              lebih awal, dan mendukung keputusan berbasis data.
            </p>
          </div>
          <div className="text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-blue"
            >
              Ajukan Pilot <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>
      </Section>

      <PilotCTA />
    </>
  )
}
