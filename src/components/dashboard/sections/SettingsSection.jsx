import React, { useState } from 'react'
import { Save, Bell, Shield, Globe, Palette, CheckCircle2 } from 'lucide-react'
import { SectionCard, PageTitle } from '../common'

export default function SettingsSection() {
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div>
      <PageTitle title="Pengaturan" description="Pengaturan umum dashboard dan preferensi notifikasi." />
      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard title="Umum">
          <SettingRow icon={Globe} label="Bahasa" control={<Select value="Bahasa Indonesia" />} />
          <SettingRow icon={Bell} label="Notifikasi Real-time" control={<Toggle defaultValue />} />
          <SettingRow icon={Bell} label="Peringatan email kritis" control={<Toggle defaultValue />} />
          <SettingRow icon={Palette} label="Tema" control={<Select value="Terang" />} />
        </SectionCard>

        <SectionCard title="Keamanan & Peran">
          <SettingRow icon={Shield} label="Peran saat ini" control={<span className="rounded-full border border-line bg-white/5 px-2.5 py-1 text-xs font-semibold text-electric">Admin</span>} />
          <SettingRow icon={Shield} label="Autentikasi Dua Faktor" control={<Toggle defaultValue />} />
          <SettingRow icon={Bell} label="Peringatan ke email" control={<Toggle defaultValue />} />
        </SectionCard>
      </div>

      <div className="mt-5 flex items-center justify-end gap-3">
        {saved && (
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-mint">
            <CheckCircle2 size={16} /> Perubahan tersimpan (demo)
          </span>
        )}
        <button
          onClick={handleSave}
          className="btn-gradient-fx flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white"
        >
          <Save size={16} /> Simpan Perubahan
        </button>
      </div>
    </div>
  )
}

function SettingRow({ icon: Icon, label, control }) {
  return (
    <div className="flex items-center justify-between rounded-lg border-b border-line py-3 last:border-0 hover:bg-white/5">
      <span className="flex items-center gap-2.5 px-1 text-sm text-fx-text">
        <Icon size={16} className="text-fx-secondary" /> {label}
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
      className={`relative flex h-11 w-16 shrink-0 items-center rounded-full transition-colors ${on ? 'bg-mint' : 'bg-white/15'}`}
      aria-pressed={on}
    >
      <span
        className={`absolute h-6 w-6 rounded-full bg-white shadow transition-all ${on ? 'left-[34px]' : 'left-1'}`}
      />
    </button>
  )
}

function Select({ value }) {
  return (
    <select
      className="rounded-lg border border-line bg-panel px-3 py-1.5 text-sm text-fx-text focus:border-glow-cyan focus:outline-none"
      value={value}
      onChange={() => {}}
    >
      <option className="bg-card">{value}</option>
    </select>
  )
}
