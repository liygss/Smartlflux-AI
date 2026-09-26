import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  ArrowRight,
  CheckCircle2,
  Zap,
  Activity,
  ScanSearch,
  BellRing,
  BarChart3,
  Lightbulb,
  TrendingUp,
  History,
  Clock,
  Split,
  Combine,
  Boxes,
  Server,
  Hotel,
  GraduationCap,
  Building2,
  Store,
  Factory,
  Hospital,
  HardDrive,
  Wrench,
  RefreshCcw,
  Check,
  Gauge,
} from 'lucide-react'
import { Section, SectionHeader, Card } from '../components/ui/Section'
import { Reveal, Stagger, StaggerItem } from '../components/ui/Reveal'
import HeroVisual from '../components/HeroVisual'
import TrustMetrics from '../components/TrustMetrics'
import SolutionFlow from '../components/SolutionFlow'
import DashboardFrame from '../components/DashboardFrame'
import MarketTiers from '../components/MarketTiers'
import PilotCTA from '../components/PilotCTA'

const ease = [0.22, 1, 0.36, 1]

const page = {
  bg: 'relative overflow-hidden bg-deep',
}

const problems = [
  {
    icon: Clock,
    title: 'Late Detection',
    text: 'Pemborosan sering diketahui setelah konsumsi sudah terjadi.',
  },
  {
    icon: Split,
    title: 'Fragmented Monitoring',
    text: 'Listrik dan air sering dipantau melalui sistem yang berbeda.',
  },
  {
    icon: BarChart3,
    title: 'Raw Data',
    text: 'Data tersedia, tetapi pengguna masih harus menginterpretasikan angka secara manual.',
  },
]

const nodeFeatures = [
  { title: 'Integrated Gateway', text: 'Menerima data dari sensor listrik dan air.' },
  { title: 'Edge Processing', text: 'Melakukan pemrosesan awal sebelum data dikirim ke cloud.' },
  { title: 'Secure Connectivity', text: 'Mengirim data melalui Wi-Fi menggunakan MQTT/HTTP.' },
  { title: 'Local Backup', text: 'MicroSD membantu menjaga data saat koneksi tidak tersedia.' },
]

const featureGrid = [
  { icon: Activity, title: 'Real-Time Monitoring', text: 'Pantau listrik dan air secara langsung.', badge: 'MVP', tone: 'bg-mint/10 text-mint border-mint/25' },
  { icon: ScanSearch, title: 'Anomaly Detection', text: 'Identifikasi pola konsumsi yang menyimpang dari baseline.', badge: 'MVP', tone: 'bg-mint/10 text-mint border-mint/25' },
  { icon: BellRing, title: 'Smart Alerts', text: 'Kirim early warning ketika terjadi kondisi abnormal.', badge: 'MVP', tone: 'bg-mint/10 text-mint border-mint/25' },
  { icon: History, title: 'Historical Analytics', text: 'Bandingkan konsumsi dari waktu ke waktu.', badge: 'MVP', tone: 'bg-mint/10 text-mint border-mint/25' },
  { icon: TrendingUp, title: 'Forecasting', text: 'Prediksi penggunaan berdasarkan data historis.', badge: 'Roadmap', tone: 'bg-glow-violet/10 text-glow-violet border-glow-violet/25' },
  { icon: Lightbulb, title: 'Recommendations', text: 'Berikan insight untuk membantu efisiensi sumber daya.', badge: 'Roadmap', tone: 'bg-glow-violet/10 text-glow-violet border-glow-violet/25' },
]

const segments = [
  { icon: Hotel, label: 'Hotel' },
  { icon: GraduationCap, label: 'Campus' },
  { icon: Building2, label: 'Office Building' },
  { icon: Store, label: 'Commercial Facility' },
  { icon: Hospital, label: 'Hospital' },
  { icon: Factory, label: 'Industrial Facility' },
]

