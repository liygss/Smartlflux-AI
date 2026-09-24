import React from 'react'
import { Target, Compass, Rocket, CheckCircle2, Lightbulb } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import { Section, SectionHeader, Card } from '../components/ui/Section'
import { Reveal, Stagger, StaggerItem } from '../components/ui/Reveal'
import PilotCTA from '../components/PilotCTA'

const mission = [
  'Mengembangkan teknologi monitoring sumber daya yang praktis dan mudah digunakan.',
  'Mengintegrasikan IoT dan AI ke dalam pengelolaan listrik dan air.',
  'Menghadirkan informasi yang dapat ditindaklanjuti untuk keputusan operasional yang lebih baik.',
  'Membangun solusi modular yang dapat berkembang sesuai kebutuhan customer.',
]

const strategyPhases = [
  { phase: 'Pilot Project', text: 'Pasang SmartFlux AI di sejumlah fasilitas terbatas untuk menguji kestabilan, akurasi, konektivitas, dan deteksi anomali.', icon: Rocket },
  { phase: 'Validasi', text: 'Evaluasi apakah sistem benar-benar membantu pengguna memahami pola dan mendeteksi kondisi abnormal melalui data penggunaan dan umpan balik.', icon: CheckCircle2 },
  { phase: 'Early Adopter', text: 'Konversi pengguna pilot dan fasilitas yang berminat menjadi customer berbayar yang berkelanjutan dan menjadi bukti serta studi kasus.', icon: Target },
  { phase: 'Ekspansi', text: 'Perluas jangkauan ke kota-kota lain di Jawa Timur lalu ke kota lain di Jawa setelah model terbukti.', icon: Compass },
  { phase: 'Scale', text: 'Tumbuhkan kapasitas dengan dashboard multi-lokasi, analitik lanjutan, integrasi, dan fitur enterprise.', icon: Lightbulb },
]

const pmfIndicators = [
  'Customer rutin menggunakan dashboard',
  'Alert dinilai berguna dan relevan',
  'Pola abnormal terdeteksi lebih awal',
  'Customer memperoleh nilai operasional',
  'Customer melanjutkan penggunaan layanan',
  'Customer bersedia membayar subscription',
  'Customer merekomendasikan SmartFlux',
]

const hypotheses = [
  'Manajer fasilitas membutuhkan visibilitas real-time atas konsumsi listrik dan air.',
  'Manajer fasilitas ingin mengetahui kapan penggunaan menjadi abnormal.',
  'Pengguna lebih menyukai wawasan yang dapat ditindaklanjuti daripada data sensor mentah.',
  'Customer bersedia membayar ketika manfaat operasional atau biaya terukur.',
  'Customer lebih menyukai sistem modular yang dapat diimplementasikan bertahap.',
]

export default function About() {
  return (
    <>
      <PageHeader
        breadcrumb="Tentang"
        eyebrow="Tentang"
        title="SmartFlux"
        description="SmartFlux adalah perusahaan teknologi yang berfokus pada manajemen sumber daya cerdas, mengembangkan solusi digital yang membantu fasilitas memantau dan mengelola listrik dan air lebih efisien menggunakan IoT, AI, dan analitik data."
      />

      {/* Vision + Mission */}
      <Section variant="dark">
        <Stagger className="grid gap-5 md:grid-cols-2">
          <StaggerItem className="h-full">
            <Card dark className="h-full p-6">
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-panel text-glow-cyan">
                <Compass size={24} strokeWidth={1.8} />
              </span>
              <h3 className="mb-2 font-display text-xl font-bold text-fx-text">Visi Kami</h3>
              <p className="text-sm leading-relaxed text-fx-secondary">
                Menjadi perusahaan teknologi yang menyediakan solusi manajemen sumber
                daya yang efisien, terintegrasi, dan berbasis data.
              </p>
            </Card>
          </StaggerItem>
          <StaggerItem className="h-full">
            <Card dark className="h-full p-6">
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-panel text-glow-teal">
                <Rocket size={24} strokeWidth={1.8} />
              </span>
              <h3 className="mb-2 font-display text-xl font-bold text-fx-text">Misi Kami</h3>
              <ul className="space-y-2">
                {mission.map((m) => (
                  <li key={m} className="flex items-start gap-2 text-sm text-fx-secondary">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-mint" />
                    {m}
                  </li>
                ))}
              </ul>
            </Card>
          </StaggerItem>
        </Stagger>
      </Section>

      {/* Business strategy */}
      <Section variant="dark" id="strategy">
        <SectionHeader
          dark
          eyebrow="Strategi Bisnis"
          title="Validasi Dulu, Baru Skala"
          description="SmartFlux tidak langsung berekspansi besar. Ia memprioritaskan pilot dan early adopter pada segmen yang telah ditentukan, lalu tumbuh saat model terbukti."
        />
        <Stagger className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {strategyPhases.map((s) => (
            <StaggerItem key={s.phase} className="h-full">
              <Card dark className="h-full p-6">
                <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-panel text-glow-cyan">
                  <s.icon size={20} strokeWidth={1.8} />
                </span>
                <h3 className="mb-2 font-display text-base font-bold text-fx-text">{s.phase}</h3>
                <p className="text-sm leading-relaxed text-fx-secondary">{s.text}</p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* PMF */}
      <Section variant="dark">
        <SectionHeader
          dark
          eyebrow="Product-Market Fit"
          title="Bagaimana Kami Tahu Produk Bekerja"
          description="SmartFlux AI divalidasi dari seberapa jauh ia menyelesaikan masalah nyata customer."
        />
        <Reveal><Card dark className="p-6">
          <ul className="grid gap-3 sm:grid-cols-2">
            {pmfIndicators.map((p) => (
              <li key={p} className="flex items-start gap-2 text-sm text-fx-secondary">
                <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-mint" />
                {p}
              </li>
            ))}
          </ul>
        </Card></Reveal>
      </Section>

      {/* Hypotheses */}
      <Section variant="dark">
        <SectionHeader
          dark
          eyebrow="Desirability"
          title="Hipotesis yang Kami Uji"
          description="Divalidasi melalui wawancara, survei, pilot project, dan analisis penggunaan produk."
        />
        <Stagger className="grid gap-4 sm:grid-cols-2">
          {hypotheses.map((h) => (
            <StaggerItem key={h} className="h-full">
              <Card dark className="h-full p-6">
                <div className="flex gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line bg-panel text-glow-teal">
                    <Lightbulb size={16} />
                  </span>
                  <p className="text-sm text-fx-secondary">{h}</p>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <PilotCTA />
    </>
  )
}