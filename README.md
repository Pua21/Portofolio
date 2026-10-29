# Portofolio Developer & AI Specialist

Portofolio web interaktif modern yang dirancang dengan **Data-Driven Architecture** dan gaya visual **Dark Bento Grid**. Dibuat untuk menampilkan seluruh rekayasa perangkat lunak (Full-Stack Web, Mobile Apps, Enterprise ERP, Data Pipeline, dan Machine Learning) secara profesional kepada perekrut (HRD / Tech Lead).

---

## 🚀 Cara Menjalankan Secara Lokal (Preview)

Website ini dibuat seringan mungkin tanpa perlu install dependensi berat (`npm` atau framework rumit):

1. **Buka Langsung di Browser**:
   * Masuk ke folder: `C:\Users\BIBOSS\.gemini\antigravity\scratch\developer-portfolio`
   * Klik ganda pada file `index.html`.
2. **Atau Melalui Web Server Lokal (Laragon / Live Server)**:
   * Anda juga dapat meletakkannya di folder `d:\laragon\www\portofolio` dan membukanya via `http://localhost/portofolio`.

---

## ➕ Cara Menambahkan Project Baru di Masa Depan

Anda **TIDAK PERLU** mengedit file HTML! Cukup buka file:
📁 `data/projects.json`

Lalu tambahkan 1 blok objek project baru di dalam tanda kurung siku `[...]`:

```json
{
  "id": "nama-project-baru",
  "title": "Judul Aplikasi Baru",
  "category": "fullstack",
  "categoryLabel": "Full-Stack Web",
  "featured": false,
  "icon": "code",
  "summary": "Ringkasan 1-2 kalimat tentang fungsi aplikasi.",
  "description": "Deskripsi detail mengenai latar belakang dan solusi aplikasi.",
  "techStack": ["Next.js", "TypeScript", "Tailwind", "Supabase"],
  "features": [
    "Fitur unggulan 1",
    "Fitur unggulan 2",
    "Fitur unggulan 3"
  ],
  "challenges": "Tantangan teknis utama dan bagaimana Anda menyelesaikannya.",
  "localPath": "D:\\Projects\\ProjectBaru",
  "githubUrl": "https://github.com/username/repo",
  "liveDemoUrl": "https://demo.com"
}
```

Website akan secara otomatis me-render kartu baru, menghitung ulang metrik jumlah project, dan memperbarui sistem filter serta pencarian!

---

## 🌐 Panduan Hosting Online Agar Terlihat HRD

Perekrut (HRD) dan Tech Lead membutuhkan **tautan link online (HTTPS) yang cepat dan responsif**. Berikut adalah 2 cara hosting **100% GRATIS dan Standar Industri**:

### Opsi 1: GitHub Pages (Paling Direkomendasikan untuk Developer)

Nama domain Anda akan menjadi: `https://<username>.github.io` atau `https://<username>.github.io/portofolio`

1. **Buat Akun / Login di GitHub**:
   * Buka [github.com](https://github.com) dan buat repository baru bernama `portofolio` (pilih Public).
2. **Upload Berkas**:
   * Buka folder `C:\Users\BIBOSS\.gemini\antigravity\scratch\developer-portfolio`.
   * Upload seluruh isi folder (`index.html`, folder `data`, folder `css`, folder `js`) ke repository tersebut via Git atau tombol *Upload files*.
3. **Aktifkan GitHub Pages**:
   * Di halaman repository GitHub Anda, klik menu **Settings** (tab atas).
   * Pada menu sidebar sebelah kiri, klik **Pages**.
   * Di bagian **Build and deployment** $\rightarrow$ **Branch**, pilih branch `main` (atau `master`) dan folder `/ (root)`.
   * Klik **Save**.
4. **Selesai!** Dalam 1-2 menit, GitHub akan menampilkan link aktif website portofolio Anda.

---

### Opsi 2: Vercel (Paling Cepat & Deploy Otomatis)

1. Buka [vercel.com](https://vercel.com) dan login dengan akun GitHub Anda.
2. Klik tombol **Add New...** $\rightarrow$ **Project**.
3. Pilih repository `portofolio` yang sudah Anda buat di GitHub.
4. Klik tombol **Deploy**.
5. Vercel akan otomatis memberikan domain instan berkecapatan tinggi: `https://portofolio-anda.vercel.app`.

---

## 🎯 Tips Presentasi ke HRD

1. **Cantumkan di Header Resume/CV**: Letakkan link portofolio Anda tepat di bawah nama dan nomor kontak (contoh: `Portofolio: https://namaanda.github.io`).
2. **Pasang di Profil LinkedIn**: Cantumkan pada bagian *Featured* atau di bio headline profil LinkedIn Anda.
3. **Siapkan Repository GitHub**: Untuk 3 project unggulan (*TrueCounting Solution*, *Customer Churn ML Dashboard*, dan *Smart Charging*), pastikan kode Anda di-push ke GitHub agar HRD dan technical interviewer dapat melihat kerapian struktur kode Anda.

