# IF133 — Pemrograman .NET

Portal perkuliahan statis untuk mata kuliah **IF133 Pemrograman .NET** (Semester Ganjil 2026/2027) di Institut Teknologi Tangerang Selatan.

## Fitur
- Informasi course dan kelas
- Jadwal 16 pertemuan
- Ringkasan materi tiap pertemuan
- Daftar tugas, kuis, UTS, dan UAS
- Bobot penilaian
- Pencarian/filter materi
- Tampilan responsif dan siap deploy ke Vercel

## Kelas
- Reguler — Selasa, 13:00–15:15 WIB — Lab 1
- Eksekutif — Selasa, 19:00–21:30 WIB — Zoom

> Catatan: user menyebut tiga kelas, tetapi saat ini hanya dua jadwal kelas yang diberikan. Struktur data aplikasi sudah mudah ditambah untuk kelas ketiga melalui `course-data.js`.

## Deployment ke Vercel
Repository ini menggunakan HTML/CSS/JavaScript statis, sehingga dapat di-import langsung ke Vercel tanpa build framework.

1. Import repository ini di Vercel.
2. Framework Preset: **Other**.
3. Build Command: kosong.
4. Output Directory: kosong / root.
5. Deploy.

## Struktur
- `index.html` — halaman utama portal
- `styles.css` — tampilan responsif
- `course-data.js` — data kelas, jadwal, materi, tugas, dan penilaian
- `app.js` — interaksi UI
- `vercel.json` — konfigurasi hosting statis

## Dosen
Taufik Iqbal Ramdhani, S.Kom., M.Sc.
