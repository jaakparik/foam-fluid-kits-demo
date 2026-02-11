import { motion, AnimatePresence } from "motion/react";
import { Link, Move, Trash, X } from "foamicons";
import { Button } from "@/components/ui/button";

interface SelectionToastProps {
  selectedCount: number;
  onSelectAll?: () => void;
  onCopyLinks?: () => void;
  onMoveToCollection?: () => void;
  onDelete?: () => void;
  onClose?: () => void;
  isVisible: boolean;
}

export function SelectionToast({
  selectedCount,
  onSelectAll,
  onCopyLinks,
  onMoveToCollection,
  onDelete,
  onClose,
  isVisible,
}: SelectionToastProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="fixed bottom-0 left-[var(--sidebar-width)] right-0 z-50 p-4"
        >
          <div className="mx-auto flex items-center rounded-xl border border-border/20 bg-primary shadow-xl">
            {/* Selected count */}
            <div className="flex shrink-0 flex-col items-center justify-center gap-0.5 border-r border-primary-foreground/10 px-4 py-3">
              <span className="text-base font-medium leading-none text-primary-foreground">
                {selectedCount}
              </span>
              <span className="text-xs leading-none text-primary-foreground/70">
                Selected
              </span>
            </div>

            {/* Actions */}
            <div className="flex flex-1 items-center justify-center gap-2 px-3 py-2">
              {onSelectAll && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onSelectAll}
                  className="cursor-pointer text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  Select all
                </Button>
              )}

              {onMoveToCollection && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onMoveToCollection}
                  className="cursor-pointer text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  <Move className="size-4" />
                  Move to collection
                </Button>
              )}

              {onDelete && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onDelete}
                  className="cursor-pointer bg-destructive-accent text-primary-foreground hover:bg-destructive-tint hover:text-primary-foreground"
                >
                  <Trash className="size-4" />
                  Delete
                </Button>
              )}

              {onCopyLinks && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={onCopyLinks}
                  className="cursor-pointer"
                >
                  <Link className="size-4" />
                  Copy links
                </Button>
              )}
            </div>

            {/* Close */}
            <div className="flex shrink-0 items-center border-l border-primary-foreground/10 px-2 py-2">
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={onClose}
                className="cursor-pointer rounded-full text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <X className="size-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
