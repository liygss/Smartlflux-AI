import React, { useState } from 'react'
import DashboardShell from '../components/dashboard/DashboardShell'
import OverviewSection from '../components/dashboard/sections/OverviewSection'
import ElectricitySection from '../components/dashboard/sections/ElectricitySection'
import WaterSection from '../components/dashboard/sections/WaterSection'
import AlertsSection from '../components/dashboard/sections/AlertsSection'
import AnalyticsSection from '../components/dashboard/sections/AnalyticsSection'
import ReportsSection from '../components/dashboard/sections/ReportsSection'
import DevicesSection from '../components/dashboard/sections/DevicesSection'
import SettingsSection from '../components/dashboard/sections/SettingsSection'

export default function Dashboard() {
  const [active, setActive] = useState('overview')
  const [role, setRole] = useState('admin')

  const roleSections = {
    admin: ['overview', 'electricity', 'water', 'alerts', 'analytics', 'reports', 'devices', 'settings'],
    user: ['overview', 'electricity', 'water', 'alerts', 'analytics', 'reports'],
  }

  const sections = {
    overview: (p) => <OverviewSection {...p} />,
    electricity: (p) => <ElectricitySection {...p} />,
    water: (p) => <WaterSection {...p} />,
    alerts: (p) => <AlertsSection {...p} />,
    analytics: (p) => <AnalyticsSection {...p} />,
    reports: (p) => <ReportsSection {...p} />,
    devices: (p) => <DevicesSection {...p} />,
    settings: (p) => <SettingsSection {...p} />,
  }

  const changeRole = (next) => {
    setRole(next)
    if (!roleSections[next].includes(active)) setActive('overview')
  }

  const Active = sections[active]
  return (
    <DashboardShell active={active} onNavigate={setActive} role={role} onRoleChange={changeRole}>
      <Active key={active} active={active} onNavigate={setActive} role={role} />
    </DashboardShell>
  )
}
