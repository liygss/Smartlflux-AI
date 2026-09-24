import React from 'react'
import { Hotel, GraduationCap, Factory, Building2 } from 'lucide-react'
import { Section, SectionHeader } from './ui/Section'
import { Reveal } from './ui/Reveal'

const testimonials = [
  {
    quote: "Implementasi SmartFlux membantu kami mengurangi biaya operasional hingga 23% dalam 6 bulan pertama. Monitoring yang real-time dan alert otomatis sangat membantu tim facilities kami.",
    author: "Budi Santoso",
    role: "Facility Manager",
    company: "Hotel Grand Surabaya"
  },
  {
    quote: "Sebelumnya kami monitoring listrik dan air terpisah-pisah. Dengan SmartFlux AI, semua terintegrasi dalam satu dashboard yang mudah dipahami. Sangat recommend!",
    author: "Siti Nurhaliza",
    role: "Head of Operations",
    company: "Surabaya Campus"
  },
  {
    quote: "Fitur deteksi anomali-nya sangat akurat. Kami bisa langsung action saat ada potensi kebocoran atau boros energi sebelum tagihan membengkak.",
    author: "Ahmad Rizki",
    role: "Plant Manager",
    company: "PT Manufaktur Jaya"
  },
]

export default function Testimonials() {
  return (
    <Section variant="light">
      <SectionHeader
        eyebrow="Testimoni Pelanggan"
        title="Mereka Percaya pada SmartFlux AI"
        description="Fasilitas-fasilitas terkemuka telah meningkatkan efisiensi sumber daya mereka dengan SmartFlux AI."
      />

      <p className="-mt-8 mb-10 text-center text-xs text-slate">
        <span className="demo-chip">Contoh testimoni · demo</span>
        <span className="ml-2 hidden sm:inline">Nama dan angka berikut adalah ilustrasi prototipe.</span>
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Reveal key={testimonial.company} delay={index * 0.1}>
            <TestimonialCard {...testimonial} index={index} />
          </Reveal>
        ))}
      </div>

      <div className="mt-14 text-center">
        <p className="mb-8 text-xs font-semibold uppercase tracking-[0.14em] text-slate">
          Segmen Fasilitas
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 text-slate opacity-80">
          <ClientLogo icon={Hotel} name="Hotel" />
          <ClientLogo icon={GraduationCap} name="Kampus" />
          <ClientLogo icon={Factory} name="Industri" />
          <ClientLogo icon={Building2} name="Perkantoran" />
        </div>
      </div>
    </Section>
  )
}

function TestimonialCard({ quote, author, role, company }) {
  const initials = author.split(' ').map((n) => n[0]).join('')

  return (
    <div className="relative flex h-full flex-col rounded-2xl border border-gray-200/70 bg-white p-7 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1.5 hover:border-blue/25 hover:shadow-[var(--shadow-card-hover)]">
      <span className="text-5xl font-black leading-none text-blue-light">{"\u201C"}</span>

      <blockquote className="flex-1">
        <p className="font-display text-base font-medium leading-relaxed text-navy">
          {quote}
        </p>
      </blockquote>

      <div className="mt-7 flex items-center gap-3 border-t border-gray-100 pt-5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
          {initials}
        </div>
        <div>
          <p className="text-sm font-bold text-navy">{author}</p>
          <p className="text-xs text-slate">{role}</p>
          <p className="text-xs font-semibold text-blue">{company}</p>
        </div>
      </div>
    </div>
  )
}

function ClientLogo({ icon: Icon, name }) {
  return (
    <div className="flex flex-col items-center gap-2 transition-transform duration-300 hover:scale-110">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-light text-blue">
        <Icon size={20} />
      </span>
      <span className="text-xs font-semibold text-slate">{name}</span>
    </div>
  )
}