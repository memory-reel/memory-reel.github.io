import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  GripVertical,
  Clock,
  Play,
  Pause,
  Film,
  Download,
  Trash2,
  Copy,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Sparkles,
  Sliders,
  CheckCircle2,
  XCircle,
  Maximize2,
  Wand2,
  Layers,
  RotateCcw,
} from 'lucide-react';
import MediaUploader from './MediaUploader';
import {
  loadImageElement,
  formatBytes,
  generateDemoSlides,
  generateAmbientAudioTrack,
  type SlideItem,
  type AudioTrackItem,
} from '../utils/imageCompressor';
import {
  renderSlideshowToVideo,
  drawStoryboardFrameAtTime,
  calculateTotalTimelineDuration,
  getResolutionForAspect,
  type AspectRatioPreset,
  type FitMode,
  type RenderProgress,
  type RenderOutput,
} from '../utils/VideoRenderer';
import { getTranslations, type Locale } from '../i18n/translations';

export interface StoryboardProps {
  locale?: Locale;
  includeUploader?: boolean;
}

export default function Storyboard({ locale = 'en', includeUploader = true }: StoryboardProps) {
  const t = getTranslations(locale);

  // Core Media State
  const [slides, setSlides] = useState<SlideItem[]>([]);
  const [audioTrack, setAudioTrack] = useState<AudioTrackItem | null>(null);

  // Storyboard & Video Settings
  const [globalDuration, setGlobalDuration] = useState<number>(3);
  const [transitionDuration, setTransitionDuration] = useState<number>(0.8);
  const [aspectRatio, setAspectRatio] = useState<AspectRatioPreset>('16:9');
  const [fitMode, setFitMode] = useState<FitMode>('contain-blur');
  const [enableKenBurns, setEnableKenBurns] = useState<boolean>(true);

  // Drag & Drop Reordering State
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // Live Preview Player State
  const [isPlayingPreview, setIsPlayingPreview] = useState<boolean>(false);
  const [previewTimeSec, setPreviewTimeSec] = useState<number>(0);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const previewAudioRef = useRef<HTMLAudioElement | null>(null);
  const loadedImagesCacheRef = useRef<Map<string, HTMLImageElement>>(new Map());
  const rafRef = useRef<number | null>(null);

  // Rendering State
  const [isRendering, setIsRendering] = useState<boolean>(false);
  const [renderProgress, setRenderProgress] = useState<RenderProgress | null>(null);
  const [renderOutput, setRenderOutput] = useState<RenderOutput | null>(null);
  const [renderError, setRenderError] = useState<string | null>(null);
  const renderCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const totalDurationSec = calculateTotalTimelineDuration(slides);

  // Listen to custom events if MediaUploader is mounted separately
  useEffect(() => {
    if (includeUploader) return;

    const onSlidesAddedEvent = (e: Event) => {
      const custom = e as CustomEvent<SlideItem[]>;
      if (Array.isArray(custom.detail)) {
        setSlides((prev) => [...prev, ...custom.detail]);
      }
    };

    const onAudioChangedEvent = (e: Event) => {
      const custom = e as CustomEvent<AudioTrackItem | null>;
      setAudioTrack(custom.detail ?? null);
    };

    window.addEventListener('memoryreel:slides-added', onSlidesAddedEvent);
    window.addEventListener('memoryreel:audio-changed', onAudioChangedEvent);
    return () => {
      window.removeEventListener('memoryreel:slides-added', onSlidesAddedEvent);
      window.removeEventListener('memoryreel:audio-changed', onAudioChangedEvent);
    };
  }, [includeUploader]);

  // Preload HTMLImageElement instances for live preview canvas
  useEffect(() => {
    let active = true;
    slides.forEach((slide) => {
      if (!loadedImagesCacheRef.current.has(slide.id)) {
        loadImageElement(slide.previewUrl)
          .then((img) => {
            if (active) {
              loadedImagesCacheRef.current.set(slide.id, img);
              drawCurrentPreviewFrame(previewTimeSec);
            }
          })
          .catch(() => {});
      }
    });
    return () => {
      active = false;
    };
  }, [slides]);

  const drawCurrentPreviewFrame = useCallback(
    (timeSec: number) => {
      const canvas = previewCanvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const { width, height } = getResolutionForAspect(aspectRatio);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      if (slides.length === 0) {
        ctx.fillStyle = '#041821';
        ctx.fillRect(0, 0, width, height);
        return;
      }

      const imgs: HTMLImageElement[] = [];
      for (const s of slides) {
        const cached = loadedImagesCacheRef.current.get(s.id);
        if (cached) imgs.push(cached);
      }

      if (imgs.length === slides.length) {
        drawStoryboardFrameAtTime(
          ctx,
          slides,
          imgs,
          timeSec,
          transitionDuration,
          fitMode,
          enableKenBurns
        );
      }
    },
    [slides, aspectRatio, transitionDuration, fitMode, enableKenBurns]
  );

  // Redraw preview whenever settings or scrub time change
  useEffect(() => {
    drawCurrentPreviewFrame(previewTimeSec);
  }, [previewTimeSec, drawCurrentPreviewFrame]);

  // Handle Live Preview Playback Loop
  useEffect(() => {
    if (!isPlayingPreview) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (previewAudioRef.current) {
        previewAudioRef.current.pause();
      }
      return;
    }

    if (slides.length === 0 || totalDurationSec <= 0) {
      setIsPlayingPreview(false);
      return;
    }

    const startWallMs = performance.now();
    const initialOffsetSec = previewTimeSec >= totalDurationSec ? 0 : previewTimeSec;

    if (previewAudioRef.current && audioTrack) {
      previewAudioRef.current.currentTime = initialOffsetSec % Math.max(1, audioTrack.duration);
      previewAudioRef.current.play().catch(() => {});
    }

    const loop = (nowMs: number) => {
      const nextTime = initialOffsetSec + (nowMs - startWallMs) / 1000;
      if (nextTime >= totalDurationSec) {
        setPreviewTimeSec(0);
        setIsPlayingPreview(false);
        if (previewAudioRef.current) {
          previewAudioRef.current.pause();
          previewAudioRef.current.currentTime = 0;
        }
        return;
      }
      setPreviewTimeSec(nextTime);
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isPlayingPreview, slides.length, totalDurationSec, audioTrack]);

  // Slide Mutations
  const handleAddSlides = useCallback((newSlides: SlideItem[]) => {
    setSlides((prev) => [...prev, ...newSlides]);
    setRenderOutput(null);
  }, []);

  const handleClearAllSlides = useCallback(() => {
    setIsPlayingPreview(false);
    setSlides((prev) => {
      prev.forEach((s) => URL.revokeObjectURL(s.previewUrl));
      return [];
    });
    loadedImagesCacheRef.current.clear();
    setPreviewTimeSec(0);
    setRenderOutput(null);
  }, []);

  const handleLoadDemo = useCallback((demoSlides: SlideItem[], demoAudio: AudioTrackItem) => {
    setIsPlayingPreview(false);
    setSlides((prev) => {
      prev.forEach((s) => URL.revokeObjectURL(s.previewUrl));
      return demoSlides;
    });
    setAudioTrack(demoAudio);
    setPreviewTimeSec(0);
    setRenderOutput(null);
  }, []);

  const handleQuickDemoFromEmptyState = useCallback(async () => {
    const demoSlides = await generateDemoSlides();
    const demoAudio = generateAmbientAudioTrack(16);
    handleLoadDemo(demoSlides, demoAudio);
  }, [handleLoadDemo]);

  const moveSlide = useCallback((fromIndex: number, toIndex: number) => {
    setSlides((prev) => {
      if (toIndex < 0 || toIndex >= prev.length || fromIndex === toIndex) return prev;
      const updated = [...prev];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      return updated;
    });
  }, []);

  const updateSlideDuration = useCallback((id: string, newDuration: number) => {
    const clamped = Math.max(1, Math.min(20, Number.isFinite(newDuration) ? newDuration : 3));
    setSlides((prev) => prev.map((s) => (s.id === id ? { ...s, duration: clamped } : s)));
  }, []);

  const updateSlideCaption = useCallback((id: string, caption: string) => {
    setSlides((prev) => prev.map((s) => (s.id === id ? { ...s, caption } : s)));
  }, []);

  const duplicateSlide = useCallback((index: number) => {
    setSlides((prev) => {
      const target = prev[index];
      if (!target) return prev;
      const copyUrl = URL.createObjectURL(target.blob);
      const clone: SlideItem = {
        ...target,
        id: `slide-copy-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        previewUrl: copyUrl,
      };
      const next = [...prev];
      next.splice(index + 1, 0, clone);
      return next;
    });
  }, []);

  const removeSlide = useCallback((id: string) => {
    setSlides((prev) => {
      const target = prev.find((s) => s.id === id);
      if (target) {
        URL.revokeObjectURL(target.previewUrl);
        loadedImagesCacheRef.current.delete(id);
      }
      return prev.filter((s) => s.id !== id);
    });
  }, []);

  const applyGlobalDurationToAll = useCallback(() => {
    const clamped = Math.max(1, Math.min(20, globalDuration));
    setSlides((prev) => prev.map((s) => ({ ...s, duration: clamped })));
  }, [globalDuration]);

  // Trigger Client-Side Video Rendering Engine
  const handleCreateMemory = useCallback(async () => {
    if (slides.length === 0 || isRendering) return;

    setIsPlayingPreview(false);
    setRenderError(null);
    if (renderOutput?.url) {
      URL.revokeObjectURL(renderOutput.url);
      setRenderOutput(null);
    }

    const abortController = new AbortController();
    abortControllerRef.current = abortController;
    setIsRendering(true);
    setRenderProgress({
      percent: 0,
      currentSlideIndex: 0,
      totalSlides: slides.length,
      elapsedSec: 0,
      totalDurationSec,
      statusText: t.storyboard.renderingTitle,
    });

    try {
      const result = await renderSlideshowToVideo(
        {
          slides,
          audioTrack,
          transitionDuration,
          aspectRatio,
          fitMode,
          enableKenBurns,
          fps: 30,
        },
        (progress) => {
          setRenderProgress(progress);
        },
        renderCanvasRef.current,
        abortController.signal
      );

      setRenderOutput(result);
    } catch (err) {
      if (!abortController.signal.aborted) {
        setRenderError(err instanceof Error ? err.message : 'Video rendering failed.');
      }
    } finally {
      setIsRendering(false);
      abortControllerRef.current = null;
    }
  }, [
    slides,
    audioTrack,
    transitionDuration,
    aspectRatio,
    fitMode,
    enableKenBurns,
    isRendering,
    renderOutput,
    totalDurationSec,
    t.storyboard.renderingTitle,
  ]);

  const handleCancelRender = useCallback(() => {
    abortControllerRef.current?.abort();
    setIsRendering(false);
  }, []);

  return (
    <div class="space-y-10">
      {/* Step 2 Integrated Uploader */}
      {includeUploader && (
        <MediaUploader
          locale={locale}
          slides={slides}
          audioTrack={audioTrack}
          onSlidesAdded={handleAddSlides}
          onClearSlides={handleClearAllSlides}
          onAudioChange={setAudioTrack}
          onLoadDemo={handleLoadDemo}
        />
      )}

      {/* Hidden audio element for live preview playback */}
      {audioTrack && (
        <audio ref={previewAudioRef} src={audioTrack.url} preload="auto" class="hidden" loop />
      )}

      {/* Step 3: Storyboard Timeline & Rendering Studio */}
      <section aria-labelledby="storyboard-heading" class="space-y-6">
        {/* Section Header + Global Controls Bar */}
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2
              id="storyboard-heading"
              class="font-display text-xl sm:text-2xl font-bold text-[#086288] dark:text-[#FFEFC4] tracking-tight"
            >
              {t.storyboard.title}
            </h2>
            <p class="hidden lg:block text-sm text-slate-600 dark:text-slate-300 mt-1">
              {t.storyboard.subtitleDesktop}
            </p>
            <p class="block lg:hidden text-sm text-slate-600 dark:text-slate-300 mt-1">
              {t.storyboard.subtitleMobile}
            </p>
          </div>

          {/* Summary Pills */}
          {slides.length > 0 && (
            <div class="flex flex-wrap items-center gap-2">
              <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#97D7FF]/30 dark:bg-[#086288] text-[#086288] dark:text-[#97D7FF] text-xs font-semibold border border-[#4D8DBA]/30">
                <Layers className="w-3.5 h-3.5 text-[#086288] dark:text-[#FFEFC4]" />
                <span>
                  {slides.length} {t.storyboard.slidesLabel}
                </span>
              </span>
              <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFEFC4] dark:bg-[#072534] text-[#086288] dark:text-[#FFEFC4] text-xs font-semibold border border-[#086288]/20 dark:border-[#97D7FF]/25">
                <Clock className="w-3.5 h-3.5 text-[#086288] dark:text-[#FFEFC4]" />
                <span>
                  {t.storyboard.totalDuration}: <strong>{totalDurationSec.toFixed(1)}s</strong>
                </span>
              </span>
            </div>
          )}
        </div>

        {/* Studio Toolbar (Duration, Crossfade, Aspect Ratio, Framing, Ken Burns) */}
        <div class="card-surface p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
          {/* Global Slide Duration */}
          <div class="flex flex-wrap items-center gap-2.5">
            <div class="flex items-center gap-1.5 text-xs font-semibold text-[#086288] dark:text-[#97D7FF]">
              <Clock className="w-4 h-4 text-[#4D8DBA] dark:text-[#FFEFC4]" />
              <label htmlFor="global-duration-input">{t.storyboard.globalDurationLabel}:</label>
            </div>
            <div class="inline-flex items-center rounded-xl bg-[#97D7FF]/20 dark:bg-[#041821] border border-[#4D8DBA]/30 dark:border-[#97D7FF]/25 p-0.5">
              <input
                id="global-duration-input"
                type="number"
                min={1}
                max={20}
                step={0.5}
                value={globalDuration}
                onChange={(e) => setGlobalDuration(Number(e.target.value))}
                class="w-14 bg-transparent text-center font-mono text-xs font-bold text-[#086288] dark:text-[#FFEFC4] focus:outline-none py-1"
              />
              <span class="text-[11px] text-[#4D8DBA] dark:text-[#97D7FF] pr-2">
                {t.storyboard.slideDurationSec}
              </span>
              <button
                type="button"
                onClick={applyGlobalDurationToAll}
                disabled={slides.length === 0}
                class="px-2.5 py-1 rounded-lg bg-[#086288] hover:bg-[#4D8DBA] text-[#FFEFC4] text-xs font-semibold shadow-sm transition-colors disabled:opacity-40"
              >
                {t.storyboard.applyToAllBtn}
              </button>
            </div>
          </div>

          {/* Transition, Aspect Ratio, Fit Mode & Ken Burns Controls */}
          <div class="flex flex-wrap items-center gap-3">
            {/* Crossfade Duration */}
            <div class="flex items-center gap-1.5 text-xs">
              <Sliders className="w-3.5 h-3.5 text-[#4D8DBA] dark:text-[#97D7FF]" />
              <span class="font-medium text-slate-600 dark:text-slate-300">
                {t.storyboard.transitionLabel}:
              </span>
              <select
                aria-label={t.storyboard.transitionLabel}
                value={transitionDuration}
                onChange={(e) => setTransitionDuration(Number(e.target.value))}
                class="rounded-xl bg-[#97D7FF]/20 dark:bg-[#041821] border border-[#4D8DBA]/30 dark:border-[#97D7FF]/25 px-2.5 py-1.5 text-xs font-semibold text-[#086288] dark:text-[#FFEFC4] focus:outline-none focus:ring-2 focus:ring-[#4D8DBA]"
              >
                <option value={0.4}>0.4s Fast</option>
                <option value={0.8}>0.8s Smooth</option>
                <option value={1.2}>1.2s Cinema</option>
              </select>
            </div>

            {/* Aspect Ratio Selector */}
            <div class="flex items-center gap-1.5 text-xs">
              <Maximize2 className="w-3.5 h-3.5 text-[#4D8DBA] dark:text-[#97D7FF]" />
              <span class="font-medium text-slate-600 dark:text-slate-300">
                {t.storyboard.aspectRatioLabel}:
              </span>
              <select
                aria-label={t.storyboard.aspectRatioLabel}
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value as AspectRatioPreset)}
                class="rounded-xl bg-[#97D7FF]/20 dark:bg-[#041821] border border-[#4D8DBA]/30 dark:border-[#97D7FF]/25 px-2.5 py-1.5 text-xs font-semibold text-[#086288] dark:text-[#FFEFC4] focus:outline-none focus:ring-2 focus:ring-[#4D8DBA]"
              >
                <option value="16:9">16:9 Landscape (1920×1080)</option>
                <option value="9:16">9:16 Vertical Reel (1080×1920)</option>
                <option value="1:1">1:1 Square (1080×1080)</option>
              </select>
            </div>

            {/* Framing Mode */}
            <div class="flex items-center gap-1.5 text-xs">
              <select
                aria-label={t.storyboard.fitModeLabel}
                value={fitMode}
                onChange={(e) => setFitMode(e.target.value as FitMode)}
                class="rounded-xl bg-[#97D7FF]/20 dark:bg-[#041821] border border-[#4D8DBA]/30 dark:border-[#97D7FF]/25 px-2.5 py-1.5 text-xs font-semibold text-[#086288] dark:text-[#FFEFC4] focus:outline-none focus:ring-2 focus:ring-[#4D8DBA]"
              >
                <option value="contain-blur">{t.storyboard.fitContainBlur}</option>
                <option value="cover">{t.storyboard.fitCover}</option>
              </select>
            </div>

            {/* Ken Burns Toggle */}
            <button
              type="button"
              onClick={() => setEnableKenBurns((v) => !v)}
              aria-pressed={enableKenBurns}
              class={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                enableKenBurns
                  ? 'bg-[#FFEFC4] dark:bg-[#086288] border-[#086288]/30 dark:border-[#97D7FF]/40 text-[#086288] dark:text-[#FFEFC4]'
                  : 'bg-slate-100 dark:bg-[#041821] border-slate-200 dark:border-slate-700 text-slate-500'
              }`}
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>{t.storyboard.kenBurnsLabel}</span>
            </button>
          </div>
        </div>

        {/* Storyboard Sequence Area:
            - Desktop (lg+): Horizontal drag-and-drop filmstrip timeline
            - Tablet/Mobile (< lg): Vertical touch-friendly sortable list */}
        {slides.length === 0 ? (
          <div class="card-surface p-10 sm:p-14 text-center flex flex-col items-center justify-center border border-dashed border-[#4D8DBA]/40 dark:border-[#97D7FF]/30">
            <div class="w-14 h-14 rounded-2xl bg-[#97D7FF]/30 dark:bg-[#086288] flex items-center justify-center text-[#086288] dark:text-[#FFEFC4] mb-4">
              <Film className="w-7 h-7" />
            </div>
            <h3 class="font-display font-bold text-lg text-[#086288] dark:text-white">
              {t.storyboard.emptyTitle}
            </h3>
            <p class="text-sm text-slate-500 dark:text-slate-300 max-w-md mt-1 mb-5">
              {t.storyboard.emptySubtitle}
            </p>
            <button
              type="button"
              onClick={handleQuickDemoFromEmptyState}
              class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#086288] hover:bg-[#4D8DBA] text-[#FFEFC4] font-semibold text-sm shadow-md shadow-[#086288]/25 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t.uploader.loadDemoBtn}</span>
            </button>
          </div>
        ) : (
          <div
            role="list"
            aria-label="Storyboard slide sequence"
            class="flex flex-col lg:flex-row items-stretch lg:items-start gap-4 lg:overflow-x-auto storyboard-scroll pb-3 pt-1"
          >
            {slides.map((slide, index) => {
              const isDragged = draggedIndex === index;
              const isDragOver = dragOverIndex === index && draggedIndex !== index;

              return (
                <div
                  key={slide.id}
                  role="listitem"
                  draggable
                  onDragStart={(e) => {
                    setDraggedIndex(index);
                    e.dataTransfer.effectAllowed = 'move';
                    e.dataTransfer.setData('text/plain', String(index));
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.dataTransfer.dropEffect = 'move';
                    if (dragOverIndex !== index) {
                      setDragOverIndex(index);
                    }
                  }}
                  onDragLeave={() => {
                    if (dragOverIndex === index) {
                      setDragOverIndex(null);
                    }
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    const fromIdx =
                      draggedIndex !== null
                        ? draggedIndex
                        : parseInt(e.dataTransfer.getData('text/plain'), 10);
                    if (!Number.isNaN(fromIdx) && fromIdx !== index) {
                      moveSlide(fromIdx, index);
                    }
                    setDraggedIndex(null);
                    setDragOverIndex(null);
                  }}
                  onDragEnd={() => {
                    setDraggedIndex(null);
                    setDragOverIndex(null);
                  }}
                  class={`card-surface group relative flex flex-col sm:flex-row lg:flex-col w-full lg:w-64 shrink-0 overflow-hidden transition-all duration-150 ${
                    isDragged ? 'opacity-45 scale-95' : 'opacity-100'
                  } ${
                    isDragOver
                      ? 'ring-2 ring-[#086288] dark:ring-[#FFEFC4] border-[#086288] dark:border-[#FFEFC4] scale-[1.02]'
                      : 'hover:border-[#4D8DBA] dark:hover:border-[#97D7FF]'
                  }`}
                >
                  {/* Thumbnail Preview Container */}
                  <div class="relative w-full sm:w-44 lg:w-full aspect-video bg-[#041821] overflow-hidden shrink-0">
                    <img
                      src={slide.previewUrl}
                      alt={slide.caption || slide.name}
                      class="w-full h-full object-cover select-none pointer-events-none"
                      loading="lazy"
                    />

                    {/* Top Overlay: Sequence Number + Drag Grip + 1080p Tag */}
                    <div class="absolute inset-x-2 top-2 flex items-center justify-between pointer-events-none">
                      <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-[#086288]/90 backdrop-blur-md text-[#FFEFC4] font-mono text-xs font-bold shadow">
                        <GripVertical className="w-3.5 h-3.5 text-[#97D7FF] cursor-grab" />
                        #{index + 1}
                      </span>

                      <span class="px-1.5 py-0.5 rounded bg-[#041821]/85 text-[10px] font-mono text-[#97D7FF]">
                        {slide.width}×{slide.height}
                      </span>
                    </div>
                  </div>

                  {/* Slide Controls Body */}
                  <div class="p-3.5 flex-1 flex flex-col justify-between gap-3">
                    <div class="space-y-2.5">
                      <div class="flex items-center justify-between gap-2">
                        <p
                          class="text-xs font-semibold text-[#086288] dark:text-white truncate"
                          title={slide.name}
                        >
                          {slide.name}
                        </p>
                        <span class="text-[11px] font-mono text-[#4D8DBA] dark:text-[#97D7FF] shrink-0">
                          {formatBytes(slide.compressedSize)}
                        </span>
                      </div>

                      {/* Per-Slide Duration Stepper */}
                      <div class="flex items-center justify-between gap-2 bg-[#97D7FF]/15 dark:bg-[#041821]/80 px-2.5 py-1.5 rounded-xl border border-[#4D8DBA]/25 dark:border-[#97D7FF]/20">
                        <span class="text-[11px] font-medium text-[#086288] dark:text-[#97D7FF] flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#4D8DBA] dark:text-[#FFEFC4]" />
                          Duration
                        </span>
                        <div class="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => updateSlideDuration(slide.id, slide.duration - 0.5)}
                            aria-label="Decrease slide duration"
                            class="w-6 h-6 rounded-lg bg-white dark:bg-[#086288] hover:bg-[#FFEFC4] dark:hover:bg-[#4D8DBA] text-[#086288] dark:text-[#FFEFC4] font-bold text-xs flex items-center justify-center border border-[#4D8DBA]/30"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min={1}
                            max={20}
                            step={0.5}
                            aria-label={`Slide ${index + 1} duration in seconds`}
                            value={slide.duration}
                            onChange={(e) => updateSlideDuration(slide.id, Number(e.target.value))}
                            class="w-11 text-center bg-transparent font-mono text-xs font-bold text-[#086288] dark:text-[#FFEFC4] focus:outline-none"
                          />
                          <span class="text-[10px] text-[#4D8DBA] dark:text-[#97D7FF]">s</span>
                          <button
                            type="button"
                            onClick={() => updateSlideDuration(slide.id, slide.duration + 0.5)}
                            aria-label="Increase slide duration"
                            class="w-6 h-6 rounded-lg bg-white dark:bg-[#086288] hover:bg-[#FFEFC4] dark:hover:bg-[#4D8DBA] text-[#086288] dark:text-[#FFEFC4] font-bold text-xs flex items-center justify-center border border-[#4D8DBA]/30"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Optional Caption Input */}
                      <input
                        type="text"
                        placeholder={t.storyboard.captionPlaceholder}
                        value={slide.caption}
                        onChange={(e) => updateSlideCaption(slide.id, e.target.value)}
                        class="w-full px-2.5 py-1.5 rounded-xl bg-[#97D7FF]/10 dark:bg-[#041821]/80 border border-[#4D8DBA]/25 dark:border-[#97D7FF]/20 text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4D8DBA]"
                      />
                    </div>

                    {/* Action Bar: Reorder Buttons (Vertical arrows on Mobile/Tablet, Horizontal arrows on Desktop) + Duplicate + Delete */}
                    <div class="flex items-center justify-between pt-2 border-t border-[#4D8DBA]/15 dark:border-[#97D7FF]/15">
                      <div class="flex items-center gap-1">
                        {/* Move Earlier (Up on mobile/tablet, Left on desktop lg+) */}
                        <button
                          type="button"
                          onClick={() => moveSlide(index, index - 1)}
                          disabled={index === 0}
                          title={t.storyboard.moveEarlier}
                          aria-label={t.storyboard.moveEarlier}
                          class="p-1.5 rounded-lg bg-[#97D7FF]/25 hover:bg-[#97D7FF]/50 dark:bg-[#086288] dark:hover:bg-[#4D8DBA] text-[#086288] dark:text-[#FFEFC4] disabled:opacity-30 transition-colors"
                        >
                          <ChevronUp className="w-4 h-4 block lg:hidden" />
                          <ChevronLeft className="w-4 h-4 hidden lg:block" />
                        </button>

                        {/* Move Later (Down on mobile/tablet, Right on desktop lg+) */}
                        <button
                          type="button"
                          onClick={() => moveSlide(index, index + 1)}
                          disabled={index === slides.length - 1}
                          title={t.storyboard.moveLater}
                          aria-label={t.storyboard.moveLater}
                          class="p-1.5 rounded-lg bg-[#97D7FF]/25 hover:bg-[#97D7FF]/50 dark:bg-[#086288] dark:hover:bg-[#4D8DBA] text-[#086288] dark:text-[#FFEFC4] disabled:opacity-30 transition-colors"
                        >
                          <ChevronDown className="w-4 h-4 block lg:hidden" />
                          <ChevronRight className="w-4 h-4 hidden lg:block" />
                        </button>
                      </div>

                      <div class="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => duplicateSlide(index)}
                          title={t.storyboard.duplicateSlide}
                          aria-label={t.storyboard.duplicateSlide}
                          class="p-1.5 rounded-lg hover:bg-[#97D7FF]/25 dark:hover:bg-[#086288] text-[#4D8DBA] hover:text-[#086288] dark:text-[#97D7FF] dark:hover:text-[#FFEFC4] transition-colors"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeSlide(slide.id)}
                          title={t.storyboard.removeSlide}
                          aria-label={t.storyboard.removeSlide}
                          class="p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/60 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Live Preview Monitor & "Create Memory" Rendering Engine Deck */}
        {slides.length > 0 && (
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
            {/* Live Interactive Canvas Monitor (7 cols) */}
            <div class="lg:col-span-7 card-surface p-4 sm:p-6 flex flex-col justify-between">
              <div class="flex items-center justify-between gap-2 mb-3">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-[#4D8DBA] dark:bg-[#97D7FF]"></span>
                  <h3 class="font-display font-bold text-sm sm:text-base text-[#086288] dark:text-[#FFEFC4]">
                    {t.storyboard.previewTitle}
                  </h3>
                </div>
                <span class="text-xs font-mono text-[#4D8DBA] dark:text-[#97D7FF] font-semibold">
                  {previewTimeSec.toFixed(1)}s / {totalDurationSec.toFixed(1)}s
                </span>
              </div>

              <div class="relative w-full rounded-xl bg-[#041821] overflow-hidden flex items-center justify-center aspect-video border border-[#4D8DBA]/35 shadow-inner">
                <canvas
                  ref={previewCanvasRef}
                  class="max-w-full max-h-full object-contain"
                />
              </div>

              {/* Scrubber + Play/Pause Controls */}
              <div class="mt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsPlayingPreview((p) => !p)}
                  class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#086288] hover:bg-[#4D8DBA] text-[#FFEFC4] font-semibold text-xs shrink-0 transition-all shadow-sm"
                >
                  {isPlayingPreview ? (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span>{t.storyboard.pausePreview}</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{t.storyboard.playPreview}</span>
                    </>
                  )}
                </button>

                <input
                  type="range"
                  min={0}
                  max={Math.max(0.1, totalDurationSec)}
                  step={0.05}
                  aria-label="Timeline preview scrubber"
                  value={previewTimeSec}
                  onChange={(e) => {
                    setIsPlayingPreview(false);
                    setPreviewTimeSec(Number(e.target.value));
                  }}
                  class="w-full accent-[#086288] dark:accent-[#97D7FF] cursor-pointer"
                />
              </div>
            </div>

            {/* Export / Rendering Engine Panel (5 cols) */}
            <div class="lg:col-span-5 card-surface p-5 sm:p-6 flex flex-col justify-between">
              {isRendering ? (
                /* Active Rendering State ("Stitching your memory...") */
                <div class="flex flex-col items-center justify-center text-center my-auto py-4 space-y-4">
                  <div class="relative w-full aspect-video rounded-xl overflow-hidden bg-[#041821] border border-[#97D7FF]/50 shadow-lg">
                    <canvas
                      ref={renderCanvasRef}
                      class="w-full h-full object-contain"
                    />
                    <div class="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-[#086288]/90 backdrop-blur-md text-[#FFEFC4] text-[11px] font-mono flex items-center gap-1.5">
                      <span class="w-2 h-2 rounded-full bg-[#FFEFC4] animate-ping"></span>
                      <span>REC • 1080p</span>
                    </div>
                  </div>

                  <div class="w-full space-y-2">
                    <div class="flex items-center justify-between text-xs font-semibold">
                      <span class="text-[#086288] dark:text-[#FFEFC4] animate-pulse">
                        {t.storyboard.renderingTitle}
                      </span>
                      <span class="font-mono text-[#4D8DBA] dark:text-[#97D7FF]">
                        {renderProgress?.percent ?? 0}%
                      </span>
                    </div>

                    <div class="w-full h-2.5 rounded-full bg-[#97D7FF]/25 dark:bg-[#041821] overflow-hidden">
                      <div
                        class="h-full bg-gradient-to-r from-[#086288] via-[#4D8DBA] to-[#97D7FF] transition-all duration-150 rounded-full"
                        style={{ width: `${renderProgress?.percent ?? 0}%` }}
                      />
                    </div>

                    <p class="text-xs text-slate-500 dark:text-slate-300">
                      {t.storyboard.renderingSubtitle}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleCancelRender}
                    class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 text-xs font-semibold hover:bg-rose-100 transition-colors"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>{t.storyboard.cancelRenderBtn}</span>
                  </button>
                </div>
              ) : renderOutput ? (
                /* Completed Video Export Card */
                <div class="flex flex-col justify-between h-full space-y-4">
                  <div>
                    <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FFEFC4] dark:bg-[#086288] text-[#086288] dark:text-[#FFEFC4] text-xs font-semibold mb-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{t.storyboard.readyTitle}</span>
                    </div>
                    <p class="text-xs text-slate-600 dark:text-slate-300">
                      {t.storyboard.readySubtitle}
                    </p>
                  </div>

                  <div class="rounded-xl overflow-hidden bg-[#041821] border border-[#4D8DBA]/40 aspect-video">
                    <video
                      src={renderOutput.url}
                      controls
                      playsInline
                      class="w-full h-full object-contain"
                    />
                  </div>

                  <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                    <a
                      href={renderOutput.url}
                      download={`MemoryReel-${new Date().toISOString().slice(0, 10)}.${renderOutput.extension}`}
                      class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#086288] hover:bg-[#4D8DBA] text-[#FFEFC4] font-semibold text-sm shadow-lg shadow-[#086288]/25 transition-all"
                    >
                      <Download className="w-4 h-4" />
                      <span>
                        {t.storyboard.downloadVideoBtn} (.{renderOutput.extension.toUpperCase()} •{' '}
                        {formatBytes(renderOutput.blob.size)})
                      </span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setRenderOutput(null)}
                      class="inline-flex items-center justify-center gap-1.5 px-3.5 py-3 rounded-xl bg-[#97D7FF]/25 hover:bg-[#97D7FF]/45 dark:bg-[#086288]/70 dark:hover:bg-[#086288] text-[#086288] dark:text-[#97D7FF] text-xs font-semibold transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{t.storyboard.createNewRenderBtn}</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Ready-to-Render CTA State */
                <div class="flex flex-col justify-between h-full space-y-5">
                  <div class="space-y-3">
                    <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#086288] via-[#4D8DBA] to-[#97D7FF] flex items-center justify-center text-[#FFEFC4] shadow-md shadow-[#086288]/25">
                      <Film className="w-6 h-6" />
                    </div>

                    <h3 class="font-display font-bold text-lg sm:text-xl text-[#086288] dark:text-[#FFEFC4]">
                      {t.storyboard.createMemoryBtn}
                    </h3>

                    <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {t.storyboard.renderingSubtitle}
                    </p>

                    <div class="p-3.5 rounded-xl bg-[#97D7FF]/15 dark:bg-[#041821]/80 border border-[#4D8DBA]/25 dark:border-[#97D7FF]/20 space-y-2 text-xs">
                      <div class="flex items-center justify-between">
                        <span class="text-slate-500 dark:text-slate-400">Output Resolution</span>
                        <span class="font-mono font-semibold text-[#086288] dark:text-[#97D7FF]">
                          {aspectRatio === '16:9'
                            ? '1920×1080 (Full HD)'
                            : aspectRatio === '9:16'
                              ? '1080×1920 (Vertical HD)'
                              : '1080×1080 (Square HD)'}
                        </span>
                      </div>
                      <div class="flex items-center justify-between">
                        <span class="text-slate-500 dark:text-slate-400">Transitions</span>
                        <span class="font-mono font-semibold text-[#086288] dark:text-[#97D7FF]">
                          {transitionDuration}s Crossfade {enableKenBurns ? '+ Ken Burns' : ''}
                        </span>
                      </div>
                      <div class="flex items-center justify-between">
                        <span class="text-slate-500 dark:text-slate-400">Audio Track</span>
                        <span class="font-mono font-semibold text-[#086288] dark:text-[#FFEFC4] truncate max-w-[180px]">
                          {audioTrack ? audioTrack.name : 'Silent (No Audio)'}
                        </span>
                      </div>
                    </div>

                    {renderError && (
                      <div class="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-xs text-rose-600 dark:text-rose-300">
                        {renderError}
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleCreateMemory}
                    class="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-gradient-to-r from-[#086288] via-[#4D8DBA] to-[#086288] hover:from-[#4D8DBA] hover:to-[#086288] text-[#FFEFC4] font-display font-bold text-base shadow-xl shadow-[#086288]/30 transition-all active:scale-[0.99]"
                  >
                    <Sparkles className="w-5 h-5 text-[#FFEFC4]" />
                    <span>{t.storyboard.createMemoryBtn}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
