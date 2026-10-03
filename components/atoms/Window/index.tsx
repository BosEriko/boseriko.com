import { ReactNode } from "react";

interface WindowProps {
  label?: string;
  className?: string;
  children: ReactNode;
}

const Window: React.FC<WindowProps> = ({ label, className, children }) => {
  return (
    <div className={`rounded-sm border-2 border-ink bg-ink ${className ?? ""}`}>
      <div className="flex items-center gap-1.5 px-2.5 py-2">
        <span className="h-1.5 w-1.5 bg-paper/25" />
        <span className="h-1.5 w-1.5 bg-paper/25" />
        <span className="h-1.5 w-1.5 bg-brand" />
        <span className="ml-2 truncate font-mono text-[10px] lowercase tracking-wider text-paper/60 transition-colors group-hover:text-paper">
          {label}
        </span>
      </div>
      {children}
    </div>
  );
};

export default Window;
