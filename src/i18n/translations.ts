export type Locale = 'en' | 'es' | 'pt' | 'de' | 'fr' | 'ja' | 'zh';

export const LOCALES: {
  code: Locale;
  label: string;
  nativeName: string;
  flag: string;
}[] = [
  { code: 'en', label: 'US', nativeName: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'ES', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'pt', label: 'BR', nativeName: 'Português', flag: '🇧🇷' },
  { code: 'de', label: 'DE', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', label: 'FR', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'ja', label: 'JP', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'zh', label: 'CN', nativeName: '简体中文', flag: '🇨🇳' },
];

export interface TranslationDictionary {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  nav: {
    brand: string;
    tagline: string;
    languageLabel: string;
    themeLight: string;
    themeDark: string;
    themeToggleAria: string;
    supportCta: string;
    privacyBadge: string;
  };
  hero: {
    badge: string;
    titleStart: string;
    titleHighlight: string;
    subtitle: string;
    statZeroServer: string;
    statZeroServerDesc: string;
    stat1080p: string;
    stat1080pDesc: string;
    statInstant: string;
    statInstantDesc: string;
  };
  uploader: {
    sectionTitle: string;
    sectionSubtitle: string;
    dropzoneTitle: string;
    dropzoneSubtitle: string;
    browsePhotosBtn: string;
    loadDemoBtn: string;
    compressionBadge: string;
    compressingStatus: string;
    photosCount: string;
    clearAllBtn: string;
    audioTitle: string;
    audioSubtitle: string;
    uploadAudioBtn: string;
    generateAmbientBtn: string;
    removeAudioBtn: string;
    memorySavedLabel: string;
  };
  storyboard: {
    title: string;
    subtitleDesktop: string;
    subtitleMobile: string;
    emptyTitle: string;
    emptySubtitle: string;
    globalDurationLabel: string;
    applyToAllBtn: string;
    transitionLabel: string;
    aspectRatioLabel: string;
    fitModeLabel: string;
    fitCover: string;
    fitContainBlur: string;
    kenBurnsLabel: string;
    slideDurationSec: string;
    captionPlaceholder: string;
    moveEarlier: string;
    moveLater: string;
    removeSlide: string;
    duplicateSlide: string;
    totalDuration: string;
    slidesLabel: string;
    previewTitle: string;
    playPreview: string;
    pausePreview: string;
    createMemoryBtn: string;
    renderingTitle: string;
    renderingSubtitle: string;
    cancelRenderBtn: string;
    readyTitle: string;
    readySubtitle: string;
    downloadVideoBtn: string;
    createNewRenderBtn: string;
  };
  seoSection: {
    howItWorksTitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    faqTitle: string;
    faq1Q: string;
    faq1A: string;
    faq2Q: string;
    faq2A: string;
    faq3Q: string;
    faq3A: string;
    footerCopyright: string;
    footerPrivacyNote: string;
  };
}

export const translations: Record<Locale, TranslationDictionary> = {
  en: {
    meta: {
      title: 'MemoryReel | Zero-Server Storyboard & Slideshow Creator',
      description:
        'Free online slideshow maker and private photo reel maker. Upload photos and audio, arrange on an interactive storyboard timeline, and export 1080p video directly in your browser with zero server uploads.',
      keywords:
        'free online slideshow maker, photo to video browser tool, zero server slideshow creator, private photo reel maker, client-side video maker, 1080p photo slideshow',
    },
    nav: {
      brand: 'MemoryReel',
      tagline: 'Zero-Server Studio',
      languageLabel: 'Language',
      themeLight: 'Light Mode',
      themeDark: 'Dark Mode',
      themeToggleAria: 'Toggle Light or Dark Theme',
      supportCta: 'Support Developer',
      privacyBadge: '100% On-Device Privacy',
    },
    hero: {
      badge: '100% Client-Side • Zero Cloud Uploads • Instant 1080p Export',
      titleStart: 'Turn cherished photos into a',
      titleHighlight: 'cinematic memory reel.',
      subtitle:
        'Drop your photos and music, arrange your story on the timeline, and stitch a high-definition video directly inside your browser. Your media never leaves your device.',
      statZeroServer: 'Zero Server Uploads',
      statZeroServerDesc: '100% private in-browser processing',
      stat1080p: 'Smart 1080p Engine',
      stat1080pDesc: 'Auto-downscales raw photos safely',
      statInstant: 'Crossfade & Audio',
      statInstantDesc: 'Real-time Canvas & MediaRecorder',
    },
    uploader: {
      sectionTitle: '1. Ingest & Optimize Media',
      sectionSubtitle:
        'Photos are automatically downscaled to standardized 1080p using an off-screen Canvas to prevent browser memory overload.',
      dropzoneTitle: 'Drag & drop your photos here',
      dropzoneSubtitle: 'Supports JPG, PNG, WebP, AVIF — bulk select dozens of photos safely',
      browsePhotosBtn: 'Select Photos',
      loadDemoBtn: 'Load Sample Storyboard',
      compressionBadge: 'Auto 1080p Off-Screen Canvas Optimizer Active',
      compressingStatus: 'Downscaling & optimizing images to 1080p...',
      photosCount: 'photos ready in memory',
      clearAllBtn: 'Clear All',
      audioTitle: 'Background Soundtrack',
      audioSubtitle: 'Select a local MP3, WAV, or OGG file, or generate an ambient instrumental track',
      uploadAudioBtn: 'Choose Audio Track',
      generateAmbientBtn: 'Use Built-In Ambient Track',
      removeAudioBtn: 'Remove Audio',
      memorySavedLabel: 'RAM saved via 1080p downscaling',
    },
    storyboard: {
      title: '2. Storyboard Timeline & Studio',
      subtitleDesktop: 'Drag cards horizontally to reorder your sequence, adjust slide duration, or add captions.',
      subtitleMobile: 'Use the vertical touch list to reorder your photos and customize slide durations.',
      emptyTitle: 'Your storyboard timeline is empty',
      emptySubtitle: 'Upload photos above or load the sample storyboard to start arranging your video reel.',
      globalDurationLabel: 'Slide Duration',
      applyToAllBtn: 'Apply to All',
      transitionLabel: 'Crossfade',
      aspectRatioLabel: 'Format',
      fitModeLabel: 'Framing',
      fitCover: 'Cinema Fill',
      fitContainBlur: 'Fit + Blur Backdrop',
      kenBurnsLabel: 'Ken Burns Motion',
      slideDurationSec: 'sec',
      captionPlaceholder: 'Optional caption overlay...',
      moveEarlier: 'Move earlier',
      moveLater: 'Move later',
      removeSlide: 'Remove slide',
      duplicateSlide: 'Duplicate slide',
      totalDuration: 'Total Reel Duration',
      slidesLabel: 'Slides',
      previewTitle: 'Live Canvas Preview',
      playPreview: 'Preview Reel',
      pausePreview: 'Pause Preview',
      createMemoryBtn: 'Create Memory',
      renderingTitle: 'Stitching your memory...',
      renderingSubtitle: 'Drawing 1080p crossfade frames and encoding audio stream directly in your browser.',
      cancelRenderBtn: 'Cancel Encoding',
      readyTitle: 'Your Memory Reel is Ready!',
      readySubtitle: 'Rendered 100% locally on your device. Preview below or download your video file.',
      downloadVideoBtn: 'Download Video',
      createNewRenderBtn: 'Back to Editor',
    },
    seoSection: {
      howItWorksTitle: 'How Our Zero-Server Slideshow Creator Works',
      step1Title: '1. Off-Screen 1080p Compression',
      step1Desc:
        'High-resolution smartphone and DSLR photos are immediately resized to standardized 1080p via an off-screen HTML5 Canvas, keeping browser RAM fast and crash-free.',
      step2Title: '2. Interactive Storyboard Sequencing',
      step2Desc:
        'Reorder slides effortlessly using our horizontal desktop timeline or touch-optimized vertical mobile list. Customize durations, captions, and Ken Burns motion.',
      step3Title: '3. Local Canvas + MediaRecorder Stitching',
      step3Desc:
        'When you click Create Memory, frames are rendered with smooth crossfades and synchronized with Web Audio API directly into a downloadable video file.',
      faqTitle: 'Frequently Asked Questions',
      faq1Q: 'Are my personal photos ever uploaded to a server?',
      faq1A:
        'Never. MemoryReel is a 100% zero-server web application. Every image compression, timeline preview, and video encode happens inside your browser on your own device.',
      faq2Q: 'Why does MemoryReel resize photos to 1080p upon import?',
      faq2A:
        'Raw 12MP–48MP photos can consume hundreds of megabytes of uncompressed bitmap memory. Downscaling to standardized Full HD (1920×1080) ensures silky-smooth 60fps transitions without browser tab crashes.',
      faq3Q: 'What video formats can I export?',
      faq3A:
        'MemoryReel automatically selects the highest-quality hardware-accelerated codec supported by your browser (MP4/H.264 or WebM/VP9 with Opus audio) for instant playback and sharing.',
      footerCopyright: 'MemoryReel — Zero-Server Storyboard & Slideshow Creator.',
      footerPrivacyNote: 'Built with Astro, React Islands & HTML5 MediaRecorder. 100% Client-Side Privacy.',
    },
  },
  es: {
    meta: {
      title: 'MemoryReel | Creador de Presentaciones y Video Sin Servidor',
      description:
        'Creador gratuito de presentaciones online y videos privados con fotos y música. Organiza tus fotos en la línea de tiempo y exporta video 1080p directamente en tu navegador sin subir archivos.',
      keywords:
        'free online slideshow maker, photo to video browser tool, zero server slideshow creator, private photo reel maker, creador de diapositivas gratis, convertir fotos a video online',
    },
    nav: {
      brand: 'MemoryReel',
      tagline: 'Estudio Sin Servidor',
      languageLabel: 'Idioma',
      themeLight: 'Modo Claro',
      themeDark: 'Modo Oscuro',
      themeToggleAria: 'Cambiar entre tema claro y oscuro',
      supportCta: 'Apoyar al Creador',
      privacyBadge: '100% Privacidad Local',
    },
    hero: {
      badge: '100% en tu Navegador • Cero Subidas a la Nube • Exportación 1080p',
      titleStart: 'Convierte tus mejores fotos en un',
      titleHighlight: 'recuerdo cinematográfico.',
      subtitle:
        'Añade tus fotos y música, ordénalas en el guion gráfico y genera un video en alta definición directamente en tu navegador. Tus archivos nunca salen de tu dispositivo.',
      statZeroServer: 'Cero Servidores',
      statZeroServerDesc: 'Procesamiento 100% privado local',
      stat1080p: 'Motor 1080p Inteligente',
      stat1080pDesc: 'Optimiza fotos pesadas sin cuelgues',
      statInstant: 'Transiciones y Audio',
      statInstantDesc: 'Canvas y MediaRecorder en tiempo real',
    },
    uploader: {
      sectionTitle: '1. Importar y Optimizar Multimedia',
      sectionSubtitle:
        'Las fotos se redimensionan automáticamente a 1080p mediante un Canvas fuera de pantalla para evitar saturar la memoria del navegador.',
      dropzoneTitle: 'Arrastra y suelta tus fotos aquí',
      dropzoneSubtitle: 'Compatible con JPG, PNG, WebP, AVIF — selecciona decenas de fotos de forma segura',
      browsePhotosBtn: 'Seleccionar Fotos',
      loadDemoBtn: 'Cargar Ejemplo',
      compressionBadge: 'Optimizador Canvas 1080p Activo',
      compressingStatus: 'Redimensionando y optimizando imágenes a 1080p...',
      photosCount: 'fotos listas en memoria',
      clearAllBtn: 'Vaciar Todo',
      audioTitle: 'Pista Musical de Fondo',
      audioSubtitle: 'Elige un archivo MP3, WAV u OGG local, o genera una pista ambiental instrumental',
      uploadAudioBtn: 'Subir Archivo de Audio',
      generateAmbientBtn: 'Usar Música Ambiental Integrada',
      removeAudioBtn: 'Quitar Audio',
      memorySavedLabel: 'RAM ahorrada con reducción 1080p',
    },
    storyboard: {
      title: '2. Línea de Tiempo del Storyboard',
      subtitleDesktop: 'Arrastra las tarjetas horizontalmente para reordenar tus fotos, ajustar duraciones o añadir subtítulos.',
      subtitleMobile: 'Usa la lista vertical táctil para reordenar tus fotos y ajustar cada duración.',
      emptyTitle: 'Tu línea de tiempo está vacía',
      emptySubtitle: 'Sube tus fotos arriba o carga la demostración para empezar a armar tu video.',
      globalDurationLabel: 'Duración por Foto',
      applyToAllBtn: 'Aplicar a Todas',
      transitionLabel: 'Fundido',
      aspectRatioLabel: 'Formato',
      fitModeLabel: 'Encuadre',
      fitCover: 'Llenar Pantalla',
      fitContainBlur: 'Ajustar + Fondo Difuminado',
      kenBurnsLabel: 'Efecto Ken Burns',
      slideDurationSec: 'seg',
      captionPlaceholder: 'Texto opcional en pantalla...',
      moveEarlier: 'Mover antes',
      moveLater: 'Mover después',
      removeSlide: 'Eliminar foto',
      duplicateSlide: 'Duplicar foto',
      totalDuration: 'Duración Total',
      slidesLabel: 'Diapositivas',
      previewTitle: 'Vista Previa en Vivo',
      playPreview: 'Vista Previa',
      pausePreview: 'Pausar',
      createMemoryBtn: 'Crear Recuerdo',
      renderingTitle: 'Uniendo tu recuerdo (Stitching your memory...)...',
      renderingSubtitle: 'Renderizando fotogramas 1080p con transiciones y mezclando el audio en tu navegador.',
      cancelRenderBtn: 'Cancelar',
      readyTitle: '¡Tu Video Está Listo!',
      readySubtitle: 'Generado 100% localmente en tu dispositivo. Reprodúcelo o descárgalo ahora.',
      downloadVideoBtn: 'Descargar Video',
      createNewRenderBtn: 'Volver al Editor',
    },
    seoSection: {
      howItWorksTitle: 'Cómo Funciona Nuestro Creador de Videos Sin Servidor',
      step1Title: '1. Compresión 1080p en Canvas',
      step1Desc:
        'Las fotos pesadas se ajustan instantáneamente a resolución Full HD 1080p en memoria para garantizar fluidez total sin bloquear el navegador.',
      step2Title: '2. Storyboard Interactivo Adaptable',
      step2Desc:
        'Ordena la secuencia en nuestra línea de tiempo horizontal en escritorio o lista vertical táctil en móviles y tablets.',
      step3Title: '3. Renderizado Local con MediaRecorder',
      step3Desc:
        'Al pulsar Crear Recuerdo, las imágenes se funden suavemente junto con tu música mediante Web Audio API y se exportan como video descargable.',
      faqTitle: 'Preguntas Frecuentes',
      faq1Q: '¿Mis fotos se suben a algún servidor externo?',
      faq1A:
        'Jamás. MemoryReel funciona 100% dentro de tu navegador. Ninguna foto ni canción abandona tu dispositivo.',
      faq2Q: '¿Por qué se redimensionan las imágenes a 1080p?',
      faq2A:
        'Las cámaras actuales generan imágenes muy pesadas en RAM. Estandarizarlas a 1080p evita cierres inesperados del navegador y mantiene 60 FPS.',
      faq3Q: '¿En qué formato se descarga el video?',
      faq3A:
        'Se exporta automáticamente en MP4 o WebM de alta definición según el soporte nativo de tu navegador.',
      footerCopyright: 'MemoryReel — Creador de Storyboard y Presentaciones Sin Servidor.',
      footerPrivacyNote: 'Desarrollado con Astro, React Islands y HTML5 MediaRecorder. 100% Privado.',
    },
  },
  pt: {
    meta: {
      title: 'MemoryReel | Criador de Slideshow e Vídeo Sem Servidor',
      description:
        'Criador gratuito de apresentações de fotos online e vídeos privados com música. Organize suas fotos na linha do tempo e exporte vídeos em 1080p diretamente no navegador sem enviar arquivos para servidores.',
      keywords:
        'free online slideshow maker, photo to video browser tool, zero server slideshow creator, private photo reel maker, criador de slideshow grátis, transformar fotos em vídeo online',
    },
    nav: {
      brand: 'MemoryReel',
      tagline: 'Estúdio Sem Servidor',
      languageLabel: 'Idioma',
      themeLight: 'Modo Claro',
      themeDark: 'Modo Escuro',
      themeToggleAria: 'Alternar entre tema claro e escuro',
      supportCta: 'Apoiar Desenvolvedor',
      privacyBadge: '100% Privacidade Local',
    },
    hero: {
      badge: '100% no Navegador • Zero Uploads na Nuvem • Exportação 1080p Instantânea',
      titleStart: 'Transforme suas fotos especiais em um',
      titleHighlight: 'filme de memórias cinematográfico.',
      subtitle:
        'Adicione suas fotos e músicas, organize a história na linha do tempo e renderize um vídeo em alta definição diretamente no seu navegador. Seus arquivos nunca saem do seu dispositivo.',
      statZeroServer: 'Zero Servidores',
      statZeroServerDesc: 'Processamento 100% privado e local',
      stat1080p: 'Motor 1080p Inteligente',
      stat1080pDesc: 'Redimensiona fotos pesadas sem travar',
      statInstant: 'Crossfade & Áudio',
      statInstantDesc: 'Canvas e MediaRecorder em tempo real',
    },
    uploader: {
      sectionTitle: '1. Importar e Otimizar Mídia',
      sectionSubtitle:
        'As fotos são redimensionadas automaticamente para 1080p usando um Canvas fora da tela para evitar sobrecarga de memória no navegador.',
      dropzoneTitle: 'Arraste e solte suas fotos aqui',
      dropzoneSubtitle: 'Suporta JPG, PNG, WebP, AVIF — selecione dezenas de fotos com segurança',
      browsePhotosBtn: 'Selecionar Fotos',
      loadDemoBtn: 'Carregar Exemplo',
      compressionBadge: 'Otimizador Canvas 1080p Ativo',
      compressingStatus: 'Redimensionando e otimizando imagens para 1080p...',
      photosCount: 'fotos prontas na memória',
      clearAllBtn: 'Limpar Tudo',
      audioTitle: 'Trilha Sonora de Fundo',
      audioSubtitle: 'Escolha um arquivo MP3, WAV ou OGG local, ou gere uma trilha instrumental ambiente',
      uploadAudioBtn: 'Escolher Áudio',
      generateAmbientBtn: 'Usar Trilha Ambiente Integrada',
      removeAudioBtn: 'Remover Áudio',
      memorySavedLabel: 'de RAM economizada via 1080p',
    },
    storyboard: {
      title: '2. Linha do Tempo do Storyboard & Estúdio',
      subtitleDesktop: 'Arraste os cartões horizontalmente para reordenar a sequência, ajustar durações ou adicionar legendas.',
      subtitleMobile: 'Use a lista vertical otimizada para toque para reordenar suas fotos facilmente.',
      emptyTitle: 'Sua linha do tempo está vazia',
      emptySubtitle: 'Envie fotos acima ou carregue o exemplo para começar a montar seu vídeo.',
      globalDurationLabel: 'Duração por Foto',
      applyToAllBtn: 'Aplicar a Todas',
      transitionLabel: 'Transição',
      aspectRatioLabel: 'Formato',
      fitModeLabel: 'Enquadramento',
      fitCover: 'Preencher Tela',
      fitContainBlur: 'Ajustar + Fundo Desfocado',
      kenBurnsLabel: 'Movimento Ken Burns',
      slideDurationSec: 'seg',
      captionPlaceholder: 'Legenda opcional na tela...',
      moveEarlier: 'Mover para trás',
      moveLater: 'Mover para frente',
      removeSlide: 'Remover foto',
      duplicateSlide: 'Duplicar foto',
      totalDuration: 'Duração Total',
      slidesLabel: 'Slides',
      previewTitle: 'Pré-visualização ao Vivo',
      playPreview: 'Reproduzir Prévia',
      pausePreview: 'Pausar',
      createMemoryBtn: 'Criar Memória',
      renderingTitle: 'Costurando sua memória (Stitching your memory...)...',
      renderingSubtitle: 'Renderizando quadros 1080p com transições suaves e codificando áudio no navegador.',
      cancelRenderBtn: 'Cancelar',
      readyTitle: 'Seu Vídeo de Memórias Está Pronto!',
      readySubtitle: 'Renderizado 100% localmente no seu dispositivo. Assista abaixo ou baixe o vídeo.',
      downloadVideoBtn: 'Baixar Vídeo',
      createNewRenderBtn: 'Voltar ao Editor',
    },
    seoSection: {
      howItWorksTitle: 'Como Funciona Nosso Criador de Slideshow Sem Servidor',
      step1Title: '1. Compressão 1080p Fora da Tela',
      step1Desc:
        'Fotos de alta resolução são padronizadas instantaneamente em 1080p via HTML5 Canvas, mantendo a memória RAM leve e sem travamentos.',
      step2Title: '2. Storyboard Interativo e Responsivo',
      step2Desc:
        'Reordene suas fotos facilmente na linha do tempo horizontal no computador ou na lista vertical sensível ao toque no celular.',
      step3Title: '3. Renderização Local com MediaRecorder',
      step3Desc:
        'Ao clicar em Criar Memória, os quadros são combinados com transições suaves e áudio via Web Audio API diretamente em um arquivo de vídeo.',
      faqTitle: 'Perguntas Frequentes',
      faq1Q: 'Minhas fotos pessoais são enviadas para algum servidor?',
      faq1A:
        'Nunca. O MemoryReel funciona 100% dentro do seu navegador. Nenhuma foto ou música sai do seu dispositivo.',
      faq2Q: 'Por que o MemoryReel redimensiona as fotos para 1080p?',
      faq2A:
        'Fotos originais de câmeras modernas consomem centenas de megabytes de RAM. A redução para Full HD 1080p garante transições fluidas sem travar a aba.',
      faq3Q: 'Em quais formatos posso exportar o vídeo?',
      faq3A:
        'O aplicativo seleciona automaticamente o melhor formato suportado pelo seu navegador (MP4/H.264 ou WebM/VP9 com áudio Opus).',
      footerCopyright: 'MemoryReel — Criador de Storyboard e Slideshow Sem Servidor.',
      footerPrivacyNote: 'Desenvolvido com Astro, React Islands & HTML5 MediaRecorder. 100% Privacidade Local.',
    },
  },
  de: {
    meta: {
      title: 'MemoryReel | Serverloser Storyboard- & Diashow-Ersteller',
      description:
        'Kostenloser Online-Diashow-Ersteller direkt im Browser. Fotos und Musik auswählen, auf der Timeline anordnen und als 1080p-Video exportieren — 100% lokal ohne Server-Upload.',
      keywords:
        'free online slideshow maker, photo to video browser tool, zero server slideshow creator, private photo reel maker, Diashow kostenlos erstellen, Fotos zu Video Browser Tool',
    },
    nav: {
      brand: 'MemoryReel',
      tagline: 'Zero-Server Studio',
      languageLabel: 'Sprache',
      themeLight: 'Heller Modus',
      themeDark: 'Dunkler Modus',
      themeToggleAria: 'Zwischen hellem und dunklem Design wechseln',
      supportCta: 'Entwickler Unterstützen',
      privacyBadge: '100% Lokaler Datenschutz',
    },
    hero: {
      badge: '100% Client-Seitig • Kein Cloud-Upload • Sofortiger 1080p-Export',
      titleStart: 'Verwandle deine Lieblingsfotos in ein',
      titleHighlight: 'filmreifes Erinnerungsvideo.',
      subtitle:
        'Füge deine Fotos und Musik hinzu, ordne sie auf dem Storyboard an und erstelle ein HD-Video direkt in deinem Browser. Deine Medien verlassen niemals dein Gerät.',
      statZeroServer: 'Kein Server-Upload',
      statZeroServerDesc: '100% private Verarbeitung im Browser',
      stat1080p: 'Smarte 1080p-Engine',
      stat1080pDesc: 'Sichere Bildoptimierung ohne Absturz',
      statInstant: 'Crossfade & Audio',
      statInstantDesc: 'Echtzeit-Canvas & MediaRecorder',
    },
    uploader: {
      sectionTitle: '1. Medien Auswählen & Optimieren',
      sectionSubtitle:
        'Fotos werden automatisch über ein Off-Screen-Canvas auf 1080p skaliert, um Browser-Speicherabstürze zu verhindern.',
      dropzoneTitle: 'Fotos hierher ziehen & ablegen',
      dropzoneSubtitle: 'Unterstützt JPG, PNG, WebP, AVIF — sicher Dutzende Fotos gleichzeitig laden',
      browsePhotosBtn: 'Fotos Auswählen',
      loadDemoBtn: 'Beispiel-Storyboard Laden',
      compressionBadge: 'Automatische 1080p Off-Screen-Canvas-Optimierung Aktiv',
      compressingStatus: 'Skaliere & optimiere Bilder auf 1080p...',
      photosCount: 'Fotos im Speicher bereit',
      clearAllBtn: 'Alle Löschen',
      audioTitle: 'Hintergrundmusik',
      audioSubtitle: 'Wähle eine lokale MP3-, WAV- oder OGG-Datei oder generiere einen Ambient-Soundtrack',
      uploadAudioBtn: 'Audiodatei Wählen',
      generateAmbientBtn: 'Integrierten Ambient-Track Nutzen',
      removeAudioBtn: 'Audio Entfernen',
      memorySavedLabel: 'RAM gespart durch 1080p-Skalierung',
    },
    storyboard: {
      title: '2. Storyboard-Timeline & Studio',
      subtitleDesktop: 'Ziehe Karten horizontal, um die Reihenfolge zu ändern, die Anzeigedauer anzupassen oder Titel einzufügen.',
      subtitleMobile: 'Nutze die vertikale Touch-Liste, um Fotos einfach neu anzuordnen.',
      emptyTitle: 'Deine Storyboard-Timeline ist noch leer',
      emptySubtitle: 'Lade oben Fotos hoch oder starte mit dem Beispiel-Storyboard.',
      globalDurationLabel: 'Dauer pro Bild',
      applyToAllBtn: 'Auf Alle Anwenden',
      transitionLabel: 'Überblendung',
      aspectRatioLabel: 'Format',
      fitModeLabel: 'Bildanpassung',
      fitCover: 'Vollbild-Fokus',
      fitContainBlur: 'Einpassen + Unschärfe',
      kenBurnsLabel: 'Ken-Burns-Effekt',
      slideDurationSec: 'Sek.',
      captionPlaceholder: 'Optionale Bildunterschrift...',
      moveEarlier: 'Nach vorne',
      moveLater: 'Nach hinten',
      removeSlide: 'Bild entfernen',
      duplicateSlide: 'Bild duplizieren',
      totalDuration: 'Gesamtdauer',
      slidesLabel: 'Bilder',
      previewTitle: 'Live-Canvas-Vorschau',
      playPreview: 'Vorschau Abspielen',
      pausePreview: 'Pause',
      createMemoryBtn: 'Erinnerung Erstellen',
      renderingTitle: 'Deine Erinnerung wird zusammengefügt (Stitching your memory...)...',
      renderingSubtitle: 'Zeichne 1080p-Überblendungen und kodiere den Audiostream direkt im Browser.',
      cancelRenderBtn: 'Abbrechen',
      readyTitle: 'Dein Erinnerungsvideo ist Fertig!',
      readySubtitle: '100% lokal auf deinem Gerät gerendert. Jetzt ansehen oder herunterladen.',
      downloadVideoBtn: 'Video Herunterladen',
      createNewRenderBtn: 'Zurück zum Editor',
    },
    seoSection: {
      howItWorksTitle: 'So Funktioniert Unser Serverloser Diashow-Ersteller',
      step1Title: '1. Off-Screen 1080p-Komprimierung',
      step1Desc:
        'Hochauflösende Kamerafotos werden sofort im Arbeitsspeicher auf 1080p normiert, damit der Browser stabil und flüssig bleibt.',
      step2Title: '2. Sortierbares Storyboard',
      step2Desc:
        'Ordne deine Fotos auf dem Desktop horizontal oder auf Mobilgeräten über die vertikale Touch-Liste neu an.',
      step3Title: '3. Lokales Canvas- & MediaRecorder-Rendering',
      step3Desc:
        'Bilder, weiche Überblendungen und Musik werden über Web Audio API und MediaRecorder direkt zu einer Videodatei zusammengefügt.',
      faqTitle: 'Häufig Gestellte Fragen',
      faq1Q: 'Werden meine Fotos auf einen Server hochgeladen?',
      faq1A:
        'Nein, niemals. MemoryReel verarbeitet alle Bilder und Audiodateien zu 100% lokal in deinem Browser.',
      faq2Q: 'Warum werden Fotos auf 1080p skaliert?',
      faq2A:
        'Moderne Smartphone-Fotos belegen unkomprimiert enorm viel RAM. Die 1080p-Skalierung verhindert Browser-Abstürze bei vielen Bildern.',
      faq3Q: 'Welche Videoformate werden exportiert?',
      faq3A:
        'Je nach Browser-Unterstützung wird automatisch eine hochauflösende MP4- oder WebM-Videodatei erstellt.',
      footerCopyright: 'MemoryReel — Serverloser Storyboard- & Diashow-Ersteller.',
      footerPrivacyNote: 'Entwickelt mit Astro, React Islands & HTML5 MediaRecorder. 100% Datenschutz.',
    },
  },
  fr: {
    meta: {
      title: 'MemoryReel | Créateur de Diaporama Vidéo Sans Serveur',
      description:
        'Créateur de diaporama en ligne gratuit et privé. Importez vos photos et votre musique, organisez-les sur la timeline et exportez une vidéo 1080p directement dans votre navigateur sans serveur.',
      keywords:
        'free online slideshow maker, photo to video browser tool, zero server slideshow creator, private photo reel maker, créateur de diaporama gratuit, convertir photo en vidéo',
    },
    nav: {
      brand: 'MemoryReel',
      tagline: 'Studio Sans Serveur',
      languageLabel: 'Langue',
      themeLight: 'Mode Clair',
      themeDark: 'Mode Sombre',
      themeToggleAria: 'Basculer entre le thème clair et sombre',
      supportCta: 'Soutenir le Développeur',
      privacyBadge: '100% Privé sur Appareil',
    },
    hero: {
      badge: '100% Côté Client • Aucun Envoi Cloud • Export 1080p Instantané',
      titleStart: 'Transformez vos photos précieuses en',
      titleHighlight: 'un film souvenir cinématographique.',
      subtitle:
        'Déposez vos photos et votre musique, organisez votre storyboard et générez une vidéo haute définition directement dans votre navigateur. Vos fichiers restent sur votre appareil.',
      statZeroServer: 'Zéro Serveur',
      statZeroServerDesc: 'Traitement 100% privé et local',
      stat1080p: 'Moteur 1080p Intelligent',
      stat1080pDesc: 'Redimensionnement sûr sans crash',
      statInstant: 'Fondus & Audio',
      statInstantDesc: 'Canvas & MediaRecorder temps réel',
    },
    uploader: {
      sectionTitle: '1. Importer et Optimiser les Médias',
      sectionSubtitle:
        'Les photos sont automatiquement redimensionnées en 1080p via un Canvas hors écran pour protéger la mémoire du navigateur.',
      dropzoneTitle: 'Glissez-déposez vos photos ici',
      dropzoneSubtitle: 'Compatible JPG, PNG, WebP, AVIF — sélectionnez des dizaines de photos en toute sécurité',
      browsePhotosBtn: 'Choisir des Photos',
      loadDemoBtn: 'Charger la Démo',
      compressionBadge: 'Optimiseur Canvas 1080p Hors Écran Actif',
      compressingStatus: 'Redimensionnement et optimisation en 1080p...',
      photosCount: 'photos prêtes en mémoire',
      clearAllBtn: 'Tout Effacer',
      audioTitle: 'Bande Sonore',
      audioSubtitle: 'Sélectionnez un fichier MP3, WAV ou OGG local, ou générez une piste ambiante',
      uploadAudioBtn: 'Choisir une Piste Audio',
      generateAmbientBtn: 'Piste Ambiante Intégrée',
      removeAudioBtn: 'Supprimer Audio',
      memorySavedLabel: 'RAM économisée via compression 1080p',
    },
    storyboard: {
      title: '2. Timeline du Storyboard & Studio',
      subtitleDesktop: 'Faites glisser les cartes horizontalement pour réorganiser vos diapositives et régler les durées.',
      subtitleMobile: 'Utilisez la liste verticale tactile pour réorganiser vos photos facilement.',
      emptyTitle: 'Votre storyboard est vide',
      emptySubtitle: 'Importez des photos ci-dessus ou chargez la démo pour commencer votre montage.',
      globalDurationLabel: 'Durée par Diapo',
      applyToAllBtn: 'Appliquer à Tout',
      transitionLabel: 'Fondu Enchaîné',
      aspectRatioLabel: 'Format',
      fitModeLabel: 'Cadrage',
      fitCover: 'Plein Écran',
      fitContainBlur: 'Ajuster + Fond Flou',
      kenBurnsLabel: 'Mouvement Ken Burns',
      slideDurationSec: 'sec',
      captionPlaceholder: 'Légende optionnelle...',
      moveEarlier: 'Déplacer avant',
      moveLater: 'Déplacer après',
      removeSlide: 'Supprimer',
      duplicateSlide: 'Dupliquer',
      totalDuration: 'Durée Totale',
      slidesLabel: 'Diapositives',
      previewTitle: 'Aperçu Canvas en Direct',
      playPreview: 'Lire Aperçu',
      pausePreview: 'Pause',
      createMemoryBtn: 'Créer le Souvenir',
      renderingTitle: 'Assemblage de votre souvenir (Stitching your memory...)...',
      renderingSubtitle: 'Dessin des images 1080p avec fondus et encodage audio dans votre navigateur.',
      cancelRenderBtn: 'Annuler',
      readyTitle: 'Votre Vidéo Souvenir est Prête !',
      readySubtitle: 'Rendue 100% localement sur votre appareil. Visionnez ou téléchargez votre fichier vidéo.',
      downloadVideoBtn: 'Télécharger la Vidéo',
      createNewRenderBtn: 'Retour à l’Éditeur',
    },
    seoSection: {
      howItWorksTitle: 'Comment Fonctionne Notre Créateur de Diaporama Sans Serveur',
      step1Title: '1. Compression 1080p Hors Écran',
      step1Desc:
        'Vos photos haute résolution sont normalisées en 1080p via un Canvas HTML5 hors écran afin d’éviter toute saturation mémoire.',
      step2Title: '2. Storyboard Tactile et Intuitif',
      step2Desc:
        'Réorganisez vos photos sur une timeline horizontale sur ordinateur ou une liste verticale fluide sur mobile et tablette.',
      step3Title: '3. Rendu Vidéo Local MediaRecorder',
      step3Desc:
        'Les transitions fondues et la piste audio sont assemblées directement par votre navigateur en un fichier vidéo téléchargeable.',
      faqTitle: 'Questions Fréquentes',
      faq1Q: 'Mes photos sont-elles envoyées sur un serveur ?',
      faq1A:
        'Non, jamais. Tout le traitement s’effectue localement dans votre navigateur web pour une confidentialité absolue.',
      faq2Q: 'Pourquoi redimensionner les photos en 1080p ?',
      faq2A:
        'Cela permet d’importer de nombreuses photos sans faire planter l’onglet du navigateur tout en conservant une qualité Full HD.',
      faq3Q: 'Quels formats vidéo sont supportés ?',
      faq3A:
        'Le moteur exporte automatiquement en MP4 ou WebM haute définition selon les capacités natives de votre navigateur.',
      footerCopyright: 'MemoryReel — Créateur de Storyboard et Diaporama Sans Serveur.',
      footerPrivacyNote: 'Conçu avec Astro, React Islands et HTML5 MediaRecorder. 100% Privé.',
    },
  },
  ja: {
    meta: {
      title: 'MemoryReel | サーバー不要のスライドショー＆動画作成ツール',
      description:
        '完全無料・ブラウザ完結のスライドショー動画作成ツール。写真と音楽をタイムラインに並べて、サーバーに一切アップロードせず1080p動画を書き出せます。',
      keywords:
        'free online slideshow maker, photo to video browser tool, zero server slideshow creator, private photo reel maker, スライドショー 作成 無料, 写真 動画 変換 ブラウザ',
    },
    nav: {
      brand: 'MemoryReel',
      tagline: 'ゼロサーバースタジオ',
      languageLabel: '言語',
      themeLight: 'ライトモード',
      themeDark: 'ダークモード',
      themeToggleAria: 'ライトモードとダークモードを切り替え',
      supportCta: '開発者を支援',
      privacyBadge: '100% 端末内処理・完全プライバシー',
    },
    hero: {
      badge: '100% ブラウザ内処理 • クラウド送信なし • 1080p フルHD出力',
      titleStart: '大切な思い出の写真を',
      titleHighlight: 'シネマティックなムービーへ。',
      subtitle:
        '写真と音楽をドロップしてタイムラインで順番を整えるだけ。サーバーへ一切送信せず、お使いのブラウザ内で直接高画質ビデオを生成します。',
      statZeroServer: 'サーバー送信ゼロ',
      statZeroServerDesc: '100% ブラウザ内で安全に処理',
      stat1080p: 'スマート 1080p エンジン',
      stat1080pDesc: '高解像度写真を安全に自動最適化',
      statInstant: 'クロスフェード＆音楽',
      statInstantDesc: 'Canvas & MediaRecorder リアルタイム合成',
    },
    uploader: {
      sectionTitle: '1. 写真と音楽の読み込み・最適化',
      sectionSubtitle:
        'ブラウザのメモリ不足によるクラッシュを防ぐため、写真はオフスクリーンCanvasで自動的に1080pへ最適化されます。',
      dropzoneTitle: 'ここに写真をドラッグ＆ドロップ',
      dropzoneSubtitle: 'JPG, PNG, WebP, AVIF 対応 — 大量の写真も一括で安全に選択可能',
      browsePhotosBtn: '写真を選択',
      loadDemoBtn: 'サンプルを読み込む',
      compressionBadge: '自動 1080p オフスクリーンCanvas最適化 有効',
      compressingStatus: '画像を 1080p にリサイズ＆最適化中...',
      photosCount: '枚の写真がメモリに準備完了',
      clearAllBtn: 'すべて消去',
      audioTitle: 'BGM オーディオトラック',
      audioSubtitle: '端末内の MP3, WAV, OGG ファイルを選択するか、内蔵アンビエント音源を生成',
      uploadAudioBtn: '音楽ファイルを選択',
      generateAmbientBtn: '内蔵アンビエント音源を使用',
      removeAudioBtn: '音楽を削除',
      memorySavedLabel: '1080p 最適化によるメモリ節約',
    },
    storyboard: {
      title: '2. ストーリーボード＆スタジオ',
      subtitleDesktop: 'カードを横にドラッグして順番を入れ替え、表示秒数やキャプションを設定できます。',
      subtitleMobile: 'タッチ操作対応の縦リストで写真の並び替えや表示秒数を簡単に調整できます。',
      emptyTitle: 'ストーリーボードに写真がありません',
      emptySubtitle: '上から写真をアップロードするか、サンプルを読み込んで動画作成を始めましょう。',
      globalDurationLabel: '1枚あたりの表示時間',
      applyToAllBtn: 'すべてに適用',
      transitionLabel: 'クロスフェード',
      aspectRatioLabel: '画面比率',
      fitModeLabel: 'フレーミング',
      fitCover: '画面いっぱいに拡大',
      fitContainBlur: '全体表示＋背景ぼかし',
      kenBurnsLabel: 'Ken Burns ズーム効果',
      slideDurationSec: '秒',
      captionPlaceholder: 'キャプション（任意）...',
      moveEarlier: '前へ移動',
      moveLater: '後ろへ移動',
      removeSlide: '削除',
      duplicateSlide: '複製',
      totalDuration: '合計再生時間',
      slidesLabel: 'スライド',
      previewTitle: 'ライブ Canvas プレビュー',
      playPreview: 'プレビュー再生',
      pausePreview: '一時停止',
      createMemoryBtn: 'ムービーを作成 (Create Memory)',
      renderingTitle: '思い出を紡いでいます (Stitching your memory...)...',
      renderingSubtitle: 'ブラウザ内で 1080p クロスフェード映像と音声をリアルタイム合成しています。',
      cancelRenderBtn: '処理をキャンセル',
      readyTitle: '思い出ムービーが完成しました！',
      readySubtitle: 'お使いの端末内で100%ローカル生成されました。プレビューまたはダウンロードできます。',
      downloadVideoBtn: '動画をダウンロード',
      createNewRenderBtn: '編集に戻る',
    },
    seoSection: {
      howItWorksTitle: 'サーバー不要スライドショー作成の仕組み',
      step1Title: '1. オフスクリーン 1080p 自動圧縮',
      step1Desc:
        'スマートフォンや一眼レフの高解像度写真をオフスクリーンHTML5 Canvasで即座に1080pへ正規化し、メモリクラッシュを防ぎます。',
      step2Title: '2. 直感的なストーリーボード編集',
      step2Desc:
        'PCでは横型フィルムストリップ、スマホ・タブレットでは縦型タッチリストで写真の順番や秒数を自在に編集できます。',
      step3Title: '3. MediaRecorder によるローカル動画出力',
      step3Desc:
        'クロスフェード演出とWeb Audio APIの音声ストリームを合成し、ダウンロード可能なMP4/WebM動画ファイルを直接書き出します。',
      faqTitle: 'よくある質問 (FAQ)',
      faq1Q: '写真が外部サーバーにアップロードされることはありますか？',
      faq1A:
        '一切ありません。MemoryReelは100%クライアントサイドで動作し、すべての画像処理と動画エンコードはお使いのブラウザ内で完結します。',
      faq2Q: 'なぜ読み込み時に写真を1080pにリサイズするのですか？',
      faq2A:
        '高画素の元画像は非圧縮状態で数百MBのRAMを消費するため、フルHD(1920×1080)に標準化することで滑らかな60fps処理と安定性を両立しています。',
      faq3Q: 'どの動画形式で保存できますか？',
      faq3A:
        'お使いのブラウザが対応する最適なハードウェアアクセラレーション形式（MP4/H.264 または WebM/VP9）で自動出力されます。',
      footerCopyright: 'MemoryReel — ゼロサーバー・ストーリーボード＆スライドショー作成ツール',
      footerPrivacyNote: 'Built with Astro, React Islands & HTML5 MediaRecorder. 100% ローカルプライバシー保護.',
    },
  },
  zh: {
    meta: {
      title: 'MemoryReel | 零服务器照片幻灯片与视频制作工具',
      description:
        '免费在线照片转视频与私密相册幻灯片制作工具。上传照片与背景音乐，在故事板时间轴上自由排序，直接在浏览器内导出 1080p 高清视频，零服务器上传。',
      keywords:
        'free online slideshow maker, photo to video browser tool, zero server slideshow creator, private photo reel maker, 免费在线幻灯片制作, 照片合成视频工具, 浏览器本地视频生成',
    },
    nav: {
      brand: 'MemoryReel',
      tagline: '零服务器创作室',
      languageLabel: '语言',
      themeLight: '浅色模式',
      themeDark: '深色模式',
      themeToggleAria: '切换浅色或深色主题',
      supportCta: '支持开发者',
      privacyBadge: '100% 本地设备隐私保护',
    },
    hero: {
      badge: '100% 纯前端处理 • 零云端上传 • 即时导出 1080p 高清视频',
      titleStart: '将珍藏的照片转化为',
      titleHighlight: '电影级回忆短片。',
      subtitle:
        '拖入您的照片与背景音乐，在交互式时间轴上编排故事顺序，直接在浏览器中合成高清视频。您的媒体文件绝不离开本地设备。',
      statZeroServer: '零服务器上传',
      statZeroServerDesc: '100% 浏览器本地私密处理',
      stat1080p: '智能 1080p 引擎',
      stat1080pDesc: '安全缩放高像素原图防崩溃',
      statInstant: '平滑淡入淡出与配乐',
      statInstantDesc: '实时 Canvas 与 MediaRecorder 合成',
    },
    uploader: {
      sectionTitle: '1. 导入与优化媒体文件',
      sectionSubtitle:
        '通过离屏 Canvas 自动将高分辨率照片标准化缩放至 1080p，防止浏览器内存溢出或标签页崩溃。',
      dropzoneTitle: '将照片拖放到此处',
      dropzoneSubtitle: '支持 JPG、PNG、WebP、AVIF — 安全批量导入数十张高清照片',
      browsePhotosBtn: '选择照片',
      loadDemoBtn: '加载示例故事板',
      compressionBadge: '离屏 Canvas 1080p 自动优化器已启用',
      compressingStatus: '正在将图片缩放并优化至 1080p...',
      photosCount: '张照片已在内存中就绪',
      clearAllBtn: '清空全部',
      audioTitle: '背景音乐音轨',
      audioSubtitle: '选择本地 MP3、WAV 或 OGG 音频文件，或一键生成内置氛围纯音乐',
      uploadAudioBtn: '选择音频文件',
      generateAmbientBtn: '使用内置氛围配乐',
      removeAudioBtn: '移除音频',
      memorySavedLabel: '通过 1080p 缩放节省的内存',
    },
    storyboard: {
      title: '2. 故事板时间轴与演播室',
      subtitleDesktop: '水平拖拽卡片以调整播放顺序、修改单张停留时长或添加字幕叠加。',
      subtitleMobile: '使用专为触屏优化的垂直列表轻松调整照片顺序与停留时长。',
      emptyTitle: '您的故事板时间轴为空',
      emptySubtitle: '请在上方上传照片或点击加载示例故事板以开始制作视频。',
      globalDurationLabel: '单张时长',
      applyToAllBtn: '应用到全部',
      transitionLabel: '交叉淡入淡出',
      aspectRatioLabel: '画面比例',
      fitModeLabel: '画面填充',
      fitCover: '电影全屏填充',
      fitContainBlur: '完整居中 + 模糊背景',
      kenBurnsLabel: 'Ken Burns 推拉动效',
      slideDurationSec: '秒',
      captionPlaceholder: '可选字幕文字...',
      moveEarlier: '向前移动',
      moveLater: '向后移动',
      removeSlide: '删除此页',
      duplicateSlide: '复制此页',
      totalDuration: '视频总时长',
      slidesLabel: '张幻灯片',
      previewTitle: '实时 Canvas 预览',
      playPreview: '播放预览',
      pausePreview: '暂停预览',
      createMemoryBtn: '生成回忆视频 (Create Memory)',
      renderingTitle: '正在合成您的回忆视频 (Stitching your memory...)...',
      renderingSubtitle: '正在浏览器中实时绘制 1080p 过渡帧并编码混合音轨。',
      cancelRenderBtn: '取消编码',
      readyTitle: '您的回忆视频已制作完成！',
      readySubtitle: '100% 在您的本地设备上渲染完成。可在下方直接预览或下载视频文件。',
      downloadVideoBtn: '下载视频文件',
      createNewRenderBtn: '返回编辑器',
    },
    seoSection: {
      howItWorksTitle: '零服务器幻灯片制作工具的工作原理',
      step1Title: '1. 离屏 1080p 图像压缩',
      step1Desc:
        '高像素手机和单反照片在导入瞬间通过离屏 HTML5 Canvas 标准化为 1080p，大幅降低浏览器内存占用并杜绝卡顿。',
      step2Title: '2. 响应式交互故事板',
      step2Desc:
        '桌面端提供宽屏水平胶片时间轴，手机与平板端自动切换为垂直触控排序列表，轻松设置时长、字幕与推拉镜头。',
      step3Title: '3. 本地 Canvas + MediaRecorder 合成',
      step3Desc:
        '点击生成后，画面过渡帧与 Web Audio API 解码的音乐流在浏览器内直接封装为可下载的 MP4 或 WebM 视频。',
      faqTitle: '常见问题解答 (FAQ)',
      faq1Q: '我的私人照片会上传到外部服务器吗？',
      faq1A:
        '绝不会。MemoryReel 是 100% 纯前端 Web 应用程序，所有图像缩放、预览播放与视频编码均在您自己的设备浏览器内完成。',
      faq2Q: '为什么导入照片时会自动缩放至 1080p？',
      faq2A:
        '原始 12MP–48MP 照片解码后会占用数百兆未压缩内存。标准化为全高清 (1920×1080) 可确保 60fps 流畅过渡且不会导致浏览器崩溃。',
      faq3Q: '支持导出哪些视频格式？',
      faq3A:
        'MemoryReel 会自动检测并选择您当前浏览器支持的最佳硬件加速编码格式（MP4/H.264 或带 Opus 音频的 WebM/VP9）。',
      footerCopyright: 'MemoryReel — 零服务器故事板与幻灯片视频制作工具。',
      footerPrivacyNote: '基于 Astro、React Islands 与 HTML5 MediaRecorder 构建。100% 客户端隐私保护。',
    },
  },
};

export function getTranslations(locale?: string): TranslationDictionary {
  if (locale && locale in translations) {
    return translations[locale as Locale];
  }
  return translations.en;
}
