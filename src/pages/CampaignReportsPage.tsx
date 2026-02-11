import { useState, useMemo } from "react";
import { Calendar } from "foamicons";
import { DataToolbar } from "@/components/DataToolbar";
import { FilterCard, ChartCard, BarChartCard } from "@/components/charts";
import { CampaignReportsTable } from "@/components/CampaignReportsTable";
import { CampaignReportCard } from "@/components/CampaignReportCard";
import { SelectionToast } from "@/components/SelectionToast";
import { campaignReportsData } from "@/data/campaignReports";

const uniqueCreators = [...new Set(campaignReportsData.map((k) => k.creator))].sort();

export function CampaignReportsPage() {
  const [view, setView] = useState<"table" | "grid">("table");
  const [search, setSearch] = useState("");
  const [selectedCreators, setSelectedCreators] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [thumbnailOverrides, setThumbnailOverrides] = useState<Record<string, string[]>>({});

  const filtered = useMemo(() => {
    let data = campaignReportsData;
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
            title="Campaigns"
            value="+7"
            change="2.8%"
            isPositive={true}
            data={[2, 3, 2, 4, 3, 4, 5]}
            color="chart-purple"
            className="h-full"
          />
        </div>
        <div className="flex-1">
          <ChartCard
            title="Reports shared"
            value="+15"
            change="9.1%"
            isPositive={true}
            data={[1, 3, 2, 4, 5, 4, 6]}
            color="chart-pink"
            className="h-full"
          />
        </div>
        <div className="flex-1">
          <ChartCard
            title="Report views"
            value="+3,412"
            change="24.6%"
            isPositive={true}
            data={[2, 4, 3, 5, 4, 7, 8]}
            color="chart-orange"
            className="h-full"
          />
        </div>
        <div className="flex-1">
          <BarChartCard
            title="Most views"
            subtitle="Summer Launch"
            value="2,156"
            data={[6, 4, 8, 5, 7, 9, 6]}
            color="chart-green"
            className="h-full"
          />
        </div>
      </div>

      <div className="sticky top-[56px] z-10 bg-background px-5 pb-4">
        <DataToolbar
          label="Campaign reports"
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
          <CampaignReportsTable
            data={filtered}
            selected={selectedItems}
            onSelectedChange={setSelectedItems}
            thumbnailOverrides={thumbnailOverrides}
            onThumbnailChange={(id, images) => setThumbnailOverrides((prev) => ({ ...prev, [id]: images }))}
          />
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-6">
            {filtered.map((kit, index) => (
              <CampaignReportCard key={kit.id} kit={kit} index={index} customImages={thumbnailOverrides[kit.id]} />
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
