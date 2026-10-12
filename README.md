# Portofolio — Celestyn Aurelixia (Lele)

Ini website portofolio pribadiku. Satu halaman, dark, nuansa ungu dengan aksen
emas. Semua efek visual dibuat dari CSS/SVG — tidak ada file gambar hiasan,
jadi halamannya ringan dan tidak bergantung pada aset luar.

Dibuat dengan Next.js (App Router), TypeScript, dan Tailwind.

## Menjalankan di komputer sendiri

Perlu Node.js 20 ke atas. Lalu:

```bash
npm install
npm run dev
```

Buka http://localhost:3000.

Untuk mengetes versi produksi sebelum deploy: `npm run build` lalu `npm start`.

## Mengubah isi tulisan

Hampir semua teks ada di satu tempat: `src/lib/content.ts` — nama, tagline,
skill, prestasi, pengalaman, pendidikan, dan link kontak. Ganti teks di dalam
tanda kutip, simpan, halaman langsung ikut berubah. Tulisan "personal_portfolio"
dan angka statistik di bagian atas ada di `src/components/Hero.tsx`.

Foto piagam ada di `public/certificates/`. Tiap prestasi di `content.ts` menunjuk
ke salah satu (atau beberapa) foto lewat field `certificates`.

## Isi folder

```
src/
  app/        layout, halaman utama, dan styling global
  components/ tiap bagian halaman (Hero, About, Skills, Achievements, dst.)
  lib/        content.ts — semua teks terpusat di sini
public/
  certificates/  scan piagam yang muncul di tombol "View certificate"
```

## Catatan

- Komponen SVG (ikon, monogram, konstelasi di hero) ditulis tangan sebagai kode,
  bukan gambar.
- Animasi dimatikan otomatis kalau sistem pengunjung menyalakan "reduce motion".
- Rencana nanti: menambah bagian Projects kalau sudah ada karya yang mau dipajang.
