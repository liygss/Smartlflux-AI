import React from 'react'
import { Mail, MapPin } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import { Reveal } from '../components/ui/Reveal'
import ContactForm from '../components/ContactForm'

export default function Contact() {
  return (
    <>
      <PageHeader
        breadcrumb="Kontak"
        eyebrow="Kontak"
        title="Mulai Monitoring Lebih Cerdas"
        description="Tertarik menguji SmartFlux AI di fasilitas Anda? Bicarakan dengan tim kami tentang implementasi pilot."
      />

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <Reveal><h2 className="mb-6 font-display text-xl font-bold text-navy">Ajukan Pilot</h2></Reveal>
            <Reveal delay={0.05}><ContactForm /></Reveal>
          </div>

          <div className="lg:col-span-2">
            <Reveal><h2 className="mb-6 font-display text-xl font-bold text-navy">Hubungi Kami</h2></Reveal>
            <div className="space-y-4">
              <Reveal delay={0.05}>
              <a
                href="mailto:hello@smartflux.ai"
                className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-navy to-blue text-white">
                  <Mail size={20} />
                </span>
                <div>
                  <p className="font-display text-sm font-semibold text-navy">Email</p>
                  <p className="text-sm text-slate">hello@smartflux.ai</p>
                </div>
              </a>
              </Reveal>

              <Reveal delay={0.1}>
              <div className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-green to-blue text-white">
                  <MapPin size={20} />
                </span>
                <div>
                  <p className="font-display text-sm font-semibold text-navy">Area Fokus Awal</p>
                  <p className="text-sm text-slate">
                    Surabaya &amp; Sidoarjo, Jawa Timur, Indonesia
                  </p>
                </div>
              </div>
              </Reveal>

              <Reveal delay={0.15}>
              <div className="rounded-2xl border border-green/20 bg-gradient-to-br from-green-light to-white p-5">
                <h3 className="mb-2 font-display text-sm font-bold text-green">
                  Cara Kerja Pilot
                </h3>
                <ol className="list-inside list-decimal space-y-1.5 text-sm text-ink">
                  <li>Kami memahami kebutuhan fasilitas Anda.</li>
                  <li>Kami memasang SmartFlux AI dalam lingkup terbatas.</li>
                  <li>Kami memvalidasi keandalan, alert, dan manfaat bersama-sama.</li>
                  <li>Kami membahas langkah selanjutnya berdasarkan hasil nyata.</li>
                </ol>
              </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
