export function Vial() {
  return (
    <div className="relative w-full max-w-sm mx-auto">
      <svg viewBox="0 0 200 320" className="w-full drop-shadow-[0_25px_50px_rgba(0,212,255,0.25)]">
        <defs>
          <linearGradient id="glass" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#dceaf5" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#a9c2d8" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="liquid" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#0072a8" stopOpacity="0.95" />
          </linearGradient>
        </defs>
        {/* cap */}
        <rect x="70" y="20" width="60" height="22" rx="3" fill="#1A2A40" />
        <rect x="64" y="38" width="72" height="14" rx="2" fill="#243A56" />
        <rect x="60" y="50" width="80" height="10" rx="2" fill="#00D4FF" opacity="0.85" />
        {/* body */}
        <rect x="55" y="60" width="90" height="240" rx="10" fill="url(#glass)" opacity="0.18" stroke="rgba(255,255,255,0.35)" />
        {/* liquid */}
        <rect x="60" y="180" width="80" height="115" rx="6" fill="url(#liquid)" />
        {/* label */}
        <rect x="55" y="120" width="90" height="80" fill="#0B1829" stroke="#00D4FF" />
        <text x="100" y="148" textAnchor="middle" fill="#FFFFFF" fontFamily="Sora" fontWeight="700" fontSize="14">PureLab</text>
        <text x="100" y="166" textAnchor="middle" fill="#00D4FF" fontFamily="DM Sans" fontSize="9">BPC-157 · 5mg</text>
        <text x="100" y="184" textAnchor="middle" fill="#8BA3BC" fontFamily="DM Sans" fontSize="7">99.2% HPLC · Batch BPC0426A</text>
        {/* highlight */}
        <rect x="62" y="65" width="10" height="225" rx="5" fill="#ffffff" opacity="0.18" />
      </svg>
    </div>
  );
}
