# MemoryReel | Zero-Server Storyboard & Slideshow Creator

**Live URL:** [https://memory-reel.github.io](https://memory-reel.github.io)  
**Support Developer:** [Buy Me a Coffee (@kisharadilz)](https://buymeacoffee.com/kisharadilz)

MemoryReel is a **100% client-side web application** built with **Astro**, **React (Islands Architecture)**, and **Tailwind CSS** that enables users to bulk-select local photos and an audio track, arrange them on an interactive storyboard timeline, and export a high-definition 1080p MP4/WebM video slideshow directly inside the browser using the HTML5 `Canvas`, `Web Audio API`, and `MediaRecorder` APIs.

Zero server uploads ensure complete privacy and instant performance.

---

## Core Architecture & Features

- **Off-Screen 1080p Canvas Image Optimizer (`src/utils/imageCompressor.ts` & `src/components/MediaUploader.tsx`)**
  - Bulk drag-and-drop photo ingestion using the HTML5 File API.
  - Automatically downscales heavy 4K/8K camera photos to a standardized `1920×1080` resolution via an off-screen `<canvas>` (`ctx.drawImage`) before storing in React state, preventing browser tab memory crashes.
  - Immediately revokes raw source `ObjectURL` buffers after downscaling.
- **Responsive Sortable Storyboard (`src/components/Storyboard.tsx`)**
  - **Desktop (`lg:`):** Expansive horizontal drag-and-drop storyboard timeline with slide duration controls, captions, Ken Burns motion toggle, and framing presets (`Fit + Blur Backdrop` or `Cinema Cover`).
  - **Tablet & Mobile (`< lg`):** Touch-friendly vertical sortable list with accessible reorder buttons and compact duration steppers.
- **Client-Side Video & Audio Stitching Engine (`src/utils/VideoRenderer.ts`)**
  - Captures real-time 1080p frames via `canvas.captureStream(30)` with smooth cosine crossfade transitions and subtle Ken Burns pan/zoom effects.
  - Decodes and mixes the user's local audio track (`MP3`, `WAV`, `OGG`, `M4A`) or built-in procedural ambient soundtrack via `AudioContext` + `createMediaStreamDestination()`.
  - Exports directly to a downloadable `.mp4` or `.webm` video file via `MediaRecorder`.
- **Responsive Icon-Only Mobile/Tablet Navbar (`src/components/Navbar.astro`)**
  - Sticky top navigation featuring the MemoryReel logo, Language Selector (`en`, `es`, `fr`, `de`), Light/Dark theme switcher, and Support Developer CTA.
  - Automatically collapses to a strict **icon-only** layout on mobile and tablet viewports (`< lg`).
- **Technical SEO & Subpath i18n (`src/i18n/translations.ts`, `src/layouts/Layout.astro`)**
  - Static routes for `/` (`en`), `/en/`, `/es/`, `/fr/`, and `/de/` with `hreflang` tags, OpenGraph metadata, and JSON-LD `SoftwareApplication` structured data.

---

## Local Development

```bash
# Install dependencies
npm install

# Start Astro development server
npm run dev

# Build static production bundle into ./dist
npm run build

# Preview production build locally
npm run preview
```
