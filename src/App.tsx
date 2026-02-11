import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/hooks/use-theme";
import { NavigationProvider, useNavigation } from "@/hooks/use-navigation";
import { AppSidebar } from "@/components/AppSidebar";
import { TopBar } from "@/components/TopBar";
import { HomePage } from "@/pages/HomePage";
import { MediaKitsPage } from "@/pages/MediaKitsPage";
import { PitchKitsPage } from "@/pages/PitchKitsPage";
import { ListsPage } from "@/pages/ListsPage";
import { CampaignReportsPage } from "@/pages/CampaignReportsPage";

function PageRouter() {
  const { page } = useNavigation();

  switch (page) {
    case "media-kits":
      return <MediaKitsPage />;
    case "pitch-kits":
      return <PitchKitsPage />;
    case "lists":
      return <ListsPage />;
    case "campaign-reports":
      return <CampaignReportsPage />;
    case "home":
    default:
      return <HomePage />;
  }
}

function App() {
  return (
    <ThemeProvider>
      <NavigationProvider>
        <TooltipProvider>
          <SidebarProvider className="h-svh !min-h-0">
            <AppSidebar />
            <SidebarInset className="overflow-auto">
              <TopBar />
              <PageRouter />
            </SidebarInset>
          </SidebarProvider>
        </TooltipProvider>
      </NavigationProvider>
    </ThemeProvider>
  );
}

export default App;
