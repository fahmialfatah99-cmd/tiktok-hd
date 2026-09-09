import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckSquare, Square, RotateCcw, ClipboardList, Star } from 'lucide-react';

interface ChecklistItem {
  id: string;
  text: string;
  category: string;
  important?: boolean;
}

const checklistItems: ChecklistItem[] = [
  // Pre-Recording
  { id: '1', text: 'Kamera sudah di-set ke resolusi 1080p atau lebih tinggi', category: 'Sebelum Rekam', important: true },
  { id: '2', text: 'Frame rate di-set ke 30fps atau 60fps', category: 'Sebelum Rekam' },
  { id: '3', text: 'Pencahayaan cukup (hindari kondisi gelap)', category: 'Sebelum Rekam', important: true },
  { id: '4', text: 'Kamera stabil (tripod/stabilizer)', category: 'Sebelum Rekam' },
  { id: '5', text: 'Lensa kamera bersih', category: 'Sebelum Rekam' },
  
  // Export Settings
  { id: '6', text: 'Resolusi export: 1080 × 1920 (9:16)', category: 'Export Settings', important: true },
  { id: '7', text: 'Codec: H.264 (AVC)', category: 'Export Settings', important: true },
  { id: '8', text: 'Profile: High', category: 'Export Settings' },
  { id: '9', text: 'Bitrate: 8-15 Mbps (CBR)', category: 'Export Settings', important: true },
  { id: '10', text: 'Frame rate: 30fps atau 60fps', category: 'Export Settings' },
  { id: '11', text: 'Audio: AAC, 44100Hz, 128-256kbps', category: 'Export Settings' },
  { id: '12', text: 'Format container: MP4', category: 'Export Settings', important: true },
  
  // Before Upload
  { id: '13', text: 'File video tidak corrupt (bisa diputar normal)', category: 'Sebelum Upload', important: true },
  { id: '14', text: 'Ukuran file di bawah 287.6 MB', category: 'Sebelum Upload' },
  { id: '15', text: 'Durasi video sesuai batas TikTok', category: 'Sebelum Upload' },
  { id: '16', text: 'Koneksi WiFi stabil & cepat', category: 'Sebelum Upload', important: true },
  { id: '17', text: 'Baterai HP cukup (>20%)', category: 'Sebelum Upload' },
  
  // TikTok Settings
  { id: '18', text: 'Toggle "Upload HD" sudah AKTIF di TikTok', category: 'Settings TikTok', important: true },
  { id: '19', text: 'Data Saver mode TIDAK aktif', category: 'Settings TikTok', important: true },
  { id: '20', text: 'TikTok sudah versi terbaru', category: 'Settings TikTok' },
  { id: '21', text: 'Cache TikTok sudah dibersihkan', category: 'Settings TikTok' },
  
  // After Upload
  { id: '22', text: 'Cek video setelah publish (tonton sampai selesai)', category: 'Setelah Upload' },
  { id: '23', text: 'Kualitas video terlihat baik di HP lain', category: 'Setelah Upload' },
  { id: '24', text: 'Audio terdengar jelas', category: 'Setelah Upload' },
];

export default function UploadChecklist() {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggleCheck = (id: string) => {
    setChecked(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const resetChecklist = () => {
    setChecked(new Set());
  };

  const categories = [...new Set(checklistItems.map(item => item.category))];
  const progress = Math.round((checked.size / checklistItems.length) * 100);

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 border border-white/10 rounded-2xl p-5"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
              <ClipboardList className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">Checklist Upload TikTok</h3>
              <p className="text-xs text-gray-400">Pastikan semua tercentang sebelum upload</p>
            </div>
          </div>
          <button
            onClick={resetChecklist}
            className="p-2 hover:bg-white/10 rounded-lg transition-all"
            title="Reset checklist"
          >
            <RotateCcw className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Progress</span>
            <span className="font-mono text-cyan-400">{checked.size}/{checklistItems.length} ({progress}%)</span>
          </div>
          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-green-400 to-cyan-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          {progress === 100 && (
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center text-sm text-green-400 font-medium mt-2"
            >
              ✅ Siap upload! Video kamu akan tampil dengan kualitas terbaik!
            </motion.p>
          )}
        </div>
      </motion.div>

      {/* Checklist Items by Category */}
      {categories.map((category, i) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5"
        >
          <h4 className="font-medium text-sm text-gray-300 mb-3 uppercase tracking-wider">{category}</h4>
          <div className="space-y-2">
            {checklistItems
              .filter(item => item.category === category)
              .map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
                    checked.has(item.id)
                      ? 'bg-green-400/10 border border-green-400/30'
                      : 'bg-white/5 border border-white/5 hover:bg-white/10'
                  }`}
                >
                  {checked.has(item.id) ? (
                    <CheckSquare className="w-5 h-5 text-green-400 flex-shrink-0" />
                  ) : (
                    <Square className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                  <span className={`text-sm flex-1 ${checked.has(item.id) ? 'text-green-300 line-through' : 'text-gray-300'}`}>
                    {item.text}
                  </span>
                  {item.important && (
                    <Star className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" />
                  )}
                </button>
              ))}
          </div>
        </motion.div>
      ))}

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Star className="w-3 h-3 text-yellow-400" />
          <span>= Sangat Penting</span>
        </div>
        <div className="flex items-center gap-1">
          <CheckSquare className="w-3 h-3 text-green-400" />
          <span>= Sudah Selesai</span>
        </div>
      </div>
    </div>
  );
}
