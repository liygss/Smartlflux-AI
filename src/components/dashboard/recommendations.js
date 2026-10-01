import {
  alerts,
  devices,
  electricityDaily,
  electricityDailyPrev,
  electricityHourly,
  electricityNight,
  forecast,
  kpi,
  waterHourly,
  waterNight,
} from './data'

const round = (n, d = 1) => Math.round(n * 10 ** d) / 10 ** d
const mean = (rows, key) => rows.reduce((s, r) => s + r[key], 0) / rows.length
const peakOf = (rows, key) => rows.reduce((m, r) => (r[key] > m[key] ? r : m))
const pctAbove = (value, base) => Math.round(((value - base) / base) * 100)
const monthly = (excess, share, days = 30) => Math.round(excess * share * days)
const fmt = (n) => `${round(n)}`.replace('.', ',')
const fill = (tpl, vars) => tpl.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? '')

const BASELINE_FACTOR = { electricity: 0.88, water: 0.9 }
const PEAK_RATIO = { high: 1.8, medium: 1.5 }
const DEVIATION = { high: 25, medium: 10 }
const DAYS_PER_MONTH = 30

export const priorityMeta = {
  high: { label: 'Tinggi', order: 0, tone: 'bg-fx-critical/15 text-red-300', dot: 'bg-fx-critical' },
  medium: { label: 'Sedang', order: 1, tone: 'bg-fx-warning/15 text-amber-300', dot: 'bg-fx-warning' },
  low: { label: 'Rendah', order: 2, tone: 'bg-mint/15 text-mint', dot: 'bg-mint' },
}

export const recStatusMeta = {
  new: { label: 'Baru', tone: 'border border-electric/30 bg-electric/15 text-sky-300' },
  progress: { label: 'Diikuti', tone: 'border border-line bg-white/5 text-fx-secondary' },
  done: { label: 'Selesai', tone: 'bg-mint/15 text-mint' },
}

export const recStatusOrder = ['new', 'progress', 'done']

export const domainMeta = {
  electricity: { label: 'Listrik' },
  water: { label: 'Air' },
  device: { label: 'Perangkat' },
  forecast: { label: 'Proyeksi' },
  alert: { label: 'Peringatan' },
}

const stub = (id, domain, priority, weight) => ({ id, domain, priority, weight, status: 'new' })

function peakRule({ id, domain, series, key, unit, baselineFactor, reducible, actions }) {
  const baseValue = mean(series, key) * baselineFactor
  const peak = peakOf(series, key)
  const load = peak[key] / mean(series, key)
  if (load < PEAK_RATIO.medium) return null
  return {
    ...stub(id, domain, load >= PEAK_RATIO.high ? 'high' : 'medium', load),
    title: `Geser beban ${domainMeta[domain].label.toLowerCase()} di luar jam ${peak.t}`,
    reason: `Beban ${domainMeta[domain].label.toLowerCase()} memuncak pada ${peak.t} dengan ${fmt(peak[key])} ${unit}, yaitu ${round(load, 2)} kali rata-rata harian dan ${pctAbove(peak[key], baseValue)}% di atas baseline ${fmt(baseValue)} ${unit}.`,
    evidence: [
      `Puncak ${fmt(peak[key])} ${unit} pada ${peak.t}`,
      `Baseline ${fmt(baseValue)} ${unit}`,
      `Rasio beban ${round(load, 2)} kali`,
    ],
    actions: actions.map((step) => fill(step, { peak: peak.t })),
    impact: {
      label: 'Perkiraan penghematan',
      value: `sekitar ${fmt(monthly(peak[key] - baseValue, reducible))} ${unit} per bulan`,
    },
  }
}

const rulePeakElectricity = () =>
  peakRule({
    id: 'peak-electricity',
    domain: 'electricity',
    series: electricityHourly,
    key: 'e',
    unit: 'kWh',
    baselineFactor: BASELINE_FACTOR.electricity,
    reducible: 0.25,
    actions: [
      'Petakan perangkat yang aktif pada jam puncak dan kelompokkan menjadi beban wajib atau beban yang dapat digeser.',
      'Geser operasi yang tidak sensitif waktu ke sebelum {peak}, misalnya pengeringan, pengisian tangki, atau pencucian.',
      'Terapkan jadwal otomatis pada node terkait, lalu ukur ulang konsumsi pada jam {peak} setelah 7 hari.',
    ],
  })

