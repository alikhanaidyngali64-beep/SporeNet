'use client';

import { useEffect, useRef } from 'react';

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  base: { x: number; y: number };
};

export default function MyceliumBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    let nodes: Node[] = [];

    const palette = () => {
      const isDark = document.documentElement.classList.contains('dark');
      return isDark
        ? { node: '#8FB55A', edge: 'rgba(143, 181, 90, 0.18)', glow: 'rgba(217, 168, 95, 0.7)' }
        : { node: '#5C6B3E', edge: 'rgba(92, 107, 62, 0.15)', glow: 'rgba(194, 143, 60, 0.7)' };
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      spawn();
    };

    const spawn = () => {
      const density = Math.max(28, Math.floor((width * height) / 22000));
      nodes = Array.from({ length: density }).map(() => {
        const x = Math.random() * width;
        const y = Math.random() * height;
        return {
          x,
          y,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          r: 1.2 + Math.random() * 1.6,
          base: { x, y },
        };
      });
    };

    const tick = () => {
      const { node: nodeColor, edge: edgeColor, glow } = palette();
      ctx.clearRect(0, 0, width, height);

      const m = mouseRef.current;

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;

        const drift = 0.0008;
        n.vx += (n.base.x - n.x) * drift;
        n.vy += (n.base.y - n.y) * drift;
        n.vx *= 0.985;
        n.vy *= 0.985;

        if (m.active) {
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 22500) {
            const f = (22500 - d2) / 22500;
            n.vx += (dx / Math.sqrt(d2 + 1)) * f * 0.4;
            n.vy += (dy / Math.sqrt(d2 + 1)) * f * 0.4;
          }
        }

        if (n.x < 0) n.x = width;
        if (n.x > width) n.x = 0;
        if (n.y < 0) n.y = height;
        if (n.y > height) n.y = 0;
      }

      ctx.strokeStyle = edgeColor;
      ctx.lineWidth = 0.6;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 14400) {
            const alpha = 1 - d2 / 14400;
            ctx.globalAlpha = alpha * 0.9;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      for (const n of nodes) {
        let r = n.r;
        let color: string = nodeColor;
        if (m.active) {
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 8000) {
            r = n.r + (1 - d2 / 8000) * 2.2;
            color = glow;
          }
        }
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true };
    };
    const onLeave = () => {
      mouseRef.current.active = false;
    };

    resize();
    raf = requestAnimationFrame(tick);
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerleave', onLeave);

    const observer = new MutationObserver(() => {});
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
