import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  LayoutDashboard,
  Zap,
  Droplets,
  BellRing,
  BarChart3,
  FileText,
  Server,
  Settings,
  LogOut,
  Menu,
  ChevronLeft,
  CloudCheck,
} from 'lucide-react'

const navItems = [
  { id: 'overview', label: 'Ringkasan', icon: LayoutDashboard },
  { id: 'electricity', label: 'Listrik', icon: Zap },
  { id: 'water', label: 'Air', icon: Droplets },
  { id: 'alerts', label: 'Peringatan', icon: BellRing },
  { id: 'analytics', label: 'Analitik', icon: BarChart3 },
  { id: 'reports', label: 'Laporan', icon: FileText },
  { id: 'devices', label: 'Perangkat', icon: Server },
  { id: 'settings', label: 'Pengaturan', icon: Settings },
]

const roleSections = {
  admin: ['overview', 'electricity', 'water', 'alerts', 'analytics', 'reports', 'devices', 'settings'],
  user: ['overview', 'electricity', 'water', 'alerts', 'analytics', 'reports'],
}

const roleMeta = {
  admin: { initials: 'AD', name: 'Admin', subtitle: 'Fasilitas' },
  user: { initials: 'US', name: 'User', subtitle: 'Operator' },
}

function LiveStamp() {
  const [secs, setSecs] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setSecs((s) => s + 1), 4000)
    return () => clearInterval(id)
  }, [])

  const shown = secs === 0 ? 'baru saja' : `${secs * 4} detik lalu`
  return (
    <span className="hidden items-center gap-1.5 rounded-lg border border-mint/25 bg-mint/10 px-2.5 py-1.5 text-[11px] font-medium text-mint lg:inline-flex">
      <CloudCheck size={13} />
      Terakhir diperbarui · {shown}
    </span>
  )
}

