'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';

type NodeId = 'tree-1' | 'tree-2' | 'tree-3' | 'tree-4' | 'hub' | 'm-1' | 'm-2' | 'm-3' | 'm-4';

const nodes: Record<NodeId, { x: number; y: number; type: 'tree' | 'hub' | 'mycelium'; label: string }> = {
  'tree-1': { x: 120, y: 90, type: 'tree', label: 'Pine' },
  'tree-2': { x: 380, y: 70, type: 'tree', label: 'Birch' },
  'tree-3': { x: 640, y: 95, type: 'tree', label: 'Fir' },
  'tree-4': { x: 880, y: 100, type: 'tree', label: 'Larch' },
  hub: { x: 500, y: 280, type: 'hub', label: 'Mother tree' },
  'm-1': { x: 220, y: 380, type: 'mycelium', label: 'Mycelium' },
  'm-2': { x: 420, y: 430, type: 'mycelium', label: 'Mycelium' },
  'm-3': { x: 620, y: 410, type: 'mycelium', label: 'Mycelium' },
  'm-4': { x: 800, y: 360, type: 'mycelium', label: 'Mycelium' },
};

const edges: Array<[NodeId, NodeId]> = [
  ['tree-1', 'm-1'],
  ['tree-2', 'm-1'],
  ['tree-2', 'm-2'],
  ['tree-3', 'm-3'],
  ['tree-4', 'm-3'],
  ['tree-4', 'm-4'],
  ['hub', 'm-1'],
  ['hub', 'm-2'],
  ['hub', 'm-3'],
  ['hub', 'm-4'],
  ['m-1', 'm-2'],
  ['m-2', 'm-3'],
  ['m-3', 'm-4'],
  ['tree-2', 'hub'],
  ['tree-3', 'hub'],
];

function Tree({ x, y, active }: { x: number; y: number; active: boolean }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <line x1="0" y1="0" x2="0" y2="40" stroke="currentColor" strokeWidth="3" />
      <path
        d="M-28 0 L0 -42 L28 0 Z"
        fill="currentColor"
        className={active ? 'text-accent' : 'text-accent/70'}
        style={{ transition: 'fill 200ms' }}
      />
      <path
        d="M-20 -20 L0 -55 L20 -20 Z"
        fill="currentColor"
        className={active ? 'text-accent' : 'text-accent/85'}
        style={{ transition: 'fill 200ms' }}
      />
    </g>
  );
}

export default function NetworkSection() {
  const t = useTranslations('network');
  const [hovered, setHovered] = useState<NodeId | null>(null);

  const isEdgeActive = (a: NodeId, b: NodeId) =>
    hovered === a || hovered === b;

  return (
    <section id="network" className="relative border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading kicker={t('kicker')} title={t('title')} lead={t('lead')} align="center" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="mt-12 overflow-hidden rounded-2xl border border-line bg-elev"
        >
          <svg
            viewBox="0 0 1000 500"
            className="block h-auto w-full"
            role="img"
            aria-label="Mycorrhizal network visualization"
          >
            <defs>
              <linearGradient id="soilGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--bg-elev)" stopOpacity="0" />
                <stop offset="40%" stopColor="var(--bg-elev)" stopOpacity="0" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.06" />
              </linearGradient>
            </defs>

            <rect x="0" y="180" width="1000" height="320" fill="url(#soilGrad)" />
            <line
              x1="0"
              y1="180"
              x2="1000"
              y2="180"
              stroke="currentColor"
              strokeOpacity="0.2"
              strokeDasharray="4 6"
              className="text-fg"
            />

            <g stroke="currentColor" fill="none" strokeLinecap="round">
              {edges.map(([a, b]) => {
                const A = nodes[a];
                const B = nodes[b];
                const active = isEdgeActive(a, b);
                const cx = (A.x + B.x) / 2;
                const cy = Math.max(A.y, B.y) + 30;
                const d = `M ${A.x} ${A.y} Q ${cx} ${cy} ${B.x} ${B.y}`;
                return (
                  <path
                    key={`${a}-${b}`}
                    d={d}
                    strokeWidth={active ? 2 : 1}
                    className={active ? 'text-accent' : 'text-accent/35'}
                    style={{ transition: 'all 250ms' }}
                  />
                );
              })}
            </g>

            <g>
              {(['tree-1', 'tree-2', 'tree-3', 'tree-4'] as NodeId[]).map((id) => (
                <g
                  key={id}
                  onMouseEnter={() => setHovered(id)}
                  onMouseLeave={() => setHovered(null)}
                  className="cursor-pointer"
                >
                  <Tree x={nodes[id].x} y={nodes[id].y} active={hovered === id} />
                </g>
              ))}
            </g>

            <g
              onMouseEnter={() => setHovered('hub')}
              onMouseLeave={() => setHovered(null)}
              className="cursor-pointer"
            >
              <circle
                cx={nodes.hub.x}
                cy={nodes.hub.y}
                r={hovered === 'hub' ? 12 : 9}
                className="fill-current text-accent2"
                style={{ transition: 'r 250ms' }}
              />
              <circle
                cx={nodes.hub.x}
                cy={nodes.hub.y}
                r="18"
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.4"
                className="text-accent2"
              />
            </g>

            <g>
              {(['m-1', 'm-2', 'm-3', 'm-4'] as NodeId[]).map((id) => (
                <g
                  key={id}
                  onMouseEnter={() => setHovered(id)}
                  onMouseLeave={() => setHovered(null)}
                  className="cursor-pointer"
                >
                  <circle
                    cx={nodes[id].x}
                    cy={nodes[id].y}
                    r={hovered === id ? 8 : 5}
                    className="node-pulse fill-current text-accent"
                    style={{ transition: 'r 250ms' }}
                  />
                </g>
              ))}
            </g>

            {hovered && (
              <g transform={`translate(${nodes[hovered].x}, ${nodes[hovered].y - 30})`}>
                <rect
                  x="-36"
                  y="-22"
                  width="72"
                  height="20"
                  rx="10"
                  className="fill-current text-fg"
                  opacity="0.9"
                />
                <text
                  textAnchor="middle"
                  y="-8"
                  className="fill-current text-[10px] uppercase tracking-widest"
                  style={{ fill: 'var(--bg)' }}
                >
                  {nodes[hovered].label}
                </text>
              </g>
            )}
          </svg>

          <div className="grid gap-4 border-t border-line px-6 py-5 text-sm text-muted sm:grid-cols-3">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-accent" />
              Mycelium nodes
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-accent2" />
              Mother tree hub
            </div>
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 14 14" className="h-3 w-3 text-accent">
                <path d="M-2 0 L0 -7 L2 0 Z" transform="translate(7 12)" fill="currentColor" />
                <line x1="7" y1="14" x2="7" y2="6" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              Trees connected by the network
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
