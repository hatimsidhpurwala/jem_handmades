// ─── Lip Landmarks ───────────────────────────────────────────────
const UPPER_LIP = [61, 185, 40, 39, 37, 0, 267, 269, 270, 409, 291];
const LOWER_LIP = [61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291];
const INNER_LIP = [78, 191, 80, 81, 82, 13, 312, 311, 310, 415, 308, 324, 318, 402, 317, 14, 87, 178, 88, 95];

// ─── Blush Landmarks (cheek areas) ───────────────────────────────
const LEFT_CHEEK  = [116, 123, 147, 213, 192, 214, 210, 205, 50, 117];
const RIGHT_CHEEK = [345, 352, 376, 433, 416, 434, 430, 425, 280, 346];

// ─── Eyeshadow Landmarks ──────────────────────────────────────────
const LEFT_EYE_SHADOW  = [226, 247, 30, 29, 27, 28, 56, 190, 243, 173, 157, 158, 159, 160, 161, 246];
const RIGHT_EYE_SHADOW = [446, 467, 260, 259, 257, 258, 286, 414, 463, 398, 384, 385, 386, 387, 388, 466];

// ─── Eyeliner Landmarks ───────────────────────────────────────────
const LEFT_EYELINER  = [33, 246, 161, 160, 159, 158, 157, 173, 133, 155, 154, 153, 145, 144, 163, 7];
const RIGHT_EYELINER = [263, 466, 388, 387, 386, 385, 384, 398, 362, 382, 381, 380, 374, 373, 390, 249];

// ─── Foundation (full face outline) ──────────────────────────────
const FACE_OVAL = [10,338,297,332,284,251,389,356,454,323,361,288,397,365,379,378,400,377,152,148,176,149,150,136,172,58,132,93,234,127,162,21,54,103,67,109];

// ─── Helper: get pixel coords ────────────────────────────────────
function lm(landmarks: any[], idx: number, w: number, h: number) {
  const p = landmarks[idx];
  return { x: p.x * w, y: p.y * h };
}

function drawPath(ctx: CanvasRenderingContext2D, points: { x: number; y: number }[], close = true) {
  if (points.length === 0) return;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  points.slice(1).forEach(p => ctx.lineTo(p.x, p.y));
  if (close) ctx.closePath();
}

// ─── LIPSTICK ────────────────────────────────────────────────────
export function drawLipColor(
  ctx: CanvasRenderingContext2D,
  landmarks: any[],
  w: number,
  h: number,
  hex: string,
  opacity: number,
  finish: string
) {
  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.globalCompositeOperation = 'multiply';
  ctx.fillStyle = hex;

  const upper = UPPER_LIP.map(i => lm(landmarks, i, w, h));
  const lower = LOWER_LIP.map(i => lm(landmarks, i, w, h));
  drawPath(ctx, upper); ctx.fill();
  drawPath(ctx, lower); ctx.fill();

  if (finish === 'glossy') {
    ctx.globalAlpha = opacity * 0.3;
    ctx.globalCompositeOperation = 'screen';
    ctx.fillStyle = '#ffffff';
    const inner = INNER_LIP.map(i => lm(landmarks, i, w, h));
    drawPath(ctx, inner); ctx.fill();
  }
  ctx.restore();
}

// ─── BLUSH ───────────────────────────────────────────────────────
export function drawBlush(
  ctx: CanvasRenderingContext2D,
  landmarks: any[],
  w: number,
  h: number,
  hex: string,
  opacity: number
) {
  ctx.save();

  [LEFT_CHEEK, RIGHT_CHEEK].forEach(cheek => {
    const pts = cheek.map(i => lm(landmarks, i, w, h));
    const cx = pts.reduce((s, p) => s + p.x, 0) / pts.length;
    const cy = pts.reduce((s, p) => s + p.y, 0) / pts.length;
    const radius = Math.max(...pts.map(p => Math.hypot(p.x - cx, p.y - cy))) * 1.1;

    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    grad.addColorStop(0, hex + 'CC');
    grad.addColorStop(1, hex + '00');

    ctx.globalAlpha = opacity * 0.55;
    ctx.globalCompositeOperation = 'multiply';
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.restore();
}

// ─── EYESHADOW ───────────────────────────────────────────────────
export function drawEyeshadow(
  ctx: CanvasRenderingContext2D,
  landmarks: any[],
  w: number,
  h: number,
  hex: string,
  opacity: number
) {
  ctx.save();
  ctx.globalAlpha = opacity * 0.6;
  ctx.globalCompositeOperation = 'multiply';
  ctx.fillStyle = hex;

  [LEFT_EYE_SHADOW, RIGHT_EYE_SHADOW].forEach(eye => {
    const pts = eye.map(i => lm(landmarks, i, w, h));
    drawPath(ctx, pts);
    ctx.fill();
  });

  ctx.restore();
}

// ─── EYELINER ────────────────────────────────────────────────────
export function drawEyeliner(
  ctx: CanvasRenderingContext2D,
  landmarks: any[],
  w: number,
  h: number,
  hex: string,
  opacity: number
) {
  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.globalCompositeOperation = 'source-over';
  ctx.strokeStyle = hex;
  ctx.lineWidth = Math.max(w, h) * 0.004;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  [LEFT_EYELINER, RIGHT_EYELINER].forEach(eye => {
    const pts = eye.map(i => lm(landmarks, i, w, h));
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    pts.slice(1).forEach(p => ctx.lineTo(p.x, p.y));
    ctx.stroke();
  });

  ctx.restore();
}

// ─── FOUNDATION ──────────────────────────────────────────────────
export function drawFoundation(
  ctx: CanvasRenderingContext2D,
  landmarks: any[],
  w: number,
  h: number,
  hex: string,
  opacity: number
) {
  ctx.save();

  const pts = FACE_OVAL.map(i => lm(landmarks, i, w, h));
  drawPath(ctx, pts);

  ctx.globalAlpha = opacity * 0.35;
  ctx.globalCompositeOperation = 'multiply';
  ctx.fillStyle = hex;
  ctx.fill();

  ctx.restore();
}

// ─── DRAW ALL ────────────────────────────────────────────────────
export function drawAllMakeup(
  ctx: CanvasRenderingContext2D,
  landmarks: any[],
  w: number,
  h: number,
  makeup: MakeupState
) {
  if (makeup.foundation.enabled)
    drawFoundation(ctx, landmarks, w, h, makeup.foundation.hex, makeup.foundation.opacity);
  if (makeup.blush.enabled)
    drawBlush(ctx, landmarks, w, h, makeup.blush.hex, makeup.blush.opacity);
  if (makeup.eyeshadow.enabled)
    drawEyeshadow(ctx, landmarks, w, h, makeup.eyeshadow.hex, makeup.eyeshadow.opacity);
  if (makeup.eyeliner.enabled)
    drawEyeliner(ctx, landmarks, w, h, makeup.eyeliner.hex, makeup.eyeliner.opacity);
  if (makeup.lipstick.enabled)
    drawLipColor(ctx, landmarks, w, h, makeup.lipstick.hex, makeup.lipstick.opacity, makeup.lipstick.finish);
}

// ─── TYPES ───────────────────────────────────────────────────────
export interface MakeupLayer {
  enabled: boolean;
  hex: string;
  opacity: number;
}

export interface LipstickLayer extends MakeupLayer {
  finish: string;
}

export interface MakeupState {
  foundation: MakeupLayer;
  blush: MakeupLayer;
  eyeshadow: MakeupLayer;
  eyeliner: MakeupLayer;
  lipstick: LipstickLayer;
}

export const defaultMakeup: MakeupState = {
  foundation: { enabled: false, hex: '#D2B48C', opacity: 0.5 },
  blush:      { enabled: false, hex: '#E8A0A0', opacity: 0.6 },
  eyeshadow:  { enabled: false, hex: '#A0527A', opacity: 0.6 },
  eyeliner:   { enabled: false, hex: '#1A0A0A', opacity: 0.9 },
  lipstick:   { enabled: true,  hex: '#9B1C1C', opacity: 0.65, finish: 'matte' },
};

// ─── CAPTURE / DOWNLOAD ──────────────────────────────────────────
export function captureCanvas(canvas: HTMLCanvasElement): string {
  return canvas.toDataURL('image/png');
}

export function downloadImage(dataUrl: string, filename: string) {
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = filename;
  a.click();
}