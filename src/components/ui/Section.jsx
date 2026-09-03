import React from 'react'
import { Reveal } from './Reveal'

const variants = {
  default: '',
  mist: 'bg-mist',
  light: 'bg-gradient-to-b from-blue-light/70 to-white',
  navy: 'bg-gradient-to-br from-navy-dark via-navy to-navy text-white',
}

export function Section({ id, className = '', variant = 'default', children }) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden py-20 sm:py-28 ${variants[variant]} ${className}`}
    >
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">{children}</div>
    </section>
  )
}

export function SectionHeader({ eyebrow, title, description, light = false, align = 'center' }) {
  const alignClass =
    align === 'center'
      ? 'mx-auto text-center'
      : align === 'left'
        ? 'text-left'
        : 'ml-auto text-right'

  return (
    <Reveal className={`mb-12 max-w-3xl sm:mb-16 ${alignClass}`}>
      {eyebrow && (
        <span
          className={`mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] ${
            light
              ? 'border-white/25 bg-white/10 text-white'
              : 'border-blue/15 bg-blue-light/70 text-blue'
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              light ? 'bg-emerald' : 'bg-gradient-to-r from-blue to-indigo'
            } animate-pulse-soft`}
          />
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-display text-3xl font-extrabold leading-tight sm:text-4xl lg:text-[2.6rem] ${
          light ? 'text-white' : 'text-navy'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mx-auto mt-5 max-w-2xl text-base leading-relaxed sm:text-lg ${
            light ? 'text-blue-100' : 'text-slate'
          }`}
        >
          {description}
        </p>
      )}
    </Reveal>
  )
}

export function Card({ className = '', children, hover = true }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-gray-200/70 bg-white p-6 shadow-[var(--shadow-card)] transition-all duration-300 ${
        hover
          ? 'hover:-translate-y-1.5 hover:border-blue/20 hover:shadow-[var(--shadow-card-hover)]'
          : ''
      } ${className}`}
    >
      <span className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-blue via-indigo to-emerald opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-gradient-to-br from-blue-light/60 to-indigo-light/60 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
      {children}
    </div>
  )
}
