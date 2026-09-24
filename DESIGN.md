# DESIGN.md - SmartFlux AI

Arah desain web + dashboard, ditranskripsi dari keputusan pemilik produk (2026-09-23).

## Identity
B2B energy/water monitoring untuk facility manager. Premium, presisi, dapat diandalkan. Kesan: enterprise-grade monitoring tool, bukan aplikasi konsumen.

## Palette
- Core 1: Navy `#17365d` - heading, sidebar, nilai utama, icon tile solid
- Core 2: Neutral (white, mist `#f6f8fb`, slate `#5c6a7d`)
- Accent: Azure `#1e6fe0` - aksen utama, interaksi, listrik
- Teal `#0ea5a0` - coding data air
- Status (bukan dekorasi): emerald (normal/online), amber (warning), rose (critical)

Prinsip: maksimal 2 core + 1 accent. Warna status hanya dipakai untuk state.
Icon tile solid naval/azur, tidak ada gradient dekoratif.

## Typography
- Display/angka: Manrope, bold, tabular-nums agar angka stabil
- Body: Inter
- Angka KPI satu warna solid (navy), bukan teks gradien

## Layout & Surface
- Kartu: hairline border `#e8ebf1`, radius xl, shadow halus, hover ringan (`.dash-card` / komponen `Card`)
- Sidebar/flat dark surfaces: navy-deep solid, tanpa grid textur & orbs
- Background datar (mist/white), tanpa orbs/streak/grain mesh
- Glass hanya 1-2 elemen (flow strip hero), bukan default
- Segmented control konsisten untuk range/filter (`.segmented`)

## Dial
- ENERGY 2 / RHYTHM 2 / MOTION 1 (hover states + reveal saat scroll; tanpa animasi loop dekoratif seperti orb/float/pulse abadi)

## Rules
- Landing dan dashboard berbagi bahasa visual yang sama
- Data demo tetap ditandai `Data demo` / `Contoh testimoni · demo` (placeholder jujur)
- Bahasa tampilan: Bahasa Indonesia; istilah teknis baku (Wi-Fi, Firmware, IP, kWh/unit) dipertahankan
- Tema terang sebagai default (enterprise light)