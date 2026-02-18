import {
  LogoInstagram,
  LogoInstagramDark,
  LogoSnapchat,
  LogoSnapchatDark,
  LogoTiktok,
  LogoTiktokDark,
  LogoYoutube,
  Bookmark,
  Ellipsis,
  GripHorizontal,
  Plus,
} from "foamicons";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { ConnectionStatusBadge } from "@/components/ConnectionStatusBadge";
import { cn } from "@/lib/utils";
import type { VisibilityState } from "@tanstack/react-table";
import type { Talent } from "@/data/talents";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import type { DraggableAttributes } from "@dnd-kit/core";

interface TalentCardProps {
  talent: Talent;
  thumbnails: string[];
  isSelected: boolean;
  onSelectChange: (selected: boolean) => void;
  columnVisibility: VisibilityState;
  isDragging?: boolean;
  dragHandleListeners?: SyntheticListenerMap;
  dragHandleAttributes?: DraggableAttributes;
}

const platformRows: {
  key: keyof Talent["followers"];
  connectionKey: keyof Talent["connections"];
  icon: typeof LogoInstagram;
  iconDark?: typeof LogoInstagramDark;
  colId: string;
  label: string;
}[] = [
  { key: "instagram", connectionKey: "instagram", icon: LogoInstagram, iconDark: LogoInstagramDark, colId: "ig", label: "IG" },
  { key: "snapchat", connectionKey: "snapchat", icon: LogoSnapchat, iconDark: LogoSnapchatDark, colId: "sn", label: "SN" },
  { key: "tiktok", connectionKey: "tiktok", icon: LogoTiktok, iconDark: LogoTiktokDark, colId: "tt", label: "TT" },
  { key: "youtube", connectionKey: "youtube", icon: LogoYoutube, colId: "yt", label: "YT" },
];

