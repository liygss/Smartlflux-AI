import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowRight, Zap } from 'lucide-react'

export default function PilotCTA() {
  return (
    <section className="relative overflow-hidden bg-deep py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-dots-dark opacity-50" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/15 blur-[140px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-glow-cyan/20 blur-[60px]" />

      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-5 inline-flex items-center gap-2 rounded-lg border border-line bg-panel/80 px-3.5 py-1.5 text-xs font-bold text-glow-cyan"
        >
          <Zap size={14} />
          Siap Memulai
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-display text-3xl font-extrabold text-fx-text sm:text-4xl"
        >
          Ready to Monitor <span className="text-gradient-energy">Smarter</span>?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-fx-secondary sm:text-lg"
        >
          Mulai pilot SmartFlux AI dan lihat penggunaan listrik dan air dalam satu sistem.
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
            className="btn-gradient-fx inline-flex items-center gap-2 rounded-lg px-6 py-3.5 text-sm font-semibold text-white"
          >
            Request Pilot <ArrowRight size={16} />
          </Link>
          <Link
            to="/dashboard"
            className="rounded-lg border border-line px-6 py-3.5 text-sm font-semibold text-fx-text transition-colors hover:border-glow-cyan/50 hover:text-glow-cyan"
          >
            View Dashboard Demo
          </Link>
        </motion.div>
      </div>
    </section>
  )
}