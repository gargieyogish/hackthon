import React from 'react';

export const MysuruPalaceSkyline: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative w-full overflow-hidden select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 320 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto opacity-75 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]"
      >
        <defs>
          <linearGradient id="palaceGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#0d9488" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Palace base ground line */}
        <line x1="0" y1="88" x2="320" y2="88" stroke="url(#palaceGlow)" strokeWidth="1.5" strokeDasharray="3 3" />

        {/* Main Central Grand Dome */}
        <path
          d="M 160 12 
             C 155 24, 142 32, 142 46 
             L 178 46 
             C 178 32, 165 24, 160 12 Z"
          stroke="url(#palaceGlow)"
          strokeWidth="1.2"
          fill="none"
        />
        {/* Central Finial spire */}
        <line x1="160" y1="4" x2="160" y2="12" stroke="url(#palaceGlow)" strokeWidth="1.5" />
        <circle cx="160" cy="4" r="1.5" fill="#10b981" />

        {/* Central Tower arches */}
        <rect x="146" y="46" width="28" height="42" stroke="url(#palaceGlow)" strokeWidth="1" fill="none" />
        <path d="M 152 62 A 8 8 0 0 1 168 62 L 168 88 L 152 88 Z" stroke="url(#palaceGlow)" strokeWidth="0.8" fill="none" />
        <path d="M 155 52 A 5 5 0 0 1 165 52 L 165 58 L 155 58 Z" stroke="url(#palaceGlow)" strokeWidth="0.8" fill="none" />

        {/* Flanking Octagonal Domes - Left */}
        <path
          d="M 115 28 
             C 111 36, 102 42, 102 52 
             L 128 52 
             C 128 42, 119 36, 115 28 Z"
          stroke="url(#palaceGlow)"
          strokeWidth="1"
          fill="none"
        />
        <line x1="115" y1="22" x2="115" y2="28" stroke="url(#palaceGlow)" strokeWidth="1.2" />
        <rect x="106" y="52" width="18" height="36" stroke="url(#palaceGlow)" strokeWidth="0.8" fill="none" />
        <path d="M 110 64 A 5 5 0 0 1 120 64 L 120 88 L 110 88 Z" stroke="url(#palaceGlow)" strokeWidth="0.7" fill="none" />

        {/* Flanking Octagonal Domes - Right */}
        <path
          d="M 205 28 
             C 201 36, 192 42, 192 52 
             L 218 52 
             C 218 42, 209 36, 205 28 Z"
          stroke="url(#palaceGlow)"
          strokeWidth="1"
          fill="none"
        />
        <line x1="205" y1="22" x2="205" y2="28" stroke="url(#palaceGlow)" strokeWidth="1.2" />
        <rect x="196" y="52" width="18" height="36" stroke="url(#palaceGlow)" strokeWidth="0.8" fill="none" />
        <path d="M 200 64 A 5 5 0 0 1 210 64 L 210 88 L 200 88 Z" stroke="url(#palaceGlow)" strokeWidth="0.7" fill="none" />

        {/* Intermediate Chhatris and Arches - Left */}
        <path d="M 130 42 C 130 38, 138 38, 138 42 L 138 52 L 130 52 Z" stroke="url(#palaceGlow)" strokeWidth="0.8" />
        <line x1="134" y1="38" x2="134" y2="42" stroke="url(#palaceGlow)" strokeWidth="0.8" />
        <rect x="128" y="52" width="18" height="36" stroke="url(#palaceGlow)" strokeWidth="0.8" fill="none" />
        <path d="M 132 66 A 5 5 0 0 1 142 66 L 142 88 L 132 88 Z" stroke="url(#palaceGlow)" strokeWidth="0.7" fill="none" />

        {/* Intermediate Chhatris and Arches - Right */}
        <path d="M 182 42 C 182 38, 190 38, 190 42 L 190 52 L 182 52 Z" stroke="url(#palaceGlow)" strokeWidth="0.8" />
        <line x1="186" y1="38" x2="186" y2="42" stroke="url(#palaceGlow)" strokeWidth="0.8" />
        <rect x="174" y="52" width="18" height="36" stroke="url(#palaceGlow)" strokeWidth="0.8" fill="none" />
        <path d="M 178 66 A 5 5 0 0 1 188 66 L 188 88 L 178 88 Z" stroke="url(#palaceGlow)" strokeWidth="0.7" fill="none" />

        {/* Outer Corner Minaret / Dome Towers - Far Left */}
        <path d="M 68 38 C 65 44, 58 48, 58 56 L 78 56 C 78 48, 71 44, 68 38 Z" stroke="url(#palaceGlow)" strokeWidth="0.9" />
        <line x1="68" y1="32" x2="68" y2="38" stroke="url(#palaceGlow)" strokeWidth="1" />
        <rect x="61" y="56" width="14" height="32" stroke="url(#palaceGlow)" strokeWidth="0.8" fill="none" />
        <path d="M 64 68 A 4 4 0 0 1 72 68 L 72 88 L 64 88 Z" stroke="url(#palaceGlow)" strokeWidth="0.6" fill="none" />

        {/* Outer Corridor - Far Left */}
        <rect x="25" y="64" width="36" height="24" stroke="url(#palaceGlow)" strokeWidth="0.8" fill="none" />
        <path d="M 30 72 A 4 4 0 0 1 38 72 L 38 88 L 30 88 Z" stroke="url(#palaceGlow)" strokeWidth="0.6" fill="none" />
        <path d="M 44 72 A 4 4 0 0 1 52 72 L 52 88 L 44 88 Z" stroke="url(#palaceGlow)" strokeWidth="0.6" fill="none" />
        <path d="M 35 56 C 35 52, 45 52, 45 56 L 47 64 L 33 64 Z" stroke="url(#palaceGlow)" strokeWidth="0.7" />

        {/* Outer Corner Minaret / Dome Towers - Far Right */}
        <path d="M 252 38 C 249 44, 242 48, 242 56 L 262 56 C 262 48, 255 44, 252 38 Z" stroke="url(#palaceGlow)" strokeWidth="0.9" />
        <line x1="252" y1="32" x2="252" y2="38" stroke="url(#palaceGlow)" strokeWidth="1" />
        <rect x="245" y="56" width="14" height="32" stroke="url(#palaceGlow)" strokeWidth="0.8" fill="none" />
        <path d="M 248 68 A 4 4 0 0 1 256 68 L 256 88 L 248 88 Z" stroke="url(#palaceGlow)" strokeWidth="0.6" fill="none" />

        {/* Outer Corridor - Far Right */}
        <rect x="259" y="64" width="36" height="24" stroke="url(#palaceGlow)" strokeWidth="0.8" fill="none" />
        <path d="M 268 72 A 4 4 0 0 1 276 72 L 276 88 L 268 88 Z" stroke="url(#palaceGlow)" strokeWidth="0.6" fill="none" />
        <path d="M 282 72 A 4 4 0 0 1 290 72 L 290 88 L 282 88 Z" stroke="url(#palaceGlow)" strokeWidth="0.6" fill="none" />
        <path d="M 275 56 C 275 52, 285 52, 285 56 L 287 64 L 273 64 Z" stroke="url(#palaceGlow)" strokeWidth="0.7" />

        {/* Connecting ornamental parapets */}
        <path d="M 78 64 L 102 64 M 218 64 L 242 64" stroke="url(#palaceGlow)" strokeWidth="0.8" strokeDasharray="2 2" />
      </svg>
    </div>
  );
};
