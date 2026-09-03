import React, { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'

const facilityTypes = [
  'Hotel',
  'Kampus',
  'Gedung Perkantoran',
  'Fasilitas Komersial',
  'Apartemen',
  'Rumah Sakit',
  'Fasilitas Industri',
  'Lainnya',
]

const needs = [
  'Pemantauan listrik',
  'Pemantauan air',
  'Pemantauan listrik & air terintegrasi',
  'Deteksi anomali',
  'Prediksi',
  'Program pilot lengkap',
]

const inputClass =
  'w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-slate/70 outline-none transition-colors focus:border-blue focus:ring-2 focus:ring-blue/20'
const labelClass = 'mb-1.5 block text-sm font-medium text-navy'

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-100 bg-white px-6 py-14 text-center shadow-sm">
        <CheckCircle2 size={48} className="mb-4 text-green" />
        <h3 className="font-display text-2xl font-bold text-navy">Permintaan Diterima</h3>
        <p className="mt-2 max-w-sm text-sm text-slate">
          Terima kasih atas ketertarikan Anda pada SmartFlux AI. Tim kami akan
          meninjau permintaan Anda dan menghubungi Anda kembali mengenai langkah
          selanjutnya untuk implementasi pilot.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="name">Nama</label>
          <input id="name" required className={inputClass} placeholder="Nama lengkap Anda" />
        </div>
        <div>
          <label className={labelClass} htmlFor="company">Perusahaan / Institusi</label>
          <input id="company" required className={inputClass} placeholder="Nama fasilitas" />
        </div>
        <div>
          <label className={labelClass} htmlFor="role">Jabatan</label>
          <input id="role" className={inputClass} placeholder="mis. Manajer Fasilitas" />
        </div>
        <div>
          <label className={labelClass} htmlFor="email">Email</label>
          <input id="email" type="email" required className={inputClass} placeholder="anda@perusahaan.com" />
        </div>
        <div>
          <label className={labelClass} htmlFor="phone">Telepon</label>
          <input id="phone" className={inputClass} placeholder="+62..." />
        </div>
        <div>
          <label className={labelClass} htmlFor="facility">Jenis Fasilitas</label>
          <select id="facility" className={inputClass} defaultValue="">
            <option value="" disabled>Pilih jenis fasilitas</option>
            {facilityTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="city">Kota</label>
          <input id="city" required className={inputClass} placeholder="mis. Surabaya" />
        </div>
        <div>
          <label className={labelClass} htmlFor="need">Kebutuhan Monitoring Utama</label>
          <select id="need" className={inputClass} defaultValue="">
            <option value="" disabled>Pilih kebutuhan utama Anda</option>
            {needs.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="message">Pesan (opsional)</label>
          <textarea
            id="message"
            rows={4}
            className={inputClass}
            placeholder="Ceritakan sedikit tentang fasilitas Anda dan apa yang ingin dipantau."
          />
        </div>
      </div>

      <p className="mt-3 text-xs text-slate">
        Ini adalah formulir demo dan tidak mengirim data nyata.
      </p>

      <button
        type="submit"
        className="mt-5 w-full rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue"
      >
        Ajukan Pilot
      </button>
    </form>
  )
}