const rulePeakWater = () =>
  peakRule({
    id: 'peak-water',
    domain: 'water',
    series: waterHourly,
    key: 'v',
    unit: 'm³',
    baselineFactor: BASELINE_FACTOR.water,
    reducible: 0.3,
    actions: [
      'Petakan area dan perangkat sanitasi yang menyala bersamaan pada jam puncak serta kelompokkan pemakaian wajib dan dapat digeser.',
      'Geser kegiatan yang tidak sensitif waktu seperti pengisian tangki dan pembersihan area ke luar jam puncak.',
      'Terapkan jadwal otomatis pada pompa, lalu ukur ulang volume pada jam {peak} setelah 7 hari.',
    ],
  })

function nightRule({ id, domain, series, key, unit, baselineFactor, reducible, checklist }) {
  const baseValue = mean(series, key) * baselineFactor
  const nightMean = mean(series, key)
  const deviation = pctAbove(nightMean, baseValue)
  if (deviation < DEVIATION.medium) return null
  const peak = peakOf(series, key)
  return {
    ...stub(id, domain, deviation >= DEVIATION.high ? 'high' : 'medium', 1 + deviation / 100),
    title: `Periksa beban ${domain === 'electricity' ? 'listrik' : 'air'} di luar jam operasional`,
    reason: `Rata-rata ${domain === 'electricity' ? 'listrik' : 'air'} antara ${series[0].t} dan ${series[series.length - 1].t} mencapai ${fmt(nightMean)} ${unit}, yaitu ${deviation}% di atas baseline ${fmt(baseValue)} ${unit}, dengan puncak ${fmt(peak[key])} ${unit} pada ${peak.t}.`,
    evidence: [
      `Rata-rata malam ${fmt(nightMean)} ${unit}`,
      `Baseline ${fmt(baseValue)} ${unit}`,
      `Deviasi +${deviation}%`,
    ],
    actions: checklist,
    impact: {
      label: 'Perkiraan penghematan',
      value: `sekitar ${fmt(monthly(nightMean - baseValue, reducible))} ${unit} per bulan`,
    },
  }
}

const ruleNightElectricity = () =>
  nightRule({
    id: 'night-electricity',
    domain: 'electricity',
    series: electricityNight,
    key: 'e',
    unit: 'kWh',
    baselineFactor: BASELINE_FACTOR.electricity,
    reducible: 0.5,
    checklist: [
      'Daftarkan perangkat yang tetap menyala setelah pukul 22.00 beserta estimasi konsumsi masing-masing.',
      'Tambahkan jadwal matikan otomatis pada SmartFlux Node untuk perangkat non-kritis.',
      'Bandingkan kembali konsumsi 22.00 hingga 01.00 setelah 7 hari untuk memastikan penurunan terjadi.',
    ],
  })

const ruleNightWater = () =>
  nightRule({
    id: 'night-water',
    domain: 'water',
    series: waterNight,
    key: 'v',
    unit: 'm³',
    baselineFactor: BASELINE_FACTOR.water,
    reducible: 0.6,
    checklist: [
      'Periksa area dengan pemakaian air kontinu seperti pompa booster, pengisi tangki, dan sistem sanitasi.',
      'Pasang sensor aliran tambahan atau ubah jadwal pompa agar tidak berjalan terus-menerus.',
      'Pantau laju aliran pada jam yang sama selama 5 hari untuk memastikan tidak ada kebocoran.',
    ],
  })

function ruleWeekendOpportunity() {
  const weekdayAvg = mean(electricityDaily.slice(0, 5), 'e')
  const weekendAvg = mean(electricityDaily.slice(5), 'e')
  const gap = Math.round(((weekdayAvg - weekendAvg) / weekdayAvg) * 100)
  if (gap < 15) return null
  return {
    ...stub('weekend-window', 'electricity', 'low', 3),
    title: 'Manfaatkan jam rendah akhir pekan untuk beban terjadwal',
    reason: `Konsumsi listrik akhir pekan rata-rata ${fmt(weekendAvg)} kWh, ${gap}% di bawah rata-rata hari kerja ${fmt(weekdayAvg)} kWh. Ada ruang siap pakai untuk memindahkan beban terjadwal ke periode ini.`,
    evidence: [
      `Akhir pekan ${fmt(weekendAvg)} kWh per hari`,
      `Hari kerja ${fmt(weekdayAvg)} kWh per hari`,
      `Selisih ${gap}% lebih rendah`,
    ],
    actions: [
      'Daftarkan operasi terjadwal yang tidak wajib selesai pada hari yang sama, seperti perawatan, sterilisasi, atau pengisian tangki.',
      'Pindahkan operasi tersebut ke jadwal Sabtu Minggu atau hari libur nasional.',
      'Pantau konsumsi mingguan selama 4 minggu agar beban harian tidak bergeser ke hari kerja.',
    ],
    impact: {
      label: 'Perkiraan penghematan',
      value: `sekitar ${fmt(monthly(weekdayAvg - weekendAvg, 0.15))} kWh per bulan`,
    },
  }
}

