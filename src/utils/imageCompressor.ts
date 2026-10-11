export type KenBurnsDirection = 'zoom-in' | 'zoom-out' | 'pan-left' | 'pan-right';

export interface SlideItem {
  id: string;
  name: string;
  previewUrl: string;
  blob: Blob;
  width: number;
  height: number;
  originalSize: number;
  compressedSize: number;
  duration: number;
  caption: string;
  kenBurnsDirection: KenBurnsDirection;
}

export interface AudioTrackItem {
  id: string;
  name: string;
  file: File | Blob;
  url: string;
  duration: number;
  size: number;
  isGenerated?: boolean;
}

const TARGET_MAX_WIDTH = 1920;
const TARGET_MAX_HEIGHT = 1080;
const JPEG_QUALITY = 0.88;

const KEN_BURNS_CYCLE: KenBurnsDirection[] = ['zoom-in', 'pan-right', 'zoom-out', 'pan-left'];

/**
 * Downscales an uploaded image file to a standardized 1080p bounding box
 * using an off-screen HTML5 Canvas (`ctx.drawImage`) before storing in memory.
 * Immediately frees the raw high-res ObjectURL to prevent browser memory crashes.
 */
export async function downscaleImageTo1080p(
  file: File,
  defaultDuration = 3,
  sequenceIndex = 0
): Promise<SlideItem> {
  const rawUrl = URL.createObjectURL(file);

  try {
    const img = await loadImageElement(rawUrl);
    const srcW = img.naturalWidth || img.width || 1920;
    const srcH = img.naturalHeight || img.height || 1080;

    // Calculate standardized 1080p dimensions preserving aspect ratio
    const scale = Math.min(TARGET_MAX_WIDTH / srcW, TARGET_MAX_HEIGHT / srcH, 1);
    const targetW = Math.max(2, Math.round((srcW * scale) / 2) * 2);
    const targetH = Math.max(2, Math.round((srcH * scale) / 2) * 2);

    const canvas = document.createElement('canvas');
    canvas.width = targetW;
    canvas.height = targetH;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Could not initialize 2D context on off-screen Canvas');
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0, targetW, targetH);

    const compressedBlob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error('Off-screen canvas toBlob failed'));
        },
        'image/jpeg',
        JPEG_QUALITY
      );
    });

    // Clear canvas memory reference
    canvas.width = 1;
    canvas.height = 1;

    const previewUrl = URL.createObjectURL(compressedBlob);
    const cleanTitle = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]+/g, ' ');

    return {
      id: `slide-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: file.name,
      previewUrl,
      blob: compressedBlob,
      width: targetW,
      height: targetH,
      originalSize: file.size,
      compressedSize: compressedBlob.size,
      duration: defaultDuration,
      caption: '',
      kenBurnsDirection: KEN_BURNS_CYCLE[sequenceIndex % KEN_BURNS_CYCLE.length],
      // Keep clean title available if user wants quick reference
    };
  } finally {
    // Release raw high-res object URL immediately to keep memory usage low
    URL.revokeObjectURL(rawUrl);
  }
}

export function loadImageElement(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to decode image: ${url}`));
    img.src = url;
  });
}

