import type { ColumnDef, VisibilityState } from "@tanstack/react-table";
import {
  ArrowDownUp,
  LogoInstagram,
  LogoSnapchat,
  LogoTiktok,
  LogoYoutube,
} from "foamicons";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { RowMoreMenu } from "@/components/RowMoreMenu";
import type { Talent } from "@/data/talents";

export const detailColumnOptions = [
  { id: "bio", label: "Biography" },
  { id: "verticals", label: "Verticals" },
  { id: "age", label: "Age" },
  { id: "gender", label: "Gender" },
  { id: "location", label: "Location" },
  { id: "ig", label: "Instagram" },
  { id: "sn", label: "Snapchat" },
  { id: "tt", label: "TikTok" },
  { id: "yt", label: "YouTube" },
  { id: "links", label: "Links" },
  { id: "manager", label: "Manager" },
];

export const defaultColumnVisibility: VisibilityState = {
  bio: false,
};

export interface SortOption {
  id: string;
  label: string;
  type: "alpha" | "numeric";
}

export const sortColumnOptions: SortOption[] = [
  { id: "name", label: "Name", type: "alpha" },
  { id: "age", label: "Age", type: "numeric" },
  { id: "gender", label: "Gender", type: "alpha" },
  { id: "location", label: "Location", type: "alpha" },
  { id: "ig", label: "Instagram", type: "numeric" },
  { id: "sn", label: "Snapchat", type: "numeric" },
  { id: "tt", label: "TikTok", type: "numeric" },
  { id: "yt", label: "YouTube", type: "numeric" },
];

function parseFollowerCount(count: string): number {
  if (!count || count === "-") return 0;
  const numStr = count.toLowerCase().replace(/[^0-9.km]/g, "");
  let multiplier = 1;
  if (count.toLowerCase().includes("m")) multiplier = 1000000;
  else if (count.toLowerCase().includes("k")) multiplier = 1000;
  return parseFloat(numStr) * multiplier;
}

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

export const columns: ColumnDef<Talent>[] = [
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
    id: "sort",
    header: () => null,
    cell: () => null,
    size: 28,
    minSize: 28,
    enableSorting: false,
  },
  {
    id: "avatar",
    header: () => null,
    cell: ({ row }) => (
      <img
        src={row.original.avatarImage}
        alt={row.original.name}
        className="size-8 shrink-0 rounded-full object-cover"
      />
    ),
    size: 48,
    minSize: 48,
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: "Talent name",
    cell: ({ row }) => (
      <span className="font-medium text-foreground whitespace-nowrap">{row.original.name}</span>
    ),
  },
  {
    accessorKey: "bio",
    header: "Biography",
    cell: ({ row }) => (
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="text-muted-foreground line-clamp-1 max-w-[200px] cursor-default">
            {row.original.bio}
          </span>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-[300px]">
          {row.original.bio}
        </TooltipContent>
      </Tooltip>
    ),
    enableSorting: false,
  },
  {
    id: "verticals",
    header: "Verticals",
    accessorFn: (row) => row.verticals.join(", "),
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        {row.original.verticals.map((v) => (
          <Badge key={v} variant="secondary">{v}</Badge>
        ))}
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "age",
    header: ({ column }) => <SortableHeader column={column}>Age</SortableHeader>,
    cell: ({ row }) => (
      <span className="font-mono text-xs text-foreground">{row.original.age}</span>
    ),
  },
  {
    accessorKey: "gender",
    header: ({ column }) => <SortableHeader column={column}>Gender</SortableHeader>,
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.original.gender}</span>
    ),
  },
  {
    accessorKey: "location",
    header: ({ column }) => <SortableHeader column={column}>Location</SortableHeader>,
    cell: ({ row }) => (
      <span className="text-muted-foreground whitespace-nowrap">{row.original.location}</span>
    ),
  },
  {
    id: "ig",
    accessorFn: (row) => parseFollowerCount(row.followers.instagram),
    header: ({ column }) => (
      <SortableHeader column={column}>
        <LogoInstagram className="size-4 !stroke-none" />
      </SortableHeader>
    ),
    cell: ({ row }) => (
      <span className="font-mono text-xs text-foreground">{row.original.followers.instagram}</span>
    ),
  },
  {
    id: "sn",
    accessorFn: (row) => parseFollowerCount(row.followers.snapchat),
    header: ({ column }) => (
      <SortableHeader column={column}>
        <LogoSnapchat className="size-4 !stroke-none" />
      </SortableHeader>
    ),
    cell: ({ row }) => (
      <span className="font-mono text-xs text-foreground">{row.original.followers.snapchat}</span>
    ),
  },
  {
    id: "tt",
    accessorFn: (row) => parseFollowerCount(row.followers.tiktok),
    header: ({ column }) => (
      <SortableHeader column={column}>
        <LogoTiktok className="size-4 !stroke-none" />
      </SortableHeader>
    ),
    cell: ({ row }) => (
      <span className="font-mono text-xs text-foreground">{row.original.followers.tiktok}</span>
    ),
  },
  {
    id: "yt",
    accessorFn: (row) => parseFollowerCount(row.followers.youtube),
    header: ({ column }) => (
      <SortableHeader column={column}>
        <LogoYoutube className="size-4 !stroke-none" />
      </SortableHeader>
    ),
    cell: ({ row }) => (
      <span className="font-mono text-xs text-foreground">{row.original.followers.youtube}</span>
    ),
  },
  {
    id: "links",
    header: "Links",
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5">
        {row.original.links.length > 0 ? (
          row.original.links.map((link, i) => {
            const domain = new URL(link).hostname;
            return (
              <a
                key={i}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={`https://www.google.com/s2/favicons?domain=${domain}&sz=32`}
                  alt={domain}
                  className="size-4 shrink-0 rounded-sm object-contain"
                  width={16}
                  height={16}
                />
              </a>
            );
          })
        ) : (
          <span className="text-muted-foreground">-</span>
        )}
      </div>
    ),
    enableSorting: false,
  },
  {
    id: "manager",
    header: "Manager",
    cell: ({ row }) => {
      const managers = row.original.managers;
      if (!managers || managers.length === 0) {
        return <span className="text-muted-foreground">-</span>;
      }
      const first = managers[0];
      const rest = managers.length - 1;
      if (rest === 0) {
        return <span className="text-muted-foreground whitespace-nowrap">{first}</span>;
      }
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="text-muted-foreground whitespace-nowrap cursor-default">
              {first} <span className="text-muted-foreground/60">+{rest}</span>
            </span>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            {managers.join(", ")}
          </TooltipContent>
        </Tooltip>
      );
    },
    enableSorting: false,
  },
  {
    id: "more",
    header: () => null,
    cell: () => <RowMoreMenu />,
    size: 40,
    minSize: 40,
    enableSorting: false,
  },
];