function ruleTrend() {
  const current = mean(electricityDaily, 'e')
  const previous = mean(electricityDailyPrev, 'e')
  const delta = Math.round(((current - previous) / previous) * 100)
  if (Math.abs(delta) < 3) return null
  const saving = delta < 0
  return {
    ...stub('weekly-trend', 'electricity', 'low', 2 + Math.abs(delta) / 100),
    title: saving ? 'Pertahankan penurunan konsumsi mingguan' : 'Selidiki kenaikan konsumsi mingguan',
    reason: saving
      ? `Rata-rata konsumsi 7 hari terakhir ${fmt(current)} kWh, turun ${Math.abs(delta)}% dari periode sebelumnya ${fmt(previous)} kWh, dan penurunannya konsisten pada setiap hari.`
      : `Rata-rata konsumsi 7 hari terakhir ${fmt(current)} kWh, naik ${Math.abs(delta)}% dari periode sebelumnya ${fmt(previous)} kWh.`,
    evidence: [
      `7 hari terakhir ${fmt(current)} kWh`,
      `7 hari sebelumnya ${fmt(previous)} kWh`,
      `Selisih ${delta > 0 ? '+' : ''}${delta}%`,
    ],
    actions: saving
      ? [
          'Dokumentasikan perubahan jadwal atau pengaturan yang menyebabkan penurunan agar tidak dibatalkan.',
          'Tetapkan angka ini sebagai baseline baru untuk deteksi anomali berikutnya.',
          'Terapkan praktik yang sama pada unit lain dalam portofolio yang serupa.',
        ]
      : [
          'Bandingkan profil harian dengan periode sebelumnya untuk menemukan jam yang berubah.',
          'Periksa apakah kenaikan berasal dari beban baru atau perubahan jadwal operasi.',
          'Tetapkan ambang peringatan sementara selama sebulan untuk memantau tren.',
        ],
    impact: saving
      ? { label: 'Penghematan berjalan', value: `${Math.abs(delta)}% lebih rendah` }
      : {
          label: 'Risiko kenaikan',
          value: `sekitar ${fmt(monthly(current - previous, 1))} kWh per bulan`,
        },
  }
}

function ruleForecast() {
  const first = forecast.find((row) => row.a !== null) ?? forecast[0]
  const last = forecast[forecast.length - 1]
  const delta = Math.round(((last.f - first.f) / first.f) * 100)
  if (delta < 3) return null
  return {
    ...stub('forecast-rise', 'forecast', delta >= 6 ? 'medium' : 'low', 4 + delta / 10),
    title: 'Siapkan kapasitas untuk proyeksi konsumsi yang meningkat',
    reason: `Proyeksi konsumsi harian naik dari ${first.f} kWh pada ${first.m} menjadi ${last.f} kWh pada ${last.m}, yaitu ${delta}%. Rentang prediksi ${last.lo} sampai ${last.hi} kWh juga mengarah ke atas.`,
    evidence: [
      `${first.m} ${first.f} kWh aktual`,
      `${last.m} ${last.f} kWh prediksi`,
      `Proyeksi naik ${delta}%`,
    ],
    actions: [
      'Masukkan proyeksi ini ke rencana anggaran energi periode berikutnya.',
      'Tinjau kapasitas panel dan jalur distribusi sebelum permintaanuncak akhir tahun.',
      'Tetapkan target penghematan kecil setiap bulan agar tren tidak keluar dari proyeksi.',
    ],
    impact: {
      label: 'Kebutuhan tambahan',
      value: `sekitar ${fmt((last.f - first.f) * DAYS_PER_MONTH)} kWh per bulan`,
    },
  }
}

