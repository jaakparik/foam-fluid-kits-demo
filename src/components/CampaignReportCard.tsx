import {
  EllipsisVertical,
  Pencil,
  Link,
  LogoFilePdf,
  LogoFileSheet,
  Trash,
} from "foamicons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CampaignReportThumbnail } from "@/components/CampaignReportThumbnail";
import type { CampaignReportData } from "@/data/campaignReports";

interface CampaignReportCardProps {
  kit: CampaignReportData;
  index: number;
  customImages?: string[];
}

export function CampaignReportCard({ kit, index, customImages }: CampaignReportCardProps) {
  return (
    <div className="flex cursor-pointer flex-col gap-2 overflow-hidden rounded-xl border border-border bg-card p-3">
      {/* Thumbnail */}
      <div className="relative flex h-[140px] w-full items-center justify-center overflow-hidden rounded-lg">
        <CampaignReportThumbnail seed={index} customImages={customImages} />
      </div>

      {/* Title */}
      <div className="flex items-center">
        <span className="truncate text-lg font-medium text-foreground">
          {kit.title}
        </span>
      </div>

      {/* Owner + Date */}
      <div className="flex items-center justify-between text-base text-muted-foreground">
        <span className="truncate">{kit.creator}</span>
        <span className="shrink-0">{kit.creationDate}</span>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button variant="secondary" className="flex-1 cursor-pointer">
          Copy link
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="cursor-pointer">
              <EllipsisVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="cursor-pointer">
              <Pencil className="size-4 text-icon-stroke" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Link className="size-4 text-icon-stroke" />
              Copy link
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <LogoFilePdf className="size-4 !stroke-none" />
              Download pdf
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <LogoFileSheet className="size-4 !stroke-none" />
              Download csv
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
              <Trash className="size-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
