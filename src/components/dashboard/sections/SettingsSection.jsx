import React, { useState } from 'react'
import { Save, Bell, Shield, Globe, Palette } from 'lucide-react'
import { SectionCard, PageTitle } from '../common'

export default function SettingsSection() {
  return (
    <div>
      <PageTitle title="Settings" description="Pengaturan umum dashboard dan preferensi notifikasi." />
      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard title="Umum">
          <SettingRow icon={Globe} label="Bahasa" control={<Select value="Bahasa Indonesia" />} />
          <SettingRow icon={Bell} label="Notifikasi Real-time" control={<Toggle defaultValue />} />
          <SettingRow icon={Bell} label="Email Alert Critical" control={<Toggle defaultValue />} />
          <SettingRow icon={Palette} label="Tema" control={<Select value="Light" />} />
        </SectionCard>

        <SectionCard title="Keamanan & Roles">
          <SettingRow icon={Shield} label="Role saat ini" control={<span className="rounded-full bg-blue-light px-2.5 py-1 text-xs font-semibold text-blue">Admin</span>} />
          <SettingRow icon={Shield} label="Two-Factor Auth" control={<Toggle defaultValue />} />
          <SettingRow icon={Bell} label="Alert warning ke email" control={<Toggle defaultValue />} />
        </SectionCard>
      </div>

      <div className="mt-5 flex justify-end">
        <button className="flex items-center gap-2 rounded-lg bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue">
          <Save size={16} /> Simpan Perubahan
        </button>
      </div>
    </div>
  )
}

function SettingRow({ icon: Icon, label, control }) {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 py-3 last:border-0">
      <span className="flex items-center gap-2.5 text-sm text-ink">
        <Icon size={16} className="text-slate" /> {label}
      </span>
      {control}
    </div>
  )
}

function Toggle({ defaultValue = false }) {
  const [on, setOn] = useState(defaultValue)
  return (
    <button
      onClick={() => setOn((v) => !v)}
      className={`relative h-6 w-11 rounded-full transition-colors ${on ? 'bg-green' : 'bg-gray-300'}`}
      aria-pressed={on}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${on ? 'left-[22px]' : 'left-0.5'}`}
      />
    </button>
  )
}

function Select({ value }) {
  return (
    <select
      className="rounded-lg border border-gray-200 bg-mist px-3 py-1.5 text-sm text-ink focus:border-blue focus:outline-none"
      value={value}
      onChange={() => {}}
    >
      <option>{value}</option>
    </select>
  )
}
