export function BurnedForestArt() {
  return (
    <svg viewBox="0 0 400 220" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="bf-sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#1a1a14" />
          <stop offset="55%" stopColor="#2a1f12" />
          <stop offset="100%" stopColor="#120e08" />
        </linearGradient>
        <linearGradient id="bf-ground" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#1a120a" />
          <stop offset="100%" stopColor="#0a0805" />
        </linearGradient>
        <radialGradient id="bf-ember" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#ff7a2a" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#c64a14" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#c64a14" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="220" fill="url(#bf-sky)" />
      <ellipse cx="120" cy="170" rx="180" ry="40" fill="url(#bf-ember)" />
      <ellipse cx="290" cy="180" rx="100" ry="22" fill="url(#bf-ember)" opacity="0.6" />
      <rect y="165" width="400" height="55" fill="url(#bf-ground)" />
      {[40, 78, 128, 168, 215, 252, 295, 338, 372].map((x, i) => {
        const h = 90 + ((i * 17) % 50);
        const lean = (i % 2 === 0 ? -1 : 1) * ((i % 3) + 1);
        return (
          <g key={x} transform={`translate(${x} ${170})`}>
            <path
              d={`M0 0 L${lean - 2} -${h} L${lean + 2} -${h} Z`}
              fill="#0a0805"
              stroke="#1a120a"
              strokeWidth="0.5"
            />
            {i % 3 === 0 && (
              <path
                d={`M${lean} -${h * 0.6} l-6 -8 m6 -2 l5 -6 m-2 -3 l-4 -7`}
                stroke="#2a1f12"
                strokeWidth="1.2"
                fill="none"
                strokeLinecap="round"
              />
            )}
          </g>
        );
      })}
      <g opacity="0.5">
        {[60, 200, 320].map((x, i) => (
          <path
            key={x}
            d={`M${x} 60 q10 -20 -5 -40 q15 10 25 -10 q5 25 -10 35`}
            fill="#2a1f12"
            opacity={0.6 - i * 0.15}
          />
        ))}
      </g>
    </svg>
  );
}

export function MyceliumLossArt() {
  return (
    <svg viewBox="0 0 400 220" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="mc-soil" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#2a1810" />
          <stop offset="45%" stopColor="#1a0f08" />
          <stop offset="100%" stopColor="#0a0604" />
        </linearGradient>
        <linearGradient id="mc-dead" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#3a2a18" />
          <stop offset="100%" stopColor="#1a120a" />
        </linearGradient>
      </defs>
      <rect width="400" height="220" fill="url(#mc-soil)" />
      <rect y="0" width="400" height="55" fill="url(#mc-dead)" />
      <line x1="0" y1="55" x2="400" y2="55" stroke="#c4a86a" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.45" />
      <text x="12" y="48" fill="#c4a86a" opacity="0.7" fontSize="9" fontFamily="ui-monospace, monospace" letterSpacing="2">
        0—15 CM
      </text>
      <g stroke="#b6d77a" strokeWidth="0.7" fill="none" opacity="0.85">
        <path d="M30 130 q40 -20 80 -8 q35 10 70 -5 q30 -12 70 8 q35 18 70 -10 q25 -10 50 5" />
        <path d="M50 165 q35 -8 70 4 q40 14 85 -6 q35 -14 75 6 q30 14 60 -2" />
        <path d="M20 195 q50 -5 95 6 q35 10 75 -4 q40 -14 80 6 q40 16 80 -8" />
        <path d="M40 130 l-6 22 l10 14 m-4 -36 l14 18 l-2 18" opacity="0.55" />
        <path d="M120 145 l-8 18 l12 16 m-4 -32 l10 14" opacity="0.55" />
        <path d="M220 138 l-10 24 m4 -24 l16 22" opacity="0.55" />
        <path d="M310 142 l-12 22 l8 16 m4 -38 l12 20" opacity="0.55" />
      </g>
      <g fill="#b6d77a" opacity="0.9">
        <circle cx="40" cy="130" r="2" />
        <circle cx="120" cy="145" r="2.2" />
        <circle cx="220" cy="138" r="2.4" />
        <circle cx="310" cy="142" r="2" />
        <circle cx="80" cy="165" r="1.6" />
        <circle cx="180" cy="170" r="1.6" />
        <circle cx="280" cy="168" r="1.6" />
        <circle cx="60" cy="195" r="1.4" />
        <circle cx="160" cy="200" r="1.4" />
        <circle cx="260" cy="200" r="1.4" />
      </g>
      <g stroke="#c64a14" strokeWidth="0.6" fill="none" opacity="0.7">
        <path d="M70 28 l8 -10 m4 8 l10 -6 m-4 12 l14 -4" />
        <path d="M180 22 l6 -12 m6 8 l10 -8 m-4 16 l16 -2" />
        <path d="M290 30 l10 -10 m-2 14 l12 -6 m-6 14 l14 -2" />
      </g>
      <g fill="#c64a14" opacity="0.85">
        <circle cx="78" cy="32" r="2.4" />
        <circle cx="195" cy="28" r="2.6" />
        <circle cx="305" cy="35" r="2.4" />
        <circle cx="135" cy="40" r="1.8" />
        <circle cx="250" cy="38" r="1.8" />
        <circle cx="350" cy="34" r="2" />
      </g>
    </svg>
  );
}

