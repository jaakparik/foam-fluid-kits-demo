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
  Table,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Talent } from "@/data/talents";
import { columns } from "@/components/listDetailColumns";
import { TalentDirectoryRow } from "@/components/TalentDirectoryRow";

// Remove the "sort" (drag handle) column
const directoryColumns = columns.filter((col) => {
  const id = "id" in col ? col.id : ("accessorKey" in col ? col.accessorKey : undefined);
  return id !== "sort";
});

interface TalentDirectoryTableProps {
  data: Talent[];
  columnOrder?: string[];
  columnVisibility: VisibilityState;
  onColumnVisibilityChange: (updater: VisibilityState | ((prev: VisibilityState) => VisibilityState)) => void;
  sorting: SortingState;
  onSortingChange: (updater: SortingState | ((prev: SortingState) => SortingState)) => void;
  rowSelection: RowSelectionState;
  onRowSelectionChange: (updater: RowSelectionState | ((prev: RowSelectionState) => RowSelectionState)) => void;
}

export function TalentDirectoryTable({
  data,
  columnOrder,
  columnVisibility,
  onColumnVisibilityChange,
  sorting,
  onSortingChange,
  rowSelection,
  onRowSelectionChange,
}: TalentDirectoryTableProps) {
  const table = useReactTable({
    data,
    columns: directoryColumns,
    state: { rowSelection, sorting, columnVisibility, columnOrder },
    onRowSelectionChange,
    onSortingChange,
    onColumnVisibilityChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getRowId: (row) => String(row.id),
  });

  const stickyLeft: Record<string, string> = {
    select: "left-0",
    avatar: "left-[28px]",
    name: "left-[76px]",
  };

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const colId = header.column.id;
              const isLeftSticky = colId in stickyLeft;
              let headerClass = "sticky top-0 z-20 bg-background";
              if (isLeftSticky) {
                headerClass = `sticky top-0 ${stickyLeft[colId]} z-30 bg-background`;
              } else if (colId === "more") {
                headerClass = "sticky top-0 right-0 z-30 bg-background";
              } else if (colId === "save") {
                headerClass = "sticky top-0 right-[40px] z-30 bg-background";
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
        <TalentDirectoryRow key={row.id} row={row} />
      ))}
    </Table>
  );
}
