import { useState } from "react";
import type { RowSelectionState, SortingState, VisibilityState } from "@tanstack/react-table";
import { DataToolbar } from "@/components/DataToolbar";
import { TalentDirectoryTable } from "@/components/TalentDirectoryTable";
import { SelectionToast } from "@/components/SelectionToast";
import {
  detailColumnOptions,
  defaultColumnVisibility,
  sortColumnOptions,
} from "@/components/listDetailColumns";
import { talents } from "@/data/talents";

const talentNames = talents.slice(0, 45).map((t) => t.name);
const directoryOptions = ["My Talent", "Agency Talent"];

export function TalentDirectoryPage() {
  const [category, setCategory] = useState("My Talent");
  const [view, setView] = useState<"table" | "grid">("table");
  const [search, setSearch] = useState("");
  const [selectedCreators, setSelectedCreators] = useState<string[]>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(defaultColumnVisibility);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

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
          count={45}
          search={search}
          onSearchChange={setSearch}
          creators={talentNames}
          selectedCreators={selectedCreators}
          onSelectedCreatorsChange={setSelectedCreators}
          columnOptions={detailColumnOptions}
          columnVisibility={columnVisibility}
          onColumnVisibilityChange={(colId, visible) =>
            setColumnVisibility((prev) => ({ ...prev, [colId]: visible }))
          }
          sortOptions={sortColumnOptions}
          activeSortId={activeSortId}
          activeSortDesc={activeSortDesc}
          onSortChange={handleSortChange}
          onNewClick={() => {}}
        />
      </div>

      <div className="flex-1 min-h-0 overflow-auto px-5 pb-5 [&_[data-slot=table-container]]:overflow-visible">
        <TalentDirectoryTable
          columnVisibility={columnVisibility}
          onColumnVisibilityChange={setColumnVisibility}
          sorting={sorting}
          onSortingChange={setSorting}
          rowSelection={rowSelection}
          onRowSelectionChange={setRowSelection}
        />
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
