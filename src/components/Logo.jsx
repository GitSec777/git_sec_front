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
        .logo-text { font-family: 'Courier New', monospace; font-weight: bold; font-size: 80px; }
        .glitch-effect { animation: glitch 0.5s infinite; }
      `}
    </style>

    <defs>
      <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#00ff00", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#008000", stopOpacity: 1 }} />
      </linearGradient>
    </defs>

    <rect width="100%" height="100%" fill="#000000" />

    <g className="glitch-effect">
      <text x="50" y="120" fill="url(#neonGradient)" className="logo-text">
        GS
      </text>
      <path
        d="M140,80 v40 h30 v-40 h-30 M140,100 h30"
        stroke="url(#neonGradient)"
        strokeWidth="8"
        fill="none"
      />
    </g>

    <circle cx="155" cy="90" r="5" fill="#00ff00" className="glitch-effect" />

    <rect
      x="0"
      y="0"
      width="200"
      height="200"
      fill="none"
      stroke="#00ff00"
      strokeWidth="4"
    />

    <line
      x1="0"
      y1="0"
      x2="200"
      y2="200"
      stroke="#00ff00"
      strokeWidth="2"
      opacity="0.5"
    />
    <line
      x1="200"
      y1="0"
      x2="0"
      y2="200"
      stroke="#00ff00"
      strokeWidth="2"
      opacity="0.5"
    />
  </svg>
);

export default Logo;
