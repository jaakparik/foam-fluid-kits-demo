import { useEffect, useRef, useState } from "react";
import {
  X,
  ChevronUp,
  ChevronDown,
  Bookmark,
  Target,
  Upload,
  ExternalLink,
  Info,
  QuotationMarkLeft,
  QuotationMarkRight,
  LogoFilePdf,
  PlayFill,
  LayoutRowsFill,
} from "foamicons";
import { Button } from "@/components/ui/button";
import { MediaCheckbox } from "@/components/MediaCheckbox";
import { PlatformLogo } from "@/components/PlatformLogo";
import {
  platformMetricsConfig,
  type MetricSection,
} from "@/data/platformMetrics";
import { Eye, AudioLines } from "foamicons";
import { PostSearchTimeline } from "@/components/PostSearchTimeline";
import { VideoFrameThumbnails } from "@/components/VideoFrameThumbnails";
import whistlinAvatar from "@/assets/whistlin.jpg";
import type { Post } from "@/data/posts";

interface PostSearchDetailModalProps {
  post: Post;
  isSelected: boolean;
  onSelectChange: (selected: boolean) => void;
  onClose: () => void;
  onPrev: (() => void) | null;
  onNext: (() => void) | null;
}

function getScoreLabel(score: number): string {
  if (score >= 90) return "Excellent match";
  if (score >= 85) return "Great match";
  if (score >= 75) return "Good match";
  return "Fair match";
}

const platformLabel: Record<string, string> = {
  tiktok: "TikTok",
  instagram: "Instagram",
  youtube: "YouTube",
  snap: "Snapchat",
};

