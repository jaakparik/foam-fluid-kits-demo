import {
  Inbox,
  EllipsisVertical,
  Pencil,
  Trash,
  Pin,
  PinFill,
  Plus,
} from "foamicons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { CollectionData } from "@/data/collections";

interface CollectionsTableProps {
  data: CollectionData[];
  pinnedIds: Set<string>;
  onPinChange: (id: string, pinned: boolean) => void;
}

export function CollectionsTable({ data, pinnedIds, onPinChange }: CollectionsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Lists</TableHead>
          <TableHead>Date created</TableHead>
          <TableHead className="w-10" />
          <TableHead className="w-10">
            <Button variant="ghost" size="icon-sm" className="cursor-pointer">
              <Plus className="size-4" />
            </Button>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((col) => {
          const isPinned = pinnedIds.has(col.id);
          return (
            <TableRow key={col.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-accent">
                    <Inbox className="size-4 text-icon-stroke" />
                  </div>
                  <span className="font-medium text-foreground">
                    {col.name}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {col.count}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {col.dateCreated}
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="cursor-pointer"
                  onClick={() => onPinChange(col.id, !isPinned)}
                >
                  {isPinned ? (
                    <PinFill className="size-4 text-icon-stroke" />
                  ) : (
                    <Pin className="size-4 text-icon-stroke" />
                  )}
                </Button>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon-sm" className="cursor-pointer">
                      <EllipsisVertical className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="cursor-pointer">
                      <Pencil className="size-4 text-icon-stroke" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                      <Trash className="size-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
