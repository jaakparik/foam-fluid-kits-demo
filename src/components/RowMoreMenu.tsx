import { useRef } from "react";
import { Ellipsis, Pencil, User, Share, Plus, Mail, Trash } from "foamicons";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface RowMoreMenuProps {
  onEditNote?: () => void;
}

export function RowMoreMenu({ onEditNote }: RowMoreMenuProps) {
  const willEditNote = useRef(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          className="cursor-pointer"
          onClick={(e) => e.stopPropagation()}
        >
          <Ellipsis className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        onClick={(e) => e.stopPropagation()}
        onCloseAutoFocus={(e) => {
          if (willEditNote.current) {
            e.preventDefault();
            willEditNote.current = false;
          }
        }}
      >
        {onEditNote && (
          <>
            <DropdownMenuItem
              className="cursor-pointer gap-2"
              onSelect={() => {
                willEditNote.current = true;
                onEditNote();
              }}
            >
              <Pencil className="size-4" />
              Edit Note
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem className="cursor-pointer gap-2">
          <User className="size-4" />
          View profile
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer gap-2">
          <Share className="size-4" />
          Share
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer gap-2">
          <Plus className="size-4" />
          Add to a list
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer gap-2"
          onSelect={() => toast.success("Manager email copied to clipboard")}
        >
          <Mail className="size-4" />
          Manager
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer gap-2 text-destructive focus:text-destructive">
          <Trash className="size-4" />
          Delete from list
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
