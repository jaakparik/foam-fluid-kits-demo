import { useState } from "react";
import type { RowSelectionState, SortingState, VisibilityState } from "@tanstack/react-table";
import { DataToolbar } from "@/components/DataToolbar";
import { TalentDirectoryTable } from "@/components/TalentDirectoryTable";
import { TalentCard } from "@/components/TalentCard";
import { SelectionToast } from "@/components/SelectionToast";
import type { ColumnOption } from "@/components/DataToolbar";
import {
  detailColumnOptions,
  defaultColumnVisibility,
  sortColumnOptions,
} from "@/components/listDetailColumns";
import { talents } from "@/data/talents";
import { posts } from "@/data/posts";

const directoryOptions = ["My Talent", "Agency Talent"];

export function TalentDirectoryPage() {
  const [category, setCategory] = useState("My Talent");
  const [view, setView] = useState<"table" | "grid">("table");
  const [search, setSearch] = useState("");
  const [selectedCreators, setSelectedCreators] = useState<string[]>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(defaultColumnVisibility);
  const [columnOptions, setColumnOptions] = useState<ColumnOption[]>(detailColumnOptions);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  // Build media map: talent name → up to 10 post media (thumbnail + optional video)
  const mediaByTalent = new Map<string, { thumbnail: string; video?: string }[]>();
  for (const post of posts) {
    const list = mediaByTalent.get(post.talentName) ?? [];
    if (list.length < 10) list.push({ thumbnail: post.thumbnail, video: post.video });
    mediaByTalent.set(post.talentName, list);
  }

  const isAgency = category === "Agency Talent";
  const visibleTalent = isAgency ? talents : talents.slice(0, 15);
  const talentNames = visibleTalent.map((t) => t.name);

  // Hide manager column in My Talent, show in Agency Talent
  const mergedVisibility = {
    ...columnVisibility,
    manager: isAgency ? (columnVisibility.manager ?? true) : false,
  };

  // Derive table column order from the reorderable options
  const columnOrder = ["select", "avatar", "name", ...columnOptions.map((c) => c.id), "save", "more"];

  const activeSortId = sorting.length > 0 ? sorting[0].id : null;
  const activeSortDesc = sorting.length > 0 ? sorting[0].desc : false;

  function handleSortChange(sortId: string | null) {
    if (sortId === null) {
      setSorting([]);
    } else if (sortId === activeSortId) {
      setSorting([{ id: sortId, desc: !activeSortDesc }]);
    } else {
      setSorting([{ id: sortId, desc: false }]);
    }
  }

  return (
    <div className="flex flex-1 flex-col rounded-tl-lg bg-background min-h-0">
      <div className="shrink-0 px-5 pt-5 pb-4">
        <DataToolbar
          label={category}
          labelOptions={directoryOptions}
          onLabelChange={setCategory}
          view={view}
          onViewChange={setView}
          count={visibleTalent.length}
          search={search}
          onSearchChange={setSearch}
          creators={talentNames}
          selectedCreators={selectedCreators}
          onSelectedCreatorsChange={setSelectedCreators}
          columnOptions={columnOptions}
          columnVisibility={mergedVisibility}
          onColumnVisibilityChange={(colId, visible) =>
            setColumnVisibility((prev) => ({ ...prev, [colId]: visible }))
          }
          onColumnOptionsReorder={setColumnOptions}
          sortOptions={sortColumnOptions}
          activeSortId={activeSortId}
          activeSortDesc={activeSortDesc}
          onSortChange={handleSortChange}
          onNewClick={() => {}}
        />
      </div>

      <div className="flex-1 min-h-0 overflow-auto px-5 pb-5 [&_[data-slot=table-container]]:overflow-visible">
        {view === "table" && (
          <TalentDirectoryTable
            data={visibleTalent}
            columnOrder={columnOrder}
            columnVisibility={mergedVisibility}
            onColumnVisibilityChange={setColumnVisibility}
            sorting={sorting}
            onSortingChange={setSorting}
            rowSelection={rowSelection}
            onRowSelectionChange={setRowSelection}
          />
        )}
        {view === "grid" && (
          <div className="flex flex-col gap-3">
            {visibleTalent.map((talent) => (
              <TalentCard
                key={talent.id}
                talent={talent}
                postMedia={mediaByTalent.get(talent.name) ?? []}
                isSelected={!!rowSelection[talent.id]}
                onSelectChange={(selected) =>
                  setRowSelection((prev) => ({ ...prev, [talent.id]: selected }))
                }
                columnVisibility={mergedVisibility}
              />
            ))}
          </div>
        )}
      </div>

      <SelectionToast
        selectedCount={Object.keys(rowSelection).length}
        isVisible={Object.keys(rowSelection).length > 0}
        onDelete={() => {}}
        onAddTo={() => {}}
        onClose={() => setRowSelection({})}
      />
    </div>
  );
}
