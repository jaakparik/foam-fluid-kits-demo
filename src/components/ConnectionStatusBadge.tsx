import { Check, Minus, X, Question } from "foamicons";
import { cn } from "@/lib/utils";
import type { PlatformConnectionStatus } from "@/data/talents";

interface ConnectionStatusBadgeProps {
  status: PlatformConnectionStatus;
  label?: string;
  showLabel?: boolean;
}

const config: Record<
  PlatformConnectionStatus,
  { icon: typeof Check; bg: string; iconClass: string }
> = {
  connected: { icon: Check, bg: "bg-lime-600", iconClass: "text-white !stroke-white" },
  expired: { icon: Minus, bg: "bg-amber-500", iconClass: "text-white !stroke-white" },
  not_connected: { icon: X, bg: "bg-red-600", iconClass: "text-white !stroke-white" },
  not_added: { icon: Question, bg: "bg-secondary", iconClass: "text-muted-foreground !stroke-muted-foreground" },
};

export function ConnectionStatusBadge({ status, label, showLabel = true }: ConnectionStatusBadgeProps) {
  if (status === "not_added" && !showLabel) return null;

  const { icon: Icon, bg, iconClass } = config[status];
  const isNotAdded = status === "not_added";
  const textClass = isNotAdded ? "text-muted-foreground" : "text-white";

  if (!showLabel) {
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center rounded size-5 shrink-0",
          bg,
        )}
      >
        <Icon className={cn("size-3", iconClass)} />
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center gap-0.5 rounded w-[35px] h-5 shrink-0",
        bg,
      )}
    >
      <Icon className={cn("size-3", iconClass)} />
      {label && (
        <span className={cn("text-[10px] font-medium leading-none", textClass)}>{label}</span>
      )}
    </span>
  );
}
