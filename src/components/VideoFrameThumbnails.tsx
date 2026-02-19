import { useEffect, useRef } from "react";
import { Eye, AudioLines } from "foamicons";
import { cn } from "@/lib/utils";

interface FrameMarker {
  /** Timestamp in seconds */
  time: number;
  type: "visual" | "audio";
  description: string;
}

interface VideoFrameThumbnailsProps {
  videoUrl: string;
  markers: FrameMarker[];
  activeIndex?: number | null;
  onSeek?: (time: number, index: number) => void;
}

const badgeConfig = {
  visual: { icon: Eye, bg: "bg-[#0ea5e9]", ring: "ring-[#0ea5e9]", text: "text-[#0ea5e9]", shadow: "shadow-[0_0_8px_rgba(14,165,233,0.4)]", descBg: "bg-brand-tint" },
  audio: { icon: AudioLines, bg: "bg-[#ed1389]", ring: "ring-[#ed1389]", text: "text-[#ed1389]", shadow: "shadow-[0_0_8px_rgba(237,19,137,0.4)]", descBg: "bg-brand-tint" },
};

/** A single video element paused at a specific timestamp, used as a thumbnail */
function VideoThumb({
  url,
  time,
}: {
  url: string;
  time: number;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    function seekToTime() {
      if (video) video.currentTime = time;
    }

    if (video.readyState >= 2) {
      seekToTime();
    } else {
      video.addEventListener("loadeddata", seekToTime, { once: true });
    }

    return () => {
      video.removeEventListener("loadeddata", seekToTime);
    };
  }, [url, time]);

  return (
    <video
      ref={ref}
      src={`${url}#t=${time}`}
      muted
      playsInline
      preload="auto"
      className="size-full object-cover transition-transform duration-200 hover:scale-105"
    />
  );
}

export function VideoFrameThumbnails({
  videoUrl,
  markers,
  activeIndex,
  onSeek,
}: VideoFrameThumbnailsProps) {
  const activeMarker = activeIndex != null ? markers[activeIndex] : null;
  const activeBadge = activeMarker ? badgeConfig[activeMarker.type] : null;

  return (
    <>
      {/* Thumbnail grid */}
      <div className="mt-3 flex gap-3">
        {markers.map((marker, i) => {
          const { icon: Icon, bg, ring, shadow } = badgeConfig[marker.type];
          const isActive = activeIndex === i;
          return (
            <div
              key={i}
              className={cn(
                "relative w-[68px] h-[120px] shrink-0 rounded-md cursor-pointer transition-all duration-200",
                "ring-2 ring-[#99A1AF]/20",
                isActive && `${ring} ${shadow}`,
              )}
              onClick={() => onSeek?.(marker.time, i)}
            >
              <div className="size-full overflow-hidden rounded-[inherit]">
                <VideoThumb url={videoUrl} time={marker.time} />
              </div>
              <div
                className={`absolute top-1 right-1 flex items-center justify-center size-5 rounded-full ${bg}`}
              >
                <Icon className="size-3 text-white" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Active frame description */}
      {activeMarker && activeBadge && (
        <div className={cn("mt-3 flex items-start gap-2 rounded-lg p-3", activeBadge.descBg)}>
          {(() => {
            const Icon = badgeConfig[activeMarker.type].icon;
            return <Icon className={`size-4 shrink-0 mt-0.5 ${activeBadge.text}`} />;
          })()}
          <p className="text-sm text-foreground leading-relaxed">
            {activeMarker.description}
          </p>
        </div>
      )}
    </>
  );
}