export function TalentCard({
  talent,
  thumbnails,
  isSelected,
  onSelectChange,
  columnVisibility,
  isDragging,
  dragHandleListeners,
  dragHandleAttributes,
}: TalentCardProps) {
  const show = (id: string) => columnVisibility[id] !== false;

  const showBio = show("bio");
  const showPosts = show("posts");
  const showVerticals = show("verticals");
  const showManager = show("manager");

  const visiblePlatforms = platformRows.filter(({ key, colId }) => {
    const count = talent.followers[key];
    return show(colId) && count && count !== "-";
  });

  const locationItems = [
    show("location") && talent.location,
    show("age") && `${talent.age} years old`,
    show("gender") && talent.gender,
  ].filter(Boolean) as string[];

  const showBioContent = showBio || showPosts;

  return (
    <div
      className={cn(
        "@container rounded-xl border px-4 pt-2.5 pb-4 transition-colors",
        isSelected
          ? "bg-brand-tint border-brand ring-2 ring-inset ring-brand"
          : "bg-card border-border hover:border-checkbox-border",
        isDragging && "opacity-50",
      )}
    >
      {/* Top row: name + actions */}
      <div className="flex items-center justify-between">
        <span className="text-lg font-medium text-foreground truncate">
          {talent.name}
        </span>
        <div className="flex items-center gap-4 shrink-0 ml-3">
          {dragHandleListeners && (
            <button
              className="flex items-center justify-center cursor-grab active:cursor-grabbing"
              {...dragHandleAttributes}
              {...dragHandleListeners}
            >
              <GripHorizontal className="size-4 text-icon-stroke" />
            </button>
          )}
          <Checkbox
            checked={isSelected}
            onCheckedChange={(value) => onSelectChange(!!value)}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>

      {/* Main content — responsive via container queries */}
      <div className="flex flex-col gap-4 mt-2">
        {/* Top section: avatar + socials + verticals + location (+ bio/content at wide) */}
        <div className="flex @[900px]:flex-row @[900px]:items-start gap-4">
          {/* Avatar + socials + verticals + location — always a row */}
          <div className="flex items-start gap-4 shrink-0 max-w-[500px]">
            {/* Avatar */}
            <img
              src={talent.avatarImage}
              alt={talent.name}
              className="size-24 rounded-full object-cover shrink-0"
            />

            {/* Social stats + links */}
            {(visiblePlatforms.length > 0 || (show("links") && talent.links.length > 0)) && (
              <div className="flex flex-col gap-2 shrink-0 justify-center">
                {visiblePlatforms.map(({ key, connectionKey, icon: Icon, iconDark: IconDark, label }) => (
                  <div key={key} className="flex items-center gap-2">
                    {IconDark ? (
                      <>
                        <Icon className="size-4 !stroke-none shrink-0 dark:hidden" />
                        <IconDark className="size-4 !stroke-none shrink-0 hidden dark:block" />
                      </>
                    ) : (
                      <Icon className="size-4 !stroke-none shrink-0" />
                    )}
                    <span className="text-sm text-foreground w-10 text-right">{talent.followers[key]}</span>
                    {show("status") && <ConnectionStatusBadge status={talent.connections[connectionKey]} label={label} showLabel={false} />}
                  </div>
                ))}
                {show("links") && talent.links.length > 0 && (
                  <div className="w-0 min-w-full overflow-hidden flex flex-col gap-2">
                    {talent.links.map((link) => {
                      const hostname = new URL(link).hostname;
                      const name = hostname.replace(/^www\./, "").split(".")[0];
                      const displayName = name.charAt(0).toUpperCase() + name.slice(1);
                      return (
                        <a
                          key={link}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer min-w-0"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <img
                            src={`https://www.google.com/s2/favicons?domain=${hostname}&sz=32`}
                            alt={displayName}
                            className="size-4 shrink-0 rounded-sm object-contain"
                            width={16}
                            height={16}
                          />
                          <span className="truncate">{displayName}</span>
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Verticals */}
            {showVerticals && (
              <div className="flex flex-col gap-2 shrink-0 justify-center">
                {talent.verticals.map((v) => (
                  <Badge key={v} variant="secondary">{v}</Badge>
                ))}
              </div>
            )}

            {/* Location / Age / Gender */}
            {locationItems.length > 0 && (
              <div className="flex flex-col gap-2 shrink-0 w-[170px] justify-center">
                {locationItems.map((item) => (
                  <span key={item} className="text-sm text-muted-foreground">{item}</span>
                ))}
              </div>
            )}
          </div>

          {/* Bio + Content — visible at wide, hidden below */}
          {showBioContent && (
            <div className="hidden @[900px]:flex gap-4 flex-1 min-w-0">
              {showBio && (
                <div className="shrink-0 w-[500px]">
                  <p className="text-sm text-foreground leading-relaxed">
                    {talent.bio}
                  </p>
                </div>
              )}
              {showPosts && thumbnails.length > 0 && (
                <div className="flex-1 min-w-0 overflow-hidden -mr-4">
                  <div className="flex gap-2">
                    {thumbnails.slice(0, 10).map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt=""
                        className="w-[76px] h-32 shrink-0 rounded object-cover"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bio + Content — visible at medium/narrow, hidden at wide */}
        {showBioContent && (
          <div className="flex @[900px]:hidden @[600px]:flex-row flex-col gap-4">
            {showBio && (
              <div className="shrink-0 @[600px]:w-[500px]">
                <p className="text-sm text-foreground leading-relaxed">
                  {talent.bio}
                </p>
              </div>
            )}
            {showPosts && thumbnails.length > 0 && (
              <div className="flex-1 min-w-0 overflow-hidden -mr-4">
                <div className="flex gap-2">
                  {thumbnails.slice(0, 10).map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt=""
                      className="w-[76px] h-32 shrink-0 rounded object-cover"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Bottom row: manager + actions */}
      <div className="flex items-center justify-between mt-2">
        <span className="text-sm text-muted-foreground">
          {showManager && talent.managers.length > 0 && (
            <>
              Managed by:{" "}
              <Tooltip>
                <TooltipTrigger asChild>
                  <span
                    className="text-foreground font-medium cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      const email = talent.managers.map((m) => m.toLowerCase().replace(/\s+/g, ".") + "@foam.co").join(", ");
                      navigator.clipboard.writeText(email);
                      toast.success("Manager email copied to clipboard");
                    }}
                  >
                    {talent.managers[0]}
                  </span>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="flex flex-col items-start">
                  <span>{talent.managers.join(", ")}</span>
                  <span className="text-muted-foreground">Click to copy email</span>
                </TooltipContent>
              </Tooltip>
            </>
          )}
        </span>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
            className="cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          >
            <Bookmark className="size-4 text-icon-stroke" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            className="cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          >
            <Ellipsis className="size-4 text-icon-stroke" />
          </Button>
          <Button
            size="icon-sm"
            className="cursor-pointer bg-brand hover:bg-brand/90 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <Plus className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
