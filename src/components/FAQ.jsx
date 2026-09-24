import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, HelpCircle } from 'lucide-react'
import { Section, SectionHeader } from './ui/Section'
import { Reveal } from './ui/Reveal'

const faqs = [
  {
    question: "Berapa lama waktu implementasi SmartFlux AI?",
    answer: "Rata-rata implementasi membutuhkan waktu 2-4 minggu, tergantung kompleksitas fasilitas dan jumlah titik monitoring. Kami melakukan penilaian awal terlebih dahulu untuk memberikan jadwal yang akurat."
  },
  {
    question: "Apakah perlu pemasangan perangkat keras baru?",
    answer: "SmartFlux Node bersifat plug-and-play. Untuk fasilitas yang sudah berjalan, kami dapat mengintegrasikan dengan sensor yang sudah ada atau memasang sensor baru bila diperlukan. Pemasangan dirancang agar minim gangguan terhadap operasional."
  },
  {
    question: "Bagaimana dengan biaya pemeliharaan bulanan?",
    answer: "Biaya tersedia dalam paket berlangganan yang mencakup perangkat keras, hosting cloud, analitik AI, dan dukungan 24/7. Paket kami dirancang kompetitif dibandingkan solusi enterprise lain. Hubungi tim kami untuk rincian harga."
  },
  {
    question: "Apakah data saya aman?",
    answer: "Kami memprioritaskan keamanan data: enkripsi dalam pengiriman data, penyimpanan di server yang aman, dan pencadangan otomatis. Data Anda hanya digunakan untuk kebutuhan sistem pemantauan fasilitas Anda."
  },
  {
    question: "Bisakah diintegrasikan dengan sistem yang sudah ada?",
    answer: "Bisa. SmartFlux AI menyediakan API terbuka dan dapat diintegrasikan dengan BMS, SCADA, atau sistem manajemen fasilitas yang sudah ada. Tim teknis kami membantu konfigurasi integrasi."
  },
  {
    question: "Apakah ada program percobaan atau demo?",
    answer: "Ada. Kami menyediakan program pilot untuk calon mitra. Hubungi tim kami melalui formulir di halaman Kontak untuk menjadwalkan demo atau mengajukan program pilot di wilayah Anda."
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <Section variant="light">
      <SectionHeader
        eyebrow="FAQ"
        title="Pertanyaan yang Sering Diajukan"
        description="Temukan jawaban atas pertanyaan umum tentang SmartFlux AI."
      />

      <div className="mx-auto max-w-3xl">
        {faqs.map((faq, index) => (
          <Reveal key={faq.question} delay={index * 0.05}>
            <FAQItem
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => toggleFAQ(index)}
            />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10 text-center">
        <div className="mx-auto max-w-md rounded-2xl border border-blue/10 bg-white p-6 shadow-[var(--shadow-card)]">
          <p className="text-sm text-slate">
            Masih punya pertanyaan lain?
          </p>
          <Link
            to="/contact"
            className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-navy px-5 py-2.5 text-sm font-semibold text-white shadow-[var(--shadow-soft)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            Hubungi Tim Kami
          </Link>
        </div>
      </Reveal>
    </Section>
  )
}

function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
        isOpen
          ? 'border-blue/25 shadow-[var(--shadow-card-hover)]'
          : 'border-gray-200/70 shadow-[var(--shadow-card)] hover:border-blue/15 hover:shadow-[var(--shadow-card-hover)]'
      }`}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-gray-50/60"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-4">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy text-white transition-transform duration-300 ${isOpen ? 'scale-110' : ''}`}
          >
            <HelpCircle size={20} />
          </div>
          <span className="font-display text-base font-semibold text-navy">{question}</span>
        </div>

        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
            isOpen
              ? 'rotate-45 border-blue bg-blue-light text-blue'
              : 'border-gray-200 text-blue'
          }`}
        >
          <Plus size={18} />
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="border-t border-gray-100 px-6 pb-6 pt-5 pl-[4.5rem] text-sm leading-relaxed text-slate">
          {answer}
        </div>
      </div>
    </div>
  )
}