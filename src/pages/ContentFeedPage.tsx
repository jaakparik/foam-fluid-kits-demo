import { useState } from "react";
import type { RowSelectionState, SortingState } from "@tanstack/react-table";
import { PageToolbar, type ViewMode } from "@/components/PageToolbar";
import { ContentFeedTable } from "@/components/ContentFeedTable";
import { PostsCard } from "@/components/PostsCard";
import { PostsCardLarge } from "@/components/PostsCardLarge";
import { PostDetailModal } from "@/components/PostDetailModal";
import { SelectionToast } from "@/components/SelectionToast";
import { posts } from "@/data/posts";

const categoryOptions = ["Agency posts", "My posts"];
const talentNames = [...new Set(posts.map((p) => p.talentName))].sort();

export function ContentFeedPage() {
  const [category, setCategory] = useState("Agency posts");
  const [view, setView] = useState<ViewMode>("list");
  const [search, setSearch] = useState("");
  const [selectedCreators, setSelectedCreators] = useState<string[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selection, setSelection] = useState<RowSelectionState>({});
  const [infoExpanded, setInfoExpanded] = useState(true);
  const [modalPostIndex, setModalPostIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-1 flex-col rounded-tl-lg bg-background min-h-0">
      <div className="shrink-0 px-5 pt-5 pb-4">
        <PageToolbar
          label={category}
          labelOptions={categoryOptions}
          onLabelChange={setCategory}
          count={posts.length}
          view={view}
          onViewChange={setView}
          search={search}
          onSearchChange={setSearch}
          creators={talentNames}
          selectedCreators={selectedCreators}
          onSelectedCreatorsChange={setSelectedCreators}
        />
      </div>

      <div className="flex-1 min-h-0 overflow-auto px-5 pb-5 [&_[data-slot=table-container]]:overflow-visible">
        {view === "list" && (
          <ContentFeedTable
            sorting={sorting}
            onSortingChange={setSorting}
            rowSelection={selection}
            onRowSelectionChange={setSelection}
          />
        )}
        {view === "grid" && (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-4">
            {posts.map((post, i) => (
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
            {posts.map((post, i) => (
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
              />
            ))}
          </div>
        )}
      </div>

      {modalPostIndex !== null && (
        <PostDetailModal
          post={posts[modalPostIndex]}
          isSelected={!!selection[posts[modalPostIndex].id]}
          onSelectChange={(selected) =>
            setSelection((prev) => ({ ...prev, [posts[modalPostIndex].id]: selected }))
          }
          onClose={() => setModalPostIndex(null)}
          onPrev={modalPostIndex > 0 ? () => setModalPostIndex(modalPostIndex - 1) : null}
          onNext={
            modalPostIndex < posts.length - 1
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
