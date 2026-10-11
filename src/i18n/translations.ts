export type Locale = 'en' | 'es' | 'fr' | 'de';

export const LOCALES: { code: Locale; label: string; nativeName: string; flag: string }[] = [
  { code: 'en', label: 'EN', nativeName: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'ES', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'FR', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'DE', nativeName: 'Deutsch', flag: '🇩🇪' },
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
};

export function getTranslations(locale?: string): TranslationDictionary {
  if (locale && locale in translations) {
    return translations[locale as Locale];
  }
  return translations.en;
}
