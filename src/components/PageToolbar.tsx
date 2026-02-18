import {
  ChevronDown,
  List,
  LayoutGrid,
  LayoutDashboard,
  SlidersHorizontal,
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

export type ViewMode = "list" | "grid" | "layout";

export interface PageToolbarProps {
  /** Current label shown in the agency filter dropdown */
  label: string;
  /** Options for the agency filter dropdown */
  labelOptions?: string[];
  /** Called when a dropdown option is selected */
  onLabelChange?: (label: string) => void;
  /** Total count shown next to the agency filter */
  count: number;

  /** Current view mode */
  view: ViewMode;
  /** Called when the view mode changes */
  onViewChange: (view: ViewMode) => void;

  /** Current search value */
  search: string;
  /** Called when the search value changes */
  onSearchChange: (search: string) => void;
  /** Placeholder for the quickfilter input */
  searchPlaceholder?: string;

  /** Creators available in the filter popover */
  creators: string[];
  /** Currently selected creators */
  selectedCreators: string[];
  /** Called when creator selection changes */
  onSelectedCreatorsChange: (selected: string[]) => void;

  /** Called when the Options button is clicked */
  onOptionsClick?: () => void;
  /** Called when the Sort button is clicked */
  onSortClick?: () => void;
  /** Called when the primary CTA (+) is clicked */
  onPrimaryClick?: () => void;
}

export function PageToolbar({
  label,
  labelOptions,
  onLabelChange,
  count,
  view,
  onViewChange,
  search,
  onSearchChange,
  searchPlaceholder = "Search by title",
  creators,
  selectedCreators,
  onSelectedCreatorsChange,
  onOptionsClick,
  onSortClick,
  onPrimaryClick,
}: PageToolbarProps) {
  return (
    <div className="flex items-center justify-between">
      {/* Left side — Agency filter */}
      <div className="flex items-center gap-2">
        {labelOptions && onLabelChange ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex h-9 items-center gap-2 rounded-md bg-secondary px-4 text-sm font-medium text-secondary-foreground cursor-pointer hover:bg-secondary/80 transition-colors">
                {label}
                <ChevronDown className="size-4" />
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
          <button className="flex h-9 items-center gap-2 rounded-md bg-secondary px-4 text-sm font-medium text-secondary-foreground cursor-pointer hover:bg-secondary/80 transition-colors">
            {label}
            <ChevronDown className="size-4" />
          </button>
        )}
        <span className="text-sm font-light text-muted-foreground">
          {count.toLocaleString()}
        </span>
      </div>

      {/* Right side — Mode selector and actions */}
      <div className="flex items-center gap-2">
        {/* Quickfilter input */}
        <div className="flex h-9 w-[200px] items-center gap-1 rounded-md border border-input bg-input-tint px-3 py-1">
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
        </div>

        {/* Mode selector */}
        <div className="flex items-center rounded-md border border-border">
          <button
            onClick={() => onViewChange("list")}
            className={`flex size-8 items-center justify-center rounded-md cursor-pointer transition-colors ${
              view === "list"
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
            <LayoutGrid className="size-4" />
          </button>
          <button
            onClick={() => onViewChange("layout")}
            className={`flex size-8 items-center justify-center rounded-md cursor-pointer transition-colors ${
              view === "layout"
                ? "bg-secondary text-secondary-foreground"
                : "text-icon-stroke hover:bg-secondary/50"
            }`}
          >
            <LayoutDashboard className="size-4" />
          </button>
        </div>

        {/* Options */}
        <Button
          variant="ghost"
          size="icon-sm"
          className="bg-secondary cursor-pointer"
          onClick={onOptionsClick}
        >
          <SlidersHorizontal className="size-4" />
        </Button>

        {/* Filters */}
        <CreatorFilterPopover
          creators={creators}
          selected={selectedCreators}
          onSelectionChange={onSelectedCreatorsChange}
        >
          <button className="flex size-8 items-center justify-center rounded-md bg-secondary text-secondary-foreground cursor-pointer hover:bg-secondary/80 transition-colors">
            <ListFilter className="size-4" />
          </button>
        </CreatorFilterPopover>

        {/* Sort */}
        <Button
          variant="ghost"
          size="icon-sm"
          className="bg-secondary cursor-pointer"
          onClick={onSortClick}
        >
          <ArrowDownUp className="size-4" />
        </Button>

        {/* Primary CTA */}
        <button
          onClick={onPrimaryClick}
          className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground cursor-pointer hover:bg-primary/90 transition-colors"
        >
          <Plus className="size-4" />
        </button>
      </div>
    </div>
  );
}
