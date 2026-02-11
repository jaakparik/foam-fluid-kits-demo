import { useId } from "react";
import { cn } from "@/lib/utils";

interface ChartCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  data: number[];
  color: string;
  className?: string;
}

function Sparkline({
  data,
  color,
  gradientId,
}: {
  data: number[];
  color: string;
  gradientId: string;
}) {
  const width = 120;
  const height = 48;
  const pad = 2;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data.map((v, i) => ({
    x: pad + (i / (data.length - 1)) * (width - pad * 2),
    y: pad + (1 - (v - min) / range) * (height - pad * 2),
  }));

  // Build smooth cubic bezier path
  let line = `M${points[0].x},${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const curr = points[i];
    const next = points[i + 1];
    const tension = 0.3;
    const dx = next.x - curr.x;
    const cp1x = curr.x + dx * tension;
    const cp2x = next.x - dx * tension;
    line += ` C${cp1x},${curr.y} ${cp2x},${next.y} ${next.x},${next.y}`;
  }

  const area = `${line} L${points.at(-1)!.x},${height} L${points[0].x},${height} Z`;
  const cssColor = `var(--${color})`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-full w-full"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={cssColor} stopOpacity={0.2} />
          <stop offset="100%" stopColor={cssColor} stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gradientId})`} />
      <path
        d={line}
        fill="none"
        stroke={cssColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChartCard({
  title,
  value,
  change,
  isPositive,
  data,
  color,
  className,
}: ChartCardProps) {
  const gradientId = useId();

  return (
    <div
      className={cn(
        "flex flex-col justify-between rounded-xl border border-border bg-card p-4 dark:border-white/5 dark:bg-white/5",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="text-sm font-light text-muted-foreground">
          {title}
        </span>
        <div className="h-10 w-1/2">
          <Sparkline data={data} color={color} gradientId={gradientId} />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <span className="text-2xl font-semibold text-foreground">{value}</span>
        <div
          className={cn(
            "flex items-center gap-1.5 text-sm",
            isPositive ? "text-secondary-foreground" : "text-destructive"
          )}
        >
          <span className="text-[10px]">
            {isPositive ? "\u25B2" : "\u25BC"}
          </span>
          <span>{change}</span>
        </div>
      </div>
    </div>
  );
}