const differentiators = [
  {
    icon: Combine,
    title: 'Integrated',
    text: 'Listrik dan air dalam satu platform.',
  },
  {
    icon: Boxes,
    title: 'Modular',
    text: 'Dapat diterapkan sesuai kebutuhan fasilitas.',
  },
  {
    icon: Zap,
    title: 'Action-Oriented',
    text: 'Tidak hanya menampilkan data, tetapi juga alert dan insight.',
  },
]

const pricing = [
  { icon: HardDrive, name: 'Hardware', value: 'Rp4.500.000', unit: '/ package', text: 'SmartFlux Node + sensor listrik & air.' },
  { icon: Wrench, name: 'Installation', value: 'Rp1.500.000', unit: '/ location', text: 'Pemasangan dan konfigurasi di fasilitas.' },
  { icon: RefreshCcw, name: 'Subscription', value: 'Rp750.000', unit: '/ month', text: 'Cloud, analitik, alert, dan dukungan.', featured: true },
]

const howSteps = [
  { n: '01', icon: Wrench, title: 'Install', text: 'Sensor dan SmartFlux Node dipasang pada fasilitas.' },
  { n: '02', icon: Activity, title: 'Monitor', text: 'Data listrik dan air dikumpulkan secara real-time.' },
  { n: '03', icon: ScanSearch, title: 'Detect', text: 'Sistem membandingkan pola aktual dengan baseline.' },
  { n: '04', icon: BellRing, title: 'Act', text: 'Pengguna menerima alert dan melakukan evaluasi.' },
]

