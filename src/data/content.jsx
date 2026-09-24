import {
  Monitor,
  ScanSearch,
  TrendingUp,
  Lightbulb,
  Activity,
  Droplets,
  Zap,
  Boxes,
  Cloud,
  LayoutDashboard,
} from 'lucide-react'

export const productFlow = [
  { label: 'Monitoring', text: 'Pemantauan konsumsi secara real-time', icon: Monitor },
  { label: 'Deteksi', text: 'Menemukan pola yang berbeda dari normal', icon: ScanSearch },
  { label: 'Prediksi', text: 'Memprediksi konsumsi di masa depan', icon: TrendingUp },
  { label: 'Rekomendasi', text: 'Mendukung keputusan operasional yang lebih baik', icon: Lightbulb },
]

export const solutionPillars = [
  {
    icon: Monitor,
    title: 'Monitor',
    text: 'Pantau konsumsi listrik dan air secara real-time serta lihat tren historis dari satu dashboard.',
  },
  {
    icon: ScanSearch,
    title: 'Deteksi',
    text: 'Bangun baseline penggunaan normal dan identifikasi pola yang berbeda secara signifikan.',
  },
  {
    icon: TrendingUp,
    title: 'Prediksi',
    text: 'Prediksi konsumsi listrik dan air di masa depan menggunakan data historis.',
  },
  {
    icon: Lightbulb,
    title: 'Rekomendasi',
    text: 'Berikan informasi yang dapat ditindaklanjuti untuk mendukung keputusan operasional dan perawatan.',
  },
]

export const howItWorksSteps = [
  {
    step: '01',
    title: 'Sensor',
    text: 'Sensor listrik dan air mengumpulkan data konsumsi secara real-time di titik penggunaan.',
    points: ['PZEM-004T: pemantauan listrik', 'YF-S201: pemantauan aliran air'],
    icon: Activity,
  },
  {
    step: '02',
    title: 'SmartFlux Node',
    text: 'Perangkat edge mengumpulkan, memfilter, memvalidasi, dan menyimpan sementara data sensor secara lokal.',
    points: ['ESP32', 'Wi-Fi', 'microSD opsional'],
    icon: Boxes,
  },
  {
    step: '03',
    title: 'Konektivitas',
    text: 'Data yang terkumpul dikirim melalui Wi-Fi atau jaringan yang tersedia menggunakan MQTT atau HTTP.',
    points: ['Jaringan Wi-Fi', 'Protokol MQTT / HTTP'],
    icon: Cloud,
  },
  {
    step: '04',
    title: 'Platform Cloud',
    text: 'Data historis disimpan dan diproses untuk analitik, prediksi, dan manajemen.',
    points: ['Analitik', 'Prediksi', 'Manajemen perangkat & pengguna', 'Laporan'],
    icon: Zap,
  },
  {
    step: '05',
    title: 'Dashboard',
    text: 'Pengguna mengakses pemantauan real-time, tren, status perangkat, alert, prediksi, dan rekomendasi.',
    points: ['Pemantauan real-time', 'Tren & status perangkat', 'Alert', 'Prediksi & rekomendasi'],
    icon: LayoutDashboard,
  },
]

export const deviceComponents = [
  { icon: Activity, title: 'Sensor Listrik', detail: 'PZEM-004T' },
  { icon: Droplets, title: 'Sensor Aliran Air', detail: 'YF-S201' },
  { icon: Boxes, title: 'SmartFlux Node', detail: 'ESP32' },
  { icon: Cloud, title: 'Konektivitas', detail: 'Wi-Fi · MQTT / HTTP' },
  { icon: LayoutDashboard, title: 'Cloud & Dashboard', detail: 'Analitik & alert' },
]

