import {
  EllipsisVertical,
  Pencil,
  Link,
  LogoFilePdf,
  LogoFileSheet,
  Copy,
  Trash,
  ArchiveArrowUp,
  Pin,
  PinFill,
  Images,
  UserDuotone,
} from "foamicons";
import { Avatar, AvatarIcon } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ListData } from "@/data/lists";

interface ListCardProps {
  list: ListData;
  selected?: boolean;
  onSelectChange?: (selected: boolean) => void;
  pinned?: boolean;
  onPinChange?: (pinned: boolean) => void;
  onEditThumbnail?: () => void;
  customAvatars?: string[];
  onClick?: () => void;
}

function AvatarGroup({
  avatars,
  count,
}: {
  avatars: string[];
  count: number;
}) {
  if (avatars.length === 0) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center -space-x-2">
          {[0, 1, 2].map((i) => (
            <Avatar key={i} size="lg" className="border-2 border-background">
              <AvatarIcon>
                <UserDuotone />
              </AvatarIcon>
            </Avatar>
          ))}
        </div>
        <span className={`text-sm ${count === 0 ? "text-destructive" : "text-muted-foreground"}`}>{count}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center -space-x-2">
        {avatars.slice(0, 4).map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="size-12 rounded-full border-2 border-background object-cover"
          />
        ))}
      </div>
      <span className={`text-sm ${count === 0 ? "text-destructive" : "text-muted-foreground"}`}>{count}</span>
    </div>
  );
}

export function ListCard({ list, selected, onSelectChange, pinned, onPinChange, onEditThumbnail, customAvatars, onClick }: ListCardProps) {
  const PinIcon = pinned ? PinFill : Pin;

  return (
    <div
      onClick={onClick}
      className={`group relative flex cursor-pointer flex-col gap-2 rounded-xl border p-4 transition-colors ${
        selected
          ? "border-brand bg-brand-tint"
          : "border-border bg-card"
      }`}
    >
      {/* Checkbox — visible on hover or when selected */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`absolute top-3 right-3 ${
          selected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        } transition-opacity`}
      >
        <Checkbox
          checked={selected}
          onCheckedChange={(checked) => onSelectChange?.(!!checked)}
        />
      </div>

      {/* Avatar group + count */}
      <AvatarGroup avatars={customAvatars?.length ? customAvatars : list.avatars} count={list.talentCount} />

      {/* Title */}
      <span className="truncate text-base font-medium text-foreground">
        {list.title}
      </span>

      {/* Owner + Date */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="truncate">{list.owner}</span>
        <span className="shrink-0">{list.date}</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-1" onClick={(e) => e.stopPropagation()}>
        <Button variant="secondary" size="sm" className="flex-1 cursor-pointer">
          Share
        </Button>
        <Button variant="secondary" size="icon-sm" className="cursor-pointer" onClick={() => onPinChange?.(!pinned)}>
          <PinIcon className="size-4 text-icon-stroke" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon-sm" className="cursor-pointer">
              <EllipsisVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="cursor-pointer">
              <Pencil className="size-4 text-icon-stroke" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onSelect={() => onEditThumbnail?.()}>
              <Images className="size-4 text-icon-stroke" />
              Edit thumbnail
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Link className="size-4 text-icon-stroke" />
              Copy link
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <LogoFilePdf className="size-4 !stroke-none" />
              Download pdf
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <LogoFileSheet className="size-4 !stroke-none" />
              Download csv
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <Copy className="size-4 text-icon-stroke" />
              Copy basic embed
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Copy className="size-4 text-icon-stroke" />
              Copy detail embed
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onSelect={() => onPinChange?.(!pinned)}>
              {pinned ? (
                <PinFill className="size-4 text-icon-stroke" />
              ) : (
                <Pin className="size-4 text-icon-stroke" />
              )}
              {pinned ? "Unpin" : "Pin"}
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <ArchiveArrowUp className="size-4 text-icon-stroke" />
              Archive
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
              <Trash className="size-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
