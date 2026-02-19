import { avatars } from "./avatars";
import { talents } from "./talents";

export const listsSublevel = {
  systemCollections: {
    label: "System collections",
    icon: "ToolCase" as const,
    items: [
      { label: "All lists", href: "/shared/lists", badge: "1,070" },
      { label: "Evergreen", href: "/shared/lists/evergreen", badge: "8" },
      { label: "Archived", href: "/shared/lists/archived", badge: "323" },
    ],
  },
  smartCollections: {
    label: "Smart collections",
    icon: "ListFilter" as const,
    collapsible: true,
    defaultOpen: false,
    items: [
      { label: "Recently Added", href: "/shared/lists/recently-added", badge: "4" },
      { label: "Recently Updated", href: "/shared/lists/recently-updated", badge: "12" },
      { label: "This Quarter", href: "/shared/lists/this-quarter", badge: "145" },
      { label: "This Year", href: "/shared/lists/this-year", badge: "468" },
      { label: "No Recent Activity", href: "/shared/lists/no-recent-activity", badge: "21" },
      { label: "High engagement", href: "/shared/lists/high-engagement", badge: "9" },
    ],
  },
  customCollections: {
    label: "Custom collections",
    icon: "Folder" as const,
    collapsible: true,
    hasAdd: true,
    items: [
      { label: "Campaign Lists", href: "/shared/lists/campaign-lists", badge: "15" },
      { label: "Brand Pitches", href: "/shared/lists/brand-pitches", badge: "22" },
      { label: "VIP", href: "/shared/lists/vip", badge: "7" },
      { label: "Backup Pool", href: "/shared/lists/backup-pool", badge: "4" },
      { label: "Experimental", href: "/shared/lists/experimental", badge: "1" },
      { label: "Strategic", href: "/shared/lists/strategic", badge: "5" },
      { label: "Priority", href: "/shared/lists/priority", badge: "2" },
      { label: "High Potential", href: "/shared/lists/high-potential", badge: "9" },
      { label: "Agency Partners", href: "/shared/lists/agency-partners", badge: "15" },
    ],
  },
};

export const sidebarNav = {
  main: [
    { label: "Home", icon: "House" as const, href: "/" },
    {
      label: "Talent directory",
      icon: "Users" as const,
      href: "/talent",
      badge: "23",
      hasAdd: true,
    },
    { label: "Content feed", icon: "Images" as const, href: "/content" },
    {
      label: "Scouting watchlists",
      icon: "Eye" as const,
      href: "/watchlists",
    },
    {
      label: "Shared",
      icon: "Share" as const,
      href: "/shared",
      collapsible: true,
      children: [
        {
          label: "Campaign reports",
          icon: "FileChartColumn" as const,
          href: "/shared/campaigns",
          hasAdd: true,
        },
        {
          label: "Lists",
          icon: "List" as const,
          href: "/shared/lists",
          hasAdd: true,
          sublevel: "lists" as const,
        },
        {
          label: "Media kits",
          icon: "ContentUser" as const,
          href: "/shared/media-kits",
          hasAdd: true,
        },
        {
          label: "Pitch kits",
          icon: "FileImage" as const,
          href: "/shared/pitch-kits",
          hasAdd: true,
        },
        {
          label: "Roster",
          icon: "ClipboardList" as const,
          href: "/shared/roster",
        },
      ],
    },
    {
      label: "Stash",
      icon: "Bookmark" as const,
      href: "/stash",
      badge: "12",
    },
    {
      label: "Data insights",
      icon: "ChartArea" as const,
      href: "/data-insights",
    },
  ],
  saved: [
    {
      label: "Very great list",
      type: "list" as const,
      href: "/saved/very-great-list",
      avatars: [
        avatars[0],
        avatars[1],
        avatars[2],
        avatars[3],
      ],
    },
    {
      label: talents[0].name,
      type: "profile" as const,
      href: `/talent/${talents[0].id}`,
      avatar: talents[0].avatarImage,
    },
    {
      label: "Search term goes here",
      type: "search" as const,
      href: "/search?q=term",
    },
  ],
  recent: [
    {
      label: talents[1].name,
      type: "profile" as const,
      href: `/talent/${talents[1].id}`,
      avatar: talents[1].avatarImage,
    },
    {
      label: "The best list",
      type: "list" as const,
      href: "/saved/the-best-list",
      avatars: [
        avatars[4],
        avatars[5],
        avatars[6],
        avatars[7],
      ],
    },
    {
      label: "Search term goes here",
      type: "search" as const,
      href: "/search?q=term2",
    },
  ],
  bottom: [
    {
      label: "Notifications",
      icon: "Bell" as const,
      href: "/notifications",
      badge: "23",
    },
  ],
  user: {
    name: "Firstname Lastname",
    email: "email@example.com",
    initials: "CN",
  },
};
