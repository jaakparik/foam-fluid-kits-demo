import { useState, useMemo } from "react";
import { Calendar } from "foamicons";
import { DataToolbar } from "@/components/DataToolbar";
import { FilterCard, ChartCard, BarChartCard } from "@/components/charts";
import { MediaKitsTable } from "@/components/MediaKitsTable";
import { MediaKitCard } from "@/components/MediaKitCard";
import { SelectionToast } from "@/components/SelectionToast";
import { EditThumbnailDialog } from "@/components/EditThumbnailDialog";
import { mediaKitsData, myMediaKitsData } from "@/data/mediaKits";
import { avatars } from "@/data/avatars";

const mediaKitCategories = ["Agency media kits", "My media kits"];
const dataByCategory: Record<string, typeof mediaKitsData> = {
  "Agency media kits": mediaKitsData,
  "My media kits": myMediaKitsData,
};

const avatarImages = avatars.slice(0, 10);

export function MediaKitsPage() {
  const [category, setCategory] = useState("Agency media kits");
  const [view, setView] = useState<"table" | "grid">("table");
  const [search, setSearch] = useState("");
  const [selectedCreators, setSelectedCreators] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [thumbnailOverrides, setThumbnailOverrides] = useState<Record<string, string[]>>({});
  const [editingThumbnailId, setEditingThumbnailId] = useState<string | null>(null);

  const activeData = dataByCategory[category];
  const uniqueCreators = useMemo(
    () => [...new Set(activeData.map((k) => k.creator))].sort(),
    [activeData],
  );

  function handleCategoryChange(newCategory: string) {
    setCategory(newCategory);
    setSearch("");
    setSelectedCreators([]);
    setSelectedItems(new Set());
  }

  function handleThumbnailChange(itemId: string, images: string[]) {
    setThumbnailOverrides((prev) => ({ ...prev, [itemId]: images }));
  }

  const filtered = useMemo(() => {
    let data = activeData;
    if (selectedCreators.length > 0) {
      data = data.filter((k) => selectedCreators.includes(k.creator));
    }
    if (search) {
      const lower = search.toLowerCase();
      data = data.filter((k) => k.title.toLowerCase().includes(lower));
    }
    return data;
  }, [activeData, selectedCreators, search]);

  return (
    <div className="flex flex-1 flex-col rounded-tl-lg bg-background">
      <div className="flex items-stretch gap-2 px-5 pt-5 pb-4">
        <FilterCard icon={<Calendar className="size-4" />} text="Last 30 days" />
        <div className="flex-1">
          <ChartCard
            title="Media kits"
            value="+24"
            change="1.2%"
            isPositive={true}
            data={[1, 2, 1, 3, 5, 4, 7]}
            color="chart-purple"
            className="h-full"
          />
        </div>
        <div className="flex-1">
          <ChartCard
            title="Media kits shared"
            value="+12"
            change="5.3%"
            isPositive={true}
            data={[2, 3, 2, 4, 3, 5, 6]}
            color="chart-pink"
            className="h-full"
          />
        </div>
        <div className="flex-1">
          <ChartCard
            title="Media kit views"
            value="+1,325"
            change="18.7%"
            isPositive={true}
            data={[2, 5, 1, 3, 2, 6, 7]}
            color="chart-orange"
            className="h-full"
          />
        </div>
        <div className="flex-1">
          <BarChartCard
            title="Most views"
            subtitle="Mr Beast"
            value="1,345"
            data={[3, 5, 2, 8, 4, 7, 6]}
            color="chart-green"
            className="h-full"
          />
        </div>
      </div>

      <div className="sticky top-[56px] z-10 bg-background px-5 pb-4">
      <DataToolbar
        label={category}
        labelOptions={mediaKitCategories}
        onLabelChange={handleCategoryChange}
        view={view}
        onViewChange={setView}
        count={filtered.length}
        search={search}
        onSearchChange={setSearch}
        creators={uniqueCreators}
        selectedCreators={selectedCreators}
        onSelectedCreatorsChange={setSelectedCreators}
      />
      </div>

      <div className="flex flex-col gap-4 px-5 pb-5">
      {view === "table" ? (
        <MediaKitsTable
          data={filtered}
          selected={selectedItems}
          onSelectedChange={setSelectedItems}
          avatarImages={avatarImages}
          thumbnailOverrides={thumbnailOverrides}
          onThumbnailChange={handleThumbnailChange}
        />
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-6">
          {filtered.map((kit) => (
            <MediaKitCard
              key={kit.id}
              kit={kit}
              customThumbnail={thumbnailOverrides[kit.id]?.[0]}
              onEditThumbnail={() => setEditingThumbnailId(kit.id)}
            />
          ))}
        </div>
      )}
      </div>

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
      />

      <SelectionToast
        selectedCount={selectedItems.size}
        isVisible={selectedItems.size > 0}
        onSelectAll={() => setSelectedItems(new Set(filtered.map((k) => k.id)))}
        onClose={() => setSelectedItems(new Set())}
        onDelete={() => {}}
        onCopyLinks={() => {}}
      />
    </div>
  );
}
