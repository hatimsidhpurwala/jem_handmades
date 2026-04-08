import { useState, useRef, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { loadMediaPipe } from '@/utils/mediapipeLoader';
import {
  drawAllMakeup,
  captureCanvas,
  downloadImage,
  defaultMakeup,
  type MakeupState,
  type MakeupLayer,
  type LipstickLayer,
} from '@/utils/canvasUtils';
import { Camera, Upload, Download, Loader2, AlertCircle, ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

type Mode = 'camera' | 'upload';
type MakeupTab = 'lipstick' | 'blush' | 'eyeshadow' | 'eyeliner' | 'foundation';

const SUBCATEGORY_TO_TAB: Record<string, MakeupTab> = {
  lipstick: 'lipstick',
  blush: 'blush',
  eyeshadow: 'eyeshadow',
  eyeliner: 'eyeliner',
  foundation: 'foundation',
};

const TAB_LABELS: Record<MakeupTab, string> = {
  lipstick: '💄 Lipstick',
  blush: '🌸 Blush',
  eyeshadow: '👁️ Eyeshadow',
  eyeliner: '✏️ Eyeliner',
  foundation: '🎨 Foundation',
};

export default function TryOn() {
  const { productId } = useParams<{ productId: string }>();

  // ---- Hooks that must exist on every render ----
  const [product, setProduct] = useState<any | null>(null);
  const [loadingProduct, setLoadingProduct] = useState(true);

  const [activeTab, setActiveTab] = useState<MakeupTab>('lipstick');
  const [mode, setMode] = useState<Mode>('camera');
  const [makeup, setMakeup] = useState<MakeupState>(defaultMakeup);

  const [isModelLoading, setIsModelLoading] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [noFace, setNoFace] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<HTMLImageElement | null>(null);
  const [uploadLandmarks, setUploadLandmarks] = useState<any[] | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const faceMeshRef = useRef<any>(null);
  const animFrameRef = useRef<number>(0);
  const makeupRef = useRef(makeup);

  useEffect(() => {
    makeupRef.current = makeup;
  }, [makeup]);

  // ---- Fetch product and initialise makeup from API ----
  useEffect(() => {
    async function loadProduct() {
      try {
        const res = await fetch(
          `https://jem.24x7shopping.co/jem/api/website/${productId}`
        );
        const json = await res.json();

        if (!json.success) {
          console.error('API error:', json.message);
          return;
        }

        const p = json.data ?? json;
        setProduct(p);

        const tab: MakeupTab =
          SUBCATEGORY_TO_TAB[p.subCategory] ?? 'lipstick';
        setActiveTab(tab);

        const initialHex = p.attributes?.shadeColour ?? '#C4527A';
        const initialOpacity =
          (typeof p.defaultOpacity === 'number' ? p.defaultOpacity : 50) / 100;
        const initialFinish =
          (p.finish ?? 'satin') as 'matte' | 'satin' | 'glossy';

        setMakeup({
          ...defaultMakeup,
          [tab]: {
            ...defaultMakeup[tab],
            hex: initialHex,
            enabled: true,
            opacity: initialOpacity,
            ...(tab === 'lipstick' ? { finish: initialFinish } : {}),
          },
        });
      } catch (e) {
        console.error('Failed to load product', e);
      } finally {
        setLoadingProduct(false);
      }
    }

    if (productId) loadProduct();
  }, [productId]);

  // ---- Other effects & callbacks (unchanged) ----
  useEffect(() => {
    if (mode === 'upload' && uploadedImage && uploadLandmarks) {
      drawUploadResult(uploadedImage, uploadLandmarks);
    }
  }, [makeup, uploadedImage, uploadLandmarks, mode]);

  const drawUploadResult = useCallback((img: HTMLImageElement, landmarks: any[]) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
    if (landmarks.length > 0) {
      drawAllMakeup(ctx, landmarks[0], canvas.width, canvas.height, makeupRef.current);
    }
  }, []);

  const initFaceMesh = useCallback(async (onResults: (results: any) => void) => {
    if (faceMeshRef.current) {
      faceMeshRef.current.onResults(onResults);
      return;
    }
    setIsModelLoading(true);
    try {
      await loadMediaPipe();
      const FM = (window as any).FaceMesh;
      if (!FM) throw new Error('FaceMesh library not loaded');
      const fm = new FM({
        locateFile: (f: string) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${f}`,
      });
      fm.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });
      fm.onResults(onResults);
      await fm.initialize();
      faceMeshRef.current = fm;
    } catch (e: any) {
      setError(e.message || 'Failed to load face detection model');
    } finally {
      setIsModelLoading(false);
    }
  }, []);

  const startCamera = useCallback(async () => {
    setError(null);
    setNoFace(false);

    const onResults = (results: any) => {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      if (!canvas || !video) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.save();
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      if (results.multiFaceLandmarks?.length > 0) {
        setNoFace(false);
        drawAllMakeup(
          ctx,
          results.multiFaceLandmarks[0],
          canvas.width,
          canvas.height,
          makeupRef.current
        );
      } else {
        setNoFace(true);
      }
      ctx.restore();
    };

    try {
      await initFaceMesh(onResults);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user',
        },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraActive(true);
      const renderLoop = async () => {
        if (
          videoRef.current &&
          faceMeshRef.current &&
          videoRef.current.readyState >= 2
        ) {
          try {
            await faceMeshRef.current.send({ image: videoRef.current });
          } catch {}
        }
        animFrameRef.current = requestAnimationFrame(renderLoop);
      };
      renderLoop();
    } catch (e: any) {
      if (e.name === 'NotAllowedError') {
        setError(
          'Camera access denied. Please allow camera access in your browser settings and refresh.'
        );
      } else {
        setError(e.message || 'Failed to start camera');
      }
    }
  }, [initFaceMesh]);

  const stopCamera = useCallback(() => {
    cancelAnimationFrame(animFrameRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setCameraActive(false);
  }, []);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  const handleUpload = useCallback(
    async (file: File) => {
      setError(null);
      setNoFace(false);
      const img = new Image();
      img.src = URL.createObjectURL(file);
      await new Promise((resolve) => {
        img.onload = resolve;
      });
      setUploadedImage(img);
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      const onResults = (results: any) => {
        if (results.multiFaceLandmarks?.length > 0) {
          setUploadLandmarks(results.multiFaceLandmarks);
          setNoFace(false);
        } else {
          setNoFace(true);
          setUploadLandmarks(null);
        }
      };
      await initFaceMesh(onResults);
      if (faceMeshRef.current) await faceMeshRef.current.send({ image: img });
    },
    [initFaceMesh]
  );

  const updateLayer = (
    layer: MakeupTab,
    updates: Partial<MakeupLayer | LipstickLayer>
  ) => {
    setMakeup((prev) => ({ ...prev, [layer]: { ...prev[layer], ...updates } }));
  };

  const handleCapture = () => {
    if (!canvasRef.current) return;
    const dataUrl = captureCanvas(canvasRef.current);
    downloadImage(dataUrl, 'jem-handmades-look.png');
  };

  const currentLayer = makeup[activeTab];
  const paramName = product?.productName;

  // ---- Loading state AFTER all hooks ----
  if (loadingProduct || !product) {
    return (
      <main className="min-h-screen bg-background py-6">
        <div className="container mx-auto px-4">
          <p className="text-sm text-muted-foreground">Loading product...</p>
        </div>
      </main>
    );
  }

  // ---- JSX (unchanged except for activeTab / paramName usage) ----
  return (
    <main className="min-h-screen bg-background py-6">
      <div className="container mx-auto px-4">
        <h1 className="font-heading text-3xl font-bold text-foreground">
          Virtual Try-On
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Try lipstick, blush, eyeshadow, eyeliner and foundation — live or from a
          photo.
        </p>

        <div className="mt-6 flex flex-col gap-6 lg:flex-row">
          {/* Left: Canvas */}
          <div className="flex-1">
            {/* Mode Tabs */}
            <div className="mb-4 flex gap-2">
              <button
                onClick={() => {
                  setMode('camera');
                  stopCamera();
                  setUploadedImage(null);
                  setUploadLandmarks(null);
                }}
                className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  mode === 'camera'
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                <Camera size={16} /> Live Camera
              </button>
              <button
                onClick={() => {
                  setMode('upload');
                  stopCamera();
                }}
                className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  mode === 'upload'
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                <Upload size={16} /> Upload Photo
              </button>
            </div>

            {/* Canvas */}
            <div className="relative overflow-hidden rounded-lg border border-border bg-primary/5">
              {mode === 'camera' &&
                !cameraActive &&
                !isModelLoading &&
                !error && (
                  <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 p-8 text-center">
                    <Camera className="h-16 w-16 text-muted-foreground/40" />
                    <p className="text-sm text-muted-foreground">
                      Click below to start your camera and try on makeup in
                      real-time.
                    </p>
                    <button
                      onClick={startCamera}
                      className="rounded-md bg-accent px-6 py-2.5 text-sm font-medium text-accent-foreground hover:bg-accent/90"
                    >
                      Start Camera
                    </button>
                  </div>
                )}

              {mode === 'upload' &&
                !uploadedImage &&
                !isModelLoading &&
                !error && (
                  <div
                    className="flex min-h-[400px] cursor-pointer flex-col items-center justify-center gap-4 border-2 border-dashed border-border p-8 text-center hover:border-accent/50"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const f = e.dataTransfer.files[0];
                      if (f?.type.startsWith('image/')) handleUpload(f);
                    }}
                    onClick={() =>
                      document.getElementById('file-input')?.click()
                    }
                  >
                    <ImageIcon className="h-16 w-16 text-muted-foreground/40" />
                    <p className="text-sm text-muted-foreground">
                      Drag & drop a photo or click to upload
                    </p>
                    <p className="text-xs text-muted-foreground/60">JPG or PNG</p>
                    <input
                      id="file-input"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleUpload(f);
                      }}
                    />
                  </div>
                )}

              {isModelLoading && (
                <div className="flex min-h-[400px] flex-col items-center justify-center gap-3">
                  <Loader2 className="h-10 w-10 animate-spin text-accent" />
                  <p className="text-sm text-muted-foreground">
                    Loading face detection model...
                  </p>
                </div>
              )}

              {error && (
                <div className="flex min-h-[400px] flex-col items-center justify-center gap-3 p-8 text-center">
                  <AlertCircle className="h-12 w-12 text-destructive" />
                  <p className="text-sm text-destructive">{error}</p>
                  <button
                    onClick={() => {
                      setError(null);
                      if (mode === 'camera') startCamera();
                    }}
                    className="rounded-md bg-secondary px-4 py-2 text-sm"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {noFace && (cameraActive || uploadedImage) && (
                <div className="absolute left-1/2 top-4 z-10 -translate-x-1/2 rounded-md bg-foreground/80 px-4 py-2 text-xs text-background">
                  No face detected — please look at the camera
                </div>
              )}

              <video ref={videoRef} className="hidden" playsInline muted />
              <canvas
                ref={canvasRef}
                className={`w-full ${
                  (!cameraActive && !uploadedImage) ||
                  isModelLoading ||
                  error
                    ? 'hidden'
                    : ''
                }`}
                style={{ maxHeight: '70vh' }}
              />
            </div>

            {/* Download button */}
            {(cameraActive || uploadedImage) && !error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex gap-3"
              >
                <button
                  onClick={handleCapture}
                  className="flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground hover:bg-accent/90"
                >
                  <Download size={16} />
                  {mode === 'camera'
                    ? 'Take & Download Photo'
                    : 'Download Result'}
                </button>
                {mode === 'upload' && uploadedImage && (
                  <button
                    onClick={() => {
                      setUploadedImage(null);
                      setUploadLandmarks(null);
                    }}
                    className="rounded-md bg-secondary px-5 py-2.5 text-sm font-medium text-secondary-foreground"
                  >
                    Upload Another
                  </button>
                )}
              </motion.div>
            )}
          </div>

          {/* Right: panel */}
          <div className="w-full lg:w-80 shrink-0">
            <div className="rounded-lg border border-border bg-card p-4">
              <h2 className="font-heading text-lg font-bold text-foreground mb-3">
                Makeup
              </h2>

              {paramName && (
                <p className="text-xs text-muted-foreground mb-3">
                  Trying:{' '}
                  <span className="font-semibold text-foreground">
                    {paramName}
                  </span>
                </p>
              )}

              <div className="flex items-center justify-between mb-3 rounded-md bg-secondary px-3 py-2">
                <span className="text-xs font-medium text-secondary-foreground">
                  {TAB_LABELS[activeTab]}
                </span>
                <button
                  onClick={() =>
                    updateLayer(activeTab, { enabled: !currentLayer.enabled })
                  }
                  className={`relative h-6 w-11 rounded-full transition-colors ${
                    currentLayer.enabled ? 'bg-accent' : 'bg-muted'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                      currentLayer.enabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <button
                onClick={() => setMakeup(defaultMakeup)}
                className="mt-4 w-full rounded-md border border-border py-2 text-xs font-medium text-muted-foreground hover:bg-secondary transition-colors"
              >
                Reset All Makeup
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
