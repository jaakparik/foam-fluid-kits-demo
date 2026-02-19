import {
  House,
  Users,
  Images,
  Eye,
  Share,
  FileChartColumn,
  FileCheck,
  FileImage,
  List,
  ContentUser,
  ClipboardList,
  Bookmark,
  ChartArea,
  Bell,
  Cog,
  Plus,
  Search,
  ChevronDown,
  LogoFoamSymbol,
  UserCog,
  Sun,
  Moon,
  LogOut,
  CircleOverlap,
  Pin,
  PanelLeft,
  ChevronLeft,
  ToolCase,
  ListFilter,
  Folder,
} from "foamicons";
import { useState } from "react";
import { ChevronsUpDown } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarMenuBadge,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { useTheme } from "@/hooks/use-theme";
import { useNavigation, hrefToPage } from "@/hooks/use-navigation";
import { SidebarSublevelProvider, useSidebarSublevel } from "@/hooks/use-sidebar-sublevel";
import { SidebarPanelSlider } from "@/components/SidebarPanelSlider";
import { sidebarNav, listsSublevel } from "@/data/sidebar";

const iconMap = {
  House,
  Users,
  Images,
  Eye,
  Share,
  FileChartColumn,
  FileCheck,
  FileImage,
  List,
  ContentUser,
  ClipboardList,
  Bookmark,
  ChartArea,
  Bell,
  Cog,
} as const;

type IconName = keyof typeof iconMap;

function PinAction() {
  return (
    <button
      className="shrink-0 opacity-0 group-hover/menu-item:opacity-100 transition-opacity cursor-pointer"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <Pin className="size-4 text-icon-stroke-muted hover:text-icon-stroke transition-colors" />
    </button>
  );
}

function SavedItem({
  item,
  showPinOnHover,
}: {
  item: (typeof sidebarNav.saved)[number];
  showPinOnHover?: boolean;
}) {
  if (item.type === "search") {
    return (
      <SidebarMenuItem className="group/menu-item">
        <SidebarMenuButton asChild>
          <a href={item.href}>
            <Search className="size-4 text-icon-stroke" />
            <span className="flex-1 truncate">{item.label}</span>
            {showPinOnHover && <PinAction />}
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  if (item.type === "list" && "avatars" in item) {
    return (
      <SidebarMenuItem className="group/menu-item">
        <SidebarMenuButton asChild>
          <a href={item.href}>
            <div className="grid grid-cols-2 grid-rows-2 size-6 shrink-0 overflow-hidden rounded-sm">
              {item.avatars.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="size-3 object-cover"
                />
              ))}
            </div>
            <span className="flex-1 truncate">{item.label}</span>
            {showPinOnHover ? (
              <PinAction />
            ) : (
              <span className="text-muted-foreground text-sm">List</span>
            )}
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  if (item.type === "profile" && "avatar" in item) {
    return (
      <SidebarMenuItem className="group/menu-item">
        <SidebarMenuButton asChild>
          <a href={item.href}>
            <Avatar className="size-6 shrink-0">
              <AvatarImage src={item.avatar} alt={item.label} />
              <AvatarFallback className="text-[10px]">
                {item.label
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <span className="flex-1 truncate">{item.label}</span>
            {showPinOnHover ? (
              <PinAction />
            ) : (
              <span className="text-muted-foreground text-sm">Profile</span>
            )}
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  return null;
}

const themeOptions = [
  { value: "system" as const, label: "System", Icon: CircleOverlap },
  { value: "dark" as const, label: "Dark theme", Icon: Moon },
  { value: "light" as const, label: "Light theme", Icon: Sun },
];

const themeLabelMap = {
  system: "System",
  dark: "Dark theme",
  light: "Light theme",
} as const;

const themeIconMap = {
  system: CircleOverlap,
  dark: Moon,
  light: Sun,
} as const;

function NavLink({
  href,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const { navigate } = useNavigation();
  return (
    <a
      href={href}
      onClick={(e) => {
        const target = hrefToPage[href];
        if (target) {
          e.preventDefault();
          navigate(target);
        }
      }}
      {...props}
    >
      {children}
    </a>
  );
}

function SidebarMasterContent() {
  const { page, navigate } = useNavigation();
  const { openSublevel } = useSidebarSublevel();

  return (
    <>
      {/* Main navigation */}
      <SidebarGroup>
        <SidebarMenu>
          {sidebarNav.main.map((item) => {
            const Icon = iconMap[item.icon as IconName];

            if ("collapsible" in item && item.collapsible && item.children) {
              return (
                <Collapsible
                  key={item.label}
                  defaultOpen
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        <Icon className="size-4 text-icon-stroke" />
                        <span>{item.label}</span>
                        <ChevronDown className="ml-auto size-4 text-icon-stroke transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.children.map((child) => {
                          const ChildIcon =
                            iconMap[child.icon as IconName];
                          const hasSublevel = "sublevel" in child && child.sublevel;
                          return (
                            <SidebarMenuSubItem key={child.label}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={hrefToPage[child.href] === page}
                              >
                                {hasSublevel ? (
                                  <button
                                    className="w-full text-left cursor-pointer"
                                    onClick={() => {
                                      openSublevel(child.sublevel!);
                                      const target = hrefToPage[child.href];
                                      if (target) navigate(target);
                                    }}
                                  >
                                    <ChildIcon className="size-4 text-icon-stroke" />
                                    <span className="flex-1 truncate">{child.label}</span>
                                    {child.hasAdd && (
                                      <Plus className="shrink-0 size-4 text-icon-stroke-muted! hover:text-icon-stroke! cursor-pointer transition-colors" />
                                    )}
                                  </button>
                                ) : (
                                  <NavLink href={child.href}>
                                    <ChildIcon className="size-4 text-icon-stroke" />
                                    <span className="flex-1 truncate">{child.label}</span>
                                    {child.hasAdd && (
                                      <Plus className="shrink-0 size-4 text-icon-stroke-muted! hover:text-icon-stroke! cursor-pointer transition-colors" />
                                    )}
                                  </NavLink>
                                )}
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              );
            }

            return (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton asChild isActive={hrefToPage[item.href] === page}>
                  <NavLink href={item.href}>
                    <Icon className="size-4 text-icon-stroke" />
                    <span className="flex-1 truncate">{item.label}</span>
                    {"badge" in item && item.badge && (
                      <span className="shrink-0 text-xs font-light text-muted-foreground">
                        {item.badge}
                      </span>
                    )}
                    {"hasAdd" in item && item.hasAdd && (
                      <Plus className="shrink-0 size-4 text-icon-stroke-muted! hover:text-icon-stroke! cursor-pointer transition-colors" />
                    )}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroup>

      {/* Saved section */}
      <SidebarGroup>
        <SidebarGroupLabel>Saved</SidebarGroupLabel>
        <SidebarMenu>
          {sidebarNav.saved.map((item) => (
            <SavedItem key={item.label} item={item} />
          ))}
        </SidebarMenu>
      </SidebarGroup>

      {/* Recent section */}
      <SidebarGroup>
        <SidebarGroupLabel>Recent</SidebarGroupLabel>
        <SidebarMenu>
          {sidebarNav.recent.map((item) => (
            <SavedItem key={item.label} item={item} showPinOnHover />
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
}

const sublevelIconMap = {
  ToolCase,
  ListFilter,
  Folder,
} as const;

type SublevelIconName = keyof typeof sublevelIconMap;

function ListsSublevelContent() {
  const { closeSublevel } = useSidebarSublevel();
  const { page, navigate } = useNavigation();
  const sections = [
    listsSublevel.systemCollections,
    listsSublevel.smartCollections,
    listsSublevel.customCollections,
  ];

  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            className="cursor-pointer"
            onClick={() => {
              closeSublevel();
              navigate("home");
            }}
          >
            <ChevronLeft className="size-4 text-icon-stroke" />
            <span>Main menu</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
      <SidebarGroupLabel className="mt-4">Lists</SidebarGroupLabel>
      {sections.map((section) => {
        const Icon = sublevelIconMap[section.icon as SublevelIconName];
        const isCollapsible = "collapsible" in section && section.collapsible;
        const hasAdd = "hasAdd" in section && section.hasAdd;

        if (isCollapsible) {
          return (
            <Collapsible
              key={section.label}
              defaultOpen={!("defaultOpen" in section) || section.defaultOpen !== false}
              className="group/collapsible mt-4"
            >
              <SidebarMenu>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <Icon className="size-4 text-icon-stroke" />
                      <span>{section.label}</span>
                      {hasAdd ? (
                        <Plus className="ml-auto shrink-0 size-4 text-icon-stroke-muted! hover:text-icon-stroke! cursor-pointer transition-colors" />
                      ) : (
                        <ChevronDown className="ml-auto size-4 text-icon-stroke transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      )}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {section.items.map((item) => (
                        <SidebarMenuSubItem key={item.label}>
                          <SidebarMenuSubButton asChild isActive={hrefToPage[item.href] === page}>
                            <NavLink href={item.href}>
                              <span className="flex-1 truncate">{item.label}</span>
                              {"badge" in item && item.badge && (
                                <span className="shrink-0 text-xs font-light text-muted-foreground">{item.badge}</span>
                              )}
                            </NavLink>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </SidebarMenu>
            </Collapsible>
          );
        }

        return (
          <div key={section.label}>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Icon className="size-4 text-icon-stroke" />
                  <span>{section.label}</span>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  {section.items.map((item) => (
                    <SidebarMenuSubItem key={item.label}>
                      <SidebarMenuSubButton asChild isActive={hrefToPage[item.href] === page}>
                        <NavLink href={item.href}>
                          <span className="flex-1 truncate">{item.label}</span>
                          {"badge" in item && item.badge && (
                            <span className="shrink-0 text-xs font-light text-muted-foreground">{item.badge}</span>
                          )}
                        </NavLink>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>
          </div>
        );
      })}
    </SidebarGroup>
  );
}

function SidebarSubContent() {
  const { activeSublevel } = useSidebarSublevel();

  if (activeSublevel === "lists") {
    return <ListsSublevelContent />;
  }

  return null;
}

export function AppSidebar() {
  const { theme, setTheme } = useTheme();
  const [footerOpen, setFooterOpen] = useState(false);
  const { state, toggleSidebar } = useSidebar();
  const ActiveThemeIcon = themeIconMap[theme];
  const collapsed = state === "collapsed";
  return (
    <Sidebar collapsible="icon">
      <SidebarSublevelProvider>
        {/* Logo */}
        <SidebarHeader>
          {collapsed ? (
            <button
              onClick={toggleSidebar}
              className="flex size-8 items-center justify-center rounded-md cursor-pointer hover:bg-sidebar-accent transition-colors"
            >
              <PanelLeft className="size-4 text-icon-stroke" />
            </button>
          ) : (
            <div className="group/agency flex items-center gap-2 px-1 py-0.5">
              <div className="flex size-7 items-center justify-center rounded-lg bg-primary p-1 shrink-0">
                <LogoFoamSymbol className="size-5 text-primary-foreground !stroke-none [&_path]:!fill-primary-foreground" />
              </div>
              <span className="flex-1 truncate text-sm font-medium text-sidebar-accent-foreground">
                Creative Artists Agency
              </span>
              <button
                onClick={toggleSidebar}
                className="shrink-0 opacity-0 group-hover/agency:opacity-100 transition-opacity cursor-pointer rounded-md p-0.5 hover:bg-sidebar-accent"
              >
                <PanelLeft className="size-4 text-icon-stroke" />
              </button>
            </div>
          )}
        </SidebarHeader>

        <SidebarContent className="!overflow-hidden">
          <SidebarPanelSlider
            masterContent={<SidebarMasterContent />}
            subContent={<SidebarSubContent />}
          />
        </SidebarContent>

        {/* Bottom section — Notifications & Settings */}
        <SidebarGroup className="border-t border-sidebar-border">
          <SidebarMenu>
            {sidebarNav.bottom.map((item) => {
              const Icon = iconMap[item.icon as IconName];
              return (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <a href={item.href}>
                      <Icon className="size-4 text-icon-stroke" />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                  {"badge" in item && item.badge && (
                    <SidebarMenuBadge className="bg-brand text-checkbox-foreground rounded-full px-2 text-xs">
                      {item.badge}
                    </SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>

        {/* User footer */}
        <SidebarFooter className="border-t border-sidebar-border">
          <Collapsible open={footerOpen} onOpenChange={setFooterOpen} className="group/user">
            <SidebarMenu>
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton size="lg" className="cursor-pointer">
                    <Avatar className="size-8 shrink-0">
                      <AvatarFallback className="bg-orange-300 text-foreground text-sm">
                        {sidebarNav.user.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-1 flex-col gap-0.5 leading-none min-w-0">
                      <span className="text-sm font-semibold truncate">
                        {sidebarNav.user.name}
                      </span>
                      <span className="text-xs text-muted-foreground truncate">
                        {sidebarNav.user.email}
                      </span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4 text-icon-stroke shrink-0" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
              </SidebarMenuItem>
            </SidebarMenu>
            <CollapsibleContent>
              <SidebarMenu className="mt-1">
                <SidebarMenuItem>
                  <SidebarMenuButton asChild onClick={() => setFooterOpen(false)}>
                    <a href="/settings/personal">
                      <UserCog className="size-4 text-icon-stroke" />
                      <span>Personal settings</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild onClick={() => setFooterOpen(false)}>
                    <a href="/settings">
                      <Cog className="size-4 text-icon-stroke" />
                      <span>Agency settings</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuButton className="cursor-pointer">
                        <ActiveThemeIcon className="size-4 text-icon-stroke" />
                        <span>{themeLabelMap[theme]}</span>
                      </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="top" align="start">
                      {themeOptions.map((opt) => (
                        <DropdownMenuItem
                          key={opt.value}
                          className="cursor-pointer"
                          onSelect={() => { setTheme(opt.value); setFooterOpen(false); }}
                        >
                          <opt.Icon className="size-4 text-icon-stroke" />
                          <span>{opt.label}</span>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton className="cursor-pointer" onClick={() => setFooterOpen(false)}>
                    <LogOut className="size-4 text-icon-stroke" />
                    <span>Sign out</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </CollapsibleContent>
          </Collapsible>
        </SidebarFooter>
      </SidebarSublevelProvider>
    </Sidebar>
  );
}
