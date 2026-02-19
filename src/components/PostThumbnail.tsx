/**
 * Renders a post thumbnail — uses a paused <video> for .mp4 URLs,
 * otherwise a standard <img>.
 */
export function PostThumbnail({
  src,
  alt = "",
  className,
}: {
  src: string;
  alt?: string;
  className?: string;
}) {
  const isVideo = src.endsWith(".mp4");

  if (isVideo) {
    return (
      <video
        src={src}
        muted
        playsInline
        preload="metadata"
        className={className}
      />
    );
  }

  return <img src={src} alt={alt} className={className} />;
}
