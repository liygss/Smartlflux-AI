export const kpi = {
  electricityToday: { value: '125.4 kWh', delta: '-8.2%', trend: 'down', good: true },
  waterToday: { value: '45.6 m³', delta: '-6.7%', trend: 'down', good: true },
  activeAlerts: { value: '3', delta: '2 critical', trend: 'flat', good: false },
  deviceStatus: { value: '3 / 3', sublabel: 'Node Online', good: true },
}

export const realtimeElectricity = [
  { t: '12:00', v: 220.1, i: 5.1, p: 1.12 },
  { t: '12:10', v: 220.4, i: 5.4, p: 1.19 },
  { t: '12:20', v: 219.8, i: 5.7, p: 1.25 },
  { t: '12:30', v: 220.3, i: 5.3, p: 1.17 },
  { t: '12:40', v: 220.6, i: 5.9, p: 1.3 },
  { t: '12:50', v: 220.2, i: 6.1, p: 1.34 },
  { t: '13:00', v: 219.9, i: 5.8, p: 1.28 },
]

export const electricityHourly = [
  { t: '00:00', e: 10 },
  { t: '03:00', e: 7 },
  { t: '06:00', e: 18 },
  { t: '09:00', e: 30 },
  { t: '12:00', e: 35 },
  { t: '15:00', e: 33 },
  { t: '18:00', e: 52 },
  { t: '21:00', e: 45 },
  { t: '24:00', e: 48 },
]

export const electricityDaily = [
  { d: 'Sen', e: 118 },
  { d: 'Sel', e: 124 },
  { d: 'Rab', e: 112 },
  { d: 'Kam', e: 130 },
  { d: 'Jum', e: 122 },
  { d: 'Sab', e: 96 },
  { d: 'Min', e: 88 },
]

export const electricityWeekly = [
  { w: 'W1', e: 810 },
  { w: 'W2', e: 860 },
  { w: 'W3', e: 830 },
  { w: 'W4', e: 905 },
]

export const electricityMonthly = [
  { m: 'Feb', e: 3200 },
  { m: 'Mar', e: 3400 },
  { m: 'Apr', e: 3350 },
  { m: 'Mei', e: 3650 },
  { m: 'Jun', e: 3820 },
  { m: 'Jul', e: 3720 },
]

export const waterFlow = [
  { t: '12:00', f: 11.8 },
  { t: '12:10', f: 12.2 },
  { t: '12:20', f: 13.1 },
  { t: '12:30', f: 12.5 },
  { t: '12:40', f: 12.9 },
  { t: '12:50', f: 13.4 },
  { t: '13:00', f: 12.4 },
]

export const waterHourly = [
  { t: '00:00', v: 3 },
  { t: '03:00', v: 2 },
  { t: '06:00', v: 6 },
  { t: '09:00', v: 9 },
  { t: '12:00', v: 10 },
  { t: '15:00', v: 12 },
  { t: '18:00', v: 14 },
  { t: '21:00', v: 11 },
  { t: '24:00', v: 8 },
]

export const waterDaily = [
  { d: 'Sen', v: 41 },
  { d: 'Sel', v: 45 },
  { d: 'Rab', v: 42 },
  { d: 'Kam', v: 47 },
  { d: 'Jum', v: 44 },
  { d: 'Sab', v: 38 },
  { d: 'Min', v: 34 },
]

export const waterMonthly = [
  { m: 'Feb', v: 1150 },
  { m: 'Mar', v: 1230 },
  { m: 'Apr', v: 1190 },
  { m: 'Mei', v: 1280 },
  { m: 'Jun', v: 1360 },
  { m: 'Jul', v: 1310 },
]

export const forecast = [
  { m: 'Agu', a: 130, f: 132 },
  { m: 'Sep', a: null, f: 137 },
  { m: 'Okt', a: null, f: 138 },
  { m: 'Nov', a: null, f: 136 },
  { m: 'Des', a: null, f: 140 },
]

