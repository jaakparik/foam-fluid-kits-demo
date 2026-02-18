import {
  LogoYoutube,
  LogoInstagram,
  LogoInstagramDark,
  LogoTiktok,
  LogoTiktokDark,
  LogoSnapchat,
  LogoSnapchatDark,
} from "foamicons";
import type { Platform } from "@/data/platformIcons";
import { cn } from "@/lib/utils";

type IconComponent = React.ComponentType<{ size?: number; className?: string }>;

const lightIcons: Record<Platform, IconComponent> = {
  youtube: LogoYoutube,
  instagram: LogoInstagram,
  tiktok: LogoTiktok,
  snap: LogoSnapchat,
};

const darkIcons: Partial<Record<Platform, IconComponent>> = {
  instagram: LogoInstagramDark,
  tiktok: LogoTiktokDark,
  snap: LogoSnapchatDark,
};

interface PlatformLogoProps {
  platform: Platform;
  size?: number;
  className?: string;
}

export function PlatformLogo({ platform, size = 16, className }: PlatformLogoProps) {
  const LightIcon = lightIcons[platform];
  const DarkIcon = darkIcons[platform];

  if (!DarkIcon) {
    return <LightIcon size={size} className={cn("!stroke-none", className)} />;
  }

  return (
    <>
      <LightIcon size={size} className={cn("!stroke-none dark:hidden", className)} />
      <DarkIcon size={size} className={cn("!stroke-none hidden dark:block", className)} />
    </>
  );
}
