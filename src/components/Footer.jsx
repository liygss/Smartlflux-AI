import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, Zap } from 'lucide-react'

const columns = [
  {
    title: 'Produk',
    links: [
      { to: '/product', label: 'SmartFlux AI' },
      { to: '/product#features', label: 'Fitur' },
      { to: '/product#packages', label: 'Paket' },
      { to: '/dashboard', label: 'Dashboard' },
    ],
  },
  {
    title: 'Pelajari',
    links: [
      { to: '/how-it-works', label: 'Cara Kerja' },
      { to: '/technology', label: 'Teknologi' },
      { to: '/about#strategy', label: 'Strategi' },
    ],
  },
  {
    title: 'Perusahaan',
    links: [
      { to: '/about', label: 'Tentang' },
      { to: '/contact', label: 'Kontak' },
      { to: '/contact', label: 'Ajukan Pilot' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-deep text-fx-secondary">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-glow-cyan/50 to-transparent" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-electric/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <span className="btn-gradient-fx flex h-10 w-10 items-center justify-center rounded-xl text-white">
                <Zap size={20} fill="currentColor" />
              </span>
              <span className="font-display text-xl font-extrabold text-fx-text">
                Smart<span className="text-glow-cyan">Flux</span> AI
              </span>
            </div>
            <p className="text-sm leading-relaxed opacity-80">
              Platform pemantauan sumber daya cerdas yang mengubah data konsumsi
              listrik dan air menjadi peringatan dini dan wawasan yang dapat
              ditindaklanjuti.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="mailto:hello@smartflux.ai"
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-line text-fx-secondary transition-all hover:-translate-y-0.5 hover:border-glow-cyan/50 hover:text-glow-cyan"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-fx-text">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-sm opacity-80 transition-colors hover:text-glow-cyan"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line/70 pt-6 text-xs opacity-70 sm:flex-row">
          <p>© 2026 Fluxera Technologies. SmartFlux AI.</p>
          <p>Smart energy monitoring untuk listrik &amp; air.</p>
        </div>
      </div>
    </footer>
  )
}