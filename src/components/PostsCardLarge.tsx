import { useRef, useState } from "react";
import {
  Eye,
  Reach,
  MousePointerClick,
  ChartColumn,
  Search,
} from "foamicons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MediaCheckbox } from "@/components/MediaCheckbox";
import { MediaSave } from "@/components/MediaSave";
import { PlatformLogo } from "@/components/PlatformLogo";
import { cn } from "@/lib/utils";
import type { Post } from "@/data/posts";

interface PostsCardLargeProps {
  post: Post;
  isSelected: boolean;
  onSelectChange: (selected: boolean) => void;
  onCardClick: () => void;
  infoExpanded: boolean;
  onInfoToggle: () => void;
}

export function PostsCardLarge({
  post,
  isSelected,
  onSelectChange,
  onCardClick,
  infoExpanded,
  onInfoToggle,
}: PostsCardLargeProps) {
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
      className="group relative h-[480px] cursor-pointer overflow-hidden rounded-xl"
      onClick={onCardClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image/video wrapper */}
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        <div
          className={cn(
            "absolute overflow-hidden transition-all",
            isSelected ? "inset-[5px] rounded-lg" : "inset-0",
          )}
        >
          {post.video ? (
            <>
              <img
                src={post.thumbnail}
                alt=""
                className="size-full object-cover group-hover:opacity-0 transition-opacity"
              />
              <video
                ref={videoRef}
                src={post.video}
                muted
                loop
                playsInline
                className="absolute inset-0 size-full object-cover opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </>
          ) : (
            <img
              src={post.thumbnail}
              alt=""
              className="size-full object-cover"
            />
          )}
        </div>
      </div>

      {/* Save overlay */}
      <div
        className={cn(
          "absolute top-3 left-3 z-10 transition-opacity",
          showOverlays,
        )}
      >
        <MediaSave saved={saved} onSave={() => setSaved((s) => !s)} />
      </div>

      {/* Checkbox overlay */}
      <div
        className={cn(
          "absolute top-3 right-3 z-10 transition-opacity",
          showOverlays,
        )}
      >
        <MediaCheckbox
          checked={isSelected}
          onCheckedChange={(checked) => onSelectChange(checked)}
        />
      </div>

      {/* Selection border overlay — sits on top of everything */}
      {isSelected && (
        <div className="absolute inset-0 rounded-xl border-brand ring-3 ring-inset ring-brand pointer-events-none z-20" />
      )}

      {/* Info section — slides up on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-out"
        onClick={(e) => {
          e.stopPropagation();
          onInfoToggle();
        }}
      >
        <div className="bg-secondary/75 backdrop-blur-sm rounded-b-xl cursor-pointer">
          {/* Collapsible upper section */}
          <div
            className={cn(
              "grid transition-[grid-template-rows] duration-200 ease-out",
              infoExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
            )}
          >
            <div className="overflow-hidden">
              <div className="flex flex-col gap-3 px-3 pt-3">
                {/* Analysis row */}
                <div className="flex items-start justify-between">
                  <div className="flex gap-1 items-start">
                    <Search className="size-4 text-icon-stroke-muted shrink-0 mt-0.5" />
                    <div className="flex flex-col text-xs leading-4 text-foreground">
                      {post.insights.map((line, i) => (
                        <span key={i}>{line}</span>
                      ))}
                    </div>
                  </div>
                  <Badge>{post.score}</Badge>
                </div>

                {/* Metrics row */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Eye className="size-4 text-icon-stroke-muted shrink-0" />
                    <span className="font-mono text-xs text-foreground">{post.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Reach className="size-4 text-icon-stroke-muted shrink-0" />
                    <span className="font-mono text-xs text-foreground">{post.reach}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MousePointerClick className="size-4 text-icon-stroke-muted shrink-0" />
                    <span className="font-mono text-xs text-foreground">{post.engagements}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom row — always visible */}
          <div className="flex items-center justify-between p-3">
            <PlatformLogo platform={post.platform} size={20} className="shrink-0" />
            <span className="text-xs">
              <span className="text-muted-foreground">Posted: </span>
              <span className="text-foreground">{post.posted}</span>
            </span>
            <Button
              variant="outline"
              size="icon-sm"
              className="cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            >
              <ChartColumn className="size-4 text-icon-stroke" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
