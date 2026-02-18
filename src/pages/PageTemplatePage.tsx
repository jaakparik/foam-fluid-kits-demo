import { useState } from "react";
import { PageToolbar, type ViewMode } from "@/components/PageToolbar";

const categoryOptions = ["Agency posts", "My posts"];

export function PageTemplatePage() {
  const [category, setCategory] = useState("Agency posts");
  const [view, setView] = useState<ViewMode>("list");
  const [search, setSearch] = useState("");
  const [selectedCreators, setSelectedCreators] = useState<string[]>([]);

  return (
    <div className="flex flex-1 flex-col rounded-tl-lg bg-background min-h-0">
      <div className="shrink-0 px-5 pt-5 pb-4">
        <PageToolbar
          label={category}
          labelOptions={categoryOptions}
          onLabelChange={setCategory}
          count={1832}
          view={view}
          onViewChange={setView}
          search={search}
          onSearchChange={setSearch}
          creators={[]}
          selectedCreators={selectedCreators}
          onSelectedCreatorsChange={setSelectedCreators}
          onPrimaryClick={() => {}}
        />
      </div>

      {/* Content area */}
      <div className="flex-1 min-h-0 overflow-auto px-5 pb-5" />
    </div>
  );
}