function HeadlineWord({ children }) {
  return <span className="text-gradient-energy">{children}</span>
}

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className={page.bg}>
        <div className="pointer-events-none absolute inset-0 bg-dots-dark opacity-50" />
        <div className="pointer-events-none absolute -top-24 left-1/2 h-96 w-[50rem] -translate-x-1/2 rounded-full bg-electric/15 blur-[140px]" />
        <div className="pointer-events-none absolute right-[8%] top-1/3 h-64 w-64 rounded-full bg-glow-cyan/10 blur-[90px]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-glow-cyan/40 to-transparent" />

        <div className="relative mx-auto grid max-w-[90rem] items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:py-24">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-line bg-panel/80 px-4 py-2 text-xs font-semibold text-glow-cyan"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-glow-cyan opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-glow-cyan" />
              </span>
              IoT + Edge AI Resource Monitoring
            </motion.span>

            <h1 className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-fx-text sm:text-5xl lg:text-[3.4rem] xl:text-6xl">
              <span className="block overflow-hidden">
                <span className="word-reveal block" style={{ animationDelay: '0.05s' }}>
                  Monitor <HeadlineWord>Smarter</HeadlineWord>.
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="word-reveal block" style={{ animationDelay: '0.18s' }}>
                  Detect <HeadlineWord>Earlier</HeadlineWord>.
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="word-reveal block" style={{ animationDelay: '0.31s' }}>
                  Use Resources <HeadlineWord>Better</HeadlineWord>.
                </span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.42, ease }}
              className="mt-7 max-w-xl text-base leading-relaxed text-fx-secondary sm:text-lg"
            >
              SmartFlux AI mengintegrasikan monitoring listrik dan air, anomaly
              detection, analytics, dan early warning dalam satu platform untuk
              membantu fasilitas mengambil keputusan berbasis data.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease }}
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <Link
                to="/contact"
                className="btn-gradient-fx inline-flex items-center justify-center gap-2 rounded-lg px-8 py-4 text-sm font-semibold text-white"
              >
                Request Pilot
                <ArrowRight size={17} />
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-panel/50 px-8 py-4 text-sm font-semibold text-fx-text transition-colors hover:border-glow-cyan/50 hover:text-glow-cyan"
              >
                Explore Dashboard
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.62 }}
              className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-fx-secondary"
            >
              {['IoT + Edge AI', 'Listrik + Air', 'Real-Time Alerts'].map((t) => (
                <span key={t} className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-mint/15 text-mint">
                    <CheckCircle2 size={14} />
                  </span>
                  {t}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="relative"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </section>

      {/* TRUST METRICS */}
      <div className="bg-deep">
        <TrustMetrics />
      </div>

      {/* PROBLEM */}
      <Section variant="dark">
        <SectionHeader
          dark
          eyebrow="Problem"
          title="Monitoring Bukan Sekadar Melihat Angka"
          description="Meter dan tagihan menunjukkan berapa banyak sumber daya yang digunakan, tetapi belum tentu menjelaskan kapan pola penggunaan mulai tidak normal."
        />
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((p) => (
            <StaggerItem key={p.title} className="h-full">
              <Card dark className="h-full p-6">
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-panel text-fx-warning">
                  <p.icon size={22} />
                </span>
                <h3 className="mb-2 font-display text-lg font-bold text-fx-text">{p.title}</h3>
                <p className="text-sm leading-relaxed text-fx-secondary">{p.text}</p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* SOLUTION */}
      <SolutionFlow />

      {/* SMARTFLUX NODE */}
      <Section variant="dark">
        <SectionHeader
          dark
          eyebrow="Product"
          title="Meet SmartFlux Node"
          description="Gateway industri IoT yang mengintegrasikan sensor listrik dan air dengan pemrosesan edge."
        />
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/15 blur-[70px]" />
              <div className="animate-orbit pointer-events-none absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-line/60" />
              <div className="relative overflow-hidden rounded-2xl border border-line bg-panel p-4">
                <span className="absolute right-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-md border border-mint/25 bg-mint/10 px-2.5 py-1 text-[11px] font-bold text-mint">
                  <Gauge size={12} />
                  Live Monitoring
                </span>
                <img
                  src="/desain produk.jpeg"
                  alt="SmartFlux Node"
                  className="mx-auto w-full max-w-md object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          </Reveal>

          <div className="space-y-3">
            {nodeFeatures.map((f) => (
              <Reveal key={f.title}>
                <div className="fx-card fx-card-hover flex items-start gap-4 p-5">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-mint/15 text-mint">
                    <Check size={15} />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold text-fx-text">{f.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-fx-secondary">{f.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* DASHBOARD PREVIEW */}
      <Section variant="dark">
        <SectionHeader
          dark
          eyebrow="Dashboard"
          title="One Dashboard. Complete Visibility."
          description="Pantau kondisi fasilitas secara real-time dalam satu antarmuka."
        />
        <Reveal>
          <DashboardFrame />
        </Reveal>
      </Section>

      {/* FEATURES */}
      <Section variant="dark">
        <SectionHeader
          dark
          eyebrow="Features"
          title="Kemampuan Inti SmartFlux AI"
          description="Dari monitoring hingga rekomendasi, dirancang untuk operasi fasilitas yang efisien."
        />
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featureGrid.map((f) => (
            <StaggerItem key={f.title} className="h-full">
              <div className="fx-card fx-card-hover relative flex h-full flex-col p-6">
                <div className="mb-4 flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-panel text-glow-cyan">
                    <f.icon size={22} strokeWidth={1.8} />
                  </span>
                  <span className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${f.tone}`}>
                    {f.badge}
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold text-fx-text">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-fx-secondary">{f.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* TARGET MARKET */}
      <Section variant="dark">
        <SectionHeader
          dark
          eyebrow="Target Market"
          title="Built for High-Usage Facilities"
          description="Dirancang untuk fasilitas dengan konsumsi listrik dan air yang signifikan."
        />
        <Stagger className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {segments.map((s) => (
            <StaggerItem key={s.label} className="h-full">
              <div className="fx-card fx-card-hover flex h-full items-center gap-3 p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-panel text-glow-teal">
                  <s.icon size={22} strokeWidth={1.8} />
                </span>
                <span className="font-display font-semibold text-fx-text">{s.label}</span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-8" delay={0.1}>
          <div className="fx-card relative overflow-hidden p-6">
            <span className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-electric/10 blur-2xl" />
            <div className="flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center gap-2 rounded-lg border border-glow-cyan/30 bg-glow-cyan/10 px-3.5 py-2 text-xs font-bold text-glow-cyan">
                <Server size={14} />
                Initial Focus: Surabaya & Sidoarjo
              </span>
              <p className="max-w-xl text-sm leading-relaxed text-fx-secondary">
                SmartFlux AI memulai dengan hotel, kampus, gedung perkantoran, dan
                fasilitas komersial di Surabaya dan Sidoarjo sebagai early adopter
                dan pilot project.
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* TAM / SAM / SOM */}
      <MarketTiers />

      {/* COMPETITIVE POSITIONING */}
      <Section variant="dark">
        <SectionHeader
          dark
          eyebrow="Keunggulan Kompetitif"
          title="Integrated. Modular. Action-Oriented."
          description="Tiga pembeda utama dibandingkan solusi monitoring yang terpecah."
        />
        <Stagger className="grid gap-5 sm:grid-cols-3">
          {differentiators.map((d) => (
            <StaggerItem key={d.title} className="h-full">
              <div className="fx-card fx-card-hover flex h-full flex-col items-center p-7 text-center">
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-panel text-glow-cyan">
                  <d.icon size={22} strokeWidth={1.8} />
                </span>
                <h3 className="font-display text-lg font-bold text-fx-text">{d.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-fx-secondary">{d.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* BUSINESS MODEL */}
      <Section variant="dark">
        <SectionHeader
          dark
          eyebrow="Business Model"
          title="Simple Business Model. Recurring Value."
          description="Hardware, instalasi, dan langganan cloud — dapat diadopsi bertahap."
        />
        <Stagger className="grid gap-5 md:grid-cols-3">
          {pricing.map((p) => (
            <StaggerItem key={p.name} className="h-full">
              <div
                className={`fx-card fx-card-hover relative flex h-full flex-col p-7 ${
                  p.featured ? 'border-glow-cyan/40 ring-1 ring-glow-cyan/20' : ''
                }`}
              >
                {p.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-glow-cyan/40 bg-card px-3 py-1 text-[11px] font-bold text-glow-cyan">
                    Recurring
                  </span>
                )}
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-panel text-glow-teal">
                  <p.icon size={20} strokeWidth={1.8} />
                </span>
                <h3 className="font-display text-base font-bold text-fx-text">{p.name}</h3>
                <p className="mt-2 font-display text-2xl font-extrabold text-fx-text">
                  {p.value}
                  <span className="text-sm font-medium text-fx-secondary">{p.unit}</span>
                </p>
                <p className="mt-2 text-sm text-fx-secondary">{p.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-6 text-center" delay={0.1}>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-fx-warning/30 bg-fx-warning/10 px-3.5 py-1.5 text-xs font-medium text-fx-warning">
            Indicative pricing — subject to pilot validation
          </span>
        </Reveal>
      </Section>

      {/* HOW IT WORKS */}
      <Section variant="dark">
        <SectionHeader
          dark
          eyebrow="How It Works"
          title="Dari Pemasangan hingga Tindakan"
          description="Empat langkah sederhana untuk memulai monitoring cerdas."
        />
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {howSteps.map((s, i) => (
            <StaggerItem key={s.n} className="h-full">
              <div className="fx-card fx-card-hover relative flex h-full flex-col p-6">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-panel text-glow-cyan">
                    <s.icon size={20} strokeWidth={1.8} />
                  </span>
                  <span className="font-display text-3xl font-extrabold text-line">{s.n}</span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-fx-text">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-fx-secondary">{s.text}</p>
                {i < howSteps.length - 1 && (
                  <span className="mt-4 hidden h-px w-full bg-gradient-to-r from-glow-cyan/30 to-transparent lg:block" />
                )}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <PilotCTA />
    </>
  )
}