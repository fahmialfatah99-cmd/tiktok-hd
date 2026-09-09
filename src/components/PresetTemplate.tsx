import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Copy, Check, Plus, Trash2, Edit3, Save, X, ChevronDown, ChevronUp, Star, Download, Upload } from 'lucide-react';

interface Preset {
  id: string;
  name: string;
  description: string;
  isDefault: boolean;
  isFavorite: boolean;
  settings: {
    codec: string;
    profile: string;
    level: string;
    resolution: string;
    fps: string;
    qualityMode: string;
    crf: number;
    maxBitrate: number;
    bufSize: number;
    audioCodec: string;
    audioBitrate: number;
    audioSampleRate: number;
    audioChannels: number;
    pixelFormat: string;
    preset: string;
    extra: string;
  };
}

const defaultPresets: Preset[] = [
  {
    id: 'tiktok-optimal',
    name: 'TikTok Optimal',
    description: 'Settings terbaik untuk upload TikTok dengan kualitas HD',
    isDefault: true,
    isFavorite: true,
    settings: {
      codec: 'libx264',
      profile: 'high',
      level: '4.2',
      resolution: '1080x1920',
      fps: '30',
      qualityMode: 'crf',
      crf: 18,
      maxBitrate: 15,
      bufSize: 30,
      audioCodec: 'aac',
      audioBitrate: 192,
      audioSampleRate: 44100,
      audioChannels: 2,
      pixelFormat: 'yuv420p',
      preset: 'slow',
      extra: '',
    },
  },
  {
    id: 'tiktok-max',
    name: 'TikTok Maximum Quality',
    description: 'Kualitas tertinggi, file lebih besar. Untuk konten premium.',
    isDefault: true,
    isFavorite: false,
    settings: {
      codec: 'libx264',
      profile: 'high',
      level: '4.2',
      resolution: '1080x1920',
      fps: '30',
      qualityMode: 'crf',
      crf: 15,
      maxBitrate: 20,
      bufSize: 40,
      audioCodec: 'aac',
      audioBitrate: 256,
      audioSampleRate: 44100,
      audioChannels: 2,
      pixelFormat: 'yuv420p',
      preset: 'veryslow',
      extra: '',
    },
  },
  {
    id: 'tiktok-60fps',
    name: 'TikTok 60fps Smooth',
    description: 'Untuk konten gaming, slow-mo, atau dance',
    isDefault: true,
    isFavorite: false,
    settings: {
      codec: 'libx264',
      profile: 'high',
      level: '4.2',
      resolution: '1080x1920',
      fps: '60',
      qualityMode: 'crf',
      crf: 18,
      maxBitrate: 15,
      bufSize: 30,
      audioCodec: 'aac',
      audioBitrate: 256,
      audioSampleRate: 44100,
      audioChannels: 2,
      pixelFormat: 'yuv420p',
      preset: 'slow',
      extra: '',
    },
  },
  {
    id: 'tiktok-small',
    name: 'TikTok Small File',
    description: 'File kecil untuk koneksi lambat, kualitas tetap bagus',
    isDefault: true,
    isFavorite: false,
    settings: {
      codec: 'libx264',
      profile: 'high',
      level: '4.2',
      resolution: '1080x1920',
      fps: '30',
      qualityMode: 'crf',
      crf: 23,
      maxBitrate: 6,
      bufSize: 12,
      audioCodec: 'aac',
      audioBitrate: 128,
      audioSampleRate: 44100,
      audioChannels: 2,
      pixelFormat: 'yuv420p',
      preset: 'medium',
      extra: '',
    },
  },
  {
    id: 'instagram-reel',
    name: 'Instagram Reels',
    description: 'Settings optimal untuk Instagram Reels',
    isDefault: true,
    isFavorite: false,
    settings: {
      codec: 'libx264',
      profile: 'high',
      level: '4.2',
      resolution: '1080x1920',
      fps: '30',
      qualityMode: 'crf',
      crf: 19,
      maxBitrate: 12,
      bufSize: 24,
      audioCodec: 'aac',
      audioBitrate: 192,
      audioSampleRate: 44100,
      audioChannels: 2,
      pixelFormat: 'yuv420p',
      preset: 'slow',
      extra: '',
    },
  },
  {
    id: 'youtube-shorts',
    name: 'YouTube Shorts',
    description: 'Settings optimal untuk YouTube Shorts',
    isDefault: true,
    isFavorite: false,
    settings: {
      codec: 'libx264',
      profile: 'high',
      level: '4.2',
      resolution: '1080x1920',
      fps: '30',
      qualityMode: 'crf',
      crf: 18,
      maxBitrate: 15,
      bufSize: 30,
      audioCodec: 'aac',
      audioBitrate: 192,
      audioSampleRate: 48000,
      audioChannels: 2,
      pixelFormat: 'yuv420p',
      preset: 'slow',
      extra: '',
    },
  },
];

