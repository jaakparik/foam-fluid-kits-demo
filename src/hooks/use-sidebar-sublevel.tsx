import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSidebar } from "@/components/ui/sidebar";

interface SidebarSublevelContextValue {
  activeSublevel: string | null;
  openSublevel: (id: string) => void;
  closeSublevel: () => void;
  isSublevelActive: boolean;
}

const SidebarSublevelContext =
  createContext<SidebarSublevelContextValue | null>(null);

export function SidebarSublevelProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeSublevel, setActiveSublevel] = useState<string | null>(null);
  const { state } = useSidebar();

  const openSublevel = useCallback(
    (id: string) => {
      if (state === "collapsed") return;
      setActiveSublevel(id);
    },
    [state],
  );

  const closeSublevel = useCallback(() => {
    setActiveSublevel(null);
  }, []);

  // Auto-reset when sidebar collapses to icon mode
  useEffect(() => {
    if (state === "collapsed") {
      setActiveSublevel(null);
    }
  }, [state]);

  return (
    <SidebarSublevelContext.Provider
      value={{
        activeSublevel,
        openSublevel,
        closeSublevel,
        isSublevelActive: activeSublevel !== null,
      }}
    >
      {children}
    </SidebarSublevelContext.Provider>
  );
}

export function useSidebarSublevel() {
  const context = useContext(SidebarSublevelContext);
  if (!context) {
    throw new Error(
      "useSidebarSublevel must be used within a SidebarSublevelProvider",
    );
  }
  return context;
}
