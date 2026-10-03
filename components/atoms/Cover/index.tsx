import Image from "next/image";

interface ICoverProps {
  coverPhotoUrl: string;
  fallbackCoverPhotoUrl?: string | null;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  alt?: string;
}

const revalidate = 86400;

const resolveCoverUrl = async (
  coverPhotoUrl: string,
  fallbackCoverPhotoUrl: string | null,
) => {
  if (!fallbackCoverPhotoUrl) return coverPhotoUrl;

  try {
    const res = await fetch(coverPhotoUrl, { next: { revalidate } });
    return res.ok ? coverPhotoUrl : fallbackCoverPhotoUrl;
  } catch {
    return fallbackCoverPhotoUrl;
  }
};

const Cover = async ({
  coverPhotoUrl,
  fallbackCoverPhotoUrl = null,
  className,
  imageClassName,
  sizes = "100vw",
  alt = "",
}: ICoverProps) => {
  const coverUrl = await resolveCoverUrl(coverPhotoUrl, fallbackCoverPhotoUrl);

  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      <Image
        src={coverUrl}
        alt={alt}
        fill
        sizes={sizes}
        className={`object-cover ${imageClassName ?? ""}`}
      />
    </div>
  );
};

export default Cover;