export default function PresetTemplate() {
  const [presets, setPresets] = useState<Preset[]>(defaultPresets);
  const [editingPreset, setEditingPreset] = useState<string | null>(null);
  const [expandedPreset, setExpandedPreset] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [showNewForm, setShowNewForm] = useState(false);
  const [newPreset, setNewPreset] = useState<Preset>({
    id: '',
    name: '',
    description: '',
    isDefault: false,
    isFavorite: false,
    settings: {
      codec: 'libx264',
      profile: 'high',
      level: '4.2',
      resolution: '1080x1920',
      fps: '30',
      qualityMode: 'crf',
      crf: 18,
      maxBitrate: 15,
      bufSize: 30,
      audioCodec: 'aac',
      audioBitrate: 192,
      audioSampleRate: 44100,
      audioChannels: 2,
      pixelFormat: 'yuv420p',
      preset: 'slow',
      extra: '',
    },
  });

  const generateCommand = (preset: Preset) => {
    const s = preset.settings;
    let qualityParam = '';
    if (s.qualityMode === 'crf') {
      qualityParam = `-crf ${s.crf} -maxrate ${s.maxBitrate}M -bufsize ${s.bufSize}M`;
    } else {
      qualityParam = `-b:v ${s.maxBitrate}M -maxrate ${s.maxBitrate}M -bufsize ${s.bufSize}M`;
    }

    const extra = s.extra ? ` ${s.extra}` : '';

    return `ffmpeg -i input.mp4 -c:v ${s.codec} -profile:v ${s.profile} -level ${s.level} ${qualityParam} -c:a ${s.audioCodec} -b:a ${s.audioBitrate}k -ar ${s.audioSampleRate} -ac ${s.audioChannels} -vf "scale=${s.resolution.replace('x', ':')}" -r ${s.fps} -preset ${s.preset} -movflags +faststart -pix_fmt ${s.pixelFormat}${extra} output.mp4`;
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const toggleFavorite = (id: string) => {
    setPresets(prev => prev.map(p => p.id === id ? { ...p, isFavorite: !p.isFavorite } : p));
  };

  const deletePreset = (id: string) => {
    setPresets(prev => prev.filter(p => p.id !== id));
  };

  const saveNewPreset = () => {
    if (!newPreset.name) return;
    const preset = {
      ...newPreset,
      id: `custom-${Date.now()}`,
    };
    setPresets(prev => [...prev, preset]);
    setShowNewForm(false);
    setNewPreset({
      id: '',
      name: '',
      description: '',
      isDefault: false,
      isFavorite: false,
      settings: {
        codec: 'libx264',
        profile: 'high',
        level: '4.2',
        resolution: '1080x1920',
        fps: '30',
        qualityMode: 'crf',
        crf: 18,
        maxBitrate: 15,
        bufSize: 30,
        audioCodec: 'aac',
        audioBitrate: 192,
        audioSampleRate: 44100,
        audioChannels: 2,
        pixelFormat: 'yuv420p',
        preset: 'slow',
        extra: '',
      },
    });
  };

  const updateEditingPreset = (field: string, value: any) => {
    setPresets(prev => prev.map(p => {
      if (p.id === editingPreset) {
        if (field.includes('.')) {
          const [section, key] = field.split('.');
          return { ...p, [section]: { ...p[section as keyof Preset] as any, [key]: value } };
        }
        return { ...p, [field]: value };
      }
      return p;
    }));
  };

  const updateEditingSetting = (key: string, value: any) => {
    setPresets(prev => prev.map(p => {
      if (p.id === editingPreset) {
        return { ...p, settings: { ...p.settings, [key]: value } };
      }
      return p;
    }));
  };

  const exportPresets = () => {
    const data = JSON.stringify(presets, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tiktok-presets.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importPresets = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          try {
            const imported = JSON.parse(ev.target?.result as string);
            if (Array.isArray(imported)) {
              setPresets(prev => [...prev, ...imported]);
            }
          } catch (err) {
            alert('File tidak valid');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const sortedPresets = [...presets].sort((a, b) => {
    if (a.isFavorite && !b.isFavorite) return -1;
    if (!a.isFavorite && b.isFavorite) return 1;
    return 0;
  });

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-3"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Palette className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold">Preset Template</h3>
            <p className="text-xs text-gray-400">{presets.length} preset tersedia</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={importPresets}
            className="flex items-center gap-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs hover:bg-white/10 transition-all"
          >
            <Upload className="w-3.5 h-3.5" />
            Import
          </button>
          <button
            onClick={exportPresets}
            className="flex items-center gap-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs hover:bg-white/10 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
          <button
            onClick={() => setShowNewForm(!showNewForm)}
            className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-xs hover:opacity-90 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            Buat Baru
          </button>
        </div>
      </motion.div>

      {/* New Preset Form */}
      <AnimatePresence>
        {showNewForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-5">
              <h4 className="font-medium mb-4">✨ Buat Preset Baru</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Nama Preset</label>
                  <input
                    type="text"
                    value={newPreset.name}
                    onChange={(e) => setNewPreset({ ...newPreset, name: e.target.value })}
                    placeholder="Contoh: TikTok Gaming"
                    className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Deskripsi</label>
                  <input
                    type="text"
                    value={newPreset.description}
                    onChange={(e) => setNewPreset({ ...newPreset, description: e.target.value })}
                    placeholder="Untuk konten gaming 60fps"
                    className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Resolusi</label>
                  <select
                    value={newPreset.settings.resolution}
                    onChange={(e) => setNewPreset({ ...newPreset, settings: { ...newPreset.settings, resolution: e.target.value } })}
                    className="w-full bg-black/30 border border-white/10 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-purple-400"
                  >
                    <option value="1080x1920">1080×1920</option>
                    <option value="1080x1080">1080×1080</option>
                    <option value="1920x1080">1920×1080</option>
                    <option value="720x1280">720×1280</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">FPS</label>
                  <select
                    value={newPreset.settings.fps}
                    onChange={(e) => setNewPreset({ ...newPreset, settings: { ...newPreset.settings, fps: e.target.value } })}
                    className="w-full bg-black/30 border border-white/10 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-purple-400"
                  >
                    <option value="24">24</option>
                    <option value="30">30</option>
                    <option value="60">60</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">CRF</label>
                  <input
                    type="number"
                    min="0"
                    max="51"
                    value={newPreset.settings.crf}
                    onChange={(e) => setNewPreset({ ...newPreset, settings: { ...newPreset.settings, crf: Number(e.target.value) } })}
                    className="w-full bg-black/30 border border-white/10 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-purple-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Max Bitrate (Mbps)</label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={newPreset.settings.maxBitrate}
                    onChange={(e) => setNewPreset({ ...newPreset, settings: { ...newPreset.settings, maxBitrate: Number(e.target.value) } })}
                    className="w-full bg-black/30 border border-white/10 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={saveNewPreset}
                  className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-xs hover:opacity-90 transition-all"
                >
                  <Save className="w-3.5 h-3.5" />
                  Simpan Preset
                </button>
                <button
                  onClick={() => setShowNewForm(false)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs hover:bg-white/10 transition-all"
                >
                  <X className="w-3.5 h-3.5" />
                  Batal
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Presets List */}
      <div className="space-y-3">
        {sortedPresets.map((preset, i) => {
          const isExpanded = expandedPreset === preset.id;
          const isEditing = editingPreset === preset.id;
          const cmd = generateCommand(preset);

          return (
            <motion.div
              key={preset.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
            >
              {/* Preset Header */}
              <div className="p-4 flex items-center gap-3">
                <button
                  onClick={() => toggleFavorite(preset.id)}
                  className="flex-shrink-0"
                >
                  <Star className={`w-4 h-4 ${preset.isFavorite ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} />
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    {isEditing ? (
                      <input
                        type="text"
                        value={preset.name}
                        onChange={(e) => updateEditingPreset('name', e.target.value)}
                        className="bg-black/30 border border-white/10 rounded px-2 py-1 text-sm focus:outline-none focus:border-purple-400"
                      />
                    ) : (
                      <h4 className="font-medium text-sm truncate">{preset.name}</h4>
                    )}
                    {preset.isDefault && (
                      <span className="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded">Default</span>
                    )}
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={preset.description}
                      onChange={(e) => updateEditingPreset('description', e.target.value)}
                      className="bg-black/30 border border-white/10 rounded px-2 py-1 text-xs mt-1 w-full focus:outline-none focus:border-purple-400"
                    />
                  ) : (
                    <p className="text-xs text-gray-400 truncate">{preset.description}</p>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {isEditing ? (
                    <button
                      onClick={() => setEditingPreset(null)}
                      className="p-1.5 bg-green-500/20 hover:bg-green-500/30 rounded-lg transition-all"
                    >
                      <Save className="w-3.5 h-3.5 text-green-400" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditingPreset(preset.id)}
                      className="p-1.5 hover:bg-white/10 rounded-lg transition-all"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-gray-400" />
                    </button>
                  )}
                  {!preset.isDefault && (
                    <button
                      onClick={() => deletePreset(preset.id)}
                      className="p-1.5 hover:bg-red-500/20 rounded-lg transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-gray-400 hover:text-red-400" />
                    </button>
                  )}
                  <button
                    onClick={() => setExpandedPreset(isExpanded ? null : preset.id)}
                    className="p-1.5 hover:bg-white/10 rounded-lg transition-all"
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 space-y-4">
                      {/* Settings Grid */}
                      {isEditing ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div>
                            <label className="text-[10px] text-gray-500 uppercase">Codec</label>
                            <select
                              value={preset.settings.codec}
                              onChange={(e) => updateEditingSetting('codec', e.target.value)}
                              className="w-full bg-black/30 border border-white/10 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-purple-400"
                            >
                              <option value="libx264">H.264</option>
                              <option value="libx265">H.265/HEVC</option>
                              <option value="libvpx-vp9">VP9</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-[10px] text-gray-500 uppercase">Profile</label>
                            <select
                              value={preset.settings.profile}
                              onChange={(e) => updateEditingSetting('profile', e.target.value)}
                              className="w-full bg-black/30 border border-white/10 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-purple-400"
                            >
                              <option value="baseline">Baseline</option>
                              <option value="main">Main</option>
                              <option value="high">High</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-[10px] text-gray-500 uppercase">Resolusi</label>
                            <select
                              value={preset.settings.resolution}
                              onChange={(e) => updateEditingSetting('resolution', e.target.value)}
                              className="w-full bg-black/30 border border-white/10 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-purple-400"
                            >
                              <option value="1080x1920">1080×1920</option>
                              <option value="1080x1080">1080×1080</option>
                              <option value="1920x1080">1920×1080</option>
                              <option value="720x1280">720×1280</option>
                              <option value="2160x3840">4K (2160×3840)</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-[10px] text-gray-500 uppercase">FPS</label>
                            <select
                              value={preset.settings.fps}
                              onChange={(e) => updateEditingSetting('fps', e.target.value)}
                              className="w-full bg-black/30 border border-white/10 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-purple-400"
                            >
                              <option value="24">24</option>
                              <option value="25">25</option>
                              <option value="30">30</option>
                              <option value="50">50</option>
                              <option value="60">60</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-[10px] text-gray-500 uppercase">CRF</label>
                            <input
                              type="number"
                              min="0"
                              max="51"
                              value={preset.settings.crf}
                              onChange={(e) => updateEditingSetting('crf', Number(e.target.value))}
                              className="w-full bg-black/30 border border-white/10 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-purple-400"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-gray-500 uppercase">Max Bitrate (Mbps)</label>
                            <input
                              type="number"
                              min="1"
                              max="50"
                              value={preset.settings.maxBitrate}
                              onChange={(e) => updateEditingSetting('maxBitrate', Number(e.target.value))}
                              className="w-full bg-black/30 border border-white/10 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-purple-400"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-gray-500 uppercase">Buf Size (MB)</label>
                            <input
                              type="number"
                              min="1"
                              max="100"
                              value={preset.settings.bufSize}
                              onChange={(e) => updateEditingSetting('bufSize', Number(e.target.value))}
                              className="w-full bg-black/30 border border-white/10 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-purple-400"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-gray-500 uppercase">Preset Speed</label>
                            <select
                              value={preset.settings.preset}
                              onChange={(e) => updateEditingSetting('preset', e.target.value)}
                              className="w-full bg-black/30 border border-white/10 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-purple-400"
                            >
                              <option value="ultrafast">Ultra Fast</option>
                              <option value="fast">Fast</option>
                              <option value="medium">Medium</option>
                              <option value="slow">Slow</option>
                              <option value="veryslow">Very Slow</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-[10px] text-gray-500 uppercase">Audio Codec</label>
                            <select
                              value={preset.settings.audioCodec}
                              onChange={(e) => updateEditingSetting('audioCodec', e.target.value)}
                              className="w-full bg-black/30 border border-white/10 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-purple-400"
                            >
                              <option value="aac">AAC</option>
                              <option value="libmp3lame">MP3</option>
                              <option value="libopus">Opus</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-[10px] text-gray-500 uppercase">Audio Bitrate (kbps)</label>
                            <select
                              value={preset.settings.audioBitrate}
                              onChange={(e) => updateEditingSetting('audioBitrate', Number(e.target.value))}
                              className="w-full bg-black/30 border border-white/10 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-purple-400"
                            >
                              <option value="96">96</option>
                              <option value="128">128</option>
                              <option value="192">192</option>
                              <option value="256">256</option>
                              <option value="320">320</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-[10px] text-gray-500 uppercase">Sample Rate</label>
                            <select
                              value={preset.settings.audioSampleRate}
                              onChange={(e) => updateEditingSetting('audioSampleRate', Number(e.target.value))}
                              className="w-full bg-black/30 border border-white/10 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-purple-400"
                            >
                              <option value="44100">44100 Hz</option>
                              <option value="48000">48000 Hz</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-[10px] text-gray-500 uppercase">Pixel Format</label>
                            <select
                              value={preset.settings.pixelFormat}
                              onChange={(e) => updateEditingSetting('pixelFormat', e.target.value)}
                              className="w-full bg-black/30 border border-white/10 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-purple-400"
                            >
                              <option value="yuv420p">yuv420p</option>
                              <option value="yuv422p">yuv422p</option>
                              <option value="yuv444p">yuv444p</option>
                            </select>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {[
                            { label: 'Codec', value: `${preset.settings.codec} (${preset.settings.profile})` },
                            { label: 'Resolusi', value: preset.settings.resolution.replace('x', '×') },
                            { label: 'FPS', value: `${preset.settings.fps} fps` },
                            { label: 'CRF', value: preset.settings.crf.toString() },
                            { label: 'Max Bitrate', value: `${preset.settings.maxBitrate} Mbps` },
                            { label: 'Audio', value: `${preset.settings.audioCodec} ${preset.settings.audioBitrate}k` },
                            { label: 'Preset', value: preset.settings.preset },
                            { label: 'Pixel Format', value: preset.settings.pixelFormat },
                          ].map((item, j) => (
                            <div key={j} className="bg-black/20 rounded-lg px-2.5 py-2">
                              <p className="text-[10px] text-gray-500 uppercase">{item.label}</p>
                              <p className="text-xs font-mono text-white">{item.value}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Generated Command */}
                      <div className="bg-black/30 rounded-xl p-3">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs text-gray-400">Generated Command:</p>
                          <button
                            onClick={() => copyToClipboard(cmd, preset.id)}
                            className="p-1.5 hover:bg-white/10 rounded-lg transition-all"
                          >
                            {copied === preset.id ? (
                              <Check className="w-3.5 h-3.5 text-green-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5 text-gray-400" />
                            )}
                          </button>
                        </div>
                        <pre className="text-xs text-green-300 font-mono overflow-x-auto whitespace-pre-wrap break-all">
                          {cmd}
                        </pre>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Info */}
      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-4">
        <p className="text-sm text-gray-300">
          💡 <strong>Tips:</strong> Klik ikon ✏️ untuk mengedit preset. Klik ⭐ untuk favorite. 
          Gunakan Export untuk backup preset kamu, dan Import untuk restore.
        </p>
      </div>
    </div>
  );
}
