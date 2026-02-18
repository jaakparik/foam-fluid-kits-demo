import { useState } from "react";
import type { RowSelectionState, SortingState, VisibilityState } from "@tanstack/react-table";
import {
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { DataToolbar, type ColumnOption } from "@/components/DataToolbar";
import { ListDetailTable } from "@/components/ListDetailTable";
import { SortableTalentCard } from "@/components/SortableTalentCard";
import { SelectionToast } from "@/components/SelectionToast";
import {
  detailColumnOptions,
  defaultColumnVisibility,
  sortColumnOptions,
} from "@/components/listDetailColumns";
import { useNavigation } from "@/hooks/use-navigation";
import { listsData, myListsData } from "@/data/lists";
import { talents } from "@/data/talents";
import { posts } from "@/data/posts";

const allLists = [...listsData, ...myListsData];
const listTalents = talents.slice(0, 45);
const talentNames = listTalents.map((t) => t.name);

// Build media map: talent name → up to 10 post media (thumbnail + optional video)
const mediaByTalent = new Map<string, { thumbnail: string; video?: string }[]>();
for (const post of posts) {
  const list = mediaByTalent.get(post.talentName) ?? [];
  if (list.length < 10) list.push({ thumbnail: post.thumbnail, video: post.video });
  mediaByTalent.set(post.talentName, list);
}

export function ListDetailPage() {
  const { listDetailId, navigate } = useNavigation();
  const list = allLists.find((l) => l.id === listDetailId);

  const [view, setView] = useState<"table" | "grid">("table");
  const [search, setSearch] = useState("");
  const [selectedCreators, setSelectedCreators] = useState<string[]>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(defaultColumnVisibility);
  const [columnOptions, setColumnOptions] = useState<ColumnOption[]>(detailColumnOptions);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [hasCustomOrder, setHasCustomOrder] = useState(false);
  const [gridOrder, setGridOrder] = useState(() => listTalents.map((t) => t.id));

  const [title, setTitle] = useState(list?.title ?? "List");

  // Derive table column order from the reorderable options
  const columnOrder = ["select", "sort", "avatar", "name", ...columnOptions.map((c) => c.id), "save", "more"];

  const activeSortId = sorting.length > 0 ? sorting[0].id : null;
  const activeSortDesc = sorting.length > 0 ? sorting[0].desc : false;

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 6 } }),
    useSensor(KeyboardSensor),
  );

  function handleSortChange(sortId: string | null) {
    if (sortId === null) {
      setSorting([]);
    } else if (sortId === activeSortId) {
      setSorting([{ id: sortId, desc: !activeSortDesc }]);
    } else {
      setSorting([{ id: sortId, desc: false }]);
    }
  }

  function handleGridDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setGridOrder((prev) => {
        const oldIndex = prev.indexOf(Number(active.id));
        const newIndex = prev.indexOf(Number(over.id));
        return arrayMove(prev, oldIndex, newIndex);
      });
      setHasCustomOrder(true);
      setSorting([]);
    }
  }

  const orderedGridTalents = gridOrder.map((id) => listTalents.find((t) => t.id === id)!);

  return (
    <div className="flex flex-1 flex-col rounded-tl-lg bg-background min-h-0">
      <div className="shrink-0 px-5 pt-5 pb-4">
        <DataToolbar
          label={title}
          onLabelEdit={setTitle}
          onBack={() => navigate("lists")}
          view={view}
          onViewChange={setView}
          count={45}
          search={search}
          onSearchChange={setSearch}
          creators={talentNames}
          selectedCreators={selectedCreators}
          onSelectedCreatorsChange={setSelectedCreators}
          columnOptions={columnOptions}
          columnVisibility={columnVisibility}
          onColumnVisibilityChange={(colId, visible) =>
            setColumnVisibility((prev) => ({ ...prev, [colId]: visible }))
          }
          onColumnOptionsReorder={setColumnOptions}
          sortOptions={sortColumnOptions}
          activeSortId={activeSortId}
          activeSortDesc={activeSortDesc}
          onSortChange={handleSortChange}
          hasCustomOrder={hasCustomOrder}
          onShareClick={() => {}}
        />
      </div>

      <div className="flex-1 min-h-0 overflow-auto px-5 pb-5 [&_[data-slot=table-container]]:overflow-visible">
        {view === "table" && (
          <ListDetailTable
            columnOrder={columnOrder}
            columnVisibility={columnVisibility}
            onColumnVisibilityChange={setColumnVisibility}
            sorting={sorting}
            onSortingChange={setSorting}
            onCustomOrderChange={setHasCustomOrder}
            rowSelection={rowSelection}
            onRowSelectionChange={setRowSelection}
          />
        )}
        {view === "grid" && (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleGridDragEnd}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext items={gridOrder} strategy={verticalListSortingStrategy}>
              <div className="flex flex-col gap-3">
                {orderedGridTalents.map((talent) => (
                  <SortableTalentCard
                    key={talent.id}
                    talent={talent}
                    postMedia={mediaByTalent.get(talent.name) ?? []}
                    isSelected={!!rowSelection[talent.id]}
                    onSelectChange={(selected: boolean) =>
                      setRowSelection((prev) => ({ ...prev, [talent.id]: selected }))
                    }
                    columnVisibility={columnVisibility}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
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
