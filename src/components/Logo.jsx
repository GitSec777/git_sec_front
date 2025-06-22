import React from "react";

const Logo = ({ width = 200, height = 200 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
  >
    <style>
      {`
        @keyframes glitch {
          0% { transform: translate(0, 0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(2px, -2px); }
          60% { transform: translate(-2px, -2px); }
          80% { transform: translate(2px, 2px); }
          100% { transform: translate(0, 0); }
        }
        .logo-text { font-family: 'Courier New', monospace; font-weight: bold; font-size: 40px; }
        .glitch-effect { animation: glitch 0.5s infinite; }
      `}
    </style>

    <defs>
      <linearGradient id="maskGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#8B4513", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#D2691E", stopOpacity: 1 }} />
      </linearGradient>
    </defs>

    <rect width="100%" height="100%" fill="#000000" />

    {/* Mask shape */}
    <path
      d="M100 20 
         C 60 40, 40 80, 40 120 
         C 40 160, 60 180, 100 180 
         C 140 180, 160 160, 160 120 
         C 160 80, 140 40, 100 20 
         Z"
      fill="url(#maskGradient)"
      className="glitch-effect"
    />

    {/* Eyes */}
    <g className="glitch-effect">
      <text x="70" y="100" fill="#00ff00" className="logo-text">
        G
      </text>
      <text x="110" y="100" fill="#00ff00" className="logo-text">
        S
      </text>
    </g>

    {/* Mouth */}
    <path
      d="M70 140 
         C 90 160, 110 160, 130 140"
      stroke="#00ff00"
      strokeWidth="4"
      fill="none"
      className="glitch-effect"
    />

    {/* Decorative lines */}
    <g stroke="#00ff00" strokeWidth="2" opacity="0.5">
      <line x1="40" y1="60" x2="160" y2="60" />
      <line x1="30" y1="100" x2="170" y2="100" />
      <line x1="40" y1="140" x2="160" y2="140" />
    </g>

    {/* Border */}
    <rect
      x="10"
      y="10"
      width="180"
      height="180"
      fill="none"
      stroke="#00ff00"
      strokeWidth="4"
    />
  </svg>
);

export default Logo;
