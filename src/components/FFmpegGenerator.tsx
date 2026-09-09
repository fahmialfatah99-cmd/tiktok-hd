import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Wand2, Copy, Check, Video, Gauge, Film, HardDrive, Zap, RefreshCw } from 'lucide-react';

interface FFmpegGeneratorProps {
  videoFile: File | null;
  videoUrl: string;
}

interface VideoMeta {
  width: number;
  height: number;
  duration: number;
  size: number;
  name: string;
  type: string;
}

export default function FFmpegGenerator({ videoFile, videoUrl }: FFmpegGeneratorProps) {
  const [meta, setMeta] = useState<VideoMeta | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [options, setOptions] = useState({
    targetRes: '1080x1920',
    fps: '30',
    quality: 'high',
    audioBitrate: '192',
    sharpen: false,
    normalizeAudio: false,
    cropMode: 'pad',
  });
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && videoUrl) {
      videoRef.current.addEventListener('loadedmetadata', () => {
        if (videoRef.current && videoFile) {
          setMeta({
            width: videoRef.current.videoWidth,
            height: videoRef.current.videoHeight,
            duration: videoRef.current.duration,
            size: videoFile.size,
            name: videoFile.name,
            type: videoFile.type,
          });
        }
      });
    }
  }, [videoUrl, videoFile]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const calculateBitrate = () => {
    if (!meta || meta.duration === 0) return 0;
    return (meta.size * 8) / meta.duration / 1000000;
  };

  const generateCommand = (preset: string) => {
    if (!meta) return '';

    const inputName = `"${meta.name}"`;
    const outputName = meta.name.replace(/\.[^/.]+$/, '') + `_tiktok_${preset}.mp4`;
    
    // Determine scale filter based on target resolution
    const [tw, th] = options.targetRes.split('x').map(Number);
    let scaleFilter = '';
    
    if (options.cropMode === 'pad') {
      scaleFilter = `scale=${tw}:${th}:force_original_aspect_ratio=decrease,pad=${tw}:${th}:(ow-iw)/2:(oh-ih)/2:color=black`;
    } else if (options.cropMode === 'crop') {
      // Center crop to target aspect ratio then scale
      const targetRatio = tw / th;
      scaleFilter = `crop=if(gt(iw/ih\\,${targetRatio})\\,ih*${targetRatio}\\,iw):if(gt(iw/ih\\,${targetRatio})\\,ih\\,iw/${targetRatio}),scale=${tw}:${th}`;
    } else {
      scaleFilter = `scale=${tw}:${th}`;
    }

    // Add sharpen filter if enabled
    if (options.sharpen) {
      scaleFilter += ',unsharp=5:5:0.8:5:5:0.0';
    }

    // Audio filter
    let audioFilter = '';
    if (options.normalizeAudio) {
      audioFilter = '-af loudnorm=I=-16:TP=-1.5:LRA=11';
    }

    // Quality settings based on preset
    let qualityParams = '';
    switch (options.quality) {
      case 'maximum':
        qualityParams = '-crf 15 -preset veryslow -maxrate 20M -bufsize 40M';
        break;
      case 'high':
        qualityParams = '-crf 18 -preset slow -maxrate 15M -bufsize 30M';
        break;
      case 'balanced':
        qualityParams = '-crf 20 -preset medium -maxrate 10M -bufsize 20M';
        break;
      case 'small':
        qualityParams = '-crf 23 -preset fast -maxrate 6M -bufsize 12M';
        break;
    }

    const cmd = `ffmpeg -i ${inputName} -c:v libx264 -profile:v high -level 4.2 ${qualityParams} -c:a aac -b:a ${options.audioBitrate}k -ar 44100 -ac 2 -vf "${scaleFilter}" ${audioFilter}-r ${options.fps} -movflags +faststart -pix_fmt yuv420p "${outputName}"`;
    
    return cmd.replace(/\s+/g, ' ').trim();
  };

  const presets = [
    { id: 'optimal', label: '🎯 Optimal TikTok', desc: 'Settings terbaik untuk TikTok' },
    { id: 'hq', label: '✨ High Quality', desc: 'Kualitas maksimal, file lebih besar' },
    { id: 'compressed', label: '📦 Compressed', desc: 'File kecil, kualitas tetap baik' },
    { id: 'custom', label: '🔧 Custom', desc: 'Berdasarkan settings di atas' },
  ];

  if (!videoFile) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mb-4">
          <Wand2 className="w-8 h-8 text-purple-400" />
        </div>
        <h3 className="font-semibold text-lg mb-2">Auto-Generate FFmpeg Command</h3>
        <p className="text-gray-400 text-sm">
          Upload video terlebih dahulu di tab "Upload & Analisis" untuk meng-generate command FFmpeg otomatis.
        </p>
      </div>
    );
  }

  const currentBitrate = calculateBitrate();
  const recommendedQuality = currentBitrate > 15 ? 'high' : currentBitrate > 8 ? 'balanced' : 'maximum';

  return (
    <div className="space-y-4">
      {/* Video Info Summary */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 border border-white/10 rounded-2xl p-5"
      >
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Video className="w-4 h-4 text-purple-400" />
          Video Sumber
        </h3>
        {meta && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-black/20 rounded-lg p-3">
              <p className="text-[10px] text-gray-500 uppercase">Resolusi</p>
              <p className="text-sm font-mono">{meta.width}×{meta.height}</p>
            </div>
            <div className="bg-black/20 rounded-lg p-3">
              <p className="text-[10px] text-gray-500 uppercase">Durasi</p>
              <p className="text-sm font-mono">{Math.floor(meta.duration / 60)}:{Math.floor(meta.duration % 60).toString().padStart(2, '0')}</p>
            </div>
            <div className="bg-black/20 rounded-lg p-3">
              <p className="text-[10px] text-gray-500 uppercase">Bitrate</p>
              <p className="text-sm font-mono">{currentBitrate.toFixed(1)} Mbps</p>
            </div>
            <div className="bg-black/20 rounded-lg p-3">
              <p className="text-[10px] text-gray-500 uppercase">Ukuran</p>
              <p className="text-sm font-mono">{(meta.size / (1024 * 1024)).toFixed(1)} MB</p>
            </div>
          </div>
        )}
        <div className="mt-3 text-xs text-gray-400">
          💡 Rekomendasi kualitas: <span className="text-cyan-400 font-medium">{recommendedQuality}</span>
        </div>
      </motion.div>

      {/* Options */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/5 border border-white/10 rounded-2xl p-5"
      >
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Zap className="w-4 h-4 text-yellow-400" />
          Opsi Generate
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Target Resolution */}
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">Target Resolusi</label>
            <select
              value={options.targetRes}
              onChange={(e) => setOptions({ ...options, targetRes: e.target.value })}
              className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-400"
            >
              <option value="1080x1920">1080×1920 (9:16 Portrait)</option>
              <option value="1080x1080">1080×1080 (1:1 Square)</option>
              <option value="1920x1080">1920×1080 (16:9 Landscape)</option>
              <option value="720x1280">720×1280 (720p Portrait)</option>
            </select>
          </div>

          {/* Frame Rate */}
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">Frame Rate</label>
            <select
              value={options.fps}
              onChange={(e) => setOptions({ ...options, fps: e.target.value })}
              className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-400"
            >
              <option value="24">24 fps (Cinematic)</option>
              <option value="30">30 fps (Standard)</option>
              <option value="60">60 fps (Smooth)</option>
            </select>
          </div>

          {/* Quality */}
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">Kualitas</label>
            <select
              value={options.quality}
              onChange={(e) => setOptions({ ...options, quality: e.target.value })}
              className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-400"
            >
              <option value="maximum">Maximum (CRF 15, ~20Mbps)</option>
              <option value="high">High (CRF 18, ~15Mbps)</option>
              <option value="balanced">Balanced (CRF 20, ~10Mbps)</option>
              <option value="small">Small File (CRF 23, ~6Mbps)</option>
            </select>
          </div>

          {/* Audio Bitrate */}
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">Audio Bitrate</label>
            <select
              value={options.audioBitrate}
              onChange={(e) => setOptions({ ...options, audioBitrate: e.target.value })}
              className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-400"
            >
              <option value="128">128 kbps (Standard)</option>
              <option value="192">192 kbps (Good)</option>
              <option value="256">256 kbps (High)</option>
              <option value="320">320 kbps (Maximum)</option>
            </select>
          </div>

          {/* Crop Mode */}
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">Mode Resize</label>
            <select
              value={options.cropMode}
              onChange={(e) => setOptions({ ...options, cropMode: e.target.value })}
              className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-400"
            >
              <option value="pad">Pad (Tambah hitam di sisi)</option>
              <option value="crop">Crop (Potong ke aspect ratio)</option>
              <option value="stretch">Stretch (Paksa ke resolusi)</option>
            </select>
          </div>
        </div>

        {/* Toggles */}
        <div className="flex flex-wrap gap-4 mt-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={options.sharpen}
              onChange={(e) => setOptions({ ...options, sharpen: e.target.checked })}
              className="w-4 h-4 accent-cyan-400"
            />
            <span className="text-sm">Tambah Sharpening</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={options.normalizeAudio}
              onChange={(e) => setOptions({ ...options, normalizeAudio: e.target.checked })}
              className="w-4 h-4 accent-cyan-400"
            />
            <span className="text-sm">Normalize Audio</span>
          </label>
        </div>
      </motion.div>

      {/* Generated Commands */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/5 border border-white/10 rounded-2xl p-5"
      >
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Film className="w-4 h-4 text-green-400" />
          Command yang Di-Generate
        </h3>

        <div className="space-y-3">
          {presets.map((preset) => {
            const cmd = generateCommand(preset.id);
            return (
              <div key={preset.id} className="bg-black/30 rounded-xl p-3">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium">{preset.label}</p>
                    <p className="text-xs text-gray-500">{preset.desc}</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(cmd, preset.id)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-all"
                  >
                    {copied === preset.id ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
                <pre className="text-xs text-green-300 font-mono overflow-x-auto whitespace-pre-wrap break-all">
                  {cmd}
                </pre>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-4"
      >
        <p className="text-sm text-gray-300">
          💡 <strong>Tips:</strong> Copy command di atas, buka terminal/CMD, navigasi ke folder video kamu, lalu paste command. 
          File output akan tersimpan di folder yang sama dengan nama <code className="text-cyan-300">*_tiktok_*.mp4</code>
        </p>
      </motion.div>

      {/* Hidden video element for metadata */}
      <video ref={videoRef} src={videoUrl} className="hidden" preload="metadata" />
    </div>
  );
}
