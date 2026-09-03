import React, { useState } from 'react'
import { Plus, HelpCircle } from 'lucide-react'
import { Section, SectionHeader } from './ui/Section'
import { Reveal } from './ui/Reveal'

const faqs = [
  {
    question: "Berapa lama waktu implementasi SmartFlux AI?",
    answer: "Rata-rata implementasi membutuhkan waktu 2-4 minggu tergantung kompleksitas fasilitas dan jumlah titik monitoring. Kami akan melakukan assessment terlebih dahulu untuk memberikan timeline yang akurat."
  },
  {
    question: "Apakah perlu installation hardware baru?",
    answer: "SmartFlux Node kami sudah plug-and-play. Untuk fasilitas existing, kami bisa integrate dengan sensor yang sudah ada atau install sensor baru jika diperlukan. Hardware kami designed untuk minimal disruption during installation."
  },
  {
    question: "Bagaimana dengan biaya maintenance bulanan?",
    answer: "Ya, tersedia dalam paket berlangganan yang includes hardware, cloud hosting, AI analytics, dan 24/7 support. Paket kami sangat competitive dibandingkan solusi enterprise lainnya. Hubungi sales kami untuk quote detail."
  },
  {
    question: "Apakah data saya aman?",
    answer: "Sangat aman! Kami menggunakan encryption end-to-end, compliance dengan standar security internasional, dan data hosting di Indonesia dengan backup otomatis harian. Your data privacy adalah priority kami."
  },
  {
    question: "Bisa integrate dengan sistem existing kami?",
    answer: "Tentu! SmartFlux AI memiliki open API dan dapat diintegrate dengan BMS, SCADA, atau sistem facility management yang sudah ada. Tim technical kami akan membantu konfigurasi integration."
  },
  {
    question: "Apakah ada trial period atau demo?",
    answer: "Ya! Kami menyediakan pilot program untuk potential partners. Hubungi tim kami melalui form di halaman Contact untuk schedule demo gratis atau ajukan pilot program di wilayah Anda."
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
              index={index}
            />
          </Reveal>
        ))}
      </div>

      {/* Additional CTA */}
      <Reveal className="mt-10 text-center">
        <div className="mx-auto max-w-md rounded-2xl border border-blue/10 bg-white p-6 shadow-[var(--shadow-card)]">
          <p className="text-sm text-slate">
            Masih punya pertanyaan?
          </p>
          <a
            href="/contact"
            className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-navy to-blue px-5 py-2.5 text-sm font-semibold text-white shadow-[var(--shadow-blue-glow)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            Hubungi Tim Kami →
          </a>
        </div>
      </Reveal>
    </Section>
  )
}

function FAQItem({ question, answer, isOpen, onToggle, index }) {
  const gradients = [
    'from-blue to-blue-soft',
    'from-emerald to-teal',
    'from-violet to-indigo',
    'from-cyan to-sky',
    'from-amber to-orange',
    'from-rose to-pink',
  ]

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
      >
        <div className="flex items-center gap-4">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${gradients[index % gradients.length]} text-white shadow-lg transition-transform duration-300 ${isOpen ? 'scale-110' : ''}`}
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
