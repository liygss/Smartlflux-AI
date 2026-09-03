import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowRight, Zap } from 'lucide-react'

export default function PilotCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy-dark via-navy to-blue py-16 sm:py-20">
      <div className="bg-grid absolute inset-0 pointer-events-none opacity-60" />
      <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-green/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-blue-light/20 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-green-light"
        >
          <Zap size={14} />
          Siap Memulai?
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-display text-3xl font-extrabold text-white sm:text-4xl"
        >
          Mulai Monitoring Lebih Cerdas
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-blue-100 sm:text-lg"
        >
          Tertarik menguji SmartFlux AI di fasilitas Anda? Bicarakan dengan tim kami
          tentang implementasi pilot dan lihat bagaimana data konsumsi menjadi
          peringatan dini serta wawasan yang dapat ditindaklanjuti.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-green px-6 py-3.5 text-sm font-semibold text-white shadow-[var(--shadow-lift)] transition-all hover:-translate-y-0.5 hover:bg-green/90"
          >
            Ajukan Pilot <ArrowRight size={16} />
          </Link>
          <Link
            to="/product"
            className="rounded-full border border-white/40 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/10"
          >
            Jelajahi SmartFlux AI
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
