import type React from "react";
import { useState } from "react";
import {
  ArrowDownUp,
  EllipsisVertical,
  Pencil,
  Link,
  LogoFilePdf,
  LogoFileSheet,
  Copy,
  Trash,
  Pin,
  PinFill,
  Images,
} from "foamicons";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { EditThumbnailDialog } from "@/components/EditThumbnailDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ListData } from "@/data/lists";

interface ListsTableProps {
  data: ListData[];
  pinnedIds: Set<string>;
  onPinChange: (id: string, pinned: boolean) => void;
  selected: Set<string>;
  onSelectedChange: (selected: Set<string>) => void;
  avatarImages: string[];
  thumbnailOverrides: Record<string, string[]>;
  onThumbnailChange: (itemId: string, images: string[]) => void;
}

function SortableHeader({ children }: { children: React.ReactNode }) {
  return (
    <button className="inline-flex items-center gap-1 cursor-pointer hover:text-foreground transition-colors">
      {children}
      <ArrowDownUp className="size-3.5 text-icon-stroke" />
    </button>
  );
}

function AvatarGroup({ avatars }: { avatars: string[] }) {
  return (
    <div className="flex items-center -space-x-2">
      {avatars.slice(0, 3).map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          className="size-8 rounded-full border-2 border-background object-cover"
        />
      ))}
    </div>
  );
}

export function ListsTable({ data, pinnedIds, onPinChange, selected, onSelectedChange, avatarImages, thumbnailOverrides, onThumbnailChange }: ListsTableProps) {
  const [editingThumbnailId, setEditingThumbnailId] = useState<string | null>(null);
  const allSelected = data.length > 0 && selected.size === data.length;
  const someSelected = selected.size > 0 && !allSelected;

  function toggleAll() {
    onSelectedChange(allSelected ? new Set() : new Set(data.map((l) => l.id)));
  }

  function toggleRow(id: string) {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onSelectedChange(next);
  }

  return (
    <>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-10">
            <Checkbox
              checked={allSelected || (someSelected && "indeterminate")}
              onCheckedChange={toggleAll}
            />
          </TableHead>
          <TableHead>
            <SortableHeader>Title</SortableHeader>
          </TableHead>
          <TableHead>
            <SortableHeader>Owner</SortableHeader>
          </TableHead>
          <TableHead>
            <SortableHeader># Talent</SortableHeader>
          </TableHead>
          <TableHead>
            <SortableHeader>Date</SortableHeader>
          </TableHead>
          <TableHead>Asks email</TableHead>
          <TableHead>Filters</TableHead>
          <TableHead className="w-10" />
          <TableHead className="w-10" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((list) => (
          <TableRow key={list.id} data-state={selected.has(list.id) ? "selected" : undefined}>
            <TableCell>
              <Checkbox
                checked={selected.has(list.id)}
                onCheckedChange={() => toggleRow(list.id)}
              />
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <AvatarGroup avatars={thumbnailOverrides[list.id]?.length ? thumbnailOverrides[list.id] : list.avatars} />
                <span className="font-medium text-foreground">
                  {list.title}
                </span>
              </div>
            </TableCell>
            <TableCell className="text-muted-foreground">
              {list.owner}
            </TableCell>
            <TableCell className="text-muted-foreground">
              {list.talentCount}
            </TableCell>
            <TableCell className="text-muted-foreground">
              {list.date}
            </TableCell>
            <TableCell>
              <Switch defaultChecked={list.asksEmail} />
            </TableCell>
            <TableCell>
              <Switch defaultChecked={list.hasFilters} />
            </TableCell>
            <TableCell>
              <Button variant="ghost" size="icon-sm" className="cursor-pointer">
                <Link className="size-4 text-icon-stroke" />
              </Button>
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon-sm" className="cursor-pointer">
                    <EllipsisVertical className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="cursor-pointer">
                    <Pencil className="size-4 text-icon-stroke" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onSelect={() => setEditingThumbnailId(list.id)}>
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
                  <DropdownMenuItem className="cursor-pointer" onSelect={() => onPinChange(list.id, !pinnedIds.has(list.id))}>
                    {pinnedIds.has(list.id) ? (
                      <PinFill className="size-4 text-icon-stroke" />
                    ) : (
                      <Pin className="size-4 text-icon-stroke" />
                    )}
                    {pinnedIds.has(list.id) ? "Unpin" : "Pin"}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                    <Trash className="size-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

    <EditThumbnailDialog
      open={editingThumbnailId !== null}
      onOpenChange={(open) => { if (!open) setEditingThumbnailId(null); }}
      currentImages={editingThumbnailId ? (thumbnailOverrides[editingThumbnailId] ?? []) : []}
      onSave={(images) => {
        if (editingThumbnailId) onThumbnailChange(editingThumbnailId, images);
        setEditingThumbnailId(null);
      }}
      images={avatarImages}
      roundImages
    />
    </>
  );
}