export const alerts = [
  {
    id: 1,
    level: 'critical',
    title: 'High Electricity Usage',
    location: 'Panel Listrik LT.2',
    time: '10:23',
    status: 'Unresolved',
  },
  {
    id: 2,
    level: 'warning',
    title: 'High Water Usage',
    location: 'Gedung A',
    time: '09:15',
    status: 'Unresolved',
  },
  {
    id: 3,
    level: 'warning',
    title: 'Potential Anomaly — night consumption',
    location: 'Sayap Kamar A',
    time: '02:40',
    status: 'Reviewed',
  },
  {
    id: 4,
    level: 'normal',
    title: 'System Normal',
    location: 'SmartFlux Node 01',
    time: '08:45',
    status: 'Resolved',
  },
  {
    id: 5,
    level: 'warning',
    title: 'Above baseline 3 days',
    location: 'Utility Room',
    time: '12:00',
    status: 'In Progress',
  },
]

export const devices = [
  {
    id: 'SF-NODE-001',
    name: 'SmartFlux Node 01',
    location: 'Panel LT.1',
    connection: 'Wi-Fi',
    lastUpdate: '5 sec ago',
    status: 'online',
    signal: -58,
    firmware: 'v2.4.1',
    ip: '192.168.1.21',
    sensors: ['Listrik', 'Air'],
    lastSync: '12:04:33',
  },
  {
    id: 'SF-NODE-002',
    name: 'SmartFlux Node 02',
    location: 'Panel LT.2',
    connection: 'Wi-Fi',
    lastUpdate: '8 sec ago',
    status: 'online',
    signal: -62,
    firmware: 'v2.4.1',
    ip: '192.168.1.22',
    sensors: ['Listrik'],
    lastSync: '12:04:31',
  },
  {
    id: 'SF-NODE-003',
    name: 'SmartFlux Node 03',
    location: 'Utility Room',
    connection: 'Wi-Fi',
    lastUpdate: '2 min ago',
    status: 'warning',
    signal: -74,
    firmware: 'v2.3.9',
    ip: '192.168.1.23',
    sensors: ['Air'],
    lastSync: '12:02:10',
  },
]

export const analyticsTrend = [
  { m: 'Feb', l: 3200, w: 1150 },
  { m: 'Mar', l: 3400, w: 1230 },
  { m: 'Apr', l: 3350, w: 1190 },
  { m: 'Mei', l: 3650, w: 1280 },
  { m: 'Jun', l: 3820, w: 1360 },
  { m: 'Jul', l: 3720, w: 1310 },
]

export const energyKpi = [
  { label: 'Voltage', value: '220.5 V', tone: 'blue' },
  { label: 'Current', value: '5.68 A', tone: 'indigo' },
  { label: 'Power', value: '1.25 kW', tone: 'teal' },
  { label: 'Energy Today', value: '125.4 kWh', tone: 'green' },
  { label: 'Power Factor', value: '0.98', tone: 'cyan' },
]

export const waterKpi = [
  { label: 'Flow Rate', value: '12.4 L/mnt', tone: 'cyan' },
  { label: 'Total Today', value: '45.6 m³', tone: 'teal' },
  { label: 'Daily Average', value: '41.2 m³', tone: 'green' },
  { label: 'Peak Consumption', value: '14 m³', tone: 'indigo' },
]

export const recommendations = [
  {
    type: 'electricity',
    title: 'Electricity Recommendation',
    text: 'Konsumsi listrik meningkat 18% pada pukul 22:00–01:00 dibandingkan baseline. Periksa peralatan yang tetap aktif setelah jam operasional.',
  },
  {
    type: 'water',
    title: 'Water Recommendation',
    text: 'Penggunaan air pada pukul 01:00–03:00 berada di atas pola normal. Lakukan pengecekan pada area dengan penggunaan air kontinu.',
  },
]

export const efficiency = { score: 82, level: 'Efficient' }
