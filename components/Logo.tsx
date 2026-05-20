export default function Logo({ className = 'h-7 w-auto' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        viewBox="0 0 40 40"
        className="h-full w-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <line x1="8" y1="20" x2="20" y2="10" />
          <line x1="20" y1="10" x2="32" y2="20" />
          <line x1="8" y1="20" x2="20" y2="30" />
          <line x1="20" y1="30" x2="32" y2="20" />
          <line x1="20" y1="10" x2="20" y2="30" />
          <line x1="8" y1="20" x2="32" y2="20" />
        </g>
        <g fill="currentColor">
          <circle cx="20" cy="10" r="2.6" />
          <circle cx="8" cy="20" r="2.2" />
          <circle cx="32" cy="20" r="2.2" />
          <circle cx="20" cy="30" r="2.6" />
          <circle cx="20" cy="20" r="1.6" opacity="0.6" />
        </g>
      </svg>
      <span className="font-display text-lg font-medium tracking-tight">SporeNet</span>
    </div>
  );
}
