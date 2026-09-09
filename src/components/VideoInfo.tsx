import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Monitor, HardDrive, Clock, Film, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface VideoInfoProps {
  file: File;
  videoUrl: string;
}

interface VideoMetadata {
  width: number;
  height: number;
  duration: number;
}

export default function VideoInfo({ file, videoUrl }: VideoInfoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [metadata, setMetadata] = useState<VideoMetadata | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('loadedmetadata', () => {
        if (videoRef.current) {
          setMetadata({
            width: videoRef.current.videoWidth,
            height: videoRef.current.videoHeight,
            duration: videoRef.current.duration,
          });
        }
      });
    }
  }, [videoUrl]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  };

  const calculateBitrate = () => {
    if (!metadata || metadata.duration === 0) return 0;
    return (file.size * 8) / metadata.duration / 1000000; // Mbps
  };

  const getResolutionStatus = () => {
    if (!metadata) return null;
    if (metadata.width >= 1080 && metadata.height >= 1920) {
      return { status: 'good', label: '1080p+ Full HD', icon: CheckCircle, color: 'text-green-400' };
    }
    if (metadata.width >= 720 && metadata.height >= 1280) {
      return { status: 'warning', label: '720p HD', icon: AlertTriangle, color: 'text-yellow-400' };
    }
    return { status: 'bad', label: 'Di bawah HD', icon: XCircle, color: 'text-red-400' };
  };

  const getBitrateStatus = () => {
    const bitrate = calculateBitrate();
    if (bitrate >= 8) return { status: 'good', label: `${bitrate.toFixed(1)} Mbps - Optimal`, icon: CheckCircle, color: 'text-green-400' };
    if (bitrate >= 4) return { status: 'warning', label: `${bitrate.toFixed(1)} Mbps - Cukup`, icon: AlertTriangle, color: 'text-yellow-400' };
    return { status: 'bad', label: `${bitrate.toFixed(1)} Mbps - Rendah`, icon: XCircle, color: 'text-red-400' };
  };

  const getAspectStatus = () => {
    if (!metadata) return null;
    const ratio = metadata.width / metadata.height;
    if (Math.abs(ratio - 9/16) < 0.05) {
      return { status: 'good', label: '9:16 Portrait (Ideal)', icon: CheckCircle, color: 'text-green-400' };
    }
    if (Math.abs(ratio - 1) < 0.1) {
      return { status: 'warning', label: '1:1 Square', icon: AlertTriangle, color: 'text-yellow-400' };
    }
    if (Math.abs(ratio - 16/9) < 0.05) {
      return { status: 'warning', label: '16:9 Landscape', icon: AlertTriangle, color: 'text-yellow-400' };
    }
    return { status: 'bad', label: `${(metadata.width / metadata.height).toFixed(2)}:1 - Tidak standar`, icon: XCircle, color: 'text-red-400' };
  };

  const getDurationStatus = () => {
    if (!metadata) return null;
    if (metadata.duration <= 60) {
      return { status: 'good', label: `${formatDuration(metadata.duration)} - Dalam batas`, icon: CheckCircle, color: 'text-green-400' };
    }
    if (metadata.duration <= 180) {
      return { status: 'warning', label: `${formatDuration(metadata.duration)} - 3 menit`, icon: AlertTriangle, color: 'text-yellow-400' };
    }
    return { status: 'bad', label: `${formatDuration(metadata.duration)} - Terlalu panjang`, icon: XCircle, color: 'text-red-400' };
  };

  const resolutionStatus = getResolutionStatus();
  const bitrateStatus = getBitrateStatus();
  const aspectStatus = getAspectStatus();
  const durationStatus = getDurationStatus();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Video Preview */}
      <div className="relative rounded-2xl overflow-hidden bg-black border border-white/10">
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full max-h-[300px] object-contain"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        />
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-all"
        >
          <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
          </div>
        </button>
      </div>

      {/* Video Analysis */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Monitor className="w-4 h-4 text-cyan-400" />
          Analisis Video
        </h3>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white/5 rounded-xl p-3">
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
              <Monitor className="w-3 h-3" />
              Resolusi
            </div>
            <p className="font-mono text-sm">
              {metadata ? `${metadata.width} × ${metadata.height}` : 'Memuat...'}
            </p>
          </div>
          <div className="bg-white/5 rounded-xl p-3">
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
              <Clock className="w-3 h-3" />
              Durasi
            </div>
            <p className="font-mono text-sm">
              {metadata ? formatDuration(metadata.duration) : 'Memuat...'}
            </p>
          </div>
          <div className="bg-white/5 rounded-xl p-3">
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
              <HardDrive className="w-3 h-3" />
              Ukuran File
            </div>
            <p className="font-mono text-sm">{formatFileSize(file.size)}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-3">
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
              <Film className="w-3 h-3" />
              Bitrate
            </div>
            <p className="font-mono text-sm">
              {metadata ? `${calculateBitrate().toFixed(1)} Mbps` : 'Memuat...'}
            </p>
          </div>
        </div>

        {/* Quality Checks */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Status Kualitas</p>
          {[resolutionStatus, bitrateStatus, aspectStatus, durationStatus].map((item, i) => (
            item && (
              <div key={i} className="flex items-center gap-2 text-sm">
                <item.icon className={`w-4 h-4 ${item.color}`} />
                <span className={item.color}>{item.label}</span>
              </div>
            )
          ))}
        </div>
      </div>
    </motion.div>
  );
}
