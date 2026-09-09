import { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Copy, Check, Download, Info, AlertCircle } from 'lucide-react';

export default function FFmpegGuide() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const commands = [
    {
      id: 'basic',
      title: '🎯 Basic - Convert ke Format TikTok Optimal',
      description: 'Command dasar untuk convert video ke format yang optimal untuk TikTok',
      command: `ffmpeg -i input.mp4 -c:v libx264 -profile:v high -level 4.2 -b:v 10M -maxrate 12M -bufsize 20M -c:a aac -b:a 192k -ar 44100 -ac 2 -vf "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2" -r 30 -movflags +faststart -pix_fmt yuv420p output_tiktok.mp4`,
    },
    {
      id: 'high-quality',
      title: '✨ High Quality - Kualitas Maksimal',
      description: 'Untuk kualitas tertinggi, menggunakan CRF mode dengan bitrate cap',
      command: `ffmpeg -i input.mp4 -c:v libx264 -profile:v high -level 4.2 -crf 18 -maxrate 15M -bufsize 30M -c:a aac -b:a 256k -ar 44100 -ac 2 -vf "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2" -r 30 -movflags +faststart -pix_fmt yuv420p output_tiktok_hq.mp4`,
    },
    {
      id: '60fps',
      title: '🎮 60fps - Smooth Motion',
      description: 'Untuk konten gaming, slow-mo, atau yang butuh frame rate tinggi',
      command: `ffmpeg -i input.mp4 -c:v libx264 -profile:v high -level 4.2 -crf 18 -maxrate 15M -bufsize 30M -c:a aac -b:a 256k -ar 44100 -ac 2 -vf "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2" -r 60 -movflags +faststart -pix_fmt yuv420p output_tiktok_60fps.mp4`,
    },
    {
      id: 'crop-vertical',
      title: '📱 Crop ke 9:16 dari Video Landscape',
      description: 'Convert video landscape (16:9) ke portrait (9:16) dengan crop center',
      command: `ffmpeg -i input.mp4 -c:v libx264 -profile:v high -level 4.2 -crf 18 -maxrate 12M -bufsize 24M -c:a aac -b:a 192k -ar 44100 -ac 2 -vf "crop=ih*9/16:ih,scale=1080:1920" -r 30 -movflags +faststart -pix_fmt yuv420p output_tiktok_crop.mp4`,
    },
    {
      id: 'sharpen',
      title: '🔍 Sharpen - Pertajam Video',
      description: 'Tambahkan sedikit sharpening untuk video yang terlihat soft setelah compress',
      command: `ffmpeg -i input.mp4 -c:v libx264 -profile:v high -level 4.2 -crf 18 -maxrate 12M -bufsize 24M -c:a aac -b:a 192k -ar 44100 -ac 2 -vf "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2,unsharp=5:5:0.8:5:5:0.0" -r 30 -movflags +faststart -pix_fmt yuv420p output_tiktok_sharp.mp4`,
    },
    {
      id: 'compress-safe',
      title: '📦 Compress Aman - Kurangi Ukuran Tanpa Lose Quality',
      description: 'Kurangi ukuran file tapi tetap pertahankan kualitas visual',
      command: `ffmpeg -i input.mp4 -c:v libx264 -profile:v high -level 4.2 -crf 20 -preset slow -c:a aac -b:a 192k -ar 44100 -ac 2 -vf "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2" -r 30 -movflags +faststart -pix_fmt yuv420p output_tiktok_compressed.mp4`,
    },
    {
      id: 'analyze',
      title: '🔎 Analyze - Cek Info Video',
      description: 'Lihat detail informasi video (resolusi, bitrate, codec, dll)',
      command: `ffprobe -v quiet -print_format json -show_format -show_streams input.mp4`,
    },
  ];

  const presets = [
    {
      name: 'Adobe Premiere Pro',
      settings: [
        'Format: H.264',
        'Preset: Match Source - High bitrate',
        'Resolution: 1080 × 1920',
        'Frame Rate: 30 atau 60',
        'Bitrate Encoding: VBR, 1 pass',
        'Target Bitrate: 10 Mbps',
        'Maximum Bitrate: 15 Mbps',
        'Render at Maximum Depth: ✓',
        'Use Maximum Render Quality: ✓',
      ],
    },
    {
      name: 'DaVinci Resolve',
      settings: [
        'Format: MP4',
        'Codec: H.264',
        'Resolution: 1080 × 1920',
        'Frame Rate: Same as project',
        'Quality: Restrict to 15000 Kb/s',
        'Profile: High',
        'Level: 4.2',
        'Entropy Coding: CABAC',
        'Keyframe Interval: 30',
      ],
    },
    {
      name: 'CapCut (Mobile/Desktop)',
      settings: [
        'Resolution: 1080p',
        'Frame Rate: 30fps',
        'Bitrate: High / Recommended',
        'Codec: H.264',
        'Smart HDR: OFF (jika tidak perlu)',
        'Frame Rate: Match source',
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Info Box */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl p-5"
      >
        <div className="flex items-start gap-3">
          <Terminal className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-400">FFmpeg untuk Konversi Video</h3>
            <p className="text-sm text-gray-400 mt-1">
              FFmpeg adalah tool command-line gratis dan open-source untuk konversi video. 
              Dengan FFmpeg, kamu punya kontrol penuh atas setiap parameter encoding untuk hasil optimal.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a
                href="https://ffmpeg.org/download.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs bg-blue-500/20 text-blue-300 px-3 py-1.5 rounded-lg hover:bg-blue-500/30 transition-all"
              >
                <Download className="w-3 h-3" />
                Download FFmpeg
              </a>
              <a
                href="https://ffmpeg.org/ffmpeg-doc.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs bg-white/10 text-gray-300 px-3 py-1.5 rounded-lg hover:bg-white/20 transition-all"
              >
                <Info className="w-3 h-3" />
                Dokumentasi
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* FFmpeg Commands */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <Terminal className="w-5 h-5 text-green-400" />
          FFmpeg Commands
        </h3>

        {commands.map((cmd, i) => (
          <motion.div
            key={cmd.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
          >
            <div className="p-4 border-b border-white/10">
              <h4 className="font-medium text-sm">{cmd.title}</h4>
              <p className="text-xs text-gray-400 mt-1">{cmd.description}</p>
            </div>
            <div className="p-4 bg-black/30">
              <div className="relative">
                <pre className="text-xs text-green-300 font-mono overflow-x-auto whitespace-pre-wrap break-all pr-10">
                  {cmd.command}
                </pre>
                <button
                  onClick={() => copyToClipboard(cmd.command, cmd.id)}
                  className="absolute top-0 right-0 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
                  title="Copy command"
                >
                  {copied === cmd.id ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Video Editor Presets */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <Info className="w-5 h-5 text-purple-400" />
          Preset Video Editor Populer
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {presets.map((preset, i) => (
            <motion.div
              key={preset.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-5"
            >
              <h4 className="font-medium text-sm mb-3 text-purple-300">{preset.name}</h4>
              <ul className="space-y-1.5">
                {preset.settings.map((setting, j) => (
                  <li key={j} className="text-xs text-gray-400 flex items-start gap-2">
                    <span className="text-purple-400 mt-0.5">•</span>
                    {setting}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Parameter Explanation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/5 border border-white/10 rounded-2xl p-5"
      >
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-yellow-400" />
          Penjelasan Parameter Penting
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { param: '-crf 18', desc: 'Constant Rate Factor. 18 = hampir lossless. Range: 0-51 (lebih kecil = lebih bagus)' },
            { param: '-maxrate 15M', desc: 'Bitrate maksimum. Membatasi ukuran file agar tidak terlalu besar' },
            { param: '-bufsize 30M', desc: 'Buffer size untuk rate control. Biasanya 2x maxrate' },
            { param: '-profile:v high', desc: 'H.264 profile. High = kualitas terbaik untuk bitrate tertentu' },
            { param: '-pix_fmt yuv420p', desc: 'Pixel format. yuv420p = paling kompatibel dengan semua player' },
            { param: '-movflags +faststart', desc: 'Pindahkan moov atom ke depan. Video bisa diputar sebelum download selesai' },
            { param: '-preset slow', desc: 'Encoding speed. Slow = kompresi lebih baik, waktu encode lebih lama' },
            { param: 'scale + pad', desc: 'Resize ke 1080x1920 dengan padding hitam jika aspect ratio tidak cocok' },
          ].map((item, i) => (
            <div key={i} className="bg-black/20 rounded-lg p-3">
              <code className="text-xs text-cyan-300 font-mono">{item.param}</code>
              <p className="text-xs text-gray-400 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Windows/Mac Alternative */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-5"
      >
        <h3 className="font-semibold text-green-400 mb-2">🖥️ Alternatif Tanpa Command Line</h3>
        <p className="text-sm text-gray-400 mb-3">
          Jika tidak nyaman menggunakan command line, gunakan tool GUI berikut:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { name: 'HandBrake', desc: 'Gratis, open-source, cross-platform', url: 'https://handbrake.fr' },
            { name: 'Shutter Encoder', desc: 'GUI FFmpeg yang powerful', url: 'https://www.shutterencoder.com' },
            { name: 'FFmpeg Batch', desc: 'Batch converter dengan GUI', url: 'https://ffmpeg-batch.sourceforge.io' },
          ].map((tool) => (
            <a
              key={tool.name}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 border border-white/10 rounded-xl p-3 hover:bg-white/10 transition-all block"
            >
              <p className="text-sm font-medium text-green-300">{tool.name}</p>
              <p className="text-xs text-gray-400 mt-0.5">{tool.desc}</p>
            </a>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
