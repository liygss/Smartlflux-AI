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

const sections = {
  overview: <OverviewSection />,
  electricity: <ElectricitySection />,
  water: <WaterSection />,
  alerts: <AlertsSection />,
  analytics: <AnalyticsSection />,
  reports: <ReportsSection />,
  devices: <DevicesSection />,
  settings: <SettingsSection />,
}

export default function Dashboard() {
  const [active, setActive] = useState('overview')
  return (
    <DashboardShell active={active} onNavigate={setActive}>
      {sections[active]}
    </DashboardShell>
  )
}
