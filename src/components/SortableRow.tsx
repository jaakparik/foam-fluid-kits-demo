import { useEffect, useRef, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { flexRender, type useReactTable } from "@tanstack/react-table";
import { GripVertical } from "foamicons";
import { cn } from "@/lib/utils";
import { RowMoreMenu } from "@/components/RowMoreMenu";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { Talent } from "@/data/talents";

type Row = ReturnType<ReturnType<typeof useReactTable<Talent>>["getRowModel"]>["rows"][number];

export function SortableRow({ row }: { row: Row }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isOver,
  } = useSortable({ id: row.original.id });

  const [savedNote, setSavedNote] = useState("");
  const [draft, setDraft] = useState("");
  const [isEditingNote, setIsEditingNote] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const showNoteRow = savedNote.length > 0 || isEditingNote;
  const isNewNote = savedNote.length === 0;

  useEffect(() => {
    if (isEditingNote) {
      requestAnimationFrame(() => textareaRef.current?.focus());
    }
  }, [isEditingNote]);

  function autoResize() {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  }

  function handleEditNote() {
    setDraft(savedNote);
    setIsEditingNote(true);
  }

  function handleCancelNote() {
    setIsEditingNote(false);
    setDraft("");
  }

  function handleSaveNote() {
    setSavedNote(draft);
    setIsEditingNote(false);
  }

  function handleDeleteNote() {
    setSavedNote("");
    setDraft("");
    setIsEditingNote(false);
  }

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const isSelected = row.getIsSelected();
  const colSpan = row.getVisibleCells().length;

  const rowBg = isSelected
    ? "bg-brand-tint"
    : "group-hover/entry:bg-muted-50";

  // Solid bg for sticky cells (no transparency so content doesn't bleed through)
  const stickyBg = isSelected
    ? "bg-brand-tint-solid group-hover/entry:bg-brand-tint-solid"
    : "bg-background group-hover/entry:bg-muted-50";

  const stickyLeft: Record<string, string> = {
    select: "sticky left-0 z-10",
    sort: "sticky left-[28px] z-10",
    avatar: "sticky left-[56px] z-10",
    name: "sticky left-[104px] z-10",
  };

  return (
    <tbody
      ref={setNodeRef}
      style={style}
      className="group/entry"
    >
      <tr
        className={cn(
          "transition-colors cursor-pointer",
          showNoteRow ? "border-0" : "border-b",
          rowBg,
          !showNoteRow && isSelected ? "border-brand" : "",
          !showNoteRow && isOver && !isDragging ? "border-brand border-b-2" : "",
        )}
      >
        {row.getVisibleCells().map((cell) => {
          const colId = cell.column.id;
          const isLeftSticky = colId in stickyLeft;

          if (colId === "sort") {
            return (
              <td
                key={cell.id}
                className={cn(
                  "p-2 align-middle whitespace-nowrap transition-colors",
                  stickyLeft[colId],
                  stickyBg,
                )}
              >
                <button
                  className="flex items-center justify-center cursor-grab active:cursor-grabbing"
                  {...attributes}
                  {...listeners}
                >
                  <GripVertical className="size-4 text-icon-stroke-muted" />
                </button>
              </td>
            );
          }
          if (colId === "more") {
            return (
              <td
                key={cell.id}
                className={cn(
                  "sticky right-0 z-10 p-2 align-middle whitespace-nowrap transition-colors",
                  stickyBg,
                )}
              >
                <RowMoreMenu onEditNote={handleEditNote} />
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
      {showNoteRow && (
        <tr
          className={cn(
            "border-b transition-colors",
            rowBg,
            isSelected ? "border-brand" : "",
            isOver && !isDragging ? "border-brand border-b-2" : "",
          )}
        >
          <td className={cn("p-0 sticky left-0 z-10 transition-colors", stickyBg)} />
          <td className={cn("p-0 sticky left-[28px] z-10 transition-colors", stickyBg)} />
          <td className={cn("p-0 sticky left-[56px] z-10 transition-colors", stickyBg)} />
          <td colSpan={colSpan - 4} className="pb-3 pt-0 px-2">
            {isEditingNote ? (
              <div className="flex flex-col gap-2">
                <textarea
                  ref={textareaRef}
                  value={draft}
                  onChange={(e) => {
                    setDraft(e.target.value);
                    autoResize();
                  }}
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={(e) => e.stopPropagation()}
                  maxLength={250}
                  rows={1}
                  placeholder="Add a note. Max 250 characters."
                  className="text-sm italic text-secondary-foreground placeholder:text-muted-foreground bg-transparent outline-none resize-none leading-normal"
                />
                <div className="flex items-center gap-2">
                  <button
                    className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCancelNote();
                    }}
                  >
                    Cancel
                  </button>
                  {!isNewNote && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button
                          className="text-sm text-destructive hover:text-destructive/80 cursor-pointer transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Delete
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete note</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this note? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 cursor-pointer"
                            onClick={handleDeleteNote}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                  <Button
                    variant="secondary"
                    size="sm"
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSaveNote();
                    }}
                  >
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              <button
                className="text-sm italic text-secondary-foreground hover:text-foreground cursor-pointer transition-colors text-left whitespace-pre-line"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditNote();
                }}
              >
                {savedNote}
              </button>
            )}
          </td>
          <td className="sticky right-0 z-10 p-0" />
        </tr>
      )}
    </tbody>
  );
}
