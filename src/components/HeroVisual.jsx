import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Activity, ScanSearch, BarChart3, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'motion/react'

const slides = [
  { src: '/dreamina-node.mp4', label: 'SmartFlux Node 01' },
  { src: '/dreamina-node2.mp4', label: 'SmartFlux Node 02' },
]

const featureCards = [
  {
    icon: Activity,
    title: 'Real-Time Monitoring',
    text: 'Pantau listrik dan air dalam satu dashboard.',
    pos: 'left-0 top-14 lg:-left-6',
  },
  {
    icon: ScanSearch,
    title: 'Early Warning',
    text: 'Deteksi pola penggunaan abnormal lebih awal.',
    pos: 'right-0 top-[38%] lg:-right-6',
  },
  {
    icon: BarChart3,
    title: 'Actionable Analytics',
    text: 'Ubah data konsumsi menjadi insight operasional.',
    pos: 'left-0 bottom-10 lg:-left-10',
  },
]

function FeatureCard({ icon: Icon, title, text, pos }) {
  return (
    <div className={`fx-card fx-card-hover p-4 ${pos}`}>
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-panel text-glow-cyan">
          <Icon size={18} />
        </span>
        <div className="max-w-[13rem]">
          <p className="text-sm font-semibold text-fx-text">{title}</p>
          <p className="mt-0.5 text-xs leading-relaxed text-fx-secondary">{text}</p>
        </div>
      </div>
    </div>
  )
}

export default function HeroVisual() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const videoRefs = useRef([])

  const step = useCallback((dir) => {
    setIndex((i) => (i + dir + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    if (paused) return undefined
    const timer = setInterval(() => step(1), 6000)
    return () => clearInterval(timer)
  }, [paused, step])

  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return
      if (i === index) video.play().catch(() => {})
      else video.pause()
    })
  }, [index])

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Radial glow + orbit rings behind showcase */}
      <div className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/10 blur-[110px]" />
      <div className="absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-glow-cyan/5 blur-[40px]" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 lg:h-[30rem] lg:w-[30rem]">
        <div className="animate-orbit absolute inset-0 rounded-full border border-line/80">
          <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-glow-cyan/80" />
          <span className="absolute right-4 bottom-6 h-1.5 w-1.5 rounded-full bg-electric/70" />
        </div>
        <div className="animate-orbit-reverse absolute inset-6 rounded-full border border-line/60 lg:inset-12 xl:inset-24">
          <span className="absolute right-1 top-4 h-1.5 w-1.5 rounded-full bg-glow-teal/70" />
        </div>
      </div>

      {/* Video showcase */}
      <div className="flex w-full items-center justify-center lg:min-h-[31rem]">
        <div className="w-full max-w-[600px]">
          <div className="animate-float-slow relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-line bg-panel shadow-[0_50px_120px_-40px_rgba(59,130,246,0.35)]">
              {slides.map((slide, i) => (
                <video
                  key={slide.src}
                  ref={(el) => {
                    videoRefs.current[i] = el
                  }}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${i === index ? 'z-10 opacity-100' : 'z-0 opacity-0'}`}
                  src={slide.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload={i === 0 ? 'auto' : 'metadata'}
                  aria-hidden="true"
                />
              ))}

              <div className="pointer-events-none absolute inset-0 z-20 rounded-[1.75rem] ring-1 ring-inset ring-white/10" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 rounded-b-[1.75rem] bg-gradient-to-t from-deep/80 to-transparent" />

              <span className="absolute left-4 top-4 z-30 inline-flex items-center gap-1.5 rounded-md border border-mint/25 bg-mint/10 px-2.5 py-1 text-[11px] font-bold text-mint">
                <Activity size={12} />
                {slides[index].label}
              </span>
            </div>
          </div>

          {/* Slide controls */}
          <div className="mt-3 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Slide sebelumnya"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-panel text-fx-secondary transition-colors hover:border-glow-cyan/50 hover:text-glow-cyan"
            >
              <ChevronLeft size={15} />
            </button>

            <div className="flex items-center gap-2">
              {slides.map((slide, i) => (
                <button
                  key={slide.src}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Ke slide ${i + 1}`}
                  aria-current={i === index}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? 'w-7 bg-glow-cyan' : 'w-1.5 bg-line hover:bg-fx-secondary/60'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Slide berikutnya"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-panel text-fx-secondary transition-colors hover:border-glow-cyan/50 hover:text-glow-cyan"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Floating feature cards (desktop) */}
      {featureCards.map((c, i) => (
        <motion.div
          key={c.title}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 + i * 0.2, ease: [0.22, 1, 0.36, 1] }}
          className={`absolute hidden w-[16rem] lg:block ${c.pos}`}
        >
          <FeatureCard {...c} pos="" />
        </motion.div>
      ))}

      {/* Mobile feature cards */}
      <div className="mt-4 grid gap-3 lg:hidden">
        {featureCards.map((c) => (
          <FeatureCard key={c.title} {...c} pos="" />
        ))}
      </div>
    </div>
  )
}