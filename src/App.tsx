import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Video, Settings, CheckCircle, AlertTriangle, Info, Sparkles, Zap, Shield, FileVideo, ChevronDown, ChevronUp, Copy, ExternalLink } from 'lucide-react';
import VideoUploader from './components/VideoUploader';
import QualityGuide from './components/QualityGuide';
import UploadChecklist from './components/UploadChecklist';
import VideoInfo from './components/VideoInfo';
import SettingsPanel from './components/SettingsPanel';
import FFmpegGuide from './components/FFmpegGuide';

type Tab = 'upload' | 'guide' | 'checklist' | 'ffmpeg';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('upload');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>('');

  const tabs = [
    { id: 'upload' as Tab, label: 'Upload & Analisis', icon: Upload },
    { id: 'guide' as Tab, label: 'Panduan Kualitas', icon: Video },
    { id: 'checklist' as Tab, label: 'Checklist Upload', icon: CheckCircle },
    { id: 'ffmpeg' as Tab, label: 'FFmpeg Command', icon: Settings },
  ];

  const handleVideoSelect = (file: File) => {
    setVideoFile(file);
    if (videoUrl) URL.revokeObjectURL(videoUrl);
    setVideoUrl(URL.createObjectURL(file));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-xl bg-black/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 via-red-500 to-cyan-400 rounded-xl flex items-center justify-center">
              <Video className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
                TikTok Upload Tool
              </h1>
              <p className="text-xs text-gray-400">Upload dengan Kualitas Asli</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm text-gray-400">
            <Shield className="w-4 h-4 text-green-400" />
            <span>Kualitas Terjamin</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 pt-8 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Upload Video TikTok
            <span className="bg-gradient-to-r from-pink-400 via-red-400 to-cyan-400 bg-clip-text text-transparent"> Tanpa Penurunan Kualitas</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Tools lengkap untuk memastikan video kamu di-upload ke TikTok dengan kualitas terbaik.
            Analisis video, dapatkan rekomendasi settings, dan ikuti panduan step-by-step.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { icon: Zap, title: 'Analisis Otomatis', desc: 'Cek resolusi, bitrate, codec video kamu', color: 'from-yellow-400 to-orange-500' },
            { icon: Sparkles, title: 'Rekomendasi Settings', desc: 'Dapatkan setting optimal untuk TikTok', color: 'from-pink-400 to-red-500' },
            { icon: Shield, title: 'Kualitas Terjaga', desc: 'Pastikan video tetap HD setelah upload', color: 'from-cyan-400 to-blue-500' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-3`}>
                <item.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <div className="flex gap-1 bg-white/5 backdrop-blur-sm rounded-2xl p-1.5 border border-white/10 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-pink-500/20 to-cyan-500/20 text-white border border-white/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'upload' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <VideoUploader onVideoSelect={handleVideoSelect} videoFile={videoFile} />
                <div className="space-y-6">
                  {videoFile && <VideoInfo file={videoFile} videoUrl={videoUrl} />}
                  <SettingsPanel />
                </div>
              </div>
            )}
            {activeTab === 'guide' && <QualityGuide />}
            {activeTab === 'checklist' && <UploadChecklist />}
            {activeTab === 'ffmpeg' && <FFmpegGuide />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 text-center text-sm text-gray-500">
        <p>TikTok Upload Quality Tool — Pastikan kontenmu selalu tampil terbaik 🎬</p>
      </footer>
    </div>
  );
}
