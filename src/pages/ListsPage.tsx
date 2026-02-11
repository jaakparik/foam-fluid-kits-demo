import { useState, useMemo } from "react";
import { Calendar, ChevronDown } from "foamicons";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { DataToolbar } from "@/components/DataToolbar";
import { FilterCard, ChartCard, BarChartCard } from "@/components/charts";
import { CollectionsSection } from "@/components/CollectionsSection";
import { ListsTable } from "@/components/ListsTable";
import { ListCard } from "@/components/ListCard";
import { SelectionToast } from "@/components/SelectionToast";
import { EditThumbnailDialog } from "@/components/EditThumbnailDialog";
import { listsData, myListsData } from "@/data/lists";
import { avatars } from "@/data/avatars";

const listCategories = ["Agency lists", "My lists"];

const dataByCategory: Record<string, typeof listsData> = {
  "Agency lists": listsData,
  "My lists": myListsData,
};

const avatarImages = avatars.slice(0, 10);

export function ListsPage() {
  const [category, setCategory] = useState("Agency lists");
  const [view, setView] = useState<"table" | "grid">("table");
  const [search, setSearch] = useState("");
  const [selectedCreators, setSelectedCreators] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [pinnedIds, setPinnedIds] = useState<Set<string>>(new Set());
  const [thumbnailOverrides, setThumbnailOverrides] = useState<Record<string, string[]>>({});
  const [editingThumbnailId, setEditingThumbnailId] = useState<string | null>(null);
  const [listsOpen, setListsOpen] = useState(true);

  const activeData = dataByCategory[category];
  const uniqueOwners = useMemo(() => [...new Set(activeData.map((l) => l.owner))].sort(), [activeData]);

  const filtered = useMemo(() => {
    let data = activeData;
    if (selectedCreators.length > 0) {
      data = data.filter((l) => selectedCreators.includes(l.owner));
    }
    if (search) {
      const lower = search.toLowerCase();
      data = data.filter((l) => l.title.toLowerCase().includes(lower));
    }
    return [...data].sort((a, b) => {
      const aPinned = pinnedIds.has(a.id) ? 0 : 1;
      const bPinned = pinnedIds.has(b.id) ? 0 : 1;
      return aPinned - bPinned;
    });
  }, [activeData, selectedCreators, search, pinnedIds]);

  function handleCategoryChange(newCategory: string) {
    setCategory(newCategory);
    setSelectedCreators([]);
    setSelectedItems(new Set());
    setSearch("");
  }

  function handleThumbnailChange(itemId: string, images: string[]) {
    setThumbnailOverrides((prev) => ({ ...prev, [itemId]: images }));
  }

  return (
    <div className="flex flex-1 flex-col rounded-tl-lg bg-background">
      <div className="flex items-stretch gap-2 px-5 pt-5 pb-4">
        <FilterCard icon={<Calendar className="size-4" />} text="Last 30 days" />
        <div className="flex-1">
          <ChartCard
            title="Lists"
            value="+31"
            change="4.7%"
            isPositive={true}
            data={[3, 4, 2, 5, 4, 6, 7]}
            color="chart-purple"
            className="h-full"
          />
        </div>
        <div className="flex-1">
          <ChartCard
            title="Lists shared"
            value="+14"
            change="6.8%"
            isPositive={true}
            data={[2, 1, 3, 4, 3, 5, 6]}
            color="chart-pink"
            className="h-full"
          />
        </div>
        <div className="flex-1">
          <ChartCard
            title="List views"
            value="+2,108"
            change="22.3%"
            isPositive={true}
            data={[1, 3, 2, 5, 4, 6, 8]}
            color="chart-orange"
            className="h-full"
          />
        </div>
        <div className="flex-1">
          <BarChartCard
            title="Most views"
            subtitle="Top Creators Q4"
            value="1,782"
            data={[5, 3, 7, 4, 8, 6, 5]}
            color="chart-green"
            className="h-full"
          />
        </div>
      </div>

      <div className="sticky top-[56px] z-10 bg-background px-5 pb-4">
        <DataToolbar
          label={category}
          labelOptions={listCategories}
          onLabelChange={handleCategoryChange}
          view={view}
          onViewChange={setView}
          count={filtered.length}
          search={search}
          onSearchChange={setSearch}
          creators={uniqueOwners}
          selectedCreators={selectedCreators}
          onSelectedCreatorsChange={setSelectedCreators}
        />
      </div>

      <CollectionsSection view={view} category={category} />

      <Collapsible open={listsOpen} onOpenChange={setListsOpen} className="px-5 pb-5">
        <CollapsibleTrigger className="flex cursor-pointer items-center gap-1 text-xs font-light uppercase text-muted-foreground hover:text-foreground transition-colors">
          Lists
          <ChevronDown
            className={`size-3.5 transition-transform duration-200 ${
              listsOpen ? "" : "-rotate-90"
            }`}
          />
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="flex flex-col gap-4 pt-2">
            {view === "table" ? (
              <ListsTable
                data={filtered}
                pinnedIds={pinnedIds}
                onPinChange={(id, pinned) => {
                  setPinnedIds((prev) => {
                    const next = new Set(prev);
                    if (pinned) next.add(id);
                    else next.delete(id);
                    return next;
                  });
                }}
                selected={selectedItems}
                onSelectedChange={setSelectedItems}
                avatarImages={avatarImages}
                thumbnailOverrides={thumbnailOverrides}
                onThumbnailChange={handleThumbnailChange}
              />
            ) : (
              <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-6">
                {filtered.map((list) => (
                  <ListCard
                    key={list.id}
                    list={list}
                    selected={selectedItems.has(list.id)}
                    onSelectChange={(checked) => {
                      setSelectedItems((prev) => {
                        const next = new Set(prev);
                        if (checked) next.add(list.id);
                        else next.delete(list.id);
                        return next;
                      });
                    }}
                    pinned={pinnedIds.has(list.id)}
                    onPinChange={(pinned) => {
                      setPinnedIds((prev) => {
                        const next = new Set(prev);
                        if (pinned) next.add(list.id);
                        else next.delete(list.id);
                        return next;
                      });
                    }}
                    onEditThumbnail={() => setEditingThumbnailId(list.id)}
                    customAvatars={thumbnailOverrides[list.id]}
                  />
                ))}
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Edit thumbnail dialog for grid view */}
      <EditThumbnailDialog
        open={editingThumbnailId !== null && view === "grid"}
        onOpenChange={(open) => { if (!open) setEditingThumbnailId(null); }}
        currentImages={editingThumbnailId ? (thumbnailOverrides[editingThumbnailId] ?? []) : []}
        onSave={(images) => {
          if (editingThumbnailId) handleThumbnailChange(editingThumbnailId, images);
          setEditingThumbnailId(null);
        }}
        images={avatarImages}
        roundImages
      />

      <SelectionToast
        selectedCount={selectedItems.size}
        isVisible={selectedItems.size > 0}
        onClose={() => setSelectedItems(new Set())}
        onDelete={() => {}}
        onMoveToCollection={() => {}}
        onCopyLinks={() => {}}
      />
    </div>
  );
}