function MetricSectionRow({ section, post }: { section: MetricSection; post: Post }) {
  if (section.type === "row") {
    const { icon: Icon, label, getValue } = section.row;
    return (
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center gap-2">
          <Icon className="size-4 text-icon-stroke-muted" />
          <span className="text-sm text-foreground">{label}</span>
        </div>
        <span className="font-mono text-sm text-foreground">{getValue(post)}</span>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border">
      {section.rows.map((row, i) => {
        const Icon = row.icon;
        return (
          <div
            key={i}
            className="flex items-center justify-between px-3 py-2"
          >
            <div className="flex items-center gap-2">
              <Icon className="size-4 text-icon-stroke-muted" />
              <span className="text-sm text-foreground">{row.label}</span>
            </div>
            <span className="font-mono text-sm text-foreground">
              {row.getValue(post)}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function PostSearchDetailModal({
  post,
  isSelected,
  onSelectChange,
  onClose,
  onPrev,
  onNext,
}: PostSearchDetailModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const config = platformMetricsConfig[post.platform];
  const [isLandscape, setIsLandscape] = useState(false);
  const [activeFrameIndex, setActiveFrameIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [timelineExpanded, setTimelineExpanded] = useState(true);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowUp" && onPrev) onPrev();
      if (e.key === "ArrowDown" && onNext) onNext();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    if (post.video && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [post]);

  function handleVideoMetadata() {
    if (videoRef.current) {
      const { videoWidth, videoHeight } = videoRef.current;
      setIsLandscape(videoWidth > videoHeight);
    }
  }

  function handleImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    setIsLandscape(naturalWidth > naturalHeight);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex bg-background/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative flex size-full m-4 overflow-hidden rounded-xl bg-background"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className="absolute top-4 left-4 z-10 flex items-center justify-center size-9 rounded-full bg-secondary hover:bg-secondary/80 cursor-pointer transition-colors"
          onClick={onClose}
        >
          <X className="size-5 text-foreground" />
        </button>

        {/* Left: Media panel */}
        <div
          className={
            isLandscape && !post.video
              ? "relative flex-1 min-w-0 flex items-center justify-end bg-background"
              : "relative w-1/2 flex items-center justify-center bg-background"
          }
        >
          {post.video ? (
            <div
              className="group/video relative h-full aspect-[11/16] cursor-pointer"
              onClick={() => {
                if (videoRef.current) {
                  if (isPlaying) {
                    videoRef.current.pause();
                    setIsPlaying(false);
                  } else {
                    videoRef.current.play().catch(() => {});
                    setIsPlaying(true);
                  }
                }
              }}
            >
              <video
                ref={videoRef}
                src={post.video}
                muted
                loop
                playsInline
                onLoadedMetadata={handleVideoMetadata}
                className="size-full object-cover"
              />
              {/* Play/Pause overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/video:opacity-100 transition-opacity">
                <div className="flex items-center justify-center size-16 rounded-full bg-black/50">
                  {isPlaying ? (
                    <LayoutRowsFill className="size-8 text-white rotate-90" />
                  ) : (
                    <PlayFill className="size-8 text-white" />
                  )}
                </div>
              </div>
            </div>
          ) : (
            <img
              src={post.thumbnail}
              alt=""
              onLoad={handleImageLoad}
              className={
                isLandscape
                  ? "w-full h-auto max-h-full object-contain"
                  : "h-full w-auto max-w-full object-contain"
              }
            />
          )}

          {/* Checkbox overlay — hidden for now */}
          {/* <div className="absolute top-4 right-4 z-10">
            <MediaCheckbox
              checked={isSelected}
              onCheckedChange={(checked) => onSelectChange(checked)}
            />
          </div> */}

          {/* Navigation arrows */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
            <button
              className="flex items-center justify-center size-9 rounded-full bg-secondary hover:bg-secondary/80 cursor-pointer transition-colors disabled:opacity-30 disabled:cursor-default"
              onClick={onPrev ?? undefined}
              disabled={!onPrev}
            >
              <ChevronUp className="size-5 text-foreground" />
            </button>
            <button
              className="flex items-center justify-center size-9 rounded-full bg-secondary hover:bg-secondary/80 cursor-pointer transition-colors disabled:opacity-30 disabled:cursor-default"
              onClick={onNext ?? undefined}
              disabled={!onNext}
            >
              <ChevronDown className="size-5 text-foreground" />
            </button>
          </div>
        </div>

        {/* Right: Detail panel */}
        <div
          className={
            isLandscape && !post.video
              ? "flex flex-col w-[440px] min-w-[440px] shrink-0 border-l border-border"
              : "flex flex-col w-1/2 border-l border-border"
          }
        >
          <div className="flex-1 overflow-auto p-6 max-w-[700px]">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={whistlinAvatar}
                  alt=""
                  className="size-10 rounded-full object-cover"
                />
                <span className="font-medium text-foreground">
                  Whistling Gasoline
                </span>
              </div>
              <div className="flex items-center gap-2">
                <PlatformLogo platform={post.platform} size={20} />
                <span className="text-sm text-foreground">
                  {platformLabel[post.platform]}
                </span>
                <ExternalLink className="size-4 text-icon-stroke-muted cursor-pointer hover:text-foreground transition-colors" />
              </div>
            </div>

            {/* Analysis */}
            {post.score > 0 && (
              <div className="mt-6">
                <h3 className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                  Analysis
                </h3>
                <div className="mt-3 flex gap-3 items-start">
                  <div className="flex items-center justify-center size-12 shrink-0 rounded-full bg-brand text-white font-semibold text-lg">
                    {post.score}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground">
                      {getScoreLabel(post.score)}{" "}
                      <span className="text-muted-foreground font-normal">
                        ({post.score}/100)
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                      {post.analysisText}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1.5 shrink-0">
                    <div className="flex items-center gap-1.5 rounded-full bg-[#0ea5e9] px-2.5 py-1">
                      <Eye className="size-4 text-white" />
                      <span className="text-xs font-medium text-white/70">4</span>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-full bg-[#ed1389] px-2.5 py-1">
                      <AudioLines className="size-4 text-white" />
                      <span className="text-xs font-medium text-white/70">2</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Timeline */}
            <PostSearchTimeline
              activeIndex={activeFrameIndex}
              expanded={timelineExpanded}
              onToggle={() => setTimelineExpanded((v) => !v)}
              onMarkerClick={(index) => {
                setActiveFrameIndex(index);
                if (!timelineExpanded) setTimelineExpanded(true);
                const times = [2.81, 5.44, 7.65, 12.61, 21.03, 24.05];
                if (videoRef.current) {
                  videoRef.current.currentTime = times[index];
                  if (isPlaying) videoRef.current.play().catch(() => {});
                }
              }}
            >
              {post.video && (
                <VideoFrameThumbnails
                  videoUrl={post.video}
                  activeIndex={activeFrameIndex}
                  markers={[
                    { time: 2.81, type: "visual", description: "Visual find: Nike shoe" },
                    { time: 5.44, type: "visual", description: "Visual find: Nike shoe" },
                    { time: 7.65, type: "visual", description: "Visual find: Nike sneaker" },
                    { time: 12.61, type: "audio", description: "Transcript: Alright, these are the Nike hyper-limited editions, retail was insane and resale is even crazier..." },
                    { time: 21.03, type: "audio", description: "Transcript: You can still smell the fresh leather, the stitching is flawless, and yeah\u2026 this is probably a terrible idea and Nike is going to kill me.." },
                    { time: 24.05, type: "visual", description: "Visual find: Nike logo" },
                  ]}
                  onSeek={(time, index) => {
                    setActiveFrameIndex(index);
                    if (videoRef.current) {
                      videoRef.current.currentTime = time;
                      if (isPlaying) videoRef.current.play().catch(() => {});
                    }
                  }}
                />
              )}
            </PostSearchTimeline>

            {/* Action buttons */}
            <div className="mt-6 flex items-center gap-2">
              <Button variant="outline" className="flex-1 cursor-pointer">
                <Bookmark className="size-4" />
                Shortlist
              </Button>
              <Button variant="outline" className="flex-1 cursor-pointer">
                <Target className="size-4" />
                Similar
              </Button>
              <Button variant="outline" className="flex-1 cursor-pointer">
                <LogoFilePdf className="size-4 !stroke-none" />
                PDF
              </Button>
              <Button className="flex-1 cursor-pointer bg-brand hover:bg-brand/90 text-white">
                <Upload className="size-4" />
                Share
              </Button>
            </div>

            {/* Platform metrics */}
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <h3 className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                    {config.heading}
                  </h3>
                  <Info className="size-3.5 text-icon-stroke-muted" />
                </div>
                <span className="text-xs text-muted-foreground">Updated today</span>
              </div>
              <div className="mt-3 flex flex-col gap-1">
                {config.sections.map((section, i) => (
                  <MetricSectionRow key={i} section={section} post={post} />
                ))}
              </div>
            </div>

            {/* Posted date */}
            <div className="mt-6">
              <span className="text-sm text-muted-foreground">
                Posted {post.posted}
              </span>
            </div>

            {/* Caption / Quote */}
            {post.caption && (
              <div className="mt-6">
                <QuotationMarkLeft className="size-5 text-muted-foreground/30" />
                <p className="mt-2 text-sm text-foreground whitespace-pre-line leading-relaxed">
                  {post.caption}
                </p>
                <div className="flex justify-end mt-2">
                  <QuotationMarkRight className="size-5 text-muted-foreground/30" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