function ruleDeviceHealth() {
  const issues = devices.filter((d) => d.status !== 'online' || d.signal < -70)
  if (!issues.length) return null
  const worst = issues.reduce((m, d) => (d.signal < m.signal ? d : m))
  const latest = devices.map((d) => d.firmware).reduce((m, f) => (f.localeCompare(m) > 0 ? f : m))
  return {
    ...stub('device-health', 'device', 'high', 8),
    title: `Perbarui dan periksa ${worst.name}`,
    reason: `${worst.name} berstatus ${worst.status === 'warning' ? 'perlu diperiksa' : 'terputus'} dengan sinyal ${worst.signal} dBm, firmware ${worst.firmware} sementara node lain ${latest}, dan sinkronisasi terakhir ${worst.lastUpdate}.`,
    evidence: [
      `Sinyal ${worst.signal} dBm`,
      `Firmware ${worst.firmware}`,
      `Sinkron ${worst.lastUpdate}`,
    ],
    actions: [
      `Periksa jarak dan posisi node di ${worst.location} terhadap router, atau tambahkan repeater bila perlu.`,
      `Tingkatkan firmware ke ${latest} agar logger dan ambang deteksi konsisten dengan node lain.`,
      'Sesuaikan pengaturan idle time agar logger tidak memutus sinkronisasi saat trafik menurun.',
    ],
    impact: {
      label: 'Node terdampak',
      value: `${issues.length} dari ${devices.length} node`,
    },
  }
}

const ALERT_DOMAIN = [
  { test: /listrik|energi|malam/i, domain: 'electricity' },
  { test: /air|aliran/i, domain: 'water' },
]

const ALERT_PLAYBOOK = {
  critical: [
    'Konfirmasi langsung di lapangan pada {location} sebelum akhir shift.',
    'Hentikan sementara sumber beban penyebab, lalu ukur ulang konsumsi pada node terkait.',
    'Tetapkan penanggung jawab dan target penyelesaian untuk hari ini.',
  ],
  warning: [
    'Verifikasi apakah ini perilaku normal atau kenaikan kecil pada {location}.',
    'Bandingkan dengan node lain pada jam yang sama untuk mempersempit sumbernya.',
    'Tutup peringatan bila tidak berulang dalam 24 jam berikutnya, atau eskalasi bila berulang.',
  ],
}

function ruleOpenAlerts() {
  return alerts
    .filter((a) => a.status !== 'Ditangani')
    .map((a, i) => {
      const domain = ALERT_DOMAIN.find((m) => m.test.test(a.title))?.domain ?? 'alert'
      const isWater = domain === 'water'
      const source = isWater ? kpi.waterToday : kpi.electricityToday
      const share = Math.abs(Number.parseFloat(source.delta)) / 100
      const saving = monthly(share * Number.parseFloat(source.value), 1)
      return {
        ...stub(
          `open-alert-${a.id}`,
          domain,
          a.level === 'critical' ? 'high' : 'medium',
          9 + a.id / 10 + i / 100
        ),
        title: `Tangani ${a.title.toLowerCase()} di ${a.location}`,
        reason: `Peringatan pada ${a.time} di ${a.location} berstatus ${a.status}. Level ${a.level === 'critical' ? 'kritis' : 'peringatan'} memerlukan ${a.level === 'critical' ? 'konfirmasi lapangan dan penyelesaian hari ini' : 'rencana tindak lanjut beserta penanggung jawabnya'}.`,
        evidence: [
          `Terdeteksi ${a.time}`,
          `Lokasi ${a.location}`,
          `Status ${a.status}`,
        ],
        actions: ALERT_PLAYBOOK[a.level].map((step) => fill(step, { location: a.location })),
        impact: {
          label: isWater ? 'Potensi penghematan air' : 'Potensi penghematan listrik',
          value: `sekitar ${fmt(saving)} ${isWater ? 'm³' : 'kWh'} per bulan`,
        },
        source: { alertId: a.id, label: a.title },
      }
    })
}

const rules = [
  ruleDeviceHealth,
  ruleOpenAlerts,
  ruleNightElectricity,
  rulePeakElectricity,
  ruleNightWater,
  rulePeakWater,
  ruleForecast,
  ruleTrend,
  ruleWeekendOpportunity,
]

export function buildRecommendations() {
  return rules
    .flatMap((rule) => rule() ?? [])
    .sort(
      (a, b) => priorityMeta[a.priority].order - priorityMeta[b.priority].order || b.weight - a.weight
    )
}

export const recommendations = buildRecommendations()

export function summaryCounts(list = recommendations) {
  return list.reduce(
    (acc, rec) => ({ ...acc, total: acc.total + 1, [rec.priority]: acc[rec.priority] + 1 }),
    { total: 0, high: 0, medium: 0, low: 0 }
  )
}