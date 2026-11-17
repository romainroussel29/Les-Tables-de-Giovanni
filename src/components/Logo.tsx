interface LogoProps {
  light?: boolean;
}

export default function Logo({ light = false }: LogoProps) {
  return (
    <span className={`logo${light ? " logo--light" : ""}`}>
      <svg className="logo__mark" viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r="30" fill="currentColor" />
        <circle cx="32" cy="32" r="25" fill="none" stroke="var(--gold)" strokeWidth="1.5" />
        <text
          x="32"
          y="42"
          textAnchor="middle"
          fontFamily="'Cormorant Garamond', Georgia, serif"
          fontSize="30"
          fontStyle="italic"
          fontWeight="600"
          fill="var(--cream)"
        >
          G
        </text>
      </svg>
      <span className="logo__text">
        <span className="logo__small">Les Tables de</span>
        <span className="logo__big">Giovanni</span>
      </span>
    </span>
  );
}
