import { useRef, useState } from "react";
import {
  Eye,
  Reach,
  MousePointerClick,
  ChartColumn,
} from "foamicons";
import { Button } from "@/components/ui/button";
import { MediaCheckbox } from "@/components/MediaCheckbox";
import { MediaSave } from "@/components/MediaSave";
import { PlatformLogo } from "@/components/PlatformLogo";
import { cn } from "@/lib/utils";
import type { Post } from "@/data/posts";

interface PostsCardProps {
  post: Post;
  isSelected: boolean;
  onSelectChange: (selected: boolean) => void;
  onCardClick: () => void;
}

export function PostsCard({ post, isSelected, onSelectChange, onCardClick }: PostsCardProps) {
  const [saved, setSaved] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const showOverlays = isSelected
    ? "opacity-100"
    : "opacity-0 group-hover:opacity-100";

  function handleMouseEnter() {
    if (post.video && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }

  function handleMouseLeave() {
    if (post.video && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }

  return (
    <div
      className={cn(
        "group relative rounded-lg border overflow-hidden cursor-pointer transition-colors",
        isSelected
          ? "bg-brand-tint border-brand ring-2 ring-inset ring-brand"
          : "bg-card border-border hover:border-checkbox-border",
      )}
      onClick={onCardClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image/video area */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <div
          className={cn(
            "size-full transition-all",
            isSelected ? "p-[7px]" : "",
          )}
        >
          {post.video ? (
            <>
              <img
                src={post.thumbnail}
                alt=""
                className={cn(
                  "size-full object-cover group-hover:opacity-0 transition-opacity",
                  isSelected ? "rounded" : "",
                )}
              />
              <video
                ref={videoRef}
                src={post.video}
                muted
                loop
                playsInline
                className={cn(
                  "absolute inset-0 size-full object-cover opacity-0 group-hover:opacity-100 transition-opacity",
                  isSelected ? "rounded p-[7px]" : "",
                )}
              />
            </>
          ) : (
            <img
              src={post.thumbnail}
              alt=""
              className={cn(
                "size-full object-cover",
                isSelected ? "rounded" : "",
              )}
            />
          )}
        </div>

        {/* Save overlay */}
        <div
          className={cn(
            "absolute top-2 left-2 transition-opacity",
            showOverlays,
          )}
        >
          <MediaSave saved={saved} onSave={() => setSaved((s) => !s)} />
        </div>

        {/* Checkbox overlay */}
        <div
          className={cn(
            "absolute top-2 right-2 transition-opacity",
            showOverlays,
          )}
        >
          <MediaCheckbox
            checked={isSelected}
            onCheckedChange={(checked) => onSelectChange(checked)}
          />
        </div>
      </div>

      {/* Info section */}
      <div className="flex flex-col gap-3 p-3">
        {/* Metrics row */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Eye className="size-3.5 text-icon-stroke-muted shrink-0" />
            <span className="font-mono text-xs text-foreground">{post.views}</span>
          </div>
          <div className="flex items-center gap-1">
            <Reach className="size-3.5 text-icon-stroke-muted shrink-0" />
            <span className="font-mono text-xs text-foreground">{post.reach}</span>
          </div>
          <div className="flex items-center gap-1">
            <MousePointerClick className="size-3.5 text-icon-stroke-muted shrink-0" />
            <span className="font-mono text-xs text-foreground">{post.engagements}</span>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between">
          <PlatformLogo platform={post.platform} size={16} className="shrink-0" />
          <span className="text-xs text-muted-foreground">
            {post.posted}
          </span>
          <Button
            variant="outline"
            size="icon-xs"
            className="cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          >
            <ChartColumn className="size-3 text-icon-stroke" />
          </Button>
        </div>
      </div>
    </div>
  );
}
