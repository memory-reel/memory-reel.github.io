import { loadImageElement, type SlideItem, type AudioTrackItem } from './imageCompressor';

export type AspectRatioPreset = '16:9' | '9:16' | '1:1';
export type FitMode = 'cover' | 'contain-blur';

export interface RenderConfig {
  slides: SlideItem[];
  audioTrack?: AudioTrackItem | null;
  transitionDuration: number; // seconds, e.g. 0.8
  aspectRatio: AspectRatioPreset;
  fitMode: FitMode;
  enableKenBurns: boolean;
  fps?: number;
}

export interface RenderProgress {
  percent: number;
  currentSlideIndex: number;
  totalSlides: number;
  elapsedSec: number;
  totalDurationSec: number;
  statusText: string;
}

export interface RenderOutput {
  blob: Blob;
  url: string;
  mimeType: string;
  extension: 'mp4' | 'webm';
  durationSec: number;
}

export function getResolutionForAspect(aspect: AspectRatioPreset): { width: number; height: number } {
  switch (aspect) {
    case '9:16':
      return { width: 1080, height: 1920 };
    case '1:1':
      return { width: 1080, height: 1080 };
    case '16:9':
    default:
      return { width: 1920, height: 1080 };
  }
}

export function calculateTotalTimelineDuration(slides: SlideItem[]): number {
  return slides.reduce((sum, s) => sum + Math.max(1, s.duration), 0);
}

/**
 * Selects the best supported MediaRecorder MIME type for video + audio export.
 */
export function getSupportedVideoMimeType(): { mimeType: string; extension: 'mp4' | 'webm' } {
  const candidates: { mimeType: string; extension: 'mp4' | 'webm' }[] = [
    { mimeType: 'video/mp4;codecs=avc1.42E01E,mp4a.40.2', extension: 'mp4' },
    { mimeType: 'video/mp4;codecs=avc1', extension: 'mp4' },
    { mimeType: 'video/mp4', extension: 'mp4' },
    { mimeType: 'video/webm;codecs=vp9,opus', extension: 'webm' },
    { mimeType: 'video/webm;codecs=vp8,opus', extension: 'webm' },
    { mimeType: 'video/webm', extension: 'webm' },
  ];

  if (typeof MediaRecorder !== 'undefined' && typeof MediaRecorder.isTypeSupported === 'function') {
    for (const candidate of candidates) {
      if (MediaRecorder.isTypeSupported(candidate.mimeType)) {
        return candidate;
      }
    }
  }

  return { mimeType: 'video/webm', extension: 'webm' };
}

/**
 * Draws a single slide image onto the target canvas context with optional
 * blurred backdrop, Ken Burns motion, and caption overlay.
 */