function RoleSwitcher({ role, onChange, variant = 'light' }) {
  const options = [
    { id: 'admin', label: 'Admin' },
    { id: 'user', label: 'User' },
  ]
  const isDark = variant === 'dark'
  return (
    <div
      className={`inline-flex items-center rounded-lg border p-1 ${
        isDark ? 'border-white/15 bg-white/10' : 'border-line bg-white/5'
      }`}
    >
      {options.map((o) => (
        <button
          key={o.id}
          onClick={() => onChange(o.id)}
          aria-pressed={role === o.id}
          className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
            role === o.id
              ? 'bg-electric text-white shadow-sm'
              : isDark
                ? 'text-white/70 hover:text-white'
                : 'text-fx-secondary hover:text-white'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

export default function DashboardShell({ active, onNavigate, role = 'admin', onRoleChange, children }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const visibleNav = navItems.filter((item) => roleSections[role]?.includes(item.id))
  const profile = roleMeta[role] || roleMeta.admin

  return (
    <div className="relative flex min-h-screen bg-deep font-sans text-fx-text">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex flex-col bg-navy-deep text-white shadow-[var(--shadow-lift)] transition-all duration-300 lg:sticky lg:top-0 lg:h-screen ${
          collapsed ? 'lg:w-20' : 'lg:w-60'
        } w-72 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-blue-bright via-azure to-azure/50" />

        {/* Logo + brand */}
        <div className={`relative flex items-center gap-3 px-5 py-5 ${collapsed ? 'lg:justify-center lg:px-2' : ''}`}>
          <img
            src="/logo.png"
            alt="SmartFlux AI"
            className={`shrink-0 rounded-xl object-cover ${collapsed ? 'h-10 w-10' : 'h-11 w-11'}`}
          />
          {!collapsed && (
            <div className="leading-tight">
              <p className="font-display text-[15px] font-bold tracking-tight">SmartFlux AI</p>
              <p className="text-[10px] font-medium text-white/45">Monitoring Energi & Air</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="relative mt-2 flex-1 space-y-1 overflow-y-auto px-3">
          <p className={`mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40 ${collapsed ? 'lg:text-center' : ''}`}>
            {collapsed ? '•••' : 'Menu'}
          </p>
          {visibleNav.map((item) => {
            const activeItem = item.id === active
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id)
                  setMobileOpen(false)
                }}
                className={`relative flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors duration-200 ${
                  activeItem
                    ? 'bg-white/10 text-white'
                    : 'text-white/55 hover:bg-white/[0.06] hover:text-white'
                } ${collapsed ? 'lg:justify-center lg:px-0' : ''}`}
                title={item.label}
                aria-current={activeItem ? 'page' : undefined}
              >
                {activeItem && (
                  <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-blue-bright" />
                )}
                <item.icon size={18} className="shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </button>
            )
          })}
        </nav>

        {/* Role switcher (mobile drawer + tablet) */}
        <div className="relative border-t border-white/10 p-4 lg:hidden">
          <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">
            Mode Tampilan
          </p>
          <div className="px-1">
            <RoleSwitcher variant="dark" role={role} onChange={onRoleChange} />
          </div>
        </div>

        {/* Footer */}
        <div className="relative border-t border-white/10 p-3">
          <Link
            to="/"
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-white/55 transition-colors hover:bg-white/[0.06] hover:text-white ${
              collapsed ? 'lg:justify-center lg:px-0' : ''
            }`}
            title="Kembali ke situs"
          >
            <LogOut size={18} className="shrink-0" />
            {!collapsed && <span>Keluar (Demo)</span>}
          </Link>
        </div>

        {/* Collapse toggle (desktop) */}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="absolute -right-3 top-1/2 hidden h-7 w-7 items-center justify-center rounded-full border border-line bg-card text-fx-secondary shadow-md transition-transform hover:text-white lg:flex"
          aria-label={collapsed ? 'Perluas sidebar' : 'Ciutkan sidebar'}
        >
          <ChevronLeft size={14} className={`transition-transform ${collapsed ? 'rotate-180' : ''}`} />
        </button>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main */}
      <div className="relative flex min-w-0 flex-1 flex-col">
        {/* Sticky top: topbar + mobile section nav */}
        <div className="sticky top-0 z-20">
          {/* Topbar */}
          <header className="flex items-center gap-3 border-b border-line bg-panel/90 px-3 py-2.5 backdrop-blur-lg sm:px-6 sm:py-3">
            <span className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-azure/60" />
            <button
              onClick={() => setMobileOpen(true)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-line text-fx-secondary transition-colors hover:bg-white/5 lg:hidden"
              aria-label="Buka menu"
            >
              <Menu size={18} />
              <span className="sr-only">Buka menu</span>
            </button>

            <span className="min-w-0 truncate text-sm font-semibold text-fx-text md:hidden">{navItems.find((n) => n.id === active)?.label ?? 'Ringkasan'}</span>

            <div className="hidden items-center gap-2 text-sm text-fx-secondary md:flex">
              <span className="font-medium text-fx-text">SmartFlux AI</span>
              <span className="text-fx-muted">/</span>
              <span className="font-semibold text-electric">{navItems.find((n) => n.id === active)?.label ?? active}</span>
            </div>

            <div className="ml-auto flex items-center gap-3">
              <LiveStamp />
              <div className="hidden md:block">
                <RoleSwitcher variant="dark" role={role} onChange={onRoleChange} />
              </div>
              <span className="demo-chip">Mode Demo</span>

              <button
                onClick={() => {
                  onNavigate('alerts')
                  setMobileOpen(false)
                }}
                className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-line text-fx-secondary transition-colors hover:bg-white/5"
                aria-label="Lihat peringatan"
              >
                <BellRing size={17} />
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-fx-critical text-[9px] font-bold text-white">
                  3
                </span>
              </button>

              <div className="flex h-11 shrink-0 items-center gap-2 rounded-lg border border-line py-2 pl-1.5 pr-3 sm:pr-3.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white/10 text-[11px] font-bold text-fx-text">
                  {profile.initials}
                </span>
                <div className="hidden leading-tight sm:block">
                  <p className="text-xs font-semibold text-fx-text">{profile.name}</p>
                  <p className="text-[10px] text-fx-secondary">{profile.subtitle}</p>
                </div>
              </div>

            </div>
          </header>

          {/* Mobile section nav */}
          <nav
            className="flex gap-2 overflow-x-auto border-b border-line bg-panel px-3 py-2.5 lg:hidden"
            aria-label="Navigasi seksi"
          >
            {visibleNav.map((item) => {
              const activeItem = item.id === active
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id)
                    setMobileOpen(false)
                  }}
                  className={`flex min-h-11 shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition-colors ${
                    activeItem
                      ? 'bg-electric text-white shadow-[0_6px_16px_rgba(59,130,246,0.35)]'
                      : 'bg-white/5 text-fx-secondary hover:bg-white/10 hover:text-white'
                  }`}
                  aria-pressed={activeItem}
                >
                  <item.icon size={15} />
                  {item.label}
                </button>
              )
            })}
          </nav>
        </div>
        {/* Content */}
        <main className="relative flex-1 p-4 sm:p-6 lg:p-7">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-electric/15 via-electric/[0.06] to-transparent lg:h-56"
          />
          <div className="relative mx-auto w-full max-w-[1600px]">{children}</div>
        </main>
      </div>
    </div>
  )
}