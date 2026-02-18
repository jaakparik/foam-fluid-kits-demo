import type { ColumnDef } from "@tanstack/react-table";
import {
  ArrowDownUp,
  Bookmark,
  Ellipsis,
} from "foamicons";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { PlatformLogo } from "@/components/PlatformLogo";
import type { Post } from "@/data/posts";

function SortableHeader({
  children,
  column,
}: {
  children: React.ReactNode;
  column: { toggleSorting: (desc?: boolean) => void; getIsSorted: () => false | "asc" | "desc" };
}) {
  return (
    <button
      className="inline-flex items-center gap-1 cursor-pointer hover:text-foreground transition-colors"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {children}
      <ArrowDownUp className="size-3.5 text-icon-stroke" />
    </button>
  );
}

function parseMetric(value: string): number {
  const cleaned = value.replace("%", "");
  if (cleaned.endsWith("k")) return parseFloat(cleaned) * 1000;
  if (cleaned.endsWith("m")) return parseFloat(cleaned) * 1000000;
  return parseFloat(cleaned) || 0;
}

export const contentFeedColumns: ColumnDef<Post>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllRowsSelected() ||
          (table.getIsSomeRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        onClick={(e) => e.stopPropagation()}
      />
    ),
    size: 28,
    minSize: 28,
    enableSorting: false,
  },
  {
    id: "thumbnail",
    header: () => null,
    cell: ({ row }) => {
      const { thumbnail, video } = row.original;
      return (
        <HoverCard openDelay={200} closeDelay={0}>
          <HoverCardTrigger asChild>
            <div className="size-10 shrink-0 overflow-hidden rounded cursor-pointer">
              <img
                src={thumbnail}
                alt=""
                className="size-full object-cover"
              />
            </div>
          </HoverCardTrigger>
          <HoverCardContent
            side="right"
            align="start"
            sideOffset={8}
            className="w-auto p-0 overflow-hidden rounded-lg"
          >
            {video ? (
              <video
                src={video}
                autoPlay
                muted
                loop
                playsInline
                className="w-64 aspect-[9/16] object-cover"
              />
            ) : (
              <img
                src={thumbnail}
                alt=""
                className="w-64 aspect-[9/16] object-cover"
              />
            )}
          </HoverCardContent>
        </HoverCard>
      );
    },
    size: 56,
    minSize: 56,
    enableSorting: false,
  },
  {
    id: "platform",
    header: () => null,
    cell: ({ row }) => (
      <PlatformLogo platform={row.original.platform} size={16} />
    ),
    size: 28,
    minSize: 28,
    enableSorting: false,
  },
  {
    accessorKey: "talentName",
    header: ({ column }) => <SortableHeader column={column}>Talent name</SortableHeader>,
    cell: ({ row }) => (
      <span className="font-medium text-foreground whitespace-nowrap">{row.original.talentName}</span>
    ),
  },
  {
    accessorKey: "posted",
    header: ({ column }) => <SortableHeader column={column}>Posted</SortableHeader>,
    cell: ({ row }) => (
      <span className="text-muted-foreground whitespace-nowrap">{row.original.posted}</span>
    ),
  },
  {
    id: "reach",
    accessorFn: (row) => parseMetric(row.reach),
    header: ({ column }) => <SortableHeader column={column}>Reach</SortableHeader>,
    cell: ({ row }) => (
      <span className="font-mono text-xs text-foreground">{row.original.reach}</span>
    ),
  },
  {
    id: "impressions",
    accessorFn: (row) => parseMetric(row.impressions),
    header: ({ column }) => <SortableHeader column={column}>Impressions</SortableHeader>,
    cell: ({ row }) => (
      <span className="font-mono text-xs text-foreground">{row.original.impressions}</span>
    ),
  },
  {
    id: "engagements",
    accessorFn: (row) => parseMetric(row.engagements),
    header: ({ column }) => <SortableHeader column={column}>Engagements</SortableHeader>,
    cell: ({ row }) => (
      <span className="font-mono text-xs text-foreground">{row.original.engagements}</span>
    ),
  },
  {
    id: "reachEngRate",
    accessorFn: (row) => parseMetric(row.reachEngRate),
    header: ({ column }) => <SortableHeader column={column}>Reach eng. rate</SortableHeader>,
    cell: ({ row }) => (
      <span className="font-mono text-xs text-foreground">{row.original.reachEngRate}</span>
    ),
  },
  {
    id: "views",
    accessorFn: (row) => parseMetric(row.views),
    header: ({ column }) => <SortableHeader column={column}>Views</SortableHeader>,
    cell: ({ row }) => (
      <span className="font-mono text-xs text-foreground">{row.original.views}</span>
    ),
  },
  {
    id: "viewEngRate",
    accessorFn: (row) => parseMetric(row.viewEngRate),
    header: ({ column }) => <SortableHeader column={column}>View eng. rate</SortableHeader>,
    cell: ({ row }) => (
      <span className="font-mono text-xs text-foreground">{row.original.viewEngRate}</span>
    ),
  },
  {
    id: "bookmark",
    header: () => null,
    cell: () => (
      <Button variant="ghost" size="icon-sm" className="cursor-pointer" onClick={(e) => e.stopPropagation()}>
        <Bookmark className="size-4 text-icon-stroke-muted" />
      </Button>
    ),
    size: 40,
    minSize: 40,
    enableSorting: false,
  },
  {
    id: "more",
    header: () => null,
    cell: () => (
      <Button variant="ghost" size="icon-sm" className="cursor-pointer" onClick={(e) => e.stopPropagation()}>
        <Ellipsis className="size-4" />
      </Button>
    ),
    size: 40,
    minSize: 40,
    enableSorting: false,
  },
];
