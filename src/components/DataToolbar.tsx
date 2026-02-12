import { useRef, useState } from "react";
import {
  ArrowLeft,
  ChevronDown,
  List,
  Grid2x2,
  ListFilter,
  ArrowDownUp,
  ArrowDownNarrowWide,
  ArrowDownWideNarrow,
  ArrowDownMapPin,
  ArrowUpMapPin,
  ArrowDownCog,
  ArrowUpAZ,
  ArrowUpZA,
  ArrowDown01,
  ArrowDown10,
  SlidersHorizontal,
  Plus,
  Pencil,
  Share,
} from "foamicons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreatorFilterPopover } from "@/components/CreatorFilterPopover";
import type { SortOption } from "@/components/listDetailColumns";

export interface ColumnOption {
  id: string;
  label: string;
}

interface DataToolbarProps {
  label: string;
  labelOptions?: string[];
  onLabelChange?: (label: string) => void;
  onLabelEdit?: (newLabel: string) => void;
  onBack?: () => void;
  view: "table" | "grid";
  onViewChange: (view: "table" | "grid") => void;
  count: number;
  search: string;
  onSearchChange: (search: string) => void;
  creators: string[];
  selectedCreators: string[];
  onSelectedCreatorsChange: (selected: string[]) => void;
  columnOptions?: ColumnOption[];
  columnVisibility?: Record<string, boolean>;
  onColumnVisibilityChange?: (columnId: string, visible: boolean) => void;
  sortOptions?: SortOption[];
  activeSortId?: string | null;
  activeSortDesc?: boolean;
  onSortChange?: (sortId: string | null) => void;
  hasCustomOrder?: boolean;
  onNewClick?: () => void;
  onShareClick?: () => void;
}

function InlineEditableTitle({
  value,
  onSave,
}: {
  value: string;
  onSave?: (newValue: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  function startEditing() {
    setDraft(value);
    setIsEditing(true);
    requestAnimationFrame(() => inputRef.current?.select());
  }

  function save() {
    setIsEditing(false);
    const trimmed = draft.trim();
    if (trimmed && trimmed !== value) {
      onSave?.(trimmed);
    }
  }

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={save}
        onKeyDown={(e) => {
          if (e.key === "Enter") inputRef.current?.blur();
          if (e.key === "Escape") {
            setDraft(value);
            setIsEditing(false);
          }
        }}
        className="text-xl font-medium text-foreground bg-transparent border-none outline-none p-0 m-0 leading-normal"
        style={{ width: `${Math.max(draft.length, 1)}ch` }}
      />
    );
  }

  return (
    <span
      className="group/title inline-flex items-center gap-1.5 cursor-text"
      onClick={startEditing}
    >
      <span className="text-xl font-medium text-foreground">{value}</span>
      <Pencil className="size-3.5 text-icon-stroke-muted opacity-0 group-hover/title:opacity-100 transition-opacity" />
    </span>
  );
}

