import { flexRender, type useReactTable } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import type { Post } from "@/data/posts";

type Row = ReturnType<ReturnType<typeof useReactTable<Post>>["getRowModel"]>["rows"][number];

export function ContentFeedRow({ row }: { row: Row }) {
  const isSelected = row.getIsSelected();

  const rowBg = isSelected
    ? "bg-brand-tint"
    : "hover:bg-muted-50";

  const stickyBg = isSelected
    ? "bg-brand-tint-solid"
    : "bg-background group-hover:bg-muted-50";

  const stickyLeft: Record<string, string> = {
    select: "sticky left-0 z-10",
    thumbnail: "sticky left-[28px] z-10",
    platform: "sticky left-[84px] z-10",
    talentName: "sticky left-[112px] z-10",
  };

  return (
    <tr
      className={cn(
        "group border-b transition-colors cursor-pointer",
        rowBg,
        isSelected ? "border-brand" : "",
      )}
    >
      {row.getVisibleCells().map((cell) => {
        const colId = cell.column.id;
        const isLeftSticky = colId in stickyLeft;

        if (colId === "more" || colId === "bookmark") {
          return (
            <td
              key={cell.id}
              className={cn(
                "p-2 align-middle whitespace-nowrap transition-colors",
                colId === "more" ? `sticky right-0 z-10 ${stickyBg}` : "",
              )}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          );
        }
        if (isLeftSticky) {
          return (
            <td
              key={cell.id}
              className={cn(
                "p-2 align-middle whitespace-nowrap transition-colors [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
                stickyLeft[colId],
                stickyBg,
              )}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          );
        }
        return (
          <td
            key={cell.id}
            className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]"
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        );
      })}
    </tr>
  );
}
