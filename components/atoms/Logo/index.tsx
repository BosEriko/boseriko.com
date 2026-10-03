interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 16 16"
      shapeRendering="crispEdges"
      role="img"
      aria-label="Bos Eriko"
      className={className}
    >
      <rect width="16" height="16" rx="2" className="fill-ink" />
      <path
        d="M9 2h2v2h-2zM11 4h2v3h-2zM8 7h3v2h-3zM11 9h2v3h-2zM9 12h2v2h-2z"
        className="fill-paper"
      />
      <path
        d="M3 2h2v12h-2zM5 2h4v2h-4zM5 7h3v2h-3zM5 12h4v2h-4z"
        className="fill-brand"
      />
    </svg>
  );
};

export default Logo;
