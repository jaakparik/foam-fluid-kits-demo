import { createContext, useCallback, useContext, useState } from "react";

type Page = "home" | "media-kits" | "pitch-kits" | "lists" | "list-detail" | "empty-list" | "campaign-reports" | "talent-directory";

interface NavigationContextValue {
  page: Page;
  listDetailId: string | null;
  listDetailTitle: string | null;
  navigate: (page: Page) => void;
  navigateToListDetail: (listId: string) => void;
  navigateToEmptyList: (title: string) => void;
}

const NavigationContext = createContext<NavigationContextValue | null>(null);

const hrefToPage: Record<string, Page> = {
  "/": "home",
  "/shared/media-kits": "media-kits",
  "/shared/pitch-kits": "pitch-kits",
  "/shared/lists": "lists",
  "/shared/campaigns": "campaign-reports",
};

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [page, setPage] = useState<Page>("home");
  const [listDetailId, setListDetailId] = useState<string | null>(null);
  const [listDetailTitle, setListDetailTitle] = useState<string | null>(null);

  const navigate = useCallback((p: Page) => {
    setPage(p);
    if (p !== "list-detail") setListDetailId(null);
    if (p !== "empty-list") setListDetailTitle(null);
  }, []);

  const navigateToListDetail = useCallback((listId: string) => {
    setListDetailId(listId);
    setListDetailTitle(null);
    setPage("list-detail");
  }, []);

  const navigateToEmptyList = useCallback((title: string) => {
    setListDetailTitle(title);
    setListDetailId(null);
    setPage("empty-list");
  }, []);

  return (
    <NavigationContext.Provider value={{ page, listDetailId, listDetailTitle, navigate, navigateToListDetail, navigateToEmptyList }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
}

export function useNavigateFromHref() {
  const { navigate } = useNavigation();

  return useCallback(
    (href: string, e: React.MouseEvent) => {
      const page = hrefToPage[href];
      if (page) {
        e.preventDefault();
        navigate(page);
      }
    },
    [navigate]
  );
}

export { hrefToPage };
export type { Page };
