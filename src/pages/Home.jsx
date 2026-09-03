import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  ArrowRight,
  Activity,
  CheckCircle2,
  Zap,
  Droplets,
  Boxes,
  Cloud,
  LayoutDashboard,
  ScanSearch,
  EyeOff,
  Split,
  BarChart3,
  Clock,
  Sparkles,
  Lightbulb,
  Play,
} from 'lucide-react'
import { Section, SectionHeader, Card } from '../components/ui/Section'
import DashboardPreview from '../components/DashboardPreview'
import VideoCard from '../components/VideoCard'
import ProductShowcase from '../components/ProductShowcase'
import StatsBar from '../components/StatsBar'
import ComparisonTable from '../components/ComparisonTable'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import PilotCTA from '../components/PilotCTA'
import LiveDemo from '../components/LiveDemo'
import { Reveal, Stagger, StaggerItem } from '../components/ui/Reveal'
import { roadmapPhases } from '../data/content'

const ease = [0.22, 1, 0.36, 1]

const problems = [
  { icon: EyeOff, title: 'Visibilitas Tertunda', text: 'Masalah konsumsi baru terlihat setelah biaya operasional meningkat.' },
  { icon: Split, title: 'Monitoring Terpecah-belah', text: 'Listrik dan air sering dipantau melalui sistem terpisah dan tidak terhubung.' },
  { icon: BarChart3, title: 'Terlalu Banyak Data, Sedikit Wawasan', text: 'Angka dan grafik mentah belum tentu memberi tahu apa yang perlu diperhatikan.' },
  { icon: Clock, title: 'Respons Lambat', text: 'Potensi anomali bisa luput tanpa adanya pemantauan yang terus-menerus.' },
]

const segments = [
  { icon: '🏨', label: 'Hotel' },
  { icon: '🎓', label: 'Kampus' },
  { icon: '🏢', label: 'Gedung Perkantoran' },
  { icon: '🛍️', label: 'Fasilitas Komersial' },
]

const flowSteps = [
  { icon: Activity, label: 'Sensor Listrik & Air' },
  { icon: Boxes, label: 'SmartFlux Node' },
  { icon: Cloud, label: 'Cloud' },
  { icon: LayoutDashboard, label: 'Dashboard' },
  { icon: Zap, label: 'Tindakan' },
]

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero-mesh relative overflow-hidden">
        {/* Animated floating orbs */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-[26rem] w-[26rem] rounded-full bg-blue/15 blur-3xl animate-orb" />
        <div className="pointer-events-none absolute right-0 top-16 h-80 w-80 rounded-full bg-indigo/20 blur-3xl animate-orb-slow" />
        <div className="pointer-events-none absolute bottom-[-4rem] left-1/4 h-80 w-80 rounded-full bg-emerald/10 blur-3xl animate-orb-reverse" />
        <div className="pointer-events-none absolute bottom-8 right-[12%] h-64 w-64 rounded-full bg-cyan/15 blur-3xl animate-orb" />
        <div className="pointer-events-none absolute left-[45%] top-[-3rem] h-40 w-40 rounded-full bg-violet/15 blur-2xl animate-orb-slow" />

        {/* Drifting geometric accents */}
        <div className="pointer-events-none absolute right-[16%] top-[22%] h-3 w-3 rounded-full bg-blue/30 blur-[1px] animate-drift" />
        <div className="pointer-events-none absolute left-[12%] top-[30%] h-2.5 w-2.5 rounded-full bg-emerald/30 animate-drift" />
        <div className="pointer-events-none absolute bottom-[28%] right-[30%] h-2 w-2 rounded-full bg-violet/30 animate-drift" />
        <div className="pointer-events-none absolute right-[8%] top-[60%] h-3 w-3 rounded-full bg-indigo/25 animate-drift" />

        <div className="relative mx-auto grid max-w-[90rem] items-center gap-10 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[0.85fr_1.35fr]">
          <div>
            {/* Eyebrow badge */}
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/60 bg-white/70 px-4 py-2 text-xs font-semibold text-navy shadow-[var(--shadow-card)] backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald" />
              </span>
              <Sparkles size={14} className="text-blue" />
              Inteligensi Listrik + Air Terintegrasi
              <span className="ml-1 hidden rounded-full bg-gradient-to-r from-blue to-indigo px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white sm:inline">
                Baru
              </span>
            </motion.span>

            {/* Headline with staggered word reveal */}
            <h1 className="font-display text-3xl font-extrabold leading-[1.12] tracking-tight text-navy sm:text-4xl lg:text-[2.9rem] xl:text-5xl">
              <span className="block overflow-hidden">
                <span
                  className="word-reveal"
                  style={{ animationDelay: '0.05s' }}
                >
                  Monitoring Lebih Cerdas.
                </span>
              </span>
              <span className="block overflow-hidden">
                <span
                  className="word-reveal bg-gradient-to-r from-blue-bright via-indigo to-teal bg-clip-text text-transparent"
                  style={{ animationDelay: '0.18s' }}
                >
                  Deteksi Lebih Awal.
                </span>
              </span>
              <span className="block overflow-hidden">
                <span
                  className="word-reveal text-gradient"
                  style={{ animationDelay: '0.31s' }}
                >
                  Gunakan Sumber Daya Lebih Baik.
                </span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.42, ease }}
              className="mt-7 max-w-xl text-base leading-relaxed text-slate sm:text-lg"
            >
              SmartFlux AI mengintegrasikan pemantauan listrik dan air dengan IoT,
              Edge AI, dan analitik cloud untuk membantu fasilitas mendeteksi
              konsumsi abnormal, memahami pola penggunaan, dan mengambil keputusan
              berbasis data lebih cepat.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease }}
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <Link
                to="/contact"
                className="btn-shine group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-navy via-navy to-blue px-8 py-4 text-sm font-semibold text-white shadow-[var(--shadow-blue-glow)]"
              >
                Ajukan Pilot
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <Link
                to="/product"
                className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-navy/20 bg-white/80 px-8 py-4 text-sm font-semibold text-navy shadow-[var(--shadow-card)] backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-blue/40 hover:shadow-[var(--shadow-card-hover)]"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-blue to-indigo text-white transition-transform duration-300 group-hover:scale-110">
                  <Play size={12} />
                </span>
                Jelajahi SmartFlux AI
              </Link>
            </motion.div>

            {/* trust strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.62 }}
              className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-slate"
            >
              <span className="flex items-center gap-2.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-light text-emerald">
                  <CheckCircle2 size={14} />
                </span>
                IoT + Edge AI
              </span>
              <span className="flex items-center gap-2.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-light text-emerald">
                  <CheckCircle2 size={14} />
                </span>
                Modular
              </span>
              <span className="flex items-center gap-2.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-light text-emerald">
                  <CheckCircle2 size={14} />
                </span>
                B2B / B2I
              </span>
              <span className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-blue to-blue-soft text-[9px] font-bold text-white">BS</span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-emerald to-teal text-[9px] font-bold text-white">SN</span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-violet to-indigo text-[9px] font-bold text-white">AR</span>
                </div>
                <span className="text-xs font-medium text-slate">+50 fasilitas</span>
              </span>
            </motion.div>
          </div>

          {/* Video showcase with floating data cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="relative"
          >
            {/* Glow ring behind */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue/15 via-indigo/10 to-teal/15 blur-3xl animate-glow-ring" />

            <VideoCard className="animate-floaty" />

            {/* Floating data card - top left */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -left-4 top-10 hidden rounded-2xl border border-white/60 bg-white/85 px-4 py-3 shadow-[var(--shadow-card-hover)] backdrop-blur-md sm:block"
            >
              <FloatingStat
                label="Energi Terkini"
                value="4.2 kWh"
                trend="▲ 12%"
                positive={false}
                dot="bg-rose"
              />
            </motion.div>

            {/* Floating data card - bottom right */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="absolute -right-4 bottom-16 hidden rounded-2xl border border-white/60 bg-white/85 px-4 py-3 shadow-[var(--shadow-card-hover)] backdrop-blur-md sm:block"
            >
              <FloatingStat
                label="Aliran Air"
                value="0.8 L/mnt"
                trend="Normal"
                positive
                dot="bg-emerald"
              />
            </motion.div>

            {/* Floating badge - alert */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="absolute -top-4 right-[12%] inline-flex items-center gap-1.5 rounded-full border border-white/60 bg-white/90 px-3 py-1.5 text-xs font-semibold text-navy shadow-[var(--shadow-card-hover)] backdrop-blur-md"
            >
              <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-emerald" />
              Sistem Aktif 24/7
            </motion.div>
          </motion.div>
        </div>

        {/* PRODUCT FLOW STRIP */}
        <div className="relative mx-auto max-w-7xl px-5 pb-12 sm:px-8">
          <Stagger className="glass flex flex-col items-stretch justify-between gap-3 rounded-3xl border border-white/60 p-4 shadow-[var(--shadow-card-hover)] sm:flex-row sm:items-center">
            {flowSteps.map((s, i) => (
              <React.Fragment key={s.label}>
                <StaggerItem className="flex items-center gap-2.5 px-1 text-sm font-semibold text-navy">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue via-indigo to-teal text-white shadow-[var(--shadow-blue-glow)]">
                    <s.icon size={18} />
                  </span>
                  <span className="transition-colors">{s.label}</span>
                </StaggerItem>
                {i < flowSteps.length - 1 && (
                  <ArrowRight
                    size={16}
                    className="hidden shrink-0 text-slate/40 sm:block"
                  />
                )}
              </React.Fragment>
            ))}
          </Stagger>
        </div>

        {/* DASHBOARD PREVIEW */}
        <div className="relative mx-auto max-w-6xl px-5 pb-16 sm:px-8">
          <Reveal>
            <DashboardPreview />
          </Reveal>
        </div>
      </section>

      {/* STATS BAR */}
      <StatsBar />

      {/* PRODUCT SHOWCASE */}
      <ProductShowcase />

      {/* LIVE DEMO */}
      <LiveDemo />

      {/* COMPARISON TABLE */}
      <ComparisonTable />

      {/* PROBLEM */}
      <Section>
        <SectionHeader
          eyebrow="Masalah"
          title="Pemborosan Sumber Daya Sering Terdeteksi Terlambat"
          description="Banyak fasilitas baru mengetahui pemakaian listrik dan air setelah memeriksa catatan meter atau tagihan bulanan. Ini membuat sulit untuk melihat kapan konsumsi mulai naik tidak wajar, di mana inefisiensi terjadi, atau kapan potensi kebocoran air muncul."
        />
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((p) => (
            <StaggerItem key={p.title}>
              <Card className="h-full">
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-light to-blue-light/50 text-blue">
                  <p.icon size={22} />
                </span>
                <h3 className="mb-2 font-display text-lg font-bold text-navy">{p.title}</h3>
                <p className="text-sm leading-relaxed text-slate">{p.text}</p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* SOLUTION */}
      <Section variant="light">
        <SectionHeader
          eyebrow="Solusi"
          title="SmartFlux AI Mengubah Data Konsumsi Menjadi Tindakan"
          description="SmartFlux AI menggabungkan sensor IoT, pemrosesan edge, analitik cloud, dan monitoring cerdas dalam satu platform."
        />
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Activity, label: 'Monitoring', text: 'Pemantauan konsumsi secara real-time.' },
            { icon: ScanSearch, label: 'Deteksi', text: 'Menemukan pola yang berbeda dari normal.' },
            { icon: BarChart3, label: 'Prediksi', text: 'Memprediksi konsumsi di masa depan.' },
            { icon: Lightbulb, label: 'Rekomendasi', text: 'Mendukung keputusan operasional yang lebih baik.' },
          ].map((p) => (
            <StaggerItem key={p.label}>
              <Card className="h-full">
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-navy to-blue text-white">
                  <p.icon size={22} />
                </span>
                <h3 className="mb-2 font-display text-lg font-bold text-navy">{p.label}</h3>
                <p className="text-sm leading-relaxed text-slate">{p.text}</p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* FEATURES */}
      <Section>
        <SectionHeader
          eyebrow="Fitur"
          title="Satu Platform untuk Listrik dan Air"
          description="SmartFlux AI mengubah data konsumsi mentah menjadi informasi monitoring, alert, prediksi, dan rekomendasi."
        />
        <Stagger className="grid gap-5 sm:grid-cols-2">
          <StaggerItem>
            <FeatureItem
              icon={Activity}
              title="Pemantauan Real-Time"
              text="Listrik — tegangan, arus, daya, dan energi. Air — laju aliran dan volume, diperbarui secara terus-menerus."
            />
          </StaggerItem>
          <StaggerItem>
            <FeatureItem
              icon={ScanSearch}
              title="Deteksi Anomali"
              text="Membangun baseline penggunaan normal dan menandai pola yang berbeda signifikan sebagai peringatan dini."
            />
          </StaggerItem>
          <StaggerItem>
            <FeatureItem
              icon={Droplets}
              title="Untuk Listrik + Air"
              text="Contoh: aliran malam yang diharapkan 0 L/mnt, saat ini 4 L/mnt terus-menerus → potensi aliran air abnormal terdeteksi."
            />
          </StaggerItem>
          <StaggerItem>
            <FeatureItem
              icon={BarChart3}
              title="Prediksi Konsumsi"
              text="Menggunakan data historis untuk memproyeksikan konsumsi ke depan dengan perubahan yang disorot."
            />
          </StaggerItem>
        </Stagger>
      </Section>

      {/* TARGET MARKET */}
      <Section>
        <SectionHeader
          eyebrow="Dirancang untuk Fasilitas Anda"
          title="Konsumsi Sumber Daya yang Bermakna, Kebutuhan Nyata"
          description="SmartFlux AI dirancang untuk fasilitas di mana penggunaan listrik dan air penting dan di mana pemantauan terus-menerus memberi nilai tambah."
        />
        <Stagger className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {segments.map((s) => (
            <StaggerItem key={s.label}>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-5 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-light text-xl">
                  {s.icon}
                </span>
                <span className="font-display font-semibold text-navy">{s.label}</span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-8">
          <div className="relative overflow-hidden rounded-2xl border border-blue/20 bg-gradient-to-br from-blue-light to-white p-6">
            <span className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-blue/10 blur-2xl" />
            <h3 className="mb-3 font-display text-lg font-bold text-navy">Fokus Awal</h3>
            <p className="max-w-2xl text-sm leading-relaxed text-ink">
              SmartFlux AI memulai dengan hotel, kampus, dan gedung perkantoran di
              Surabaya dan Sidoarjo sebagai early adopter dan pilot project, lalu
              berekspansi ke Jawa Timur dan seluruh Jawa.
            </p>
          </div>
        </Reveal>
      </Section>

      {/* ROADMAP */}
      <Section variant="light">
        <SectionHeader
          eyebrow="Roadmap"
          title="Dibangun untuk Tumbuh Sesuai Kebutuhan Anda"
          description="SmartFlux AI berkembang dalam tahapan yang jelas, dari monitoring hingga optimasi."
        />
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {roadmapPhases.map((r) => (
            <StaggerItem key={r.title} className="h-full">
              <div className="relative flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                <p className="text-xs font-semibold uppercase tracking-wide text-blue">{r.phase}</p>
                <h3 className="mt-1 font-display text-lg font-bold text-navy">{r.title}</h3>
                <ul className="mt-3 flex-1 space-y-1.5">
                  {r.items.map((it) => (
                    <li key={it} className="flex items-start gap-2 text-sm text-slate">
                      <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-green" />
                      {it}
                    </li>
                  ))}
                </ul>
                <span
                  className={`mt-3 w-fit rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                    r.note === 'MVP' ? 'bg-green-light text-green' : 'bg-blue-light text-blue'
                  }`}
                >
                  {r.note}
                </span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-8 text-center" delay={0.1}>
          <Link
            to="/product#packages"
            className="inline-flex items-center gap-2 rounded-full border border-navy px-5 py-2.5 text-sm font-semibold text-navy transition-all hover:-translate-y-0.5 hover:bg-blue-light"
          >
            Bandingkan Paket Produk <ArrowRight size={16} />
          </Link>
        </Reveal>
      </Section>

      <PilotCTA />
      
      {/* TESTIMONIALS */}
      <Testimonials />

      {/* FAQ */}
      <FAQ />
    </>
  )
}

function FeatureItem({ icon: Icon, title, text }) {
  return (
    <Card className="h-full">
      <div className="flex gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-navy to-blue text-white">
          <Icon size={22} />
        </span>
        <div>
          <h3 className="mb-1.5 font-display text-lg font-bold text-navy">{title}</h3>
          <p className="text-sm leading-relaxed text-slate">{text}</p>
        </div>
      </div>
    </Card>
  )
}

function FloatingStat({ label, value, trend, positive, dot }) {
  return (
    <div className="min-w-[8.5rem]">
      <div className="flex items-center gap-1.5">
        <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
        <p className="text-[11px] font-medium tracking-wide text-slate">{label}</p>
      </div>
      <p className="mt-1 flex items-baseline gap-2">
        <span className="font-display text-lg font-bold text-navy">{value}</span>
        <span
          className={`text-[11px] font-semibold ${
            positive ? 'text-emerald' : 'text-rose'
          }`}
        >
          {trend}
        </span>
      </p>
    </div>
  )
}