export function formatBytes(bytes: number): string {
  if (bytes <= 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

/**
 * Reads the duration of an audio file using HTMLAudioElement metadata.
 */
export function getAudioFileDuration(url: string): Promise<number> {
  return new Promise((resolve) => {
    const audio = new Audio();
    audio.preload = 'metadata';
    const cleanup = () => {
      audio.removeAttribute('src');
    };
    audio.onloadedmetadata = () => {
      const dur = Number.isFinite(audio.duration) ? audio.duration : 15;
      cleanup();
      resolve(dur);
    };
    audio.onerror = () => {
      cleanup();
      resolve(15);
    };
    audio.src = url;
  });
}

/**
 * Generates a warm, atmospheric stereo WAV audio track completely client-side
 * so users can test audio-synced video rendering immediately without needing an MP3 file.
 */
export function generateAmbientAudioTrack(durationSec = 16): AudioTrackItem {
  const sampleRate = 44100;
  const numChannels = 2;
  const numSamples = sampleRate * durationSec;
  const buffer = new ArrayBuffer(44 + numSamples * numChannels * 2);
  const view = new DataView(buffer);

  const writeString = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  };

  // RIFF WAV Header
  writeString(0, 'RIFF');
  view.setUint32(4, 36 + numSamples * numChannels * 2, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * numChannels * 2, true);
  view.setUint16(32, numChannels * 2, true);
  view.setUint16(34, 16, true);
  writeString(36, 'data');
  view.setUint32(40, numSamples * numChannels * 2, true);

  // Warm chord progression: Cmaj7 -> Am9 -> Fmaj7 -> G6
  const chords = [
    [261.63, 329.63, 392.0, 493.88],
    [220.0, 261.63, 329.63, 392.0],
    [174.61, 220.0, 261.63, 329.63],
    [196.0, 246.94, 293.66, 329.63],
  ];

  const chordLen = durationSec / chords.length;
  let offset = 44;

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const chordIdx = Math.min(chords.length - 1, Math.floor(t / chordLen));
    const localT = t - chordIdx * chordLen;
    const chord = chords[chordIdx];

    // Smooth envelope per chord + global fade in/out
    const chordEnv = Math.sin((Math.min(localT, chordLen) / chordLen) * Math.PI);
    const globalFade =
      t < 1.0 ? t : t > durationSec - 1.5 ? Math.max(0, (durationSec - t) / 1.5) : 1.0;

    // Gentle arpeggio + pad synthesis
    let sigL = 0;
    let sigR = 0;
    for (let n = 0; n < chord.length; n++) {
      const freq = chord[n];
      const detune = n % 2 === 0 ? 1.0015 : 0.9985;
      const padL = Math.sin(2 * Math.PI * freq * t) * 0.16;
      const padR = Math.sin(2 * Math.PI * freq * detune * t + 0.3) * 0.16;
      const shimmer = Math.sin(2 * Math.PI * freq * 2 * t) * 0.04 * Math.sin(2 * Math.PI * 0.5 * t + n);
      sigL += padL + shimmer;
      sigR += padR + shimmer;
    }

    const amp = 0.42 * (0.35 + 0.65 * chordEnv) * globalFade;
    const sampleL = Math.max(-1, Math.min(1, sigL * amp));
    const sampleR = Math.max(-1, Math.min(1, sigR * amp));

    view.setInt16(offset, sampleL * 32767, true);
    view.setInt16(offset + 2, sampleR * 32767, true);
    offset += 4;
  }

  const blob = new Blob([buffer], { type: 'audio/wav' });
  const file = new File([blob], 'Cinema-Warm-Horizon-Ambient.wav', { type: 'audio/wav' });
  const url = URL.createObjectURL(file);

  return {
    id: `audio-ambient-${Date.now()}`,
    name: 'Cinema-Warm-Horizon-Ambient.wav',
    file,
    url,
    duration: durationSec,
    size: file.size,
    isGenerated: true,
  };
}

/**
 * Generates 4 high-aesthetic 1080p demo slides rendered via off-screen Canvas
 * so users can test the full storyboard & video export pipeline with one click.
 */
