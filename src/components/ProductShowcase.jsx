import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Zap, Droplets, Activity, ScanSearch, Cable } from 'lucide-react'
import { Section, SectionHeader } from './ui/Section'
import { Reveal } from './ui/Reveal'

export default function ProductShowcase() {
  const features = [
    {
      icon: Zap,
      title: "Listrik Real-Time",
      text: "Tegangan, arus, daya, dan energi yang diperbarui terus-menerus.",
      textColor: "text-blue",
    },
    {
      icon: Droplets,
      title: "Air Real-Time",
      text: "Laju aliran dan volume air di titik penggunaan.",
      textColor: "text-teal",
    },
    {
      icon: ScanSearch,
      title: "Deteksi Anomali",
      text: "Alert otomatis untuk pola konsumsi abnormal.",
      textColor: "text-blue",
    },
    {
      icon: Activity,
      title: "Prediksi AI",
      text: "Forecasting dan analisis trend konsumsi.",
      textColor: "text-blue",
    },
  ]

  return (
    <Section className="relative overflow-hidden bg-mist">
      <SectionHeader
        eyebrow="Produk Kami"
        title="SmartFlux AI: Monitoring Lebih Cerdas"
        description="Perangkat SmartFlux Node mengintegrasikan sensor listrik dan air dalam satu platform IoT yang powerful dengan kemampuan Edge AI untuk deteksi anomaly real-time."
      />

      <Reveal>
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left: Product Image */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-xl border border-slate-200/80 bg-navy-deep p-3 shadow-[var(--shadow-lift)]">
                {/* Live badge */}
                <div className="absolute right-5 top-5 z-10 inline-flex items-center gap-2 rounded-md bg-emerald px-3 py-1.5 text-xs font-bold text-white shadow">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  Live Monitoring
                </div>

                {/* Product Image */}
                <div className="relative overflow-hidden rounded-lg bg-white/95">
                  <img
                    src="/desain produk.jpeg"
                    alt="SmartFlux AI Device"
                    className="mx-auto w-full object-contain"
                  />
                </div>

                {/* Feature chips overlaid */}
                <div className="absolute bottom-5 left-5 hidden items-center gap-3 md:flex">
                  <span className="rounded-lg border border-white/15 bg-white/10 px-4 py-2.5 text-xs font-semibold text-white backdrop-blur-md">
                    <span className="block text-[10px] font-medium text-white/60">Teknologi</span>
                    IoT + Edge AI
                  </span>
                  <span className="rounded-lg border border-white/15 bg-white/10 px-4 py-2.5 text-xs font-semibold text-white backdrop-blur-md">
                    <span className="block text-[10px] font-medium text-white/60">Deployment</span>
                    Plug &amp; Play
                  </span>
                </div>
              </div>

              {/* Stats overlay on mobile */}
              <div className="mt-4 grid grid-cols-2 gap-3 lg:hidden">
                <StatBadge value="99.9%" label="Uptime" />
                <StatBadge value="< 2s" label="Latency" />
              </div>

              <p className="mt-4 text-xs text-slate lg:mt-6">
                <span className="demo-chip">Data demo</span>
                <span className="ml-2">Uptime, latency, dan testimoni adalah ilustrasi prototipe.</span>
              </p>
            </div>

            {/* Right: Feature Highlights */}
            <div className="flex flex-col gap-6">
              <div className="space-y-4">
                {features.map((feature) => (
                  <FeatureItem
                    key={feature.title}
                    icon={feature.icon}
                    title={feature.title}
                    text={feature.text}
                    textColor={feature.textColor}
                  />
                ))}
              </div>

              {/* CTAs */}
              <div className="mt-4 flex flex-wrap gap-3 pt-4">
                <Link
                  to="/product"
                  className="btn-lift inline-flex items-center justify-center gap-2 rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-card)]"
                >
                  Jelajahi Produk <ArrowRight size={16} />
                </Link>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-navy/20 bg-white px-6 py-3 text-sm font-semibold text-navy shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-0.5 hover:border-blue/40 hover:shadow-[var(--shadow-card-hover)]"
                >
                  Demo Dashboard
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="mt-4 flex items-center gap-5 text-xs text-slate">
                <div className="flex items-center gap-1.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-light text-blue">
                    <Cable size={12} />
                  </span>
                  Plug &amp; Play
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-light text-blue">
                    <Zap size={12} />
                  </span>
                  No Configuration
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

// Sub-components
function FeatureItem({ icon: Icon, title, text, textColor }) {
  return (
    <div className="group relative flex items-start gap-4 overflow-hidden rounded-xl border border-gray-200/70 bg-white p-5 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-x-1 hover:border-blue/20 hover:shadow-[var(--shadow-card-hover)]">
      <span
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-light text-blue transition-transform duration-300 group-hover:scale-110"
      >
        <Icon size={24} />
      </span>
      <div className="flex-1">
        <p className="font-display text-base font-bold text-navy">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-slate">{text}</p>
      </div>
      <ArrowRight size={18} className={`mt-1 opacity-0 transition-opacity group-hover:opacity-100 ${textColor}`} />
    </div>
  )
}

function StatBadge({ value, label }) {
  return (
    <div className="rounded-xl border border-gray-200/70 bg-white p-4 shadow-[var(--shadow-card)]">
      <p className="tabular-nums font-display text-2xl font-bold text-navy">{value}</p>
      <p className="text-xs font-medium text-slate">{label}</p>
    </div>
  )
}
