import React, { useState } from 'react'
import {
  LayoutDashboard,
  Zap,
  Droplets,
  BellRing,
  BarChart3,
  FileText,
  Server,
  Settings,
  Search,
  LogOut,
  Menu,
  ChevronLeft,
} from 'lucide-react'

const navItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'electricity', label: 'Electricity', icon: Zap },
  { id: 'water', label: 'Water', icon: Droplets },
  { id: 'alerts', label: 'Alerts', icon: BellRing },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'devices', label: 'Devices', icon: Server },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export default function DashboardShell({ active, onNavigate, children }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-mist font-sans text-ink">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex flex-col bg-navy text-white transition-all duration-300 lg:sticky lg:top-0 lg:h-screen ${
          collapsed ? 'lg:w-20' : 'lg:w-60'
        } w-64 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        {/* Logo */}
        <div className={`flex items-center gap-3 px-5 py-5 ${collapsed ? 'lg:justify-center lg:px-2' : ''}`}>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue to-blue-soft text-white shadow-lg">
            <Zap size={18} />
          </span>
          {!collapsed && (
            <div className="leading-tight">
              <p className="font-display text-sm font-bold">SmartFlux AI</p>
              <p className="text-[10px] text-white/50">Resource Monitoring</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="mt-2 flex-1 space-y-1 overflow-y-auto px-3">
          {navItems.map((item) => {
            const activeItem = item.id === active
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id)
                  setMobileOpen(false)
                }}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  activeItem
                    ? 'bg-white/15 text-white'
                    : 'text-white/65 hover:bg-white/10 hover:text-white'
                } ${collapsed ? 'lg:justify-center lg:px-0' : ''}`}
                title={item.label}
              >
                <item.icon size={18} className="shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </button>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-white/10 p-3">
          <button
            onClick={() => {}}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/65 hover:bg-white/10 hover:text-white ${
              collapsed ? 'lg:justify-center lg:px-0' : ''
            }`}
          >
            <LogOut size={18} className="shrink-0" />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>

        {/* Collapse toggle (desktop) */}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="absolute -right-3 top-1/2 hidden h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white text-slate shadow-md transition-transform hover:text-navy lg:flex"
          aria-label="Toggle sidebar"
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
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-gray-200 bg-white px-4 py-3 sm:px-6">
          <button
            onClick={() => setMobileOpen(true)}
            className="rounded-lg border border-gray-200 p-2 text-slate lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>

          <div className="hidden items-center gap-2 text-sm text-slate md:flex">
            <span className="font-medium text-ink">SmartFlux AI</span>
            <span className="text-gray-300">/</span>
            <span className="font-semibold text-navy capitalize">{active}</span>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <div className="relative hidden sm:block">
              <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate" />
              <input
                type="text"
                placeholder="Search..."
                className="w-48 rounded-lg border border-gray-200 bg-mist py-2 pl-9 pr-3 text-sm text-ink placeholder:text-slate focus:border-blue focus:outline-none"
              />
            </div>

            <button className="relative rounded-lg border border-gray-200 p-2 text-slate hover:bg-mist">
              <BellRing size={17} />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-critical text-[9px] font-bold text-white">
                3
              </span>
            </button>

            <div className="flex items-center gap-2 rounded-lg border border-gray-200 py-1.5 pl-1.5 pr-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-navy to-blue text-xs font-bold text-white">
                AD
              </span>
              <div className="hidden leading-tight sm:block">
                <p className="text-xs font-semibold text-ink">Admin</p>
                <p className="text-[10px] text-slate">Facility</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  )
}
