import React, { useState, useRef, useCallback } from 'react';
import {
  Upload,
  ImagePlus,
  Music,
  Sparkles,
  Trash2,
  CheckCircle2,
  ShieldCheck,
  Loader2,
  Volume2,
  FileAudio,
} from 'lucide-react';
import {
  downscaleImageTo1080p,
  formatBytes,
  getAudioFileDuration,
  generateAmbientAudioTrack,
  generateDemoSlides,
  type SlideItem,
  type AudioTrackItem,
} from '../utils/imageCompressor';
import { getTranslations, type Locale } from '../i18n/translations';

export { downscaleImageTo1080p };

export interface MediaUploaderProps {
  locale?: Locale;
  slides?: SlideItem[];
  audioTrack?: AudioTrackItem | null;
  onSlidesAdded?: (newSlides: SlideItem[]) => void;
  onClearSlides?: () => void;
  onAudioChange?: (audio: AudioTrackItem | null) => void;
  onLoadDemo?: (demoSlides: SlideItem[], demoAudio: AudioTrackItem) => void;
}

export default function MediaUploader({
  locale = 'en',
  slides = [],
  audioTrack = null,
  onSlidesAdded,
  onClearSlides,
  onAudioChange,
  onLoadDemo,
}: MediaUploaderProps) {
  const t = getTranslations(locale);

  const [isDraggingPhotos, setIsDraggingPhotos] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionProgress, setCompressionProgress] = useState({ processed: 0, total: 0 });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const photoInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  const emitSlidesAdded = useCallback(
    (newSlides: SlideItem[]) => {
      if (onSlidesAdded) {
        onSlidesAdded(newSlides);
      }
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('memoryreel:slides-added', { detail: newSlides }));
      }
    },
    [onSlidesAdded]
  );

  const emitAudioChanged = useCallback(
    (newAudio: AudioTrackItem | null) => {
      if (onAudioChange) {
        onAudioChange(newAudio);
      }
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('memoryreel:audio-changed', { detail: newAudio }));
      }
    },
    [onAudioChange]
  );

  /**
   * Bulk processes selected image files sequentially through the
   * off-screen 1080p Canvas downscaler (`ctx.drawImage`) to prevent high RAM spikes.
   */
  const handlePhotoFiles = useCallback(
    async (fileList: FileList | File[]) => {
      const validFiles = Array.from(fileList).filter(
        (file) =>
          file.type.startsWith('image/') || /\.(jpe?g|png|webp|avif|gif|bmp)$/i.test(file.name)
      );

      if (validFiles.length === 0) {
        setErrorMessage('Please select valid image files (JPG, PNG, WebP, AVIF).');
        return;
      }

      setErrorMessage(null);
      setIsCompressing(true);
      setCompressionProgress({ processed: 0, total: validFiles.length });

      const downscaledBatch: SlideItem[] = [];
      const startIdx = slides.length;

      for (let i = 0; i < validFiles.length; i++) {
        try {
          const item = await downscaleImageTo1080p(validFiles[i], 3, startIdx + i);
          downscaledBatch.push(item);
        } catch (err) {
          console.error('Failed to downscale image:', validFiles[i].name, err);
        }
        setCompressionProgress({ processed: i + 1, total: validFiles.length });
      }

      setIsCompressing(false);

      if (downscaledBatch.length > 0) {
        emitSlidesAdded(downscaledBatch);
      }
    },
    [slides.length, emitSlidesAdded]
  );

  const handleAudioFile = useCallback(
    async (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return;
      const file = fileList[0];

      if (!file.type.startsWith('audio/') && !/\.(mp3|wav|ogg|m4a|aac|flac)$/i.test(file.name)) {
        setErrorMessage('Please select a valid audio file (MP3, WAV, OGG, M4A).');
        return;
      }

      setErrorMessage(null);
      if (audioTrack?.url) {
        URL.revokeObjectURL(audioTrack.url);
      }

      const url = URL.createObjectURL(file);
      const duration = await getAudioFileDuration(url);

      const newAudio: AudioTrackItem = {
        id: `audio-${Date.now()}`,
        name: file.name,
        file,
        url,
        duration,
        size: file.size,
      };

      emitAudioChanged(newAudio);
    },
    [audioTrack, emitAudioChanged]
  );

  const handleGenerateAmbient = useCallback(() => {
    if (audioTrack?.url) {
      URL.revokeObjectURL(audioTrack.url);
    }
    const generated = generateAmbientAudioTrack(16);
    emitAudioChanged(generated);
  }, [audioTrack, emitAudioChanged]);

  const handleLoadSampleStoryboard = useCallback(async () => {
    setIsCompressing(true);
    setCompressionProgress({ processed: 1, total: 4 });
    try {
      const demoSlides = await generateDemoSlides();
      const demoAudio = generateAmbientAudioTrack(16);
      setCompressionProgress({ processed: 4, total: 4 });
      if (onLoadDemo) {
        onLoadDemo(demoSlides, demoAudio);
      } else {
        emitSlidesAdded(demoSlides);
        emitAudioChanged(demoAudio);
      }
    } finally {
      setIsCompressing(false);
    }
  }, [onLoadDemo, emitSlidesAdded, emitAudioChanged]);

  const totalOriginalBytes = slides.reduce((acc, s) => acc + s.originalSize, 0);
  const totalCompressedBytes = slides.reduce((acc, s) => acc + s.compressedSize, 0);
  const savedBytes = Math.max(0, totalOriginalBytes - totalCompressedBytes);

  return (
    <section aria-labelledby="uploader-heading" class="w-full">
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">
        <div>
          <h2
            id="uploader-heading"
            class="font-display text-xl sm:text-2xl font-bold text-[#086288] dark:text-[#FFEFC4] tracking-tight"
          >
            {t.uploader.sectionTitle}
          </h2>
          <p class="text-sm text-slate-600 dark:text-slate-300 mt-1">
            {t.uploader.sectionSubtitle}
          </p>
        </div>

        {/* 1080p Off-Screen Canvas Badge */}
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#97D7FF]/30 dark:bg-[#086288]/70 border border-[#4D8DBA]/35 dark:border-[#97D7FF]/35 text-[#086288] dark:text-[#97D7FF] text-xs font-semibold shrink-0">
          <ShieldCheck className="w-4 h-4 text-[#086288] dark:text-[#FFEFC4] shrink-0" />
          <span>{t.uploader.compressionBadge}</span>
        </div>
      </div>

      {errorMessage && (
        <div
          role="alert"
          class="mb-4 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-sm flex items-center justify-between"
        >
          <span>{errorMessage}</span>
          <button
            type="button"
            onClick={() => setErrorMessage(null)}
            class="text-xs font-semibold underline ml-4"
          >
            Dismiss
          </button>
        </div>
      )}

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Bulk Photo Dropzone (7 columns on desktop) */}
        <div class="lg:col-span-7">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsDraggingPhotos(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsDraggingPhotos(false);
            }}
            onDrop={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsDraggingPhotos(false);
              if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                handlePhotoFiles(e.dataTransfer.files);
              }
            }}
            class={`card-surface relative p-6 sm:p-8 flex flex-col items-center justify-center text-center border-2 border-dashed transition-all duration-200 min-h-[250px] ${
              isDraggingPhotos
                ? 'border-[#086288] dark:border-[#FFEFC4] bg-[#97D7FF]/25 dark:bg-[#086288]/40 scale-[1.01]'
                : 'border-[#4D8DBA]/45 dark:border-[#97D7FF]/35 hover:border-[#086288] dark:hover:border-[#97D7FF]'
            }`}
          >
            <input
              ref={photoInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handlePhotoFiles(e.target.files);
                  e.target.value = '';
                }
              }}
              class="sr-only"
              id="bulk-photo-input"
            />

            <div class="w-14 h-14 rounded-2xl bg-[#97D7FF]/35 dark:bg-[#086288] border border-[#4D8DBA]/35 dark:border-[#97D7FF]/35 flex items-center justify-center text-[#086288] dark:text-[#FFEFC4] mb-4 shadow-sm">
              {isCompressing ? (
                <Loader2 className="w-7 h-7 animate-spin" />
              ) : (
                <ImagePlus className="w-7 h-7" />
              )}
            </div>

            {isCompressing ? (
              <div class="w-full max-w-xs space-y-2.5">
                <p class="text-sm font-semibold text-[#086288] dark:text-[#FFEFC4]">
                  {t.uploader.compressingStatus}
                </p>
                <div class="w-full h-2.5 rounded-full bg-[#97D7FF]/30 dark:bg-[#041821] overflow-hidden">
                  <div
                    class="h-full bg-gradient-to-r from-[#086288] to-[#4D8DBA] dark:from-[#4D8DBA] dark:to-[#97D7FF] transition-all duration-200 rounded-full"
                    style={{
                      width: `${Math.round(
                        (compressionProgress.processed / Math.max(1, compressionProgress.total)) *
                          100
                      )}%`,
                    }}
                  />
                </div>
                <p class="text-xs font-mono text-[#4D8DBA] dark:text-[#97D7FF]">
                  {compressionProgress.processed} / {compressionProgress.total} (1920×1080 Canvas)
                </p>
              </div>
            ) : (
              <>
                <h3 class="font-display font-bold text-base sm:text-lg text-[#086288] dark:text-white">
                  {t.uploader.dropzoneTitle}
                </h3>
                <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-300 max-w-md mt-1 mb-5">
                  {t.uploader.dropzoneSubtitle}
                </p>

                <div class="flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => photoInputRef.current?.click()}
                    class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#086288] hover:bg-[#4D8DBA] text-white font-semibold text-sm shadow-md shadow-[#086288]/25 transition-all active:scale-95"
                  >
                    <Upload className="w-4 h-4 text-[#FFEFC4]" />
                    <span>{t.uploader.browsePhotosBtn}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleLoadSampleStoryboard}
                    class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FFEFC4] hover:bg-[#97D7FF]/60 text-[#086288] font-semibold text-sm border border-[#086288]/20 transition-all shadow-sm"
                  >
                    <Sparkles className="w-4 h-4 text-[#086288]" />
                    <span>{t.uploader.loadDemoBtn}</span>
                  </button>
                </div>
              </>
            )}

            {/* Memory Optimization Footer Bar */}
            {slides.length > 0 && (
              <div class="w-full mt-6 pt-4 border-t border-[#4D8DBA]/25 dark:border-[#97D7FF]/20 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div class="flex items-center gap-2 text-[#086288] dark:text-[#97D7FF] font-medium">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-[#086288] dark:text-[#FFEFC4]" />
                  <span>
                    <strong>{slides.length}</strong> {t.uploader.photosCount} (
                    {formatBytes(totalCompressedBytes)})
                  </span>
                  {savedBytes > 0 && (
                    <span class="hidden sm:inline-block px-2 py-0.5 rounded-md bg-[#FFEFC4] dark:bg-[#086288] text-[#086288] dark:text-[#FFEFC4] font-mono text-[11px] font-semibold">
                      -{formatBytes(savedBytes)} {t.uploader.memorySavedLabel}
                    </span>
                  )}
                </div>

                {onClearSlides && (
                  <button
                    type="button"
                    onClick={onClearSlides}
                    class="inline-flex items-center gap-1 text-rose-600 dark:text-rose-400 hover:underline font-medium"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{t.uploader.clearAllBtn}</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Audio Track Card (5 columns on desktop) */}
        <div class="lg:col-span-5">
          <div class="card-surface p-6 sm:p-7 h-full flex flex-col justify-between min-h-[250px]">
            <div>
              <div class="flex items-center justify-between gap-3 mb-3">
                <div class="flex items-center gap-2.5">
                  <div class="w-10 h-10 rounded-xl bg-[#FFEFC4] dark:bg-[#086288] border border-[#086288]/20 dark:border-[#97D7FF]/30 flex items-center justify-center text-[#086288] dark:text-[#FFEFC4]">
                    <Music className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 class="font-display font-bold text-base text-[#086288] dark:text-white">
                      {t.uploader.audioTitle}
                    </h3>
                    <p class="text-xs text-[#4D8DBA] dark:text-[#97D7FF] font-medium">
                      MP3 • WAV • OGG • M4A
                    </p>
                  </div>
                </div>
              </div>

              <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-4">
                {t.uploader.audioSubtitle}
              </p>

              <input
                ref={audioInputRef}
                type="file"
                accept="audio/*,.mp3,.wav,.ogg,.m4a"
                onChange={(e) => {
                  handleAudioFile(e.target.files);
                  e.target.value = '';
                }}
                class="sr-only"
                id="audio-track-input"
              />

              {audioTrack ? (
                <div class="p-3.5 rounded-xl bg-[#97D7FF]/15 dark:bg-[#041821]/90 border border-[#4D8DBA]/30 dark:border-[#97D7FF]/25 space-y-2.5">
                  <div class="flex items-center justify-between gap-2">
                    <div class="flex items-center gap-2 min-w-0">
                      <FileAudio className="w-4 h-4 text-[#086288] dark:text-[#FFEFC4] shrink-0" />
                      <span class="text-xs font-semibold text-[#086288] dark:text-white truncate">
                        {audioTrack.name}
                      </span>
                    </div>
                    <span class="text-[11px] font-mono px-2 py-0.5 rounded bg-[#FFEFC4] dark:bg-[#086288] text-[#086288] dark:text-[#FFEFC4] shrink-0 font-semibold">
                      {Math.round(audioTrack.duration)}s • {formatBytes(audioTrack.size)}
                    </span>
                  </div>

                  <audio
                    controls
                    src={audioTrack.url}
                    class="w-full h-8 rounded-lg"
                    preload="metadata"
                  />
                </div>
              ) : (
                <div class="p-4 rounded-xl bg-[#97D7FF]/10 dark:bg-[#041821]/60 border border-dashed border-[#4D8DBA]/35 dark:border-[#97D7FF]/25 flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300">
                  <Volume2 className="w-5 h-5 text-[#4D8DBA] dark:text-[#97D7FF] shrink-0" />
                  <span>
                    No audio selected yet. You can render a silent video or attach a music file
                    below.
                  </span>
                </div>
              )}
            </div>

            <div class="flex flex-wrap items-center gap-2.5 mt-4 pt-3 border-t border-[#4D8DBA]/20 dark:border-[#97D7FF]/15">
              <button
                type="button"
                onClick={() => audioInputRef.current?.click()}
                class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#086288] hover:bg-[#4D8DBA] text-white font-semibold text-xs transition-all shadow-sm"
              >
                <Upload className="w-3.5 h-3.5 text-[#FFEFC4]" />
                <span>{t.uploader.uploadAudioBtn}</span>
              </button>

              <button
                type="button"
                onClick={handleGenerateAmbient}
                class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#FFEFC4] hover:bg-[#97D7FF]/55 text-[#086288] border border-[#086288]/20 font-semibold text-xs transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#086288]" />
                <span>{t.uploader.generateAmbientBtn}</span>
              </button>

              {audioTrack && (
                <button
                  type="button"
                  onClick={() => emitAudioChanged(null)}
                  class="inline-flex items-center gap-1 px-2.5 py-2 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 text-xs font-medium transition-colors ml-auto"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{t.uploader.removeAudioBtn}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
