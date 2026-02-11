// Platform icon URLs from proto.dev.foam.io
export type Platform = 'tiktok' | 'instagram' | 'youtube' | 'snap';

interface PlatformIcon {
  light: string;
  dark: string;
}

const platformIcons: Record<Platform, PlatformIcon> = {
  tiktok: {
    light: 'https://proto.dev.foam.io/assets/icons/color/TikTok.svg',
    dark: 'https://proto.dev.foam.io/assets/icons/color/TikTokDark.svg',
  },
  instagram: {
    light: 'https://proto.dev.foam.io/assets/icons/color/Instagram.svg',
    dark: 'https://proto.dev.foam.io/assets/icons/color/InstagramDark.svg',
  },
  youtube: {
    light: 'https://proto.dev.foam.io/assets/icons/color/YouTube.svg',
    dark: 'https://proto.dev.foam.io/assets/icons/color/YouTube.svg', // Same for both themes
  },
  snap: {
    light: 'https://proto.dev.foam.io/assets/icons/color/Snap.svg',
    dark: 'https://proto.dev.foam.io/assets/icons/color/Snap.svg', // Same for both themes
  },
};

export function getPlatformIcon(platform: Platform, isDark: boolean): string {
  return isDark ? platformIcons[platform].dark : platformIcons[platform].light;
}
