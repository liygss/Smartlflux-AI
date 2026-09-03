import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Zap, Droplets, Sparkles, Activity, ScanSearch } from 'lucide-react'
import { Section, SectionHeader } from './ui/Section'
import { Reveal } from './ui/Reveal'

export default function ProductShowcase() {
  const features = [
    {
      icon: Zap,
      title: "Listrik Real-Time",
      text: "Tegangan, arus, daya, dan energi yang diperbarui terus-menerus.",
      accent: "from-blue to-blue-soft",
      textColor: "text-blue",
    },
    {
      icon: Droplets,
      title: "Air Real-Time",
      text: "Laju aliran dan volume air di titik penggunaan.",
      accent: "from-cyan to-teal",
      textColor: "text-teal",
    },
    {
      icon: ScanSearch,
      title: "Deteksi Anomali",
      text: "Alert otomatis untuk pola konsumsi abnormal.",
      accent: "from-violet to-indigo",
      textColor: "text-violet",
    },
    {
      icon: Activity,
      title: "Prediksi AI",
      text: "Forecasting dan analisis trend konsumsi.",
      accent: "from-indigo to-violet",
      textColor: "text-indigo",
    },
  ]

  return (
    <Section className="relative overflow-hidden bg-gradient-to-b from-blue-light/30 via-white to-white">
      {/* Background decorations */}
      <div className="pointer-events-none absolute left-1/2 top-[-10rem] h-[50rem] w-[40rem] -translate-x-1/2 rounded-full bg-blue/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-[-6rem] h-96 w-96 rounded-full bg-indigo-light/50 blur-3xl" />
      <div className="pointer-events-none absolute bottom-20 left-[-6rem] h-80 w-80 rounded-full bg-teal-light/50 blur-3xl" />

      <SectionHeader
        eyebrow="Produk Kami"
        title="SmartFlux AI — Monitoring Lebih Cerdas"
        description="Perangkat SmartFlux Node mengintegrasikan sensor listrik dan air dalam satu platform IoT yang powerful dengan kemampuan Edge AI untuk deteksi anomaly real-time."
      />

      <Reveal>
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left: Product Image */}
            <div className="relative">
              <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-blue/15 via-indigo/10 to-teal/15 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-gradient-to-br from-navy-deep via-navy to-blue p-3 shadow-[var(--shadow-lift)]">
                {/* Live badge */}
                <div className="absolute right-5 top-5 z-10 inline-flex items-center gap-2 rounded-full bg-emerald px-4 py-2 text-sm font-bold text-white shadow-lg">
                  <span className="h-2 w-2 animate-pulse-soft rounded-full bg-white" />
                  Live Monitoring
                </div>

                {/* Product Image */}
                <div className="relative overflow-hidden rounded-[1.4rem] bg-white/95">
                  <img
                    src="/desain produk.jpeg"
                    alt="SmartFlux AI Device"
                    className="mx-auto w-full object-contain"
                  />
                  {/* Sheen on hover */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
                </div>

                {/* Feature chips overlaid */}
                <div className="absolute bottom-5 left-5 hidden items-center gap-3 md:flex">
                  <span className="rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-semibold text-white backdrop-blur-md">
                    <span className="block text-[10px] font-medium text-white/60">Teknologi</span>
                    IoT + Edge AI
                  </span>
                  <span className="rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-semibold text-white backdrop-blur-md">
                    <span className="block text-[10px] font-medium text-white/60">Deployment</span>
                    Plug & Play
                  </span>
                </div>
              </div>

              {/* Stats overlay on mobile */}
              <div className="mt-4 grid grid-cols-2 gap-3 lg:hidden">
                <StatBadge value="99.9%" label="Uptime" />
                <StatBadge value="< 2s" label="Latency" />
              </div>
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
                    accent={feature.accent}
                    textColor={feature.textColor}
                  />
                ))}
              </div>

              {/* CTAs */}
              <div className="mt-4 flex flex-wrap gap-3 pt-4">
                <Link
                  to="/product"
                  className="btn-lift inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-navy to-blue px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-blue-glow)]"
                >
                  Jelajahi Produk <ArrowRight size={16} />
                </Link>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-navy/20 bg-white px-6 py-3 text-sm font-semibold text-navy shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-0.5 hover:border-blue/40 hover:shadow-[var(--shadow-card-hover)]"
                >
                  Demo Dashboard
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="mt-4 flex items-center gap-5 text-xs text-slate">
                <div className="flex items-center gap-1.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-light text-blue">
                    <Sparkles size={12} />
                  </span>
                  Plug & Play
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-light text-teal">
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
function FeatureItem({ icon: Icon, title, text, accent, textColor }) {
  return (
    <div className="group relative flex items-start gap-4 overflow-hidden rounded-2xl border border-gray-200/70 bg-white p-5 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-x-1 hover:border-blue/20 hover:shadow-[var(--shadow-card-hover)]">
      <span
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${accent} text-white transition-transform duration-300 group-hover:scale-110`}
      >
        <Icon size={24} />
      </span>
      <div className="flex-1">
        <p className={`font-display text-base font-bold transition-colors group-hover:${textColor}`}>{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-slate">{text}</p>
      </div>
      <ArrowRight size={18} className={`mt-1 opacity-0 transition-opacity group-hover:opacity-100 ${textColor}`} />
    </div>
  )
}

function StatBadge({ value, label }) {
  return (
    <div className="rounded-xl border border-gray-200/70 bg-white p-4 shadow-[var(--shadow-card)]">
      <p className="text-2xl font-bold text-navy">{value}</p>
      <p className="text-xs font-medium text-slate">{label}</p>
    </div>
  )
}
