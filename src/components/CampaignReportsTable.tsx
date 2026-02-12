import type React from "react";
import { useState } from "react";
import {
  ArrowDownUp,
  EllipsisVertical,
  Pencil,
  Link,
  LogoFilePdf,
  LogoFileSheet,
  Trash,
  Images,
} from "foamicons";
import { Checkbox } from "@/components/ui/checkbox";
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
import { CampaignReportThumbnailSmall } from "@/components/CampaignReportThumbnail";
import type { CampaignReportData } from "@/data/campaignReports";

interface CampaignReportsTableProps {
  data: CampaignReportData[];
  selected: Set<string>;
  onSelectedChange: (selected: Set<string>) => void;
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

export function CampaignReportsTable({ data, selected, onSelectedChange, thumbnailOverrides, onThumbnailChange }: CampaignReportsTableProps) {
  const [editingThumbnailId, setEditingThumbnailId] = useState<string | null>(null);
  const allSelected = data.length > 0 && selected.size === data.length;
  const someSelected = selected.size > 0 && !allSelected;

  function toggleAll() {
    onSelectedChange(allSelected ? new Set() : new Set(data.map((k) => k.id)));
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
            <SortableHeader>Updated</SortableHeader>
          </TableHead>
          <TableHead>
            <SortableHeader>Total views</SortableHeader>
          </TableHead>
          <TableHead>
            <SortableHeader>Total eng.</SortableHeader>
          </TableHead>
          <TableHead>
            <SortableHeader>Total eng. rate</SortableHeader>
          </TableHead>
          <TableHead className="w-10" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((kit, index) => (
          <TableRow key={kit.id} data-state={selected.has(kit.id) ? "selected" : undefined}>
            <TableCell>
              <Checkbox
                checked={selected.has(kit.id)}
                onCheckedChange={() => toggleRow(kit.id)}
              />
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <CampaignReportThumbnailSmall seed={index} customImages={thumbnailOverrides[kit.id]} />
                <span className="font-medium text-foreground">
                  {kit.title}
                </span>
              </div>
            </TableCell>
            <TableCell className="text-muted-foreground">
              {kit.creator}
            </TableCell>
            <TableCell className="text-muted-foreground">
              {kit.creationDate}
            </TableCell>
            <TableCell className="text-muted-foreground">
              {kit.totalViews}
            </TableCell>
            <TableCell className="text-muted-foreground">
              {kit.totalEng}
            </TableCell>
            <TableCell className="text-muted-foreground">
              {kit.totalEngRate}
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
                  <DropdownMenuItem className="cursor-pointer" onSelect={() => setEditingThumbnailId(kit.id)}>
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
    />
    </>
  );
}
