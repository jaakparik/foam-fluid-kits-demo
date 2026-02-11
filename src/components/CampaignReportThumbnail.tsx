import { photos } from "@/data/avatars";

type Variant = "four" | "three" | "two";

const variants: Variant[] = ["four", "three", "two"];

function getVariant(seed: number): Variant {
  return variants[seed % variants.length];
}

function getPhotos(seed: number, count: number): string[] {
  return Array.from({ length: count }, (_, i) => photos[(seed * 3 + i) % photos.length]);
}

interface CampaignReportThumbnailProps {
  seed: number;
  customImages?: string[];
}

function getVariantForCount(count: number): Variant {
  if (count >= 4) return "four";
  if (count === 3) return "three";
  return "two";
}

export function CampaignReportThumbnail({ seed, customImages }: CampaignReportThumbnailProps) {
  const variant = customImages?.length ? getVariantForCount(customImages.length) : getVariant(seed);

  if (variant === "four") {
    const imgs = customImages?.length ? customImages.slice(0, 4) : getPhotos(seed, 4);
    return (
      <div className="flex items-center pr-8">
        {imgs.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="-mr-8 h-[120px] w-[80px] shrink-0 rounded-lg border-2 border-background object-cover"
          />
        ))}
      </div>
    );
  }

  if (variant === "three") {
    const imgs = customImages?.length ? customImages.slice(0, 3) : getPhotos(seed, 3);
    return (
      <div className="flex items-center pr-16">
        {imgs.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="-mr-16 size-[120px] shrink-0 rounded-lg border-2 border-background object-cover"
          />
        ))}
      </div>
    );
  }

  // variant === "two"
  const imgs = customImages?.length ? customImages.slice(0, 2) : getPhotos(seed, 2);
  return (
    <div className="flex items-center pr-12">
      <img
        src={imgs[0]}
        alt=""
        className="-mr-12 size-[120px] shrink-0 rounded-lg border-2 border-background object-cover"
      />
      <img
        src={imgs[1]}
        alt=""
        className="-mr-12 h-[120px] w-[160px] shrink-0 rounded-lg border-2 border-background object-cover"
      />
    </div>
  );
}

/** Smaller inline version for table rows */
export function CampaignReportThumbnailSmall({ seed, customImages }: CampaignReportThumbnailProps) {
  const variant = customImages?.length ? getVariantForCount(customImages.length) : getVariant(seed);

  if (variant === "four") {
    const imgs = customImages?.length ? customImages.slice(0, 4) : getPhotos(seed, 4);
    return (
      <div className="flex items-center pr-4">
        {imgs.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="-mr-4 h-[60px] w-[40px] shrink-0 rounded-md border-2 border-background object-cover"
          />
        ))}
      </div>
    );
  }

  if (variant === "three") {
    const imgs = customImages?.length ? customImages.slice(0, 3) : getPhotos(seed, 3);
    return (
      <div className="flex items-center pr-8">
        {imgs.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="-mr-8 size-[60px] shrink-0 rounded-md border-2 border-background object-cover"
          />
        ))}
      </div>
    );
  }

  // variant === "two"
  const imgs = customImages?.length ? customImages.slice(0, 2) : getPhotos(seed, 2);
  return (
    <div className="flex items-center pr-6">
      <img
        src={imgs[0]}
        alt=""
        className="-mr-6 size-[60px] shrink-0 rounded-md border-2 border-background object-cover"
      />
      <img
        src={imgs[1]}
        alt=""
        className="-mr-6 h-[60px] w-[80px] shrink-0 rounded-md border-2 border-background object-cover"
      />
    </div>
  );
}
