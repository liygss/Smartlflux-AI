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

      <section className="relative bg-deep">
        <div className="pointer-events-none absolute inset-0 bg-dots-dark opacity-40" />
        <div className="relative mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <Reveal><h2 className="mb-6 font-display text-xl font-bold text-fx-text">Ajukan Pilot</h2></Reveal>
              <Reveal delay={0.05}><ContactForm /></Reveal>
            </div>

            <div className="lg:col-span-2">
              <Reveal><h2 className="mb-6 font-display text-xl font-bold text-fx-text">Hubungi Kami</h2></Reveal>
              <div className="space-y-4">
                <Reveal delay={0.05}>
                <a
                  href="mailto:hello@smartflux.ai"
                  className="fx-card fx-card-hover flex items-start gap-4 p-5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-panel text-glow-cyan">
                    <Mail size={20} strokeWidth={1.8} />
                  </span>
                  <div>
                    <p className="font-display text-sm font-semibold text-fx-text">Email</p>
                    <p className="text-sm text-fx-secondary">hello@smartflux.ai</p>
                  </div>
                </a>
                </Reveal>

                <Reveal delay={0.1}>
                <div className="fx-card fx-card-hover flex items-start gap-4 p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-panel text-glow-teal">
                    <MapPin size={20} strokeWidth={1.8} />
                  </span>
                  <div>
                    <p className="font-display text-sm font-semibold text-fx-text">Area Fokus Awal</p>
                    <p className="text-sm text-fx-secondary">
                      Surabaya &amp; Sidoarjo, Jawa Timur, Indonesia
                    </p>
                  </div>
                </div>
                </Reveal>

                <Reveal delay={0.15}>
                <div className="rounded-2xl border border-glow-teal/25 bg-panel p-5">
                  <h3 className="mb-2 font-display text-sm font-bold text-glow-teal">
                    Cara Kerja Pilot
                  </h3>
                  <ol className="list-inside list-decimal space-y-1.5 text-sm text-fx-secondary">
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
        </div>
      </section>
    </>
  )
}