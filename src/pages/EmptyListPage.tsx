import { useState } from "react";
import { UserDuotone } from "foamicons";
import { DataToolbar } from "@/components/DataToolbar";
import { Button } from "@/components/ui/button";
import { useNavigation } from "@/hooks/use-navigation";

export function EmptyListPage() {
  const { listDetailTitle, navigate } = useNavigation();
  const [view, setView] = useState<"table" | "grid">("table");
  const [search, setSearch] = useState("");
  const [selectedCreators, setSelectedCreators] = useState<string[]>([]);
  const [title, setTitle] = useState(listDetailTitle ?? "New list");

  return (
    <div className="flex flex-1 flex-col rounded-tl-lg bg-background">
      <div className="sticky top-[56px] z-10 bg-background px-5 pt-5 pb-4">
        <DataToolbar
          label={title}
          onLabelEdit={setTitle}
          onBack={() => navigate("lists")}
          view={view}
          onViewChange={setView}
          count={0}
          search={search}
          onSearchChange={setSearch}
          creators={[]}
          selectedCreators={selectedCreators}
          onSelectedCreatorsChange={setSelectedCreators}
        />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-4 pb-20">
        <div className="flex items-center -space-x-6">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex size-60 shrink-0 items-center justify-center rounded-full border-[12px] border-background bg-muted text-icon">
              <UserDuotone size={96} absoluteStrokeWidth={false} />
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          No talent on this list yet
        </p>
        <Button className="cursor-pointer">Add talent</Button>
        <Button variant="ghost" className="cursor-pointer">Add all talent from &ldquo;Save for later&rdquo;</Button>
      </div>
    </div>
  );
}
