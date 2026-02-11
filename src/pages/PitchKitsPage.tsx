import { useState, useMemo } from "react";
import { Calendar } from "foamicons";
import { DataToolbar } from "@/components/DataToolbar";
import { FilterCard, ChartCard, BarChartCard } from "@/components/charts";
import { PitchKitsTable } from "@/components/PitchKitsTable";
import { PitchKitCard } from "@/components/PitchKitCard";
import { SelectionToast } from "@/components/SelectionToast";
import { pitchKitsData } from "@/data/pitchKits";

const uniqueCreators = [...new Set(pitchKitsData.map((k) => k.creator))].sort();

export function PitchKitsPage() {
  const [view, setView] = useState<"table" | "grid">("table");
  const [search, setSearch] = useState("");
  const [selectedCreators, setSelectedCreators] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [thumbnailOverrides, setThumbnailOverrides] = useState<Record<string, string[]>>({});

  const filtered = useMemo(() => {
    let data = pitchKitsData;
    if (selectedCreators.length > 0) {
      data = data.filter((k) => selectedCreators.includes(k.creator));
    }
    if (search) {
      const lower = search.toLowerCase();
      data = data.filter((k) => k.title.toLowerCase().includes(lower));
    }
    return data;
  }, [selectedCreators, search]);

  return (
    <div className="flex flex-1 flex-col rounded-tl-lg bg-background">
      <div className="flex items-stretch gap-2 px-5 pt-5 pb-4">
        <FilterCard icon={<Calendar className="size-4" />} text="Last 30 days" />
        <div className="flex-1">
          <ChartCard
            title="Pitch kits"
            value="+18"
            change="3.4%"
            isPositive={true}
            data={[2, 3, 1, 4, 3, 5, 6]}
            color="chart-purple"
            className="h-full"
          />
        </div>
        <div className="flex-1">
          <ChartCard
            title="Pitch kits shared"
            value="+9"
            change="2.1%"
            isPositive={true}
            data={[1, 2, 3, 2, 4, 3, 5]}
            color="chart-pink"
            className="h-full"
          />
        </div>
        <div className="flex-1">
          <ChartCard
            title="Pitch kit views"
            value="+847"
            change="12.5%"
            isPositive={true}
            data={[3, 2, 4, 5, 3, 6, 7]}
            color="chart-orange"
            className="h-full"
          />
        </div>
        <div className="flex-1">
          <BarChartCard
            title="Most views"
            subtitle="Nike Campaign"
            value="892"
            data={[4, 6, 3, 7, 5, 8, 5]}
            color="chart-green"
            className="h-full"
          />
        </div>
      </div>

      <div className="sticky top-[56px] z-10 bg-background px-5 pb-4">
        <DataToolbar
          label="Agency pitch kits"
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
          <PitchKitsTable
            data={filtered}
            selected={selectedItems}
            onSelectedChange={setSelectedItems}
            thumbnailOverrides={thumbnailOverrides}
            onThumbnailChange={(id, images) => setThumbnailOverrides((prev) => ({ ...prev, [id]: images }))}
          />
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-6">
            {filtered.map((kit, index) => (
              <PitchKitCard key={kit.id} kit={kit} index={index} customImages={thumbnailOverrides[kit.id]} />
            ))}
          </div>
        )}
      </div>

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
