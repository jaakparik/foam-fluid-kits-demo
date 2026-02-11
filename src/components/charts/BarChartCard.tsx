import { cn } from "@/lib/utils";

interface BarChartCardProps {
  title: string;
  subtitle: string;
  value: string;
  data: number[];
  color: string;
  className?: string;
}

function MiniBarChart({ data, color }: { data: number[]; color: string }) {
  const width = 120;
  const height = 48;
  const gap = 4;
  const barWidth = (width - gap * (data.length - 1)) / data.length;
  const max = Math.max(...data);
  const cssColor = `var(--${color})`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-full w-full"
      preserveAspectRatio="none"
    >
      {data.map((v, i) => {
        const barHeight = (v / max) * (height - 4);
        return (
          <rect
            key={i}
            x={i * (barWidth + gap)}
            y={height - barHeight}
            width={barWidth}
            height={barHeight}
            rx={barWidth / 4}
            fill={cssColor}
            fillOpacity={0.4 + (v / max) * 0.6}
          />
        );
      })}
    </svg>
  );
}

export function BarChartCard({
  title,
  subtitle,
  value,
  data,
  color,
  className,
}: BarChartCardProps) {
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
          <MiniBarChart data={data} color={color} />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <span className="text-2xl font-semibold text-foreground">{value}</span>
        <span className="text-sm text-secondary-foreground">{subtitle}</span>
      </div>
    </div>
  );
}
