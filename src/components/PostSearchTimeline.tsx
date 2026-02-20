import { ChevronDown } from "foamicons";

interface TimelineMarker {
  id: number;
  position: number; // 0–100 percentage
  type: "visual" | "audio";
}

const TIMECODES = ["0:00", "1:00", "2:00", "3:00", "4:00", "5:00"];

const DEMO_MARKERS: TimelineMarker[] = [
  { id: 1, position: 9.4, type: "visual" },
  { id: 2, position: 18.1, type: "visual" },
  { id: 3, position: 25.5, type: "visual" },
  { id: 4, position: 42.0, type: "audio" },
  { id: 5, position: 70.1, type: "audio" },
  { id: 6, position: 80.2, type: "visual" },
];

// SVG waveform path — deterministic audio-style waveform
function buildWaveformPath(width: number, height: number, bars: number): string {
  const mid = height / 2;
  const step = width / bars;
  const points: string[] = [`M0,${mid}`];
  for (let i = 0; i < bars; i++) {
    const x = i * step + step / 2;
    const amp =
      (Math.sin(i * 0.4) * 0.3 +
        Math.sin(i * 0.15) * 0.4 +
        Math.sin(i * 1.1) * 0.15 +
        0.15) *
      mid;
    points.push(`L${x.toFixed(1)},${(mid - amp).toFixed(1)}`);
    points.push(`L${x.toFixed(1)},${(mid + amp).toFixed(1)}`);
    points.push(`L${x.toFixed(1)},${mid.toFixed(1)}`);
  }
  points.push(`L${width},${mid}`);
  return points.join(" ");
}

const WAVEFORM_PATH_FULL = buildWaveformPath(600, 48, 120);

const markerColors: Record<"visual" | "audio", { bg: string; border: string; ring: string }> = {
  visual: {
    bg: "bg-[#0ea5e9]/20",
    border: "border-[#0ea5e9]",
    ring: "ring-[#0ea5e9]",
  },
  audio: {
    bg: "bg-[#ed1389]/20",
    border: "border-[#ed1389]",
    ring: "ring-[#ed1389]",
  },
};

interface PostSearchTimelineProps {
  activeIndex?: number | null;
  onMarkerClick?: (index: number) => void;
  expanded?: boolean;
  onToggle?: () => void;
  children?: React.ReactNode;
}

export function PostSearchTimeline({ activeIndex, onMarkerClick, expanded = true, onToggle, children }: PostSearchTimelineProps) {
  const barHeight = expanded ? "h-12" : "h-1";
  const circleSize = expanded ? "size-4" : "size-2";
  const activeRingInset = expanded ? "inset-[-5px]" : "inset-[-4px]";
  const pinSize = expanded ? "w-3 h-3" : "w-2 h-2";

  return (
    <div className="mt-6">
      <button
        className="flex w-full items-center justify-between cursor-pointer"
        onClick={onToggle}
      >
        <h3 className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
          Timeline
        </h3>
        <ChevronDown
          className={`size-4 text-muted-foreground transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
        />
      </button>

      <div className="mt-3 rounded-lg border border-border p-4">
        {/* Timecodes row — only in expanded mode */}
        {expanded && (
          <div className="mb-2 flex justify-between font-mono text-[10px] text-muted-foreground">
            {TIMECODES.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        )}

        {/* Timeline bar */}
        <div className={`relative ${barHeight} rounded-md bg-brand-tint transition-[height] duration-300 ${expanded ? "" : "overflow-visible"}`}>
          {/* Waveform SVG — only in expanded mode */}
          {expanded && (
            <svg
              className="absolute inset-0 size-full opacity-20"
              viewBox="0 0 600 48"
              preserveAspectRatio="none"
            >
              <path
                d={WAVEFORM_PATH_FULL}
                fill="none"
                className="stroke-muted-foreground"
                strokeWidth="1.5"
              />
            </svg>
          )}

          {/* Playhead pin */}
          {activeIndex != null && (
            <div
              className="absolute top-0 h-full z-20 transition-[left] duration-300 ease-in-out -translate-x-1/2"
              style={{ left: `${DEMO_MARKERS[activeIndex].position}%` }}
            >
              <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 ${pinSize} rounded-full bg-[#0ea5e9]`} />
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-[#0ea5e9]" />
            </div>
          )}

          {/* Result markers */}
          {DEMO_MARKERS.map((marker, i) => {
            const colors = markerColors[marker.type];
            const isActive = activeIndex === i;
            return (
              <button
                key={marker.id}
                className="absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform hover:scale-125"
                style={{ left: `${marker.position}%` }}
                onClick={() => onMarkerClick?.(i)}
              >
                {isActive && (
                  <div
                    className={`absolute ${activeRingInset} rounded-full border-2 ${colors.border} opacity-50`}
                  />
                )}
                <div
                  className={`${circleSize} rounded-full border-2 ${colors.border} ${colors.bg}`}
                />
              </button>
            );
          })}
        </div>

        {/* Expanded content (thumbnails, explanation) */}
        {expanded && children}
      </div>
    </div>
  );
}