export function DataToolbar({
  label,
  labelOptions,
  onLabelChange,
  onLabelEdit,
  onBack,
  view,
  onViewChange,
  count,
  search,
  onSearchChange,
  creators,
  selectedCreators,
  onSelectedCreatorsChange,
  columnOptions,
  columnVisibility,
  onColumnVisibilityChange,
  sortOptions,
  activeSortId,
  activeSortDesc,
  onSortChange,
  hasCustomOrder,
  onNewClick,
  onShareClick,
}: DataToolbarProps) {
  const isCustomActive = hasCustomOrder && activeSortId === null;

  // Dynamic sort button icon based on active sort
  const numericSortIds = new Set(["age", "ig", "sn", "tt", "yt"]);
  let SortButtonIcon = isCustomActive ? ArrowDownCog : ArrowDownUp;
  if (activeSortId === "name") {
    SortButtonIcon = activeSortDesc ? ArrowUpZA : ArrowUpAZ;
  } else if (activeSortId === "location") {
    SortButtonIcon = activeSortDesc ? ArrowUpMapPin : ArrowDownMapPin;
  } else if (activeSortId && numericSortIds.has(activeSortId)) {
    SortButtonIcon = activeSortDesc ? ArrowDownWideNarrow : ArrowDownNarrowWide;
  }

  return (
    <div className="flex items-center justify-between">
      {/* Left side — Back + title OR dropdown + count */}
      <div className="flex items-center gap-2">
        {onBack ? (
          <>
            <Button variant="ghost" size="icon-sm" className="cursor-pointer" onClick={onBack}>
              <ArrowLeft className="size-4" />
            </Button>
            <InlineEditableTitle value={label} onSave={onLabelEdit} />
          </>
        ) : labelOptions && onLabelChange ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex h-8 items-center gap-1 rounded-md bg-secondary px-3 text-sm text-secondary-foreground cursor-pointer hover:bg-secondary/80 transition-colors">
                {label}
                <ChevronDown className="size-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {labelOptions.map((option) => (
                <DropdownMenuItem
                  key={option}
                  className={`cursor-pointer ${option === label ? "font-medium" : ""}`}
                  onSelect={() => onLabelChange(option)}
                >
                  {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <button className="flex h-8 items-center gap-1 rounded-md bg-secondary px-3 text-sm text-secondary-foreground cursor-pointer hover:bg-secondary/80 transition-colors">
            {label}
            <ChevronDown className="size-3.5" />
          </button>
        )}
        {!onBack && (
          <span className="text-sm font-light text-muted-foreground">
            {count.toLocaleString()}
          </span>
        )}
      </div>

      {/* Right side — Search, view toggle, filter, sort, new */}
      <div className="flex items-center gap-2">
        {/* Quick filter input */}
        <div className="flex h-9 w-[200px] items-center gap-1 rounded-md border border-input bg-input-tint px-3 py-1">
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name"
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
        </div>

        {/* View toggle */}
        <div className="flex items-center rounded-md border border-border">
          <button
            onClick={() => onViewChange("table")}
            className={`flex size-8 items-center justify-center rounded-md cursor-pointer transition-colors ${
              view === "table"
                ? "bg-secondary text-secondary-foreground"
                : "text-icon-stroke hover:bg-secondary/50"
            }`}
          >
            <List className="size-4" />
          </button>
          <button
            onClick={() => onViewChange("grid")}
            className={`flex size-8 items-center justify-center rounded-md cursor-pointer transition-colors ${
              view === "grid"
                ? "bg-secondary text-secondary-foreground"
                : "text-icon-stroke hover:bg-secondary/50"
            }`}
          >
            <Grid2x2 className="size-4" />
          </button>
        </div>

        {/* Filter button */}
        <CreatorFilterPopover
          creators={creators}
          selected={selectedCreators}
          onSelectionChange={onSelectedCreatorsChange}
        >
          <button className="flex size-8 items-center justify-center rounded-md bg-secondary text-secondary-foreground cursor-pointer hover:bg-secondary/80 transition-colors">
            <ListFilter className="size-4" />
          </button>
        </CreatorFilterPopover>

        {/* Sort dropdown */}
        {sortOptions && onSortChange ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm" className="bg-secondary cursor-pointer">
                <SortButtonIcon className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[180px]">
              {sortOptions.map((opt) => {
                const isActive = activeSortId === opt.id;
                let Icon = null;
                if (isActive) {
                  if (opt.id === "location") {
                    Icon = activeSortDesc ? ArrowUpMapPin : ArrowDownMapPin;
                  } else if (opt.type === "alpha") {
                    Icon = activeSortDesc ? ArrowUpZA : ArrowUpAZ;
                  } else {
                    Icon = activeSortDesc ? ArrowDown10 : ArrowDown01;
                  }
                }
                return (
                  <DropdownMenuItem
                    key={opt.id}
                    className={`cursor-pointer gap-2 ${isActive ? "font-medium text-foreground" : ""}`}
                    onSelect={() => onSortChange(opt.id)}
                  >
                    {Icon ? (
                      <Icon className="size-4 shrink-0 text-icon-stroke" />
                    ) : (
                      <span className="size-4 shrink-0" />
                    )}
                    {opt.label}
                  </DropdownMenuItem>
                );
              })}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className={`cursor-pointer gap-2 ${!hasCustomOrder ? "opacity-50 pointer-events-none" : ""} ${isCustomActive ? "font-medium text-foreground" : ""}`}
                onSelect={() => onSortChange(null)}
                disabled={!hasCustomOrder}
              >
                {isCustomActive ? (
                  <ArrowDownCog className="size-4 shrink-0 text-icon-stroke" />
                ) : (
                  <span className="size-4 shrink-0" />
                )}
                Agency sorting
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm" className="bg-secondary cursor-pointer">
                <ArrowDownUp className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="cursor-pointer">Title</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">Owner</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">Updated</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {/* Options button */}
        {columnOptions && columnVisibility && onColumnVisibilityChange ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm" className="bg-secondary cursor-pointer">
                <SlidersHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {columnOptions.map((col) => (
                <DropdownMenuCheckboxItem
                  key={col.id}
                  checked={columnVisibility[col.id] !== false}
                  onCheckedChange={(checked) => onColumnVisibilityChange(col.id, !!checked)}
                  onSelect={(e) => e.preventDefault()}
                  className="cursor-pointer"
                >
                  {col.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button variant="ghost" size="icon-sm" className="bg-secondary cursor-pointer">
            <SlidersHorizontal className="size-4" />
          </Button>
        )}

        {/* Action button */}
        {onShareClick ? (
          <button
            onClick={onShareClick}
            className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground cursor-pointer hover:bg-primary/90 transition-colors"
          >
            <Share className="size-4" />
          </button>
        ) : onNewClick ? (
          <button
            onClick={onNewClick}
            className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground cursor-pointer hover:bg-primary/90 transition-colors"
          >
            <Plus className="size-4" />
          </button>
        ) : (
          <button
            className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground cursor-pointer hover:bg-primary/90 transition-colors"
          >
            <Plus className="size-4" />
          </button>
        )}
      </div>
    </div>
  );
}
