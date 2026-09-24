import React from 'react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1]

export default function PageHeader({ eyebrow, title, description, breadcrumb }) {
  return (
    <section className="relative overflow-hidden bg-deep">
      <div className="pointer-events-none absolute inset-0 bg-dots-dark opacity-60" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[46rem] -translate-x-1/2 rounded-full bg-electric/15 blur-[120px]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-glow-cyan/40 to-transparent" />

      <div className="relative mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 sm:py-24">
        {breadcrumb && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-panel/80 px-4 py-1.5 text-xs text-fx-secondary backdrop-blur"
          >
            <Link to="/" className="flex items-center gap-1 transition-colors hover:text-glow-cyan">
              <Home size={13} />
              Beranda
            </Link>
            <span className="opacity-40">/</span>
            <span className="text-fx-text">{breadcrumb}</span>
          </motion.div>
        )}

        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease }}
            className="mb-5 text-sm font-semibold uppercase tracking-[0.16em] text-glow-cyan"
          >
            {eyebrow}
          </motion.p>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="font-display text-3xl font-extrabold leading-tight text-fx-text sm:text-5xl"
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-fx-secondary sm:text-lg"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  )
}