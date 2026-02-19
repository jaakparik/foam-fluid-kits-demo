import { cn } from "@/lib/utils";
import { useSidebarSublevel } from "@/hooks/use-sidebar-sublevel";

interface SidebarPanelSliderProps {
  masterContent: React.ReactNode;
  subContent: React.ReactNode;
}

export function SidebarPanelSlider({
  masterContent,
  subContent,
}: SidebarPanelSliderProps) {
  const { isSublevelActive } = useSidebarSublevel();

  return (
    <div className="relative flex-1 min-h-0 overflow-hidden">
      <div
        className={cn(
          "absolute inset-y-0 left-0 flex w-[200%] transition-transform duration-200 ease-out",
          isSublevelActive && "-translate-x-1/2",
        )}
      >
        <div
          className="flex h-full w-1/2 flex-col gap-2 overflow-auto"
          {...(isSublevelActive ? { inert: true } : {})}
        >
          {masterContent}
        </div>
        <div
          className="flex h-full w-1/2 flex-col overflow-auto"
          {...(isSublevelActive ? {} : { inert: true })}
        >
          {subContent}
        </div>
      </div>
    </div>
  );
}
