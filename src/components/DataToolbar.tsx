import {
  ChevronDown,
  List,
  Grid2x2,
  ListFilter,
  ArrowDownUp,
  Plus,
} from "foamicons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreatorFilterPopover } from "@/components/CreatorFilterPopover";

interface DataToolbarProps {
  label: string;
  labelOptions?: string[];
  onLabelChange?: (label: string) => void;
  view: "table" | "grid";
  onViewChange: (view: "table" | "grid") => void;
  count: number;
  search: string;
  onSearchChange: (search: string) => void;
  creators: string[];
  selectedCreators: string[];
  onSelectedCreatorsChange: (selected: string[]) => void;
}

export function DataToolbar({
  label,
  labelOptions,
  onLabelChange,
  view,
  onViewChange,
  count,
  search,
  onSearchChange,
  creators,
  selectedCreators,
  onSelectedCreatorsChange,
}: DataToolbarProps) {
  return (
    <div className="flex items-center justify-between">
      {/* Left side — Agency filter + count */}
      <div className="flex items-center gap-2">
        {labelOptions && onLabelChange ? (
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
        <span className="text-sm font-light text-muted-foreground">
          {count.toLocaleString()}
        </span>
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm" className="bg-secondary cursor-pointer">
              <ArrowDownUp className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="cursor-pointer">Title</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">Owner</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">Date</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* New button */}
        <button className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground cursor-pointer hover:bg-primary/90 transition-colors">
          <Plus className="size-4" />
        </button>
      </div>
    </div>
  );
}
