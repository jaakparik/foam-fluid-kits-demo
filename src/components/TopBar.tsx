import { Search } from "foamicons";

export function TopBar() {
  return (
    <div className="sticky top-0 z-20 flex items-center justify-between bg-sidebar py-2.5 px-6">
      <div className="flex flex-1 items-center justify-center">
        <div className="flex h-9 w-[500px] items-center gap-2 rounded-md border border-input bg-input-tint px-3 py-1 cursor-pointer hover:border-ring transition-colors">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <span className="flex-1 truncate text-sm text-muted-foreground">
            e.g. fashion talent in LA or IG eng rate over 5%
          </span>
          <kbd className="flex h-5 min-w-5 items-center justify-center rounded-sm bg-muted px-1 text-xs font-medium text-muted-foreground">
            ⌘+K
          </kbd>
        </div>
      </div>
    </div>
  );
}
