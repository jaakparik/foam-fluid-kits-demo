import {
  type RowSelectionState,
  type SortingState,
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
import { posts } from "@/data/posts";
import { contentFeedColumns } from "@/components/contentFeedColumns";
import { ContentFeedRow } from "@/components/ContentFeedRow";

interface ContentFeedTableProps {
  sorting: SortingState;
  onSortingChange: (updater: SortingState | ((prev: SortingState) => SortingState)) => void;
  rowSelection: RowSelectionState;
  onRowSelectionChange: (updater: RowSelectionState | ((prev: RowSelectionState) => RowSelectionState)) => void;
}

export function ContentFeedTable({
  sorting,
  onSortingChange,
  rowSelection,
  onRowSelectionChange,
}: ContentFeedTableProps) {
  const table = useReactTable({
    data: posts,
    columns: contentFeedColumns,
    state: { rowSelection, sorting },
    onRowSelectionChange,
    onSortingChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getRowId: (row) => String(row.id),
  });

  const stickyLeft: Record<string, string> = {
    select: "left-0",
    thumbnail: "left-[28px]",
    platform: "left-[84px]",
    talentName: "left-[112px]",
  };

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const colId = header.column.id;
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
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <ContentFeedRow key={row.id} row={row} />
        ))}
      </tbody>
    </Table>
  );
}
