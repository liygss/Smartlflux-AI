import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, Globe, Share2, Zap } from 'lucide-react'

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
      { to: '/dashboard', label: 'Dashboard' },
      { to: '/about#strategy', label: 'Strategi' },
    ],
  },
  {
    title: 'Perusahaan',
    links: [
      { to: '/about', label: 'Tentang' },
      { to: '/about#strategy', label: 'Strategi' },
      { to: '/contact', label: 'Kontak' },
      { to: '/contact', label: 'Ajukan Pilot' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="relative bg-navy text-blue-100">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue via-green to-blue" />
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue to-green text-white shadow-lg">
                <Zap size={20} fill="currentColor" />
              </span>
              <span className="font-display text-xl font-extrabold text-white">
                Smart<span className="text-blue-light">Flux</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-blue-200/80">
              Platform pemantauan sumber daya cerdas yang mengubah data konsumsi
              listrik dan air menjadi peringatan dini dan wawasan yang dapat
              ditindaklanjuti.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-blue-100 transition-all hover:-translate-y-0.5 hover:bg-white/20"
              >
                <Share2 size={18} />
              </a>
              <a
                href="#"
                aria-label="Sosial"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-blue-100 transition-all hover:-translate-y-0.5 hover:bg-white/20"
              >
                <Globe size={18} />
              </a>
              <a
                href="mailto:hello@smartflux.ai"
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-blue-100 transition-all hover:-translate-y-0.5 hover:bg-white/20"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-sm text-blue-200/80 transition-colors hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-blue-200/60 sm:flex-row">
          <p>© {new Date().getFullYear()} SmartFlux. Seluruh hak cipta dilindungi.</p>
          <p>SmartFlux adalah perusahaan · SmartFlux AI adalah produknya.</p>
        </div>
      </div>
    </footer>
  )
}
