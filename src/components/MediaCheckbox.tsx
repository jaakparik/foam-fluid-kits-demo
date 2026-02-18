import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface MediaCheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
}

export function MediaCheckbox({
  checked,
  onCheckedChange,
  className,
}: MediaCheckboxProps) {
  return (
    <div
      className={cn(
        "group/media flex items-center justify-center size-8 rounded-full cursor-pointer transition-colors",
        checked ? "" : "bg-black/20",
        className,
      )}
      onClick={(e) => e.stopPropagation()}
    >
      <Checkbox
        checked={checked}
        onCheckedChange={(value) => onCheckedChange(!!value)}
        className="size-4 border-[1.5px] border-white/50 bg-white/20 group-hover/media:border-white"
      />
    </div>
  );
}
