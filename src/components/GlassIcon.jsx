function GlassIcon({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      role="img"
      aria-label="Glass icon"
    >
      <path d="M17 13h30l-4 35-11 7-11-7-4-35Z" fill="url(#glass-fill)" fillOpacity=".38" />
      <path d="M17 13h30l-4 35-11 7-11-7-4-35Z" stroke="url(#glass-edge)" strokeWidth="1.6" />
      <path d="m20 34 23-5-1.4 17L32 52l-9.8-6.2L20 34Z" fill="url(#glass-liquid)" fillOpacity=".75" />
      <path d="m22 18 2.5 23M44 17l-2 12" stroke="white" strokeOpacity=".76" strokeWidth="1.2" strokeLinecap="round" />
      <path d="m12 11 1.2 3.2 3.3 1.2-3.3 1.2-1.2 3.3-1.2-3.3L7.5 15.4l3.3-1.2L12 11Z" fill="white" fillOpacity=".85" />
      <defs>
        <linearGradient id="glass-fill" x1="19" y1="13"          x2="47" y2="53" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff" stopOpacity=".72" />
          <stop offset=".52" stopColor="#9ee7db" stopOpacity=".14" />
          <stop offset="1" stopColor="#fff" stopOpacity=".03" />
        </linearGradient>
        <linearGradient id="glass-edge" x1="18" y1="13" x2="45" y2="53" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff" />
          <stop offset=".55" stopColor="#b6fff1" stopOpacity=".45" />
          <stop offset="1" stopColor="#fff" stopOpacity=".85" />
        </linearGradient>
        <linearGradient id="glass-liquid" x1="20" y1="31" x2="43" y2="49" gradientUnits="userSpaceOnUse">
          <stop stopColor="#b2fff0" stopOpacity=".65" />
          <stop offset="1" stopColor="#70a9d5" stopOpacity=".18" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default GlassIcon;
