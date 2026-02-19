import {
  User,
  Images,
  ContentUser,
  List,
  LayoutGrid,
  LayoutDashboard,
  SlidersHorizontal,
  ListFilter,
  ArrowDownUp,
  ChevronDown,
} from "foamicons";
import { Button } from "@/components/ui/button";
import type { ViewMode } from "@/components/PageToolbar";

type SearchTab = "talent" | "posts" | "kits" | "lists";

interface PostSearchToolbarProps {
  searchTerm: string;
  activeTab: SearchTab;
  onTabChange: (tab: SearchTab) => void;
  talentCount: number;
  postsCount: number;
  kitsCount: number;
  listsCount: number;
  resultsCount: number;
  previousVersions: number;
  view: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

const tabs: { id: SearchTab; label: string; icon: typeof User }[] = [
  { id: "talent", label: "Talent", icon: User },
  { id: "posts", label: "Posts", icon: Images },
  { id: "kits", label: "Kits", icon: ContentUser },
  { id: "lists", label: "Lists", icon: List },
];

export function PostSearchToolbar({
  searchTerm,
  activeTab,
  onTabChange,
  talentCount,
  postsCount,
  kitsCount,
  listsCount,
  resultsCount,
  previousVersions,
  view,
  onViewChange,
}: PostSearchToolbarProps) {
  const counts: Record<SearchTab, number> = {
    talent: talentCount,
    posts: postsCount,
    kits: kitsCount,
    lists: listsCount,
  };

  return (
    <div className="rounded-lg border border-border">
      {/* Top row */}
      <div className="flex items-center justify-between p-2">
        {/* Left: Category tabs */}
        <div className="flex items-center gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex h-8 items-center gap-2 rounded px-3 text-xs font-medium cursor-pointer transition-colors ${
                  isActive
                    ? "bg-secondary text-secondary-foreground"
                    : "text-foreground hover:bg-secondary/50"
                }`}
              >
                <Icon className="size-4" />
                <span>{tab.label}</span>
                <span className="text-sm text-muted-foreground">
                  {counts[tab.id]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right: View mode + actions */}
        <div className="flex items-center gap-2">
          {/* Mode selector */}
          <div className="flex items-center rounded border border-border">
            <button
              onClick={() => onViewChange("list")}
              className={`flex size-8 items-center justify-center rounded cursor-pointer transition-colors ${
                view === "list"
                  ? "bg-secondary text-secondary-foreground"
                  : "text-icon-stroke hover:bg-secondary/50"
              }`}
            >
              <List className="size-4" />
            </button>
            <button
              onClick={() => onViewChange("grid")}
              className={`flex size-8 items-center justify-center rounded cursor-pointer transition-colors ${
                view === "grid"
                  ? "bg-secondary text-secondary-foreground"
                  : "text-icon-stroke hover:bg-secondary/50"
              }`}
            >
              <LayoutGrid className="size-4" />
            </button>
            <button
              onClick={() => onViewChange("layout")}
              className={`flex size-8 items-center justify-center rounded cursor-pointer transition-colors ${
                view === "layout"
                  ? "bg-secondary text-secondary-foreground"
                  : "text-icon-stroke hover:bg-secondary/50"
              }`}
            >
              <LayoutDashboard className="size-4" />
            </button>
          </div>

          <Button variant="ghost" size="icon-sm" className="bg-secondary cursor-pointer">
            <SlidersHorizontal className="size-4" />
          </Button>
          <Button variant="ghost" size="icon-sm" className="bg-secondary cursor-pointer">
            <ListFilter className="size-4" />
          </Button>
          <Button variant="ghost" size="icon-sm" className="bg-secondary cursor-pointer">
            <ArrowDownUp className="size-4" />
          </Button>
        </div>
      </div>

      {/* Bottom row: Search info */}
      <div className="flex flex-col gap-2 px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="text-base font-medium text-muted-foreground">
            Search contains
          </span>
          <span className="text-base font-medium text-muted-foreground">
            "<span className="text-brand">{searchTerm}</span>"
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium text-foreground">{resultsCount}</span>
          <span className="font-light text-muted-foreground">results found</span>
          <span className="size-1 rounded-full bg-muted-foreground/40" />
          <span className="font-medium text-foreground">{previousVersions}</span>
          <span className="font-light text-muted-foreground">previous versions</span>
          <ChevronDown className="size-4 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
}
