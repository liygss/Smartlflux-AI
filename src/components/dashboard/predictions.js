import { electricityDaily, electricityWeekly, forecast, waterDaily, waterMonthly } from './data'

const round = (n, d = 1) => Math.round(n * 10 ** d) / 10 ** d
const mean = (rows) => rows.reduce((s, r) => s + r, 0) / rows.length
const stdev = (rows) => {
  const avg = mean(rows)
  const variance = rows.reduce((s, r) => s + (r - avg) ** 2, 0) / (rows.length - 1)
  return Math.sqrt(variance)
}
const fmt = (n) => `${round(n)}`.replace('.', ',')
const MONTHS = ['Agu', 'Sep', 'Okt', 'Nov', 'Des']
const DAYS_PER_MONTH = 30
const BAND_FACTOR = 1.2

function linearFit(values) {
  const xs = values.map((_, i) => i)
  const xBar = mean(xs)
  const yBar = mean(values)
  const sxy = values.reduce((s, y, i) => s + (i - xBar) * (y - yBar), 0)
  const sxx = xs.reduce((s, x) => s + (x - xBar) ** 2, 0)
  const slope = sxy / sxx
  const intercept = yBar - slope * xBar
  const residuals = values.map((y, i) => y - (intercept + slope * i))
  return { slope, intercept, xBar, sxx, residStd: stdev(residuals) }
}

function confidenceOf(value, lo, hi, horizonMonths = 0) {
  const width = (hi - lo) / value
  return Math.max(55, Math.min(97, Math.round(100 - width * 160 - horizonMonths * 1.2)))
}

export function confidenceMeta(score) {
  if (score >= 85)
    return { label: 'Tinggi', tone: 'bg-mint/15 text-mint', text: 'text-mint', dot: 'bg-mint' }
  if (score >= 70)
    return { label: 'Sedang', tone: 'bg-fx-warning/15 text-amber-300', text: 'text-amber-300', dot: 'bg-fx-warning' }
  return { label: 'Rendah', tone: 'bg-fx-critical/15 text-red-300', text: 'text-red-300', dot: 'bg-fx-critical' }
}

function buildWaterForecast() {
  const values = waterMonthly.map((row) => row.v)
  const fit = linearFit(values)
  return MONTHS.map((m, i) => {
    const step = i + 1
    const monthly = fit.intercept + fit.slope * (values.length - 1 + step)
    const daily = monthly / DAYS_PER_MONTH
    const band = (BAND_FACTOR * fit.residStd * Math.sqrt(1 + step)) / DAYS_PER_MONTH
    return {
      m,
      f: round(daily),
      lo: round(daily - band),
      hi: round(daily + band),
      confidence: confidenceOf(daily, daily - band, daily + band, step * 1.5),
    }
  })
}

export const waterForecast = buildWaterForecast()

function weekAhead(series, key, unit) {
  const values = series.map((row) => row[key])
  const daily = mean(values)
  const total = daily * 7
  const spread = stdev(values) * Math.sqrt(7)
  return {
    unit,
    daily: round(daily),
    total: round(total),
    lo: round(total - spread),
    hi: round(total + spread),
    confidence: confidenceOf(total, total - spread, total + spread),
    sample: values.length,
  }
}

export const weekAheadElectricity = weekAhead(electricityDaily, 'e', 'kWh')
export const weekAheadWater = weekAhead(waterDaily, 'v', 'm³')

function buildWeekTrend() {
  const values = electricityWeekly.map((row) => row.e)
  const fit = linearFit(values)
  const next = fit.intercept + fit.slope * values.length
  const spread = stdev(values) * Math.sqrt(2)
  return {
    unit: 'kWh',
    slope: round(fit.slope),
    previous: values[values.length - 1],
    next: round(next),
    lo: round(next - spread),
    hi: round(next + spread),
    confidence: confidenceOf(next, next - spread, next + spread, 0.5),
    sample: values.length,
  }
}

export const weekTrendElectricity = buildWeekTrend()

function elecMonthAhead() {
  const last = forecast[forecast.length - 1]
  const first = forecast.find((row) => row.a !== null) ?? forecast[0]
  const growth = Math.round(((last.f - first.f) / first.f) * 100)
  return {
    unit: 'kWh',
    from: { m: first.m, f: first.f },
    to: { m: last.m, f: last.f, lo: last.lo, hi: last.hi },
    growth,
    horizon: forecast.length,
    confidence: confidenceOf(last.f, last.lo, last.hi, forecast.length - 1),
  }
}

const elecMonth = elecMonthAhead()

function waterMonthAhead() {
  const first = waterForecast[0]
  const last = waterForecast[waterForecast.length - 1]
  const growth = Math.round(((last.f - first.f) / first.f) * 100)
  return {
    unit: 'm³',
    from: { m: first.m, f: first.f },
    to: { m: last.m, f: last.f, lo: last.lo, hi: last.hi },
    growth,
    horizon: waterForecast.length,
    confidence: last.confidence,
  }
}

const waterMonth = waterMonthAhead()

