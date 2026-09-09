import { motion } from 'framer-motion';
import { Lightbulb, Camera, Monitor, Zap, Upload, Eye, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

export default function QualityGuide() {
  const guides = [
    {
      title: '1. Persiapan Video',
      icon: Camera,
      color: 'from-pink-400 to-red-400',
      tips: [
        { text: 'Rekam dengan resolusi minimum 1080p (1920x1080)', detail: 'Semakin tinggi resolusi sumber, semakin baik hasilnya setelah di-compress TikTok.' },
        { text: 'Gunakan pencahayaan yang baik', detail: 'Video dengan noise tinggi akan terlihat lebih buruk setelah kompresi. Pastikan lighting cukup.' },
        { text: 'Stabilkan kamera', detail: 'Video yang shaky akan terlihat lebih buruk setelah kompresi. Gunakan tripod atau stabilizer.' },
        { text: 'Hindari zoom digital berlebihan', detail: 'Zoom digital mengurangi detail yang sudah berkurang saat kompresi.' },
      ],
    },
    {
      title: '2. Editing & Export',
      icon: Monitor,
      color: 'from-blue-400 to-cyan-400',
      tips: [
        { text: 'Export di resolusi 1080x1920 (9:16)', detail: 'Jangan export lebih tinggi dari 1080p karena TikTok akan tetap compress ke 1080p.' },
        { text: 'Gunakan codec H.264 High Profile', detail: 'H.264 adalah codec yang paling kompatibel. H.265/HEVC mungkin tidak didukung semua device.' },
        { text: 'Set bitrate 8-15 Mbps', detail: 'Bitrate terlalu rendah = kualitas buruk. Terlalu tinggi = file besar tapi tetap di-compress TikTok.' },
        { text: 'Gunakan CBR (Constant Bitrate)', detail: 'CBR memberikan kualitas yang konsisten di seluruh video, lebih baik dari VBR untuk upload.' },
        { text: 'Render di 30fps atau 60fps', detail: '30fps untuk konten normal, 60fps untuk slow-mo atau gaming content.' },
      ],
    },
    {
      title: '3. Sebelum Upload',
      icon: Zap,
      color: 'from-yellow-400 to-orange-400',
      tips: [
        { text: 'Aktifkan "Upload HD" di TikTok', detail: 'Buka Settings > Privacy > Upload HD. Pastikan toggle ini AKTIF sebelum upload.' },
        { text: 'Gunakan koneksi WiFi yang stabil', detail: 'Upload via WiFi mengurangi risiko corrupt dan memastikan file ter-upload sempurna.' },
        { text: 'Hindari upload saat network sibuk', detail: 'Upload di jam sepi untuk menghindari throttling dari ISP.' },
        { text: 'Jangan gunakan data saver mode', detail: 'Data saver mode di TikTok akan menurunkan kualitas upload secara otomatis.' },
        { text: 'Update TikTok ke versi terbaru', detail: 'Versi terbaru biasanya memiliki encoder yang lebih baik.' },
      ],
    },
    {
      title: '4. Saat Upload',
      icon: Upload,
      color: 'from-green-400 to-emerald-400',
      tips: [
        { text: 'Upload langsung dari galeri, jangan dari WhatsApp/Line', detail: 'Transfer via messaging app akan compress video. Selalu gunakan file asli.' },
        { text: 'Tunggu proses upload selesai 100%', detail: 'Jangan tutup app sebelum upload benar-benar selesai.' },
        { text: 'Periksa hasil setelah publish', detail: 'Tonton video yang sudah di-publish untuk memastikan kualitasnya baik.' },
        { text: 'Gunakan TikTok dari browser untuk kontrol lebih', detail: 'Upload via tiktok.com kadang memberikan kontrol kualitas yang lebih baik.' },
      ],
    },
    {
      title: '5. Tips Tambahan',
      icon: TrendingUp,
      color: 'from-purple-400 to-pink-400',
      tips: [
        { text: 'Hindari filter/color grade berlebihan', detail: 'Efek berlebihan akan terlihat artifact setelah kompresi.' },
        { text: 'Hindari teks kecil yang terlalu detail', detail: 'Teks kecil akan blur setelah kompresi. Gunakan teks yang cukup besar.' },
        { text: 'Gunakan sharpness yang tepat', detail: 'Terlalu tajam = noise. Kurang tajam = blurry. Cari balance yang pas.' },
        { text: 'Test upload dengan video pendek dulu', detail: 'Coba upload video 15 detik untuk test kualitas sebelum upload video panjang.' },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Important Notice */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-2xl p-5"
      >
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-yellow-400">Penting: TikTok Selalu Melakukan Kompresi</h3>
            <p className="text-sm text-gray-400 mt-1">
              TikTok akan selalu meng-compress video yang di-upload. Tujuan kita adalah memberikan video dengan kualitas 
              terbaik sehingga hasil compress tetap terlihat bagus. Video yang sudah berkualitas rendah akan terlihat 
              sangat buruk setelah dikompresi TikTok.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Guide Sections */}
      <div className="space-y-4">
        {guides.map((guide, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-5"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${guide.color} flex items-center justify-center`}>
                <guide.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-lg">{guide.title}</h3>
            </div>
            <div className="space-y-3">
              {guide.tips.map((tip, j) => (
                <div key={j} className="flex items-start gap-3 bg-white/5 rounded-xl p-3">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">{tip.text}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{tip.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-5"
      >
        <div className="flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-cyan-400">Kesimpulan</h3>
            <p className="text-sm text-gray-400 mt-1">
              Kunci upload TikTok berkualitas: <strong className="text-white">Rekam bagus → Export optimal → Upload dengan settings benar</strong>. 
              Fokus pada kualitas sumber dan export settings yang tepat. TikTok akan compress, tapi jika sumbernya bagus, 
              hasilnya akan tetap terlihat profesional.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
