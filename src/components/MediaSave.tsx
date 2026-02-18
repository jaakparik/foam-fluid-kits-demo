import { Bookmark, BookmarkFill } from "foamicons";
import { cn } from "@/lib/utils";

interface MediaSaveProps {
  saved?: boolean;
  onSave?: () => void;
  className?: string;
}

export function MediaSave({ saved, onSave, className }: MediaSaveProps) {
  return (
    <button
      type="button"
      className={cn(
        "group/save flex items-center justify-center size-8 rounded-full bg-black/20 cursor-pointer transition-colors",
        className,
      )}
      onClick={(e) => {
        e.stopPropagation();
        onSave?.();
      }}
    >
      {saved ? (
        <BookmarkFill className="size-5 text-white/50 group-hover/save:text-white" strokeWidth={1.5} />
      ) : (
        <Bookmark className="size-5 text-white/50 group-hover/save:text-white" strokeWidth={1.5} />
      )}
    </button>
  );
}