export const predictions = [
  {
    id: 'elec-week',
    domain: 'electricity',
    horizon: '7 hari',
    title: 'Pemakaian listrik 7 hari ke depan',
    value: `${fmt(weekAheadElectricity.total)} ${weekAheadElectricity.unit}`,
    range: `${fmt(weekAheadElectricity.lo)} sampai ${fmt(weekAheadElectricity.hi)} ${weekAheadElectricity.unit}`,
    confidence: weekAheadElectricity.confidence,
    trend: 'flat',
    basis: `${weekAheadElectricity.sample} hari terakhir (${electricityDaily[0].d} sampai ${electricityDaily[electricityDaily.length - 1].d})`,
    method: 'Rata-rata harian dikalikan 7, dengan rentang dari simpangan baku data harian.',
    detail: `Rata-rata harian ${fmt(weekAheadElectricity.daily)} kWh. Prediksi memakai pola mingguan yang sudah terlihat pada data, sehingga hari kerja dan akhir pekan ikut tercermin dalam rata-ratanya.`,
  },
  {
    id: 'water-week',
    domain: 'water',
    horizon: '7 hari',
    title: 'Pemakaian air 7 hari ke depan',
    value: `${fmt(weekAheadWater.total)} ${weekAheadWater.unit}`,
    range: `${fmt(weekAheadWater.lo)} sampai ${fmt(weekAheadWater.hi)} ${weekAheadWater.unit}`,
    confidence: weekAheadWater.confidence,
    trend: 'flat',
    basis: `${weekAheadWater.sample} hari terakhir (${waterDaily[0].d} sampai ${waterDaily[waterDaily.length - 1].d})`,
    method: 'Rata-rata harian dikalikan 7, dengan rentang dari simpangan baku data harian.',
    detail: `Rata-rata harian ${fmt(weekAheadWater.daily)} m³. Karena pemakaian air lebih stabil daripada listrik, rentang prediksinya lebih sempit.`,
  },
  {
    id: 'elec-week-trend',
    domain: 'electricity',
    horizon: '4 minggu',
    title: `Tren mingguan listrik ${weekTrendElectricity.slope > 0 ? 'naik' : 'turun'}`,
    value: `${fmt(weekTrendElectricity.next)} ${weekTrendElectricity.unit} / minggu`,
    range: `${fmt(weekTrendElectricity.lo)} sampai ${fmt(weekTrendElectricity.hi)} ${weekTrendElectricity.unit}`,
    confidence: weekTrendElectricity.confidence,
    trend: weekTrendElectricity.slope > 0 ? 'up' : 'down',
    basis: `${weekTrendElectricity.sample} minggu terakhir, tren ${weekTrendElectricity.slope > 0 ? '+' : ''}${fmt(weekTrendElectricity.slope)} kWh per minggu`,
    method: 'Regresi linier terhadap total mingguan, lalu diekstrapolasi satu minggu ke depan.',
    detail: `Minggu terakhir tercatat ${fmt(weekTrendElectricity.previous)} kWh. Dengan kemiringan ${weekTrendElectricity.slope > 0 ? '+' : ''}${fmt(weekTrendElectricity.slope)} kWh per minggu, minggu depan diperkirakan ${fmt(weekTrendElectricity.next)} kWh.`,
  },
  {
    id: 'elec-month',
    domain: 'electricity',
    horizon: `${elecMonth.horizon} bulan`,
    title: `Proyeksi listrik ${elecMonth.from.m} sampai ${elecMonth.to.m}`,
    value: `${fmt(elecMonth.to.f)} ${elecMonth.unit} / hari`,
    range: `${fmt(elecMonth.to.lo)} sampai ${fmt(elecMonth.to.hi)} ${elecMonth.unit} per hari`,
    confidence: elecMonth.confidence,
    trend: elecMonth.growth > 0 ? 'up' : 'flat',
    basis: `${elecMonth.from.m} aktual ${fmt(elecMonth.from.f)} ${elecMonth.unit}, ${elecMonth.to.m} proyeksi ${fmt(elecMonth.to.f)} ${elecMonth.unit}`,
    method: 'Model prakiraan musiman dengan pita ketidakpastian yang melebar seiring panjangnya horizon.',
    detail: `Konsumsi harian diproyeksikan naik ${elecMonth.growth}% dari ${elecMonth.from.f} kWh pada ${elecMonth.from.m} menjadi ${fmt(elecMonth.to.f)} kWh pada ${elecMonth.to.m}. Pita ${fmt(elecMonth.to.lo)} sampai ${fmt(elecMonth.to.hi)} kWh menyatakan batas-keyakinan prakiraan, bukan target konsumsi.`,
  },
  {
    id: 'water-month',
    domain: 'water',
    horizon: `${waterMonth.horizon} bulan`,
    title: `Proyeksi air ${waterMonth.from.m} sampai ${waterMonth.to.m}`,
    value: `${fmt(waterMonth.to.f)} ${waterMonth.unit} / hari`,
    range: `${fmt(waterMonth.to.lo)} sampai ${fmt(waterMonth.to.hi)} ${waterMonth.unit} per hari`,
    confidence: waterMonth.confidence,
    trend: waterMonth.growth > 0 ? 'up' : 'flat',
    basis: `${waterMonthly.length} bulan terakhir, ${waterMonthly[waterMonthly.length - 1].m} tercatat ${waterMonthly[waterMonthly.length - 1].v} m³ per bulan`,
    method: 'Regresi linier volume bulanan, dikonversi ke satuan harian dengan pita yang melebar per langkah.',
    detail: `Volume harian diproyeksikan naik ${waterMonth.growth}% dari ${fmt(waterMonth.from.f)} m³ pada ${waterMonth.from.m} menjadi ${fmt(waterMonth.to.f)} m³ pada ${waterMonth.to.m}. Proyeksi ini diturunkan dari tren historis karena belum ada model prakiraan air terpisah.`,
  },
]

export const domainMeta = {
  electricity: { label: 'Listrik' },
  water: { label: 'Air' },
}

export function summaryByHorizon(list = predictions) {
  return list.reduce((acc, p) => {
    const existing = acc.find((row) => row.horizon === p.horizon)
    if (existing) existing.count += 1
    else acc.push({ horizon: p.horizon, count: 1 })
    return acc
  }, [])
}