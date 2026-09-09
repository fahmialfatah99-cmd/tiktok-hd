import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Monitor, Film, Gauge, Palette, Volume2, Copy, Check } from 'lucide-react';

export default function SettingsPanel() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const settings = [
    {
      category: 'Resolusi & Aspect Ratio',
      icon: Monitor,
      color: 'from-blue-400 to-cyan-400',
      items: [
        { label: 'Resolusi Optimal', value: '1080 × 1920 px' },
        { label: 'Aspect Ratio', value: '9:16 (Portrait)' },
        { label: 'Resolusi Minimum', value: '720 × 1280 px' },
        { label: 'Alternatif', value: '1080 × 1080 (1:1 Square)' },
      ],
    },
    {
      category: 'Video Codec & Bitrate',
      icon: Film,
      color: 'from-pink-400 to-red-400',
      items: [
        { label: 'Codec', value: 'H.264 (AVC)' },
        { label: 'Profile', value: 'High' },
        { label: 'Bitrate', value: '8-15 Mbps' },
        { label: 'Bitrate Mode', value: 'CBR (Constant)' },
      ],
    },
    {
      category: 'Frame Rate & Duration',
      icon: Gauge,
      color: 'from-yellow-400 to-orange-400',
      items: [
        { label: 'Frame Rate', value: '30 fps (atau 60 fps)' },
        { label: 'Durasi Maks', value: '10 menit (akun biasa)' },
        { label: 'Durasi Optimal', value: '15-60 detik' },
        { label: 'Keyframe Interval', value: '2 detik' },
      ],
    },
    {
      category: 'Audio Settings',
      icon: Volume2,
      color: 'from-green-400 to-emerald-400',
      items: [
        { label: 'Audio Codec', value: 'AAC' },
        { label: 'Sample Rate', value: '44100 Hz' },
        { label: 'Bitrate Audio', value: '128-256 kbps' },
        { label: 'Channels', value: 'Stereo (2ch)' },
      ],
    },
  ];

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <Settings className="w-4 h-4 text-pink-400" />
        Settings Optimal untuk TikTok
      </h3>

      <div className="space-y-4">
        {settings.map((section, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/5 rounded-xl p-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${section.color} flex items-center justify-center`}>
                <section.icon className="w-3.5 h-3.5 text-white" />
              </div>
              <h4 className="text-sm font-medium">{section.category}</h4>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {section.items.map((item, j) => (
                <div key={j} className="bg-black/20 rounded-lg px-3 py-2">
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">{item.label}</p>
                  <p className="text-xs font-mono text-white mt-0.5">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Copy Settings */}
      <div className="mt-4 bg-gradient-to-r from-pink-500/10 to-cyan-500/10 border border-white/10 rounded-xl p-4">
        <p className="text-xs font-medium text-gray-300 mb-2">📋 Copy Settings untuk Export:</p>
        <div className="space-y-2">
          {[
            { id: 'preset1', label: 'Preset TikTok Optimal', value: 'H.264 | 1080x1920 | 30fps | 10Mbps | AAC 192kbps' },
            { id: 'preset2', label: 'Preset TikTok High Quality', value: 'H.264 High | 1080x1920 | 60fps | 15Mbps | AAC 256kbps' },
          ].map((preset) => (
            <div key={preset.id} className="flex items-center justify-between bg-black/30 rounded-lg px-3 py-2">
              <div>
                <p className="text-[10px] text-gray-500">{preset.label}</p>
                <p className="text-xs font-mono text-cyan-300">{preset.value}</p>
              </div>
              <button
                onClick={() => copyToClipboard(preset.value, preset.id)}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-all"
              >
                {copied === preset.id ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