function drawSingleSlideLayer(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  slide: SlideItem,
  canvasW: number,
  canvasH: number,
  slideProgress: number, // 0..1
  fitMode: FitMode,
  enableKenBurns: boolean,
  alpha: number
) {
  ctx.save();
  ctx.globalAlpha = Math.max(0, Math.min(1, alpha));

  const imgW = img.naturalWidth || img.width || 1920;
  const imgH = img.naturalHeight || img.height || 1080;

  // Calculate subtle Ken Burns transform
  let scaleFactor = 1;
  let offsetX = 0;
  let offsetY = 0;

  if (enableKenBurns) {
    const p = Math.max(0, Math.min(1, slideProgress));
    switch (slide.kenBurnsDirection) {
      case 'zoom-in':
        scaleFactor = 1 + 0.08 * p;
        break;
      case 'zoom-out':
        scaleFactor = 1.08 - 0.08 * p;
        break;
      case 'pan-left':
        scaleFactor = 1.06;
        offsetX = (0.5 - p) * canvasW * 0.04;
        break;
      case 'pan-right':
        scaleFactor = 1.06;
        offsetX = (p - 0.5) * canvasW * 0.04;
        break;
    }
  }

  if (fitMode === 'contain-blur') {
    // 1. Draw atmospheric blurred cover background
    const coverScale = Math.max(canvasW / imgW, canvasH / imgH) * 1.12;
    const bgW = imgW * coverScale;
    const bgH = imgH * coverScale;
    const bgX = (canvasW - bgW) / 2;
    const bgY = (canvasH - bgH) / 2;

    ctx.save();
    ctx.filter = 'blur(28px) brightness(0.55)';
    ctx.drawImage(img, bgX, bgY, bgW, bgH);
    ctx.restore();

    // 2. Draw crisp contained foreground image
    const containScale = Math.min(canvasW / imgW, canvasH / imgH) * scaleFactor;
    const fgW = imgW * containScale;
    const fgH = imgH * containScale;
    const fgX = (canvasW - fgW) / 2 + offsetX;
    const fgY = (canvasH - fgH) / 2 + offsetY;

    ctx.drawImage(img, fgX, fgY, fgW, fgH);
  } else {
    // Cinema Cover Fill
    const coverScale = Math.max(canvasW / imgW, canvasH / imgH) * scaleFactor;
    const drawW = imgW * coverScale;
    const drawH = imgH * coverScale;
    const drawX = (canvasW - drawW) / 2 + offsetX;
    const drawY = (canvasH - drawH) / 2 + offsetY;

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }

  // Optional Caption Overlay
  if (slide.caption && slide.caption.trim().length > 0) {
    const text = slide.caption.trim();
    const fontSize = Math.round(canvasH * 0.036);
    ctx.font = `600 ${fontSize}px "Plus Jakarta Sans", "Inter", system-ui, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const metrics = ctx.measureText(text);
    const padX = fontSize * 0.9;
    const padY = fontSize * 0.5;
    const boxW = Math.min(canvasW * 0.88, metrics.width + padX * 2);
    const boxH = fontSize + padY * 2;
    const boxX = (canvasW - boxW) / 2;
    const boxY = canvasH - boxH - Math.round(canvasH * 0.065);

    // Pill backdrop (#086288 with translucency)
    ctx.fillStyle = 'rgba(8, 98, 136, 0.85)';
    const radius = Math.round(boxH / 2);
    ctx.beginPath();
    ctx.roundRect(boxX, boxY, boxW, boxH, radius);
    ctx.fill();

    // Caption text (#FFEFC4)
    ctx.fillStyle = '#FFEFC4';
    ctx.fillText(text, canvasW / 2, boxY + boxH / 2, canvasW * 0.82);
  }

  ctx.restore();
}

/**
 * Renders the composite storyboard frame at timestamp `elapsedSec` (including
 * smooth crossfade transitions between adjacent slides) onto `ctx`.
 */
export function drawStoryboardFrameAtTime(
  ctx: CanvasRenderingContext2D,
  slides: SlideItem[],
  loadedImages: HTMLImageElement[],
  elapsedSec: number,
  transitionDuration: number,
  fitMode: FitMode,
  enableKenBurns: boolean
): { activeSlideIndex: number } {
  const canvasW = ctx.canvas.width;
  const canvasH = ctx.canvas.height;

  // Base dark oceanic canvas clear
  ctx.fillStyle = '#041821';
  ctx.fillRect(0, 0, canvasW, canvasH);

  if (slides.length === 0 || loadedImages.length === 0) {
    return { activeSlideIndex: 0 };
  }

  // Determine current slide index and local time within slide
  let accumulated = 0;
  let activeIndex = slides.length - 1;
  let localTime = slides[activeIndex].duration;

  for (let i = 0; i < slides.length; i++) {
    const dur = Math.max(1, slides[i].duration);
    if (elapsedSec <= accumulated + dur || i === slides.length - 1) {
      activeIndex = i;
      localTime = Math.max(0, Math.min(dur, elapsedSec - accumulated));
      break;
    }
    accumulated += dur;
  }

  const currentSlide = slides[activeIndex];
  const currentImg = loadedImages[activeIndex];
  const currentDuration = Math.max(1, currentSlide.duration);
  const slideProgress = currentDuration > 0 ? localTime / currentDuration : 0;

  // Draw current slide
  if (currentImg) {
    drawSingleSlideLayer(
      ctx,
      currentImg,
      currentSlide,
      canvasW,
      canvasH,
      slideProgress,
      fitMode,
      enableKenBurns,
      1
    );
  }

  // Check if we are in the crossfade window at the end of the current slide
  const effectiveTransition = Math.min(transitionDuration, currentDuration * 0.45);
  const timeRemaining = currentDuration - localTime;

  if (
    effectiveTransition > 0 &&
    timeRemaining <= effectiveTransition &&
    activeIndex < slides.length - 1
  ) {
    const nextSlide = slides[activeIndex + 1];
    const nextImg = loadedImages[activeIndex + 1];
    if (nextImg) {
      // Smooth cosine interpolation for crossfade alpha
      const rawFade = 1 - timeRemaining / effectiveTransition;
      const smoothAlpha = 0.5 - 0.5 * Math.cos(Math.max(0, Math.min(1, rawFade)) * Math.PI);

      drawSingleSlideLayer(
        ctx,
        nextImg,
        nextSlide,
        canvasW,
        canvasH,
        0,
        fitMode,
        enableKenBurns,
        smoothAlpha
      );
    }
  }

  return { activeSlideIndex: activeIndex };
}

/**
 * Renders the complete slideshow + audio track into a downloadable video Blob
 * using HTML5 Canvas (`canvas.captureStream`) and `MediaRecorder`.
 */
export async function renderSlideshowToVideo(
  config: RenderConfig,
  onProgress?: (progress: RenderProgress) => void,
  previewCanvas?: HTMLCanvasElement | null,
  abortSignal?: AbortSignal
): Promise<RenderOutput> {
  const {
    slides,
    audioTrack,
    transitionDuration = 0.8,
    aspectRatio = '16:9',
    fitMode = 'cover',
    enableKenBurns = true,
    fps = 30,
  } = config;

  if (!slides || slides.length === 0) {
    throw new Error('Cannot render video: Storyboard has no slides.');
  }

  // 1. Pre-decode all slide images
  const loadedImages = await Promise.all(
    slides.map((slide) => loadImageElement(slide.previewUrl))
  );

  const { width, height } = getResolutionForAspect(aspectRatio);
  const totalDurationSec = calculateTotalTimelineDuration(slides);

  // Use off-screen or provided render canvas
  const renderCanvas = document.createElement('canvas');
  renderCanvas.width = width;
  renderCanvas.height = height;
  const ctx = renderCanvas.getContext('2d', { alpha: false });
  if (!ctx) {
    throw new Error('Failed to create 2D rendering context.');
  }

  const previewCtx = previewCanvas ? previewCanvas.getContext('2d') : null;
  if (previewCanvas) {
    previewCanvas.width = width;
    previewCanvas.height = height;
  }

  // 2. Capture video stream from Canvas
  const canvasStream = renderCanvas.captureStream(fps);
  const combinedTracks: MediaStreamTrack[] = [...canvasStream.getVideoTracks()];

  // 3. Optional Web Audio API pipeline for mixing local audio into the MediaStream
  let audioCtx: AudioContext | null = null;
  let audioSource: AudioBufferSourceNode | null = null;

  if (audioTrack?.file) {
    try {
      const AudioContextClass =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtx = new AudioContextClass();
      if (audioCtx.state === 'suspended') {
        await audioCtx.resume();
      }

      const arrayBuffer = await audioTrack.file.arrayBuffer();
      const decodedBuffer = await audioCtx.decodeAudioData(arrayBuffer.slice(0));

      const destNode = audioCtx.createMediaStreamDestination();
      const gainNode = audioCtx.createGain();

      // Smooth audio fade-in and fade-out at end of video
      const now = audioCtx.currentTime;
      gainNode.gain.setValueAtTime(0.01, now);
      gainNode.gain.linearRampToValueAtTime(1.0, now + Math.min(0.8, totalDurationSec * 0.1));
      if (totalDurationSec > 2.0) {
        gainNode.gain.setValueAtTime(1.0, now + totalDurationSec - 1.2);
        gainNode.gain.linearRampToValueAtTime(0.001, now + totalDurationSec);
      }

      audioSource = audioCtx.createBufferSource();
      audioSource.buffer = decodedBuffer;
      audioSource.loop = true; // Loop seamlessly if slideshow is longer than audio track
      audioSource.connect(gainNode);
      gainNode.connect(destNode);

      const audioTracks = destNode.stream.getAudioTracks();
      if (audioTracks.length > 0) {
        combinedTracks.push(audioTracks[0]);
      }
    } catch (audioErr) {
      console.warn('Could not attach audio track to MediaRecorder; continuing with video stream:', audioErr);
    }
  }

  const combinedStream = new MediaStream(combinedTracks);
  const { mimeType, extension } = getSupportedVideoMimeType();

  const recordedChunks: BlobPart[] = [];
  const recorder = new MediaRecorder(combinedStream, {
    mimeType,
    videoBitsPerSecond: 8_000_000, // 8 Mbps crisp 1080p quality
  });

  recorder.ondataavailable = (event) => {
    if (event.data && event.data.size > 0) {
      recordedChunks.push(event.data);
    }
  };

  const recorderStoppedPromise = new Promise<Blob>((resolve, reject) => {
    recorder.onstop = () => {
      const finalBlob = new Blob(recordedChunks, { type: mimeType });
      resolve(finalBlob);
    };
    recorder.onerror = (event) => {
      reject(new Error(`MediaRecorder error: ${(event as unknown as { error?: Error })?.error?.message || 'Unknown'}`));
    };
  });

  // Draw initial frame before starting recorder
  drawStoryboardFrameAtTime(
    ctx,
    slides,
    loadedImages,
    0,
    transitionDuration,
    fitMode,
    enableKenBurns
  );
  if (previewCtx && previewCanvas) {
    previewCtx.drawImage(renderCanvas, 0, 0, previewCanvas.width, previewCanvas.height);
  }

  // Start recording and audio playback simultaneously
  recorder.start(200);
  if (audioSource) {
    audioSource.start(0);
  }

  const startTimeMs = performance.now();
  const frameIntervalMs = 1000 / fps;

  try {
    await new Promise<void>((resolve, reject) => {
      const tick = () => {
        if (abortSignal?.aborted) {
          reject(new Error('Rendering cancelled by user.'));
          return;
        }

        const elapsedSec = (performance.now() - startTimeMs) / 1000;
        const clampedElapsed = Math.min(elapsedSec, totalDurationSec);

        const { activeSlideIndex } = drawStoryboardFrameAtTime(
          ctx,
          slides,
          loadedImages,
          clampedElapsed,
          transitionDuration,
          fitMode,
          enableKenBurns
        );

        if (previewCtx && previewCanvas) {
          previewCtx.drawImage(renderCanvas, 0, 0, previewCanvas.width, previewCanvas.height);
        }

        const percent = Math.min(100, Math.round((clampedElapsed / totalDurationSec) * 100));
        onProgress?.({
          percent,
          currentSlideIndex: activeSlideIndex,
          totalSlides: slides.length,
          elapsedSec: clampedElapsed,
          totalDurationSec,
          statusText: `Stitching your memory... (${percent}%)`,
        });

        if (elapsedSec >= totalDurationSec) {
          resolve();
        } else {
          setTimeout(tick, frameIntervalMs);
        }
      };

      tick();
    });
  } finally {
    try {
      if (audioSource) {
        audioSource.stop();
      }
    } catch {
      // Ignore if already stopped
    }
    if (audioCtx && audioCtx.state !== 'closed') {
      await audioCtx.close().catch(() => {});
    }
    canvasStream.getTracks().forEach((t) => t.stop());
  }

  if (recorder.state !== 'inactive') {
    recorder.stop();
  }

  const videoBlob = await recorderStoppedPromise;
  const videoUrl = URL.createObjectURL(videoBlob);

  return {
    blob: videoBlob,
    url: videoUrl,
    mimeType,
    extension,
    durationSec: totalDurationSec,
  };
}