export async function generateDemoSlides(): Promise<SlideItem[]> {
  const scenes = [
    {
      name: '01-Ocean-Horizon-Sunrise.jpg',
      caption: 'Morning Light Over Deep Waters',
      skyTop: '#086288',
      skyMid: '#4D8DBA',
      skyBot: '#FFEFC4',
      sunColor: '#FFEFC4',
      sunX: 0.68,
      sunY: 0.42,
      mtn1: '#4D8DBA',
      mtn2: '#086288',
      mtn3: '#042A3B',
    },
    {
      name: '02-Glacier-Sky-Reflections.jpg',
      caption: 'Crystal Bay & Nordic Peaks',
      skyTop: '#042A3B',
      skyMid: '#086288',
      skyBot: '#97D7FF',
      sunColor: '#FFEFC4',
      sunX: 0.32,
      sunY: 0.35,
      mtn1: '#4D8DBA',
      mtn2: '#086288',
      mtn3: '#021822',
    },
    {
      name: '03-Golden-Cream-Cliffs.jpg',
      caption: 'Chasing the Warm Horizon',
      skyTop: '#086288',
      skyMid: '#97D7FF',
      skyBot: '#FFEFC4',
      sunColor: '#FFFFFF',
      sunX: 0.52,
      sunY: 0.48,
      mtn1: '#4D8DBA',
      mtn2: '#086288',
      mtn3: '#041821',
    },
    {
      name: '04-Starlight-Cerulean-Camp.jpg',
      caption: 'Under a Cerulean Night Sky',
      skyTop: '#021822',
      skyMid: '#086288',
      skyBot: '#4D8DBA',
      sunColor: '#FFEFC4',
      sunX: 0.78,
      sunY: 0.25,
      mtn1: '#4D8DBA',
      mtn2: '#086288',
      mtn3: '#021822',
    },
  ];

  const items: SlideItem[] = [];

  for (let i = 0; i < scenes.length; i++) {
    const s = scenes[i];
    const canvas = document.createElement('canvas');
    canvas.width = 1920;
    canvas.height = 1080;
    const ctx = canvas.getContext('2d')!;

    // Sky gradient
    const grad = ctx.createLinearGradient(0, 0, 0, 1080);
    grad.addColorStop(0, s.skyTop);
    grad.addColorStop(0.55, s.skyMid);
    grad.addColorStop(1, s.skyBot);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1920, 1080);

    // Subtle stars
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    for (let st = 0; st < 70; st++) {
      const sx = ((st * 397 + i * 131) % 1920);
      const sy = ((st * 263 + i * 73) % 520);
      const sr = (st % 3) * 0.8 + 0.8;
      ctx.beginPath();
      ctx.arc(sx, sy, sr, 0, Math.PI * 2);
      ctx.fill();
    }

    // Glowing Sun / Moon
    const cx = 1920 * s.sunX;
    const cy = 1080 * s.sunY;
    const sunGlow = ctx.createRadialGradient(cx, cy, 10, cx, cy, 320);
    sunGlow.addColorStop(0, s.sunColor);
    sunGlow.addColorStop(0.3, s.sunColor + '88');
    sunGlow.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = sunGlow;
    ctx.beginPath();
    ctx.arc(cx, cy, 320, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = s.sunColor;
    ctx.beginPath();
    ctx.arc(cx, cy, 72, 0, Math.PI * 2);
    ctx.fill();

    // Layered Mountain Silhouettes
    const drawMountainLayer = (baseY: number, amp: number, seed: number, color: string) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(0, 1080);
      for (let x = 0; x <= 1920; x += 40) {
        const y =
          baseY -
          Math.sin(x * 0.0025 + seed) * amp -
          Math.cos(x * 0.006 - seed * 1.4) * (amp * 0.45);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(1920, 1080);
      ctx.closePath();
      ctx.fill();
    };

    drawMountainLayer(680, 140, i * 1.7 + 1, s.mtn1);
    drawMountainLayer(790, 110, i * 2.3 + 3, s.mtn2);
    drawMountainLayer(910, 75, i * 3.1 + 5, s.mtn3);

    const blob = await new Promise<Blob>((resolve) =>
      canvas.toBlob((b) => resolve(b!), 'image/jpeg', 0.9)
    );
    const previewUrl = URL.createObjectURL(blob);

    items.push({
      id: `demo-slide-${i}-${Date.now()}`,
      name: s.name,
      previewUrl,
      blob,
      width: 1920,
      height: 1080,
      originalSize: blob.size * 6, // Simulated 4K raw camera photo size before 1080p optimization
      compressedSize: blob.size,
      duration: 3,
      caption: s.caption,
      kenBurnsDirection: KEN_BURNS_CYCLE[i % KEN_BURNS_CYCLE.length],
    });
  }

  return items;
}
