import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FilterCardProps {
  icon: ReactNode;
  text: string;
  className?: string;
  onClick?: () => void;
}

export function FilterCard({
  icon,
  text,
  className,
  onClick,
}: FilterCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent cursor-pointer dark:border-white/5 dark:bg-white/5",
        className
      )}
    >
      <span className="text-icon-stroke [&>svg]:size-4">{icon}</span>
      <span>{text}</span>
    </button>
  );
}
