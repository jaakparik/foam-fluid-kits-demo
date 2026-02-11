import { createContext, useCallback, useContext, useState } from "react";

type Page = "home" | "media-kits" | "pitch-kits" | "lists" | "campaign-reports";

interface NavigationContextValue {
  page: Page;
  navigate: (page: Page) => void;
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

  const navigate = useCallback((p: Page) => {
    setPage(p);
  }, []);

  return (
    <NavigationContext.Provider value={{ page, navigate }}>
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
