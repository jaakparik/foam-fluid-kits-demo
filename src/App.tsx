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
import { ListDetailPage } from "@/pages/ListDetailPage";
import { EmptyListPage } from "@/pages/EmptyListPage";
import { CampaignReportsPage } from "@/pages/CampaignReportsPage";
import { TalentDirectoryPage } from "@/pages/TalentDirectoryPage";
import { PageTemplatePage } from "@/pages/PageTemplatePage";
import { ContentFeedPage } from "@/pages/ContentFeedPage";
import { Toaster } from "@/components/ui/sonner";

function PageRouter() {
  const { page } = useNavigation();

  switch (page) {
    case "media-kits":
      return <MediaKitsPage />;
    case "pitch-kits":
      return <PitchKitsPage />;
    case "lists":
      return <ListsPage />;
    case "list-detail":
      return <ListDetailPage />;
    case "empty-list":
      return <EmptyListPage />;
    case "campaign-reports":
      return <CampaignReportsPage />;
    case "talent-directory":
      return <TalentDirectoryPage />;
    case "page-template":
      return <PageTemplatePage />;
    case "content-feed":
      return <ContentFeedPage />;
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
          <Toaster />
        </TooltipProvider>
      </NavigationProvider>
    </ThemeProvider>
  );
}

export default App;
