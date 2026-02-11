import {
  Inbox,
  EllipsisVertical,
  Pencil,
  Trash,
  Pin,
  PinFill,
} from "foamicons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { CollectionData } from "@/data/collections";

interface CollectionCardProps {
  collection: CollectionData;
  pinned?: boolean;
  onPinChange?: (pinned: boolean) => void;
}

export function CollectionCard({ collection, pinned, onPinChange }: CollectionCardProps) {
  return (
    <div className="flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 transition-colors hover:bg-accent/50">
      <Inbox className="size-4 shrink-0 text-icon-stroke" />

      <span className="flex-1 text-sm text-foreground">
        {collection.name}
      </span>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon-sm" className="size-6 cursor-pointer">
            <EllipsisVertical className="size-3.5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="cursor-pointer">
            <Pencil className="size-4 text-icon-stroke" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onSelect={() => onPinChange?.(!pinned)}>
            {pinned ? (
              <PinFill className="size-4 text-icon-stroke" />
            ) : (
              <Pin className="size-4 text-icon-stroke" />
            )}
            {pinned ? "Unpin" : "Pin"}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
            <Trash className="size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
