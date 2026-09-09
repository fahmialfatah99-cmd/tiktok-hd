# 🎬 TikTok Upload Tool - Upload dengan Kualitas Asli

Tools web lengkap untuk memastikan video kamu di-upload ke TikTok dengan kualitas terbaik. Analisis video, auto-generate FFmpeg command, custom preset, dan panduan step-by-step.

![TikTok Upload Tool](https://img.shields.io/badge/React-18.2.0-61dafb?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8?style=for-the-badge&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-6.4-646cff?style=for-the-badge&logo=vite)

## ✨ Fitur Utama

### 1. 📤 Upload & Analisis Video
- **Drag & drop** atau klik untuk upload video
- **Preview video** langsung di browser
- **Analisis otomatis**:
  - Resolusi video
  - Bitrate
  - Durasi
  - Aspect ratio
  - Ukuran file
- **Status kualitas** dengan indikator visual (✅ Good, ⚠️ Warning, ❌ Bad)
- **Settings optimal** untuk TikTok yang bisa di-copy

### 2. 🪄 Auto Generate FFmpeg Command (NEW!)
Fitur cerdas yang otomatis menganalisis video dan menghasilkan command FFmpeg yang sesuai:

- **Membaca metadata** video yang di-upload
- **Rekomendasi kualitas** berdasarkan bitrate sumber
- **4 preset generate** sekaligus:
  - 🎯 Optimal TikTok
  - ✨ High Quality
  - 📦 Compressed
  - 🔧 Custom (dari settings yang dipilih)
- **Opsi yang bisa disesuaikan**:
  - Target resolusi (1080x1920, 1080x1080, 1920x1080, 720x1280)
  - Frame rate (24/30/60 fps)
  - Kualitas (Maximum CRF 15 / High CRF 18 / Balanced CRF 20 / Small CRF 23)
  - Audio bitrate (128-320 kbps)
  - Mode resize (Pad/Crop/Stretch)
  - Toggle: Sharpening & Normalize Audio
- **Copy to clipboard** untuk setiap command

### 3. 🎨 Custom Preset Template (NEW!)
Fitur lengkap untuk membuat dan mengelola preset encoding:

- **6 preset bawaan**:
  - TikTok Optimal
  - TikTok Maximum Quality
  - TikTok 60fps Smooth
  - TikTok Small File
  - Instagram Reels
  - YouTube Shorts
- **Buat preset baru** dengan form lengkap
- **Edit preset** langsung (semua parameter bisa diubah)
- **Favoritkan preset** (⭐) untuk akses cepat
- **Hapus preset** custom
- **Export/Import** preset sebagai file JSON (backup & restore)
- **12 parameter** yang bisa di-customize:
  - Codec (H.264, H.265, VP9)
  - Profile (Baseline, Main, High)
  - Level
  - Resolusi
  - FPS
  - CRF
  - Max Bitrate
  - Buffer Size
  - Preset Speed (Ultra Fast → Very Slow)
  - Audio Codec (AAC, MP3, Opus)
  - Audio Bitrate
  - Sample Rate
  - Pixel Format

### 4. 📚 Panduan Kualitas Lengkap
Panduan step-by-step untuk upload TikTok berkualitas:

- **Persiapan Video** - Tips sebelum rekam
- **Editing & Export** - Settings optimal untuk export
- **Sebelum Upload** - Checklist sebelum upload
- **Saat Upload** - Cara upload yang benar
- **Tips Tambahan** - Trik untuk kualitas maksimal

### 5. ✅ Checklist Upload Interaktif
24 item checklist yang bisa di-centang:

- Dikelompokkan per kategori:
  - Sebelum Rekam
  - Export Settings
  - Sebelum Upload
  - Settings TikTok
  - Setelah Upload
- **Progress bar** real-time
- **Item penting** ditandai bintang ⭐
- **Reset checklist** kapan saja

### 6. ⚙️ FFmpeg Commands Ready-to-Use
7 command FFmpeg siap pakai:

- 🎯 Basic - Convert ke Format TikTok Optimal
- ✨ High Quality - Kualitas Maksimal
- 🎮 60fps - Smooth Motion
- 📱 Crop ke 9:16 dari Video Landscape
- 🔍 Sharpen - Pertajam Video
- 📦 Compress Aman - Kurangi Ukuran Tanpa Lose Quality
- 🔎 Analyze - Cek Info Video

Plus:
- **Preset video editor** populer (Adobe Premiere, DaVinci Resolve, CapCut)
- **Penjelasan parameter** penting
- **Alternatif GUI** (HandBrake, Shutter Encoder, FFmpeg Batch)

## 🚀 Cara Install & Menjalankan

### Prerequisites
- Node.js 18+ 
- npm atau yarn

### Installation

```bash
# Clone repository
git clone <repository-url>
cd tiktok-upload-tool

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`

### Production Build

```bash
npm run build
```

File build akan ada di folder `dist/`

## 📖 Cara Menggunakan

### Tab 1: Upload & Analisis
1. Upload video dengan drag & drop atau klik area upload
2. Lihat preview video dan analisis otomatis
3. Cek status kualitas (resolusi, bitrate, aspect ratio, durasi)
4. Lihat settings optimal untuk TikTok
5. Copy settings jika perlu

### Tab 2: Auto Generate (NEW!)
1. Upload video di tab "Upload & Analisis" terlebih dahulu
2. Pindah ke tab "Auto Generate"
3. Sesuaikan opsi sesuai kebutuhan:
   - Pilih target resolusi
   - Pilih frame rate
   - Pilih kualitas
   - Pilih audio bitrate
   - Pilih mode resize
   - Toggle sharpening/normalize audio jika perlu
4. Lihat 4 command yang di-generate otomatis
5. Copy command yang sesuai
6. Buka terminal, navigasi ke folder video, paste command

### Tab 3: Custom Preset (NEW!)
1. Lihat preset bawaan yang tersedia
2. Klik ⭐ untuk favoritkan preset
3. Klik ✏️ untuk edit preset
4. Klik "+" untuk buat preset baru
5. Sesuaikan semua parameter sesuai kebutuhan
6. Simpan preset
7. Export preset untuk backup
8. Import preset dari file JSON

### Tab 4: Panduan
Baca panduan lengkap step-by-step untuk upload berkualitas

### Tab 5: Checklist
Centang semua item sebelum upload untuk memastikan kualitas optimal

### Tab 6: FFmpeg
Lihat dan copy command FFmpeg ready-to-use

## 🎯 Settings Optimal untuk TikTok

### Video
- **Resolusi**: 1080 × 1920 px (9:16 Portrait)
- **Codec**: H.264 (AVC)
- **Profile**: High
- **Level**: 4.2
- **Bitrate**: 8-15 Mbps (CBR)
- **Frame Rate**: 30 fps atau 60 fps
- **Keyframe Interval**: 2 detik
- **Pixel Format**: yuv420p

### Audio
- **Codec**: AAC
- **Sample Rate**: 44100 Hz
- **Bitrate**: 128-256 kbps
- **Channels**: Stereo (2ch)

### Container
- **Format**: MP4
- **Max Size**: 287.6 MB

## 🛠️ Teknologi yang Digunakan

- **React 18.2.0** - UI Framework
- **TypeScript** - Type Safety
- **Vite 6.4** - Build Tool
- **Tailwind CSS 4.1** - Styling
- **Framer Motion** - Animasi
- **Lucide React** - Icons

## 📁 Struktur Project

```
tiktok-upload-tool/
├── src/
│   ├── components/
│   │   ├── VideoUploader.tsx       # Komponen upload video
│   │   ├── VideoInfo.tsx           # Analisis & info video
│   │   ├── SettingsPanel.tsx       # Settings optimal TikTok
│   │   ├── FFmpegGenerator.tsx     # Auto-generate FFmpeg (NEW!)
│   │   ├── PresetTemplate.tsx      # Custom preset manager (NEW!)
│   │   ├── QualityGuide.tsx        # Panduan kualitas
│   │   ├── UploadChecklist.tsx     # Checklist interaktif
│   │   └── FFmpegGuide.tsx         # FFmpeg commands & docs
│   ├── App.tsx                     # Main app component
│   ├── main.tsx                    # Entry point
│   └── index.css                   # Global styles
├── public/                         # Static assets
├── dist/                           # Production build
├── index.html                      # HTML template
├── package.json                    # Dependencies
├── tsconfig.json                   # TypeScript config
├── vite.config.js                  # Vite config
└── README.md                       # This file
```

## 💡 Tips Upload TikTok Berkualitas

1. **Rekam dengan kualitas tinggi** - Minimum 1080p dengan pencahayaan baik
2. **Export dengan settings optimal** - Gunakan H.264, 1080x1920, 30fps, 10Mbps
3. **Aktifkan "Upload HD"** di TikTok settings
4. **Upload via WiFi** - Hindari upload via data seluler
5. **Gunakan file asli** - Jangan transfer via WhatsApp/Line
6. **Cek hasil setelah publish** - Tonton video yang sudah di-upload

## 🎓 Penjelasan Parameter FFmpeg

- **`-crf 18`** - Constant Rate Factor. 18 = hampir lossless (range: 0-51)
- **`-maxrate 15M`** - Bitrate maksimum untuk mengontrol ukuran file
- **`-bufsize 30M`** - Buffer size untuk rate control (biasanya 2x maxrate)
- **`-profile:v high`** - H.264 profile High = kualitas terbaik
- **`-pix_fmt yuv420p`** - Pixel format paling kompatibel
- **`-movflags +faststart`** - Video bisa diputar sebelum download selesai
- **`-preset slow`** - Encoding speed (slow = kompresi lebih baik)

## 🤝 Kontribusi

Kontribusi selalu diterima! Silakan:

1. Fork repository
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📝 Lisensi

Project ini open source dan tersedia di bawah lisensi MIT.

## 🙏 Acknowledgments

- [FFmpeg](https://ffmpeg.org/) - Tool konversi video yang powerful
- [TikTok](https://www.tiktok.com/) - Platform video pendek
- [React](https://reactjs.org/) - UI Framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [Framer Motion](https://www.framer.com/motion/) - Animasi library
- [Lucide](https://lucide.dev/) - Icon library

## 📞 Support

Jika ada pertanyaan atau masalah, silakan buat issue di repository.

---

**Made with ❤️ for content creators**

*Pastikan kontenmu selalu tampil dengan kualitas terbaik!* 🎬✨
