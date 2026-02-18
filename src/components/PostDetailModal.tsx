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
} from "foamicons";
import { Button } from "@/components/ui/button";
import { MediaCheckbox } from "@/components/MediaCheckbox";
import { PlatformLogo } from "@/components/PlatformLogo";
import {
  platformMetricsConfig,
  type MetricSection,
} from "@/data/platformMetrics";
import type { Post } from "@/data/posts";

interface PostDetailModalProps {
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

export function PostDetailModal({
  post,
  isSelected,
  onSelectChange,
  onClose,
  onPrev,
  onNext,
}: PostDetailModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const config = platformMetricsConfig[post.platform];
  const [isLandscape, setIsLandscape] = useState(false);

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
      className="fixed inset-0 z-50 flex bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative flex size-full m-4 overflow-hidden rounded-xl bg-background"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className="absolute top-4 left-4 z-10 flex items-center justify-center size-9 rounded-full bg-black/30 hover:bg-black/50 cursor-pointer transition-colors"
          onClick={onClose}
        >
          <X className="size-5 text-white" />
        </button>

        {/* Left: Media panel */}
        <div
          className={
            isLandscape
              ? "relative flex-1 min-w-0 flex items-center justify-end bg-black"
              : "relative w-1/2 flex items-center justify-end bg-black"
          }
        >
          {post.video ? (
            <video
              ref={videoRef}
              src={post.video}
              muted
              loop
              playsInline
              onLoadedMetadata={handleVideoMetadata}
              className={
                isLandscape
                  ? "w-full h-auto max-h-full object-contain"
                  : "h-full w-auto max-w-full object-contain"
              }
            />
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

          {/* Checkbox overlay */}
          <div className="absolute top-4 right-4 z-10">
            <MediaCheckbox
              checked={isSelected}
              onCheckedChange={(checked) => onSelectChange(checked)}
            />
          </div>

          {/* Navigation arrows */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
            <button
              className="flex items-center justify-center size-9 rounded-full bg-black/30 hover:bg-black/50 cursor-pointer transition-colors disabled:opacity-30 disabled:cursor-default"
              onClick={onPrev ?? undefined}
              disabled={!onPrev}
            >
              <ChevronUp className="size-5 text-white" />
            </button>
            <button
              className="flex items-center justify-center size-9 rounded-full bg-black/30 hover:bg-black/50 cursor-pointer transition-colors disabled:opacity-30 disabled:cursor-default"
              onClick={onNext ?? undefined}
              disabled={!onNext}
            >
              <ChevronDown className="size-5 text-white" />
            </button>
          </div>
        </div>

        {/* Right: Detail panel */}
        <div
          className={
            isLandscape
              ? "flex flex-col w-[440px] min-w-[440px] shrink-0 border-l border-border"
              : "flex flex-col w-1/2 border-l border-border"
          }
        >
          <div className="flex-1 overflow-auto p-6 max-w-[700px]">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={post.talentAvatar}
                  alt=""
                  className="size-10 rounded-full object-cover"
                />
                <span className="font-medium text-foreground">
                  {post.talentName}
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
                  <div>
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
                </div>
              </div>
            )}

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
