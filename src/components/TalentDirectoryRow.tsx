import { flexRender, type useReactTable } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { RowMoreMenu } from "@/components/RowMoreMenu";
import type { Talent } from "@/data/talents";

type Row = ReturnType<ReturnType<typeof useReactTable<Talent>>["getRowModel"]>["rows"][number];

export function TalentDirectoryRow({ row }: { row: Row }) {
  const isSelected = row.getIsSelected();

  const rowBg = isSelected
    ? "bg-brand-tint"
    : "group-hover/entry:bg-muted-50";

  const stickyBg = isSelected
    ? "bg-brand-tint-solid group-hover/entry:bg-brand-tint-solid"
    : "bg-background group-hover/entry:bg-muted-50";

  const stickyLeft: Record<string, string> = {
    select: "sticky left-0 z-10",
    avatar: "sticky left-[28px] z-10",
    name: "sticky left-[76px] z-10",
  };

  return (
    <tbody className="group/entry">
      <tr
        className={cn(
          "border-b transition-colors cursor-pointer",
          rowBg,
          isSelected ? "border-brand" : "",
        )}
      >
        {row.getVisibleCells().map((cell) => {
          const colId = cell.column.id;
          const isLeftSticky = colId in stickyLeft;

          if (colId === "more") {
            return (
              <td
                key={cell.id}
                className={cn(
                  "sticky right-0 z-10 p-2 align-middle whitespace-nowrap transition-colors",
                  stickyBg,
                )}
              >
                <RowMoreMenu />
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
    </tbody>
  );
}
