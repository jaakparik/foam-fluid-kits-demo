import { useState } from "react";
import { ChevronDown, Plus } from "foamicons";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { CollectionCard } from "@/components/CollectionCard";
import { CollectionsTable } from "@/components/CollectionsTable";
import { collectionsData, myCollectionsData } from "@/data/collections";

const dataByCategory: Record<string, typeof collectionsData> = {
  "Agency lists": collectionsData,
  "My lists": myCollectionsData,
};

interface CollectionsSectionProps {
  view: "table" | "grid";
  category: string;
}

export function CollectionsSection({ view, category }: CollectionsSectionProps) {
  const [open, setOpen] = useState(false);
  const [pinnedIds, setPinnedIds] = useState<Set<string>>(new Set());

  const activeData = dataByCategory[category] ?? collectionsData;

  const sorted = [...activeData].sort((a, b) => {
    const aPinned = pinnedIds.has(a.id) ? 0 : 1;
    const bPinned = pinnedIds.has(b.id) ? 0 : 1;
    return aPinned - bPinned;
  });

  function handlePinChange(id: string, pinned: boolean) {
    setPinnedIds((prev) => {
      const next = new Set(prev);
      if (pinned) next.add(id);
      else next.delete(id);
      return next;
    });
  }

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="px-5 pb-4">
      {/* Header */}
      <CollapsibleTrigger className="flex cursor-pointer items-center gap-1 text-xs font-light uppercase text-muted-foreground hover:text-foreground transition-colors">
        Collections
        <ChevronDown
          className={`size-3.5 transition-transform duration-200 ${
            open ? "" : "-rotate-90"
          }`}
        />
      </CollapsibleTrigger>

      {/* Content */}
      <CollapsibleContent>
        {view === "table" ? (
          <div className="pt-2">
            <CollectionsTable
              data={sorted}
              pinnedIds={pinnedIds}
              onPinChange={handlePinChange}
            />
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2 pt-2">
            {sorted.map((col) => (
              <CollectionCard
                key={col.id}
                collection={col}
                pinned={pinnedIds.has(col.id)}
                onPinChange={(pinned) => handlePinChange(col.id, pinned)}
              />
            ))}
            <button className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground">
              <Plus className="size-4 shrink-0" />
              New collection
            </button>
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}
