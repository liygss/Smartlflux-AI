import React from 'react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1]

export default function PageHeader({ eyebrow, title, description, breadcrumb }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy-dark via-navy to-blue">
      <div className="bg-grid absolute inset-0 pointer-events-none" />
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-green/25 blur-3xl" />
      <div className="pointer-events-none absolute right-1/4 top-0 h-64 w-64 rounded-full bg-indigo/20 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 sm:py-24">
        {breadcrumb && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs text-blue-100 backdrop-blur"
          >
            <Link to="/" className="flex items-center gap-1 transition-colors hover:text-white">
              <Home size={13} />
              Beranda
            </Link>
            <span className="text-blue-200/50">/</span>
            <span className="text-white">{breadcrumb}</span>
          </motion.div>
        )}

        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease }}
            className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-light"
          >
            {eyebrow}
          </motion.p>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="font-display text-3xl font-extrabold leading-tight text-white sm:text-5xl"
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-blue-100 sm:text-lg"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  )
}
