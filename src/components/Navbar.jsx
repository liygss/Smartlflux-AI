import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Zap } from 'lucide-react'
import { motion } from 'motion/react'

const links = [
  { to: '/', label: 'Beranda' },
  { to: '/product', label: 'Produk' },
  { to: '/how-it-works', label: 'Cara Kerja' },
  { to: '/technology', label: 'Teknologi' },
  { to: '/about', label: 'Tentang' },
]

export function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-3">
      <img
        src="/logo.png"
        alt="SmartFlux AI"
        className="h-10 w-auto object-contain transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
      />
    </Link>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50 transition-all duration-300">
      {/* Ambient top glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-deep/80 to-transparent" />

      <nav className={`relative mx-auto max-w-7xl px-4 pt-3 transition-all duration-300 sm:px-6 sm:pt-4 ${scrolled ? 'pt-2 sm:pt-3' : ''}`}>
        <div className="flex h-14 items-center justify-between rounded-2xl border border-line bg-deep/75 px-5 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:px-6">
          <Logo />

          <div className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-white'
                      : 'text-fx-secondary hover:text-glow-cyan'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill-fx"
                        className="absolute inset-0 -z-10 rounded-full border border-line bg-card"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              to="/dashboard"
              className="rounded-full border border-line px-4 py-2 text-sm font-semibold text-fx-text transition-colors hover:border-glow-cyan/50 hover:text-glow-cyan"
            >
              Lihat Demo
            </Link>
            <Link
              to="/contact"
              className="btn-gradient-fx inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-semibold text-white"
            >
              <Zap size={15} />
              Ajukan Pilot
            </Link>
          </div>

          <button
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-line text-fx-text transition-colors hover:bg-card lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-7xl px-4 pt-2 sm:px-6 lg:hidden"
        >
          <div className="rounded-2xl border border-line bg-deep/95 p-4 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl">
            <div className="flex flex-col gap-1">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
                      isActive ? 'bg-card text-white' : 'text-fx-secondary hover:bg-card/70 hover:text-white'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-line pt-3">
              <Link
                to="/dashboard"
                onClick={() => setOpen(false)}
                className="rounded-xl border border-line px-4 py-3 text-center text-sm font-semibold text-fx-text"
              >
                Lihat Demo
              </Link>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="btn-gradient-fx rounded-xl px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Ajukan Pilot
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  )
}