import { useEffect, useRef } from 'react';

interface ReflectionFieldProps {
  height: number;
  fadeTargetId?: string;
}

type ShapeType = 'line' | 'dot' | 'tri' | 'cross' | 'check';

interface FieldObject {
  type: ShapeType;
  x: number;
  y: number;
  z: number;
  size: number;
  angle: number;
  spin: number;
  accent: boolean;
  alpha: number;
  lw: number;
}

const MASK = 'linear-gradient(to bottom, black 0%, black 52%, transparent 96%)';

// Solvd palette mapped onto Persono's reflection-field channels
const LINE_RGB = '28, 25, 21'; // ink
const ACCENT_RGB = '42, 160, 143'; // mint
const PARTICLE_RGB = '203, 92, 64'; // muted coral

// Perspective walk-through constants (verbatim from PersonoReflectionLoader)
const FOV = 460;
const FAR = 680;
const NEAR = 55;
const SPEED = 165;

const TYPES: ShapeType[] = [
  'line',
  'line',
  'line',
  'line',
  'dot',
  'dot',
  'dot',
  'tri',
  'cross',
  'check',
  'check',
];

const rand = (a: number, b: number) => a + Math.random() * (b - a);

const mkObj = (): FieldObject => {
  const type = TYPES[Math.floor(Math.random() * TYPES.length)];
  return {
    type,
    x: rand(-440, 440),
    y: rand(-290, 290),
    z: rand(NEAR + 30, FAR),
    size: rand(14, 58),
    angle: type === 'check' ? rand(-0.35, 0.35) : rand(0, Math.PI * 2),
    spin: type === 'check' ? rand(-0.18, 0.18) : rand(-0.55, 0.55),
    accent: type === 'check' ? Math.random() < 0.6 : Math.random() < 0.16,
    alpha: rand(0.22, 0.82),
    lw: type === 'check' ? rand(0.9, 1.8) : rand(0.5, 1.6),
  };
};

export function ReflectionField({
  height,
  fadeTargetId,
}: ReflectionFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const sync = () => {
      canvas.width = canvas.clientWidth || 1440;
      canvas.height = canvas.clientHeight || 1150;
    };
    sync();

    const objs: FieldObject[] = Array.from({ length: 68 }, () => mkObj());

    let time = 0;
    let last = performance.now();
    let animId: number | null = null;
    let heroOn = true;

    const drawFrame = (dt: number) => {
      time += dt;

      const W = canvas.width;
      const H = canvas.height;
      const cx = W / 2 + Math.sin(time * 0.38) * W * 0.01;
      // Anchor the field's heart to the hero's visual center, not the
      // (taller, services-overlapping) canvas midpoint.
      const cy = 340 + Math.sin(time * 0.55) * 5;

      ctx.clearRect(0, 0, W, H);
      objs.sort((a, b) => b.z - a.z);

      for (const o of objs) {
        o.z -= SPEED * dt;
        o.angle += o.spin * dt;

        if (o.z < NEAR) {
          Object.assign(o, mkObj());
          o.z = FAR;
          continue;
        }

        const p = FOV / o.z;
        const sx = cx + o.x * p;
        const sy = cy + o.y * p;
        const ss = o.size * p;

        const margin = ss * 2.5;
        if (sx < -margin || sx > W + margin || sy < -margin || sy > H + margin)
          continue;

        const tFar = Math.min(1, (FAR - o.z) / (FAR * 0.3));
        const tNear = Math.min(1, (o.z - NEAR) / (NEAR * 1.8));
        const alpha = o.alpha * tFar * tNear;
        if (alpha < 0.008) continue;

        const rgb = o.accent
          ? ACCENT_RGB
          : o.type === 'dot'
            ? PARTICLE_RGB
            : LINE_RGB;
        ctx.strokeStyle = 'rgba(' + rgb + ', ' + alpha + ')';
        ctx.fillStyle = 'rgba(' + rgb + ', ' + alpha * 0.32 + ')';
        ctx.lineWidth = Math.max(0.25, o.lw * p * 0.38);

        ctx.save();
        ctx.translate(sx, sy);
        ctx.rotate(o.angle);
        ctx.beginPath();

        if (o.type === 'line') {
          ctx.moveTo(-ss * 0.5, 0);
          ctx.lineTo(ss * 0.5, 0);
          ctx.stroke();
        } else if (o.type === 'dot') {
          ctx.arc(0, 0, Math.max(0.7, ss * 0.11), 0, Math.PI * 2);
          ctx.fill();
        } else if (o.type === 'tri') {
          ctx.moveTo(0, -ss * 0.5);
          ctx.lineTo(ss * 0.44, ss * 0.44);
          ctx.lineTo(-ss * 0.44, ss * 0.44);
          ctx.closePath();
          ctx.stroke();
        } else if (o.type === 'cross') {
          ctx.moveTo(-ss * 0.32, 0);
          ctx.lineTo(ss * 0.32, 0);
          ctx.moveTo(0, -ss * 0.32);
          ctx.lineTo(0, ss * 0.32);
          ctx.stroke();
        } else if (o.type === 'check') {
          // The Solvd logo check (SVG path M4 13 L10 19 L21 5, centered on its 24-box)
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.moveTo(-ss * 0.333, ss * 0.042);
          ctx.lineTo(-ss * 0.083, ss * 0.292);
          ctx.lineTo(ss * 0.375, -ss * 0.292);
          ctx.stroke();
          ctx.lineCap = 'butt';
          ctx.lineJoin = 'miter';
        }

        ctx.restore();
      }
    };

    const reduceMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      // Draw exactly one static frame; never start the rAF loop or attach
      // the scroll listener. Resize handling still applies (re-sync the
      // canvas and redraw the same static frame at dt 0) so the field
      // doesn't go blank or stretch on viewport changes.
      drawFrame(0);
      const onReducedResize = () => {
        sync();
        drawFrame(0);
      };
      window.addEventListener('resize', onReducedResize);
      return () => {
        window.removeEventListener('resize', onReducedResize);
      };
    }

    const draw = (now: number) => {
      animId = requestAnimationFrame(draw);
      if (heroOn === false) {
        last = now;
        return; // paused while faded out
      }
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      drawFrame(dt);
    };

    animId = requestAnimationFrame(draw);

    const onResize = () => sync();
    window.addEventListener('resize', onResize);

    // Scroll-linked fade: the reflection field dissolves as the hero
    // scrolls away into the next section.
    let fadedClear = false;
    const onScroll = () => {
      const target = fadeTargetId
        ? document.getElementById(fadeTargetId)
        : null;
      const h = (target && target.offsetHeight) || 690;
      const y =
        window.scrollY ||
        (document.scrollingElement && document.scrollingElement.scrollTop) ||
        0;
      const op = Math.max(0, 1 - y / (h * 0.85));
      canvas.style.opacity = String(op);
      heroOn = op > 0.01;
      if (heroOn) {
        fadedClear = false;
      } else if (!fadedClear) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fadedClear = true;
      }
    };

    if (fadeTargetId) {
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      if (fadeTargetId) window.removeEventListener('scroll', onScroll);
    };
  }, [fadeTargetId]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: `${height}px`,
        pointerEvents: 'none',
        display: 'block',
        maskImage: MASK,
        WebkitMaskImage: MASK,
      }}
    />
  );
}
