import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileVideo, X, CheckCircle2 } from 'lucide-react';

interface VideoUploaderProps {
  onVideoSelect: (file: File) => void;
  videoFile: File | null;
}

export default function VideoUploader({ onVideoSelect, videoFile }: VideoUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('video/')) {
      onVideoSelect(files[0]);
    }
  }, [onVideoSelect]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onVideoSelect(files[0]);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  };

  return (
    <div className="space-y-4">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-300 ${
          isDragging
            ? 'border-cyan-400 bg-cyan-400/10 scale-[1.02]'
            : videoFile
            ? 'border-green-400/50 bg-green-400/5'
            : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        {videoFile ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="space-y-3"
          >
            <div className="w-16 h-16 mx-auto bg-green-400/20 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-green-400" />
            </div>
            <div>
              <p className="font-semibold text-green-400">Video Berhasil Dimuat</p>
              <p className="text-sm text-gray-400 mt-1">{videoFile.name}</p>
              <p className="text-xs text-gray-500 mt-1">{formatFileSize(videoFile.size)}</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              className="text-sm text-cyan-400 hover:text-cyan-300 underline"
            >
              Pilih video lain
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="space-y-4"
          >
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-pink-500/20 to-cyan-500/20 rounded-full flex items-center justify-center">
              <Upload className={`w-8 h-8 ${isDragging ? 'text-cyan-400' : 'text-gray-400'}`} />
            </div>
            <div>
              <p className="font-semibold">
                {isDragging ? 'Lepaskan video di sini...' : 'Drag & Drop Video Kamu'}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                atau klik untuk memilih file
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Format: MP4, MOV, AVI, MKV, WebM • Maks: 287.6 MB (TikTok)
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Quick Tips */}
      <div className="bg-gradient-to-r from-pink-500/10 to-cyan-500/10 border border-white/10 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-yellow-400/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
            <FileVideo className="w-4 h-4 text-yellow-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-yellow-400">💡 Tips Upload Kualitas Asli</p>
            <ul className="text-xs text-gray-400 mt-2 space-y-1">
              <li>• Upload video dengan resolusi 1080x1920 (9:16)</li>
              <li>• Gunakan codec H.264 dengan bitrate 8-15 Mbps</li>
              <li>• Frame rate 30fps atau 60fps</li>
              <li>• Aktifkan "Allow high-quality uploads" di TikTok</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
