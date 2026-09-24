import React from 'react'
import { Reveal } from './Reveal'

const variants = {
  default: '',
  mist: 'bg-mist',
  light: 'bg-blue-light/30',
  navy: 'bg-navy-deep text-white',
  dark: 'bg-deep',
}

export function Section({ id, className = '', variant = 'default', children }) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden py-16 sm:py-24 lg:py-28 ${variants[variant]} ${className}`}
    >
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">{children}</div>
    </section>
  )
}

export function SectionHeader({ eyebrow, title, description, light = false, dark = false, align = 'center' }) {
  const alignClass =
    align === 'center'
      ? 'mx-auto text-center'
      : align === 'left'
        ? 'text-left'
        : 'ml-auto text-right'

  const headingColor = dark ? 'text-fx-text' : light ? 'text-white' : 'text-navy'
  const bodyColor = dark ? 'text-fx-secondary' : light ? 'text-blue-100' : 'text-slate'
  const chipCls = dark
    ? 'border-line bg-panel text-glow-cyan'
    : light
      ? 'border-white/20 bg-white/10 text-white'
      : 'border-blue/15 bg-blue-light text-blue'

  return (
    <Reveal className={`mb-12 max-w-3xl sm:mb-16 ${alignClass}`}>
      {eyebrow && (
        <span
          className={`mb-5 inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-bold ${chipCls}`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-display text-3xl font-extrabold leading-tight sm:text-4xl lg:text-[2.6rem] ${headingColor}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mx-auto mt-5 max-w-2xl text-base leading-relaxed sm:text-lg ${bodyColor}`}
        >
          {description}
        </p>
      )}
    </Reveal>
  )
}

export function Card({ className = '', children, hover = true, dark = false }) {
  const base = dark
    ? 'border-line bg-card text-fx-text'
    : 'border-gray-200/70 bg-white text-ink'
  return (
    <div
      className={`group relative overflow-hidden rounded-xl border shadow-[var(--shadow-card)] transition-all duration-300 ${base} ${
        hover
          ? dark
            ? 'hover:-translate-y-1 hover:border-glow-cyan/40 hover:shadow-[0_18px_40px_-18px_rgba(0,0,0,0.7)]'
            : 'hover:-translate-y-1 hover:border-blue/20 hover:shadow-[var(--shadow-card-hover)]'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}