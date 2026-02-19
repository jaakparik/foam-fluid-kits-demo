import { useState } from "react";
import type { RowSelectionState, SortingState } from "@tanstack/react-table";
import type { ViewMode } from "@/components/PageToolbar";
import { PostSearchToolbar } from "@/components/PostSearchToolbar";
import { ContentFeedTable } from "@/components/ContentFeedTable";
import { PostsCard } from "@/components/PostsCard";
import { PostsCardLarge } from "@/components/PostsCardLarge";
import { PostSearchDetailModal } from "@/components/PostSearchDetailModal";
import { SelectionToast } from "@/components/SelectionToast";
import { nikePosts } from "@/data/nikePosts";

export function PostSearchResultsPage() {
  const [activeTab, setActiveTab] = useState<"talent" | "posts" | "kits" | "lists">("posts");
  const [view, setView] = useState<ViewMode>("list");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selection, setSelection] = useState<RowSelectionState>({});
  const [infoExpanded, setInfoExpanded] = useState(true);
  const [modalPostIndex, setModalPostIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-1 flex-col rounded-tl-lg bg-background min-h-0">
      <div className="shrink-0 px-5 pt-5 pb-4">
        <PostSearchToolbar
          searchTerm="Nike"
          activeTab={activeTab}
          onTabChange={setActiveTab}
          talentCount={123}
          postsCount={123}
          kitsCount={123}
          listsCount={123}
          resultsCount={147}
          previousVersions={2}
          view={view}
          onViewChange={setView}
        />
      </div>

      <div className="flex-1 min-h-0 overflow-auto px-5 pb-5 [&_[data-slot=table-container]]:overflow-visible">
        {view === "list" && (
          <ContentFeedTable
            data={nikePosts}
            sorting={sorting}
            onSortingChange={setSorting}
            rowSelection={selection}
            onRowSelectionChange={setSelection}
          />
        )}
        {view === "grid" && (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-4">
            {nikePosts.map((post, i) => (
              <PostsCard
                key={post.id}
                post={post}
                isSelected={!!selection[post.id]}
                onSelectChange={(selected) =>
                  setSelection((prev) => ({ ...prev, [post.id]: selected }))
                }
                onCardClick={() => setModalPostIndex(i)}
              />
            ))}
          </div>
        )}
        {view === "layout" && (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
            {nikePosts.map((post, i) => (
              <PostsCardLarge
                key={post.id}
                post={post}
                isSelected={!!selection[post.id]}
                onSelectChange={(selected) =>
                  setSelection((prev) => ({ ...prev, [post.id]: selected }))
                }
                onCardClick={() => setModalPostIndex(i)}
                infoExpanded={infoExpanded}
                onInfoToggle={() => setInfoExpanded((v) => !v)}
                reasonBadges={[
                  { type: "visual", count: 5 },
                  { type: "audio", count: 2 },
                ]}
              />
            ))}
          </div>
        )}
      </div>

      {modalPostIndex !== null && (
        <PostSearchDetailModal
          post={nikePosts[modalPostIndex]}
          isSelected={!!selection[nikePosts[modalPostIndex].id]}
          onSelectChange={(selected) =>
            setSelection((prev) => ({ ...prev, [nikePosts[modalPostIndex].id]: selected }))
          }
          onClose={() => setModalPostIndex(null)}
          onPrev={modalPostIndex > 0 ? () => setModalPostIndex(modalPostIndex - 1) : null}
          onNext={
            modalPostIndex < nikePosts.length - 1
              ? () => setModalPostIndex(modalPostIndex + 1)
              : null
          }
        />
      )}

      <SelectionToast
        selectedCount={Object.values(selection).filter(Boolean).length}
        isVisible={Object.values(selection).filter(Boolean).length > 0}
        onDelete={() => {}}
        onAddTo={() => {}}
        onClose={() => setSelection({})}
      />
    </div>
  );
}
