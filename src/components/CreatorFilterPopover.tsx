import { useState, useMemo } from "react";
import { Search } from "foamicons";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAvatar } from "@/data/avatars";

interface CreatorFilterPopoverProps {
  creators: string[];
  selected: string[];
  onSelectionChange: (selected: string[]) => void;
  children: React.ReactNode;
}

export function CreatorFilterPopover({
  creators,
  selected,
  onSelectionChange,
  children,
}: CreatorFilterPopoverProps) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search) return creators;
    const lower = search.toLowerCase();
    return creators.filter((c) => c.toLowerCase().includes(lower));
  }, [creators, search]);

  function toggle(creator: string) {
    if (selected.includes(creator)) {
      onSelectionChange(selected.filter((s) => s !== creator));
    } else {
      onSelectionChange([...selected, creator]);
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent align="end" className="w-[344px] p-0">
        {/* Header + search */}
        <div className="flex flex-col gap-3 p-3">
          <span className="text-sm font-medium text-foreground">
            Select creator
          </span>
          <div className="flex h-9 items-center gap-2 rounded-md border border-input bg-input-tint px-3 py-1">
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Name or handle"
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
            <kbd className="flex h-5 min-w-5 items-center justify-center rounded-sm bg-muted px-1 text-xs font-medium text-muted-foreground">
              ⌘F
            </kbd>
          </div>
        </div>

        {/* Creator list */}
        <div className="max-h-[280px] overflow-y-auto px-3 pb-3">
          <div className="flex flex-col gap-1">
            {filtered.map((creator, i) => {
              const isSelected = selected.includes(creator);
              return (
                <button
                  key={creator}
                  onClick={() => toggle(creator)}
                  className={`flex items-center gap-2 rounded-md py-1 pl-3 pr-1 cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-primary-tint"
                      : "hover:bg-accent"
                  }`}
                >
                  <Avatar className="size-8 shrink-0">
                    <AvatarImage src={getAvatar(i)} alt={creator} />
                    <AvatarFallback className="text-xs">
                      {creator
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-1 flex-col items-start gap-0.5 text-left min-w-0">
                    <span className="text-sm font-medium text-foreground truncate w-full">
                      {creator}
                    </span>
                    <span className="text-sm text-muted-foreground truncate w-full">
                      @{creator.toLowerCase().replace(/\s+/g, "")}
                    </span>
                  </div>
                  <Checkbox
                    checked={isSelected}
                    className="pointer-events-none"
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border p-3">
          <span className="text-sm text-muted-foreground">
            {selected.length > 0
              ? `${selected.length} selected`
              : "Select one or more"}
          </span>
        </div>
      </PopoverContent>
    </Popover>
  );
}
