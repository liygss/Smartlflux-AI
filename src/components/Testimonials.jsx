import React from 'react'
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

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Reveal key={testimonial.company} delay={index * 0.1}>
            <TestimonialCard {...testimonial} index={index} />
          </Reveal>
        ))}
      </div>

      {/* Logo placeholder */}
      <div className="mt-16 text-center">
        <p className="mb-8 text-xs font-semibold uppercase tracking-[0.2em] text-slate">
          Dipercaya Oleh
        </p>
        <div className="flex flex-wrap items-center justify-center gap-10 opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0">
          <ClientLogo name="Hotel" />
          <ClientLogo name="Campus" />
          <ClientLogo name="Factory" />
          <ClientLogo name="Office" />
        </div>
      </div>
    </Section>
  )
}

function TestimonialCard({ quote, author, role, company, index }) {
  const avatarGradients = [
    'from-blue to-blue-soft',
    'from-emerald to-teal',
    'from-violet to-indigo',
  ]
  const companyColors = [
    'text-blue',
    'text-emerald',
    'text-violet',
  ]

  return (
    <div className="group relative flex h-full flex-col rounded-2xl border border-gray-200/70 bg-white p-7 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1.5 hover:border-blue/20 hover:shadow-[var(--shadow-card-hover)]">
      {/* Top gradient accent */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-[3px] rounded-t-2xl bg-gradient-to-r from-blue via-indigo to-emerald opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Quote Icon */}
      <quote className="text-5xl font-black leading-none text-blue-light">{'"'}</quote>

      {/* Quote Content */}
      <blockquote className="flex-1">
        <p className="font-display text-base font-medium leading-relaxed text-navy">
          {quote}
        </p>
      </blockquote>

      {/* Author Info */}
      <div className="mt-7 flex items-center gap-3 border-t border-gray-100 pt-5">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${avatarGradients[index % avatarGradients.length]} text-white text-sm font-bold`}
        >
          {author.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <p className="text-sm font-bold text-navy">{author}</p>
          <p className="text-xs text-slate">{role}</p>
          <p className={`text-xs font-semibold ${companyColors[index % companyColors.length]}`}>{company}</p>
        </div>
      </div>
    </div>
  )
}

function ClientLogo({ name }) {
  const logos = {
    Hotel: '🏨',
    Campus: '🎓',
    Factory: '🏭',
    Office: '🏢',
  }

  return (
    <div className="flex flex-col items-center gap-2 transition-transform duration-300 hover:scale-110">
      <span className="text-3xl">{logos[name]}</span>
      <span className="text-xs font-semibold text-slate">{name}</span>
    </div>
  )
}