export function LonelySaplingArt() {
  return (
    <svg viewBox="0 0 400 220" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="ls-sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#1a2014" />
          <stop offset="100%" stopColor="#0c1208" />
        </linearGradient>
        <linearGradient id="ls-soil" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#1a120a" />
          <stop offset="100%" stopColor="#0a0805" />
        </linearGradient>
      </defs>
      <rect width="400" height="220" fill="url(#ls-sky)" />
      <rect y="110" width="400" height="110" fill="url(#ls-soil)" />
      <line x1="0" y1="110" x2="400" y2="110" stroke="#3a2a18" strokeWidth="0.6" opacity="0.6" />
      <g transform="translate(200 110)">
        <path
          d="M0 0 L0 -55"
          stroke="#6a4a28"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <g fill="#7a9648" opacity="0.95">
          <ellipse cx="0" cy="-58" rx="14" ry="8" />
          <ellipse cx="-6" cy="-50" rx="10" ry="6" />
          <ellipse cx="6" cy="-50" rx="10" ry="6" />
          <ellipse cx="0" cy="-44" rx="13" ry="6" />
        </g>
        <g stroke="#6a4a28" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.9">
          <path d="M0 2 l-8 12 l-4 10" />
          <path d="M0 2 l8 12 l4 10" />
          <path d="M0 2 l-2 18 l-1 12" />
          <path d="M0 2 l3 14 l1 10" />
        </g>
        <g stroke="#3a2a18" strokeWidth="0.6" fill="none" opacity="0.35" strokeDasharray="2 3">
          <path d="M-12 22 l-30 8 l-25 14" />
          <path d="M12 22 l30 8 l25 14" />
          <path d="M-4 32 l-50 18 l-40 22" />
          <path d="M4 32 l50 18 l40 22" />
          <path d="M-15 25 l-70 6" />
          <path d="M15 25 l70 6" />
        </g>
      </g>
      <g fill="#3a2a18" opacity="0.5">
        <circle cx="60" cy="160" r="1.5" />
        <circle cx="90" cy="180" r="1" />
        <circle cx="130" cy="170" r="1.2" />
        <circle cx="280" cy="175" r="1.4" />
        <circle cx="320" cy="160" r="1" />
        <circle cx="350" cy="180" r="1.2" />
      </g>
      <g stroke="#c4a86a" strokeWidth="0.5" opacity="0.4" strokeDasharray="3 4">
        <line x1="40" y1="200" x2="160" y2="200" />
        <line x1="240" y1="200" x2="360" y2="200" />
      </g>
    </svg>
  );
}
