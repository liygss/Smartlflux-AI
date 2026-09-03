import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion } from 'motion/react'

const links = [
  { to: '/', label: 'Beranda' },
  { to: '/product', label: 'Produk' },
  { to: '/how-it-works', label: 'Cara Kerja' },
  { to: '/technology', label: 'Teknologi' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/about', label: 'Tentang' },
]

export function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-3">
      {/* Full logo image with refined hover animation */}
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
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-white/40 bg-white/80 shadow-[var(--shadow-nav)] backdrop-blur-xl'
          : 'border-b border-transparent bg-white/0'
      }`}
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between px-5 transition-all duration-500 sm:px-8 ${
          scrolled ? 'h-16' : 'h-20'
        }`}
      >
        <Logo />

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `relative rounded-full px-3.5 py-2 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'text-navy'
                    : 'text-slate hover:bg-blue-light/60 hover:text-navy'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full border border-blue/10 bg-gradient-to-r from-blue-light via-blue-light/80 to-indigo-light"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <Link
            to="/dashboard"
            className="rounded-full px-4 py-2 text-sm font-semibold text-navy transition-colors hover:text-blue"
          >
            Lihat Demo
          </Link>
          <Link
            to="/contact"
            className="btn-lift rounded-full bg-gradient-to-r from-navy via-navy to-blue px-5 py-2.5 text-sm font-semibold text-white shadow-[var(--shadow-blue-glow)]"
          >
            Ajukan Pilot
          </Link>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-xl text-navy transition-all hover:bg-blue-light/70 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Buka menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="border-t border-white/40 bg-white/90 px-5 py-4 shadow-[var(--shadow-nav)] backdrop-blur-xl lg:hidden"
        >
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive ? 'bg-blue-light/70 text-navy' : 'text-slate hover:bg-mist'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-gradient-to-r from-navy to-blue px-4 py-2.5 text-center text-sm font-semibold text-white"
            >
              Ajukan Pilot
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  )
}
