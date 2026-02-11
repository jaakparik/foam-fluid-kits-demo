import { useState, useEffect } from "react";
import { Check, User, Office, Upload } from "foamicons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { coffeeThumbnails, nikeImages } from "@/data/thumbnails";
import { getAvatar } from "@/data/avatars";

const talentAvatars = [getAvatar(0), getAvatar(4)];
const defaultImagePool = [...talentAvatars, ...coffeeThumbnails, ...nikeImages];

type FeatureMode = "talent" | "agency";

interface EditThumbnailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentImages: string[];
  onSave: (selectedImages: string[]) => void;
  images?: string[];
  roundImages?: boolean;
}

export function EditThumbnailDialog({
  open,
  onOpenChange,
  currentImages,
  onSave,
  images,
  roundImages,
}: EditThumbnailDialogProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [featureMode, setFeatureMode] = useState<FeatureMode>("talent");

  const imagePool = images ?? defaultImagePool;

  useEffect(() => {
    if (open) {
      setSelected(new Set(currentImages));
      setFeatureMode("talent");
    }
  }, [open, currentImages]);

  function toggleImage(src: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(src)) next.delete(src);
      else next.add(src);
      return next;
    });
  }

  function handleSave() {
    onSave(Array.from(selected));
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit thumbnail</DialogTitle>
          <DialogDescription>Pick from content thumbnails</DialogDescription>
        </DialogHeader>

        {/* Feature mode radio group */}
        <RadioGroup
          value={featureMode}
          onValueChange={(v) => setFeatureMode(v as FeatureMode)}
          className="flex gap-3"
        >
          <label
            className={`flex flex-1 cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition-colors ${
              featureMode === "talent"
                ? "border-brand bg-brand-tint"
                : "border-border bg-input-tint hover:border-muted-foreground/30"
            }`}
          >
            <RadioGroupItem value="talent" />
            <User className="size-5 text-icon-stroke" />
            <span className="text-sm font-medium">Feature Talent</span>
          </label>
          <label
            className={`flex flex-1 cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition-colors ${
              featureMode === "agency"
                ? "border-brand bg-brand-tint"
                : "border-border bg-input-tint hover:border-muted-foreground/30"
            }`}
          >
            <RadioGroupItem value="agency" />
            <Office className="size-5 text-icon-stroke" />
            <span className="text-sm font-medium">Feature Agency</span>
          </label>
        </RadioGroup>

        {/* Horizontal carousel of thumbnails — bleeds to dialog edges */}
        <div className="-mx-6 flex gap-2 overflow-x-auto px-6 py-1">
          {imagePool.map((src) => {
            const isSelected = selected.has(src);
            return (
              <button
                key={src}
                type="button"
                onClick={() => toggleImage(src)}
                className={`relative size-[100px] shrink-0 cursor-pointer overflow-hidden border-2 transition-colors ${
                  roundImages ? "rounded-full" : "rounded-lg"
                } ${
                  isSelected ? "border-brand" : "border-transparent hover:border-muted-foreground/30"
                }`}
              >
                <img
                  src={src}
                  alt=""
                  className="size-full object-cover"
                />
                {isSelected && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="flex size-6 items-center justify-center rounded-full bg-brand">
                      <Check className="size-4 text-white" />
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Drag & drop upload */}
        <label className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border border-dashed border-border py-5 text-muted-foreground transition-colors hover:border-brand hover:bg-brand-tint">
          <Upload className="size-5" />
          <span className="text-sm font-medium">Upload custom image</span>
          <input type="file" accept="image/*" className="hidden" />
        </label>

        <DialogFooter>
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            className="cursor-pointer"
            disabled={selected.size === 0}
            onClick={handleSave}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
