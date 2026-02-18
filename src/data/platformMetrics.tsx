import {
  Eye,
  Star,
  ThumbsUp,
  MessageSquare,
  Share,
  Heart,
  Bookmark,
  Reach,
} from "foamicons";
import type { Post } from "@/data/posts";
import type { Platform } from "@/data/platformIcons";

type IconComponent = React.ComponentType<{ className?: string }>;

export interface MetricRow {
  icon: IconComponent;
  label: string;
  getValue: (post: Post) => string;
}

export type MetricSection =
  | { type: "row"; row: MetricRow }
  | { type: "group"; rows: MetricRow[] };

export interface PlatformMetricsConfig {
  heading: string;
  sections: MetricSection[];
}

export const platformMetricsConfig: Record<Platform, PlatformMetricsConfig> = {
  tiktok: {
    heading: "TIKTOK METRICS",
    sections: [
      { type: "row", row: { icon: Eye, label: "Views", getValue: (p) => p.views } },
      { type: "row", row: { icon: Star, label: "Engagements", getValue: (p) => p.engagements } },
      {
        type: "group",
        rows: [
          { icon: ThumbsUp, label: "Likes", getValue: (p) => p.likes },
          { icon: MessageSquare, label: "Comments", getValue: (p) => p.comments },
          { icon: Share, label: "Shares", getValue: (p) => p.shares },
        ],
      },
      { type: "row", row: { icon: Heart, label: "View engagement rate", getValue: (p) => p.viewEngRate } },
    ],
  },
  instagram: {
    heading: "INSTAGRAM METRICS",
    sections: [
      { type: "row", row: { icon: Reach, label: "Reach", getValue: (p) => p.reach } },
      { type: "row", row: { icon: Eye, label: "Impressions", getValue: (p) => p.impressions } },
      {
        type: "group",
        rows: [
          { icon: ThumbsUp, label: "Likes", getValue: (p) => p.likes },
          { icon: MessageSquare, label: "Comments", getValue: (p) => p.comments },
          { icon: Bookmark, label: "Saves", getValue: (p) => p.saves },
          { icon: Share, label: "Shares", getValue: (p) => p.shares },
        ],
      },
      { type: "row", row: { icon: Heart, label: "Reach engagement rate", getValue: (p) => p.reachEngRate } },
    ],
  },
  youtube: {
    heading: "YOUTUBE METRICS",
    sections: [
      { type: "row", row: { icon: Eye, label: "Views", getValue: (p) => p.views } },
      { type: "row", row: { icon: Star, label: "Engagements", getValue: (p) => p.engagements } },
      {
        type: "group",
        rows: [
          { icon: ThumbsUp, label: "Likes", getValue: (p) => p.likes },
          { icon: MessageSquare, label: "Comments", getValue: (p) => p.comments },
        ],
      },
      { type: "row", row: { icon: Heart, label: "View engagement rate", getValue: (p) => p.viewEngRate } },
    ],
  },
  snap: {
    heading: "SNAPCHAT METRICS",
    sections: [
      { type: "row", row: { icon: Eye, label: "Views", getValue: (p) => p.views } },
      { type: "row", row: { icon: Reach, label: "Reach", getValue: (p) => p.reach } },
      {
        type: "group",
        rows: [
          { icon: Share, label: "Shares", getValue: (p) => p.shares },
        ],
      },
      { type: "row", row: { icon: Heart, label: "View engagement rate", getValue: (p) => p.viewEngRate } },
    ],
  },
};
