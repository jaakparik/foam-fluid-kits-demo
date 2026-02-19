import type { LucideProps } from "lucide-react";
import { Eye, AudioLines } from "foamicons";

interface ContentReasonBadgeProps {
  type: "visual" | "audio";
  count: number;
}

const config: Record<
  ContentReasonBadgeProps["type"],
  { icon: React.FC<LucideProps>; bg: string }
> = {
  visual: { icon: Eye, bg: "bg-[#0ea5e9]" },
  audio: { icon: AudioLines, bg: "bg-[#ed1389]" },
};

export function ContentReasonBadge({ type, count }: ContentReasonBadgeProps) {
  const { icon: Icon, bg } = config[type];

  return (
    <div
      className={`${bg} flex items-center gap-1 rounded-full px-2 py-1`}
    >
      <Icon className="size-4 text-white" />
      <span className="text-xs text-white/70">{count}</span>
    </div>
  );
}
