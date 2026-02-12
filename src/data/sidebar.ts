import { avatars } from "./avatars";
import { talents } from "./talents";

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
      label: "Save for later",
      icon: "Bookmark" as const,
      href: "/saved",
      badge: "23",
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
