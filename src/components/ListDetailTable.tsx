import { useMemo, useRef, useState } from "react";
import {
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
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
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { talents } from "@/data/talents";
import { columns } from "@/components/listDetailColumns";
import { SortableRow } from "@/components/SortableRow";

const initialRows = talents.slice(0, 45);
const initialOrder = initialRows.map((r) => r.id);

interface ListDetailTableProps {
  columnVisibility: VisibilityState;
  onColumnVisibilityChange: (updater: VisibilityState | ((prev: VisibilityState) => VisibilityState)) => void;
  sorting: SortingState;
  onSortingChange: (updater: SortingState | ((prev: SortingState) => SortingState)) => void;
  onCustomOrderChange: (hasCustom: boolean) => void;
  rowSelection: RowSelectionState;
  onRowSelectionChange: (updater: RowSelectionState | ((prev: RowSelectionState) => RowSelectionState)) => void;
}

export function ListDetailTable({
  columnVisibility,
  onColumnVisibilityChange,
  sorting,
  onSortingChange,
  onCustomOrderChange,
  rowSelection,
  onRowSelectionChange,
}: ListDetailTableProps) {
  const [rowOrder, setRowOrder] = useState(() => [...initialOrder]);
  const initialOrderRef = useRef(initialOrder);

  const sortedData = useMemo(
    () => rowOrder.map((id) => initialRows.find((r) => r.id === id)!),
    [rowOrder]
  );

  const table = useReactTable({
    data: sortedData,
    columns,
    state: { rowSelection, sorting, columnVisibility },
    onRowSelectionChange: onRowSelectionChange,
    onSortingChange,
    onColumnVisibilityChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getRowId: (row) => String(row.id),
  });

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 6 } }),
    useSensor(KeyboardSensor)
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setRowOrder((prev) => {
        const oldIndex = prev.indexOf(Number(active.id));
        const newIndex = prev.indexOf(Number(over.id));
        const next = arrayMove(prev, oldIndex, newIndex);
        const isCustom = next.some((id, i) => id !== initialOrderRef.current[i]);
        onCustomOrderChange(isCustom);
        return next;
      });
      // Clear column sort so custom order is visible
      onSortingChange([]);
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext items={rowOrder} strategy={verticalListSortingStrategy}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const colId = header.column.id;
                  const stickyLeft: Record<string, string> = {
                    select: "left-0",
                    sort: "left-[28px]",
                    avatar: "left-[56px]",
                    name: "left-[104px]",
                  };
                  const isLeftSticky = colId in stickyLeft;
                  const isMore = colId === "more";
                  let headerClass = "sticky top-0 z-20 bg-background";
                  if (isLeftSticky) {
                    headerClass = `sticky top-0 ${stickyLeft[colId]} z-30 bg-background`;
                  } else if (isMore) {
                    headerClass = "sticky top-0 right-0 z-30 bg-background";
                  }
                  return (
                  <TableHead
                    key={header.id}
                    className={headerClass}
                    style={{
                      width: header.column.getSize() !== 150 ? header.column.getSize() : undefined,
                      minWidth: header.column.columnDef.minSize,
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          {table.getRowModel().rows.map((row) => (
            <SortableRow key={row.id} row={row} />
          ))}
        </Table>
      </SortableContext>
    </DndContext>
  );
}
