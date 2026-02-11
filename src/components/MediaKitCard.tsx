import {
  EllipsisVertical,
  Pencil,
  Link,
  LogoFilePdf,
  LogoFileSheet,
  Trash,
  Images,
} from "foamicons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { MediaKitData } from "@/data/mediaKits";

interface MediaKitCardProps {
  kit: MediaKitData;
  customThumbnail?: string;
  onEditThumbnail?: () => void;
}

export function MediaKitCard({ kit, customThumbnail, onEditThumbnail }: MediaKitCardProps) {
  return (
    <div className="flex cursor-pointer flex-col gap-2 overflow-hidden rounded-xl border border-border bg-card p-3">
      {/* Thumbnail */}
      <div className="relative h-[160px] w-full overflow-hidden rounded-lg">
        <img
          src={customThumbnail || kit.thumbnail}
          alt={kit.title}
          className="size-full object-cover"
        />
        {kit.type && (
          <Badge
            variant="secondary"
            className="absolute right-2.5 top-2.5 rounded-full"
          >
            {kit.type}
          </Badge>
        )}
      </div>

      {/* Title */}
      <div className="flex items-center">
        <span className="truncate text-lg font-medium text-foreground">
          {kit.title}
        </span>
      </div>

      {/* Owner + Date */}
      <div className="flex items-center justify-between text-base text-muted-foreground">
        <span className="truncate">{kit.creator}</span>
        <span className="shrink-0">{kit.creationDate}</span>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button variant="secondary" className="flex-1 cursor-pointer">
          Copy link
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="cursor-pointer">
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