export const competitorRows = [
  ['Pemantauan Listrik', 'Ya', 'Tidak', 'Ya', 'Ya'],
  ['Pemantauan Air', 'Tidak', 'Ya', 'Tergantung', 'Ya'],
  ['Pemantauan Real-Time', 'Ya', 'Ya', 'Ya', 'Ya'],
  ['Deteksi Anomali', 'Terbatas', 'Terbatas / Tersedia', 'Ya', 'Ya'],
  ['Prediksi', 'Terbatas', 'Terbatas', 'Ya', 'Direncanakan / Ya'],
  ['Rekomendasi', 'Terbatas', 'Terbatas', 'Ya', 'Direncanakan / Ya'],
  ['Integrasi Listrik + Air', 'Terbatas', 'Tidak', 'Tersedia di sebagian', 'Ya'],
  ['Implementasi Modular', 'Bervariasi', 'Bervariasi', 'Sering kompleks', 'Tujuan desain utama'],
  ['Pasar Awal', 'Umum', 'Umum', 'Enterprise', 'Fasilitas menengah-besar'],
]

export const competitorCols = [
  'Fitur',
  'Smart Meter',
  'Smart Water Monitoring',
  'Platform Enterprise',
  'SmartFlux AI',
]

export const roadmapPhases = [
  { phase: 'Fase 1', title: 'Monitoring', items: ['Pemantauan listrik', 'Pemantauan air', 'Dashboard real-time', 'Data historis'], note: 'MVP' },
  { phase: 'Fase 2', title: 'Deteksi', items: ['Pemodelan baseline', 'Deteksi anomali', 'Alert'], note: 'MVP' },
  { phase: 'Fase 3', title: 'Prediksi', items: ['Prediksi listrik', 'Prediksi air', 'Proyeksi penggunaan bulanan'], note: 'Roadmap' },
  { phase: 'Fase 4', title: 'Rekomendasi', items: ['Wawasan operasional', 'Rekomendasi otomatis', 'Saran efisiensi'], note: 'Roadmap' },
  { phase: 'Fase 5', title: 'Optimasi', items: ['Pemantauan multi-gedung', 'Dashboard multi-lokasi', 'Analitik lanjutan', 'Integrasi API eksternal'], note: 'Roadmap' },
]

export const packages = [
  {
    name: 'SmartFlux Basic',
    tagline: 'Mulai dengan satu sumber daya.',
    features: ['Pemantauan listrik atau air', 'Dashboard', 'Data historis dasar'],
  },
  {
    name: 'SmartFlux Standard',
    tagline: 'Pemantauan terintegrasi untuk kedua sumber daya.',
    features: ['Pemantauan listrik', 'Pemantauan air', 'Dashboard', 'Alert', 'Tren historis'],
    featured: true,
  },
  {
    name: 'SmartFlux Pro',
    tagline: 'Inteligensi dan analitik untuk visibilitas penuh.',
    features: [
      'Pemantauan listrik & air',
      'Deteksi anomali',
      'Prediksi',
      'Rekomendasi',
      'Analitik & laporan',
      'Alert lanjutan',
    ],
  },
]

export const features = [
  {
    icon: Activity,
    title: 'Pemantauan Real-Time',
    text: 'Listrik: tegangan, arus, daya, dan energi (kWh). Air: laju aliran dan volume, diperbarui secara terus-menerus.',
  },
  {
    icon: ScanSearch,
    title: 'Deteksi Anomali',
    text: 'Membangun baseline penggunaan normal dan menandai pola yang berbeda secara signifikan sebagai peringatan dini.',
  },
  {
    icon: TrendingUp,
    title: 'Prediksi Konsumsi',
    text: 'Menggunakan data historis untuk memproyeksikan konsumsi listrik dan air di masa depan serta menyoroti perubahan yang diharapkan.',
  },
  {
    icon: Lightbulb,
    title: 'Rekomendasi Cerdas',
    text: 'Mengubah wawasan menjadi langkah selanjutnya yang disarankan untuk membantu tim operasional memutuskan apa yang perlu dipertimbangkan.',
  },
]
