import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TalentCard, type PostMedia } from "@/components/TalentCard";
import type { VisibilityState } from "@tanstack/react-table";
import type { Talent } from "@/data/talents";

interface SortableTalentCardProps {
  talent: Talent;
  postMedia: PostMedia[];
  isSelected: boolean;
  onSelectChange: (selected: boolean) => void;
  columnVisibility: VisibilityState;
}

export function SortableTalentCard({
  talent,
  postMedia,
  isSelected,
  onSelectChange,
  columnVisibility,
}: SortableTalentCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: talent.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <TalentCard
        talent={talent}
        postMedia={postMedia}
        isSelected={isSelected}
        onSelectChange={onSelectChange}
        columnVisibility={columnVisibility}
        isDragging={isDragging}
        dragHandleListeners={listeners}
        dragHandleAttributes={attributes}
      />
    </div>
  );
}
