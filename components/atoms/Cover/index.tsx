"use client";
import { ReactNode, Fragment, useEffect, useState } from "react";
import Link from "next/link";

interface ICoverProps {
  coverPhotoUrl: string;
  fallbackCoverPhotoUrl?: string | null;
  className?: string;
}

const Cover: React.FunctionComponent<ICoverProps> = ({
  coverPhotoUrl,
  fallbackCoverPhotoUrl = null,
  className,
}) => {
  const [coverUrl, setCoverUrl] = useState(fallbackCoverPhotoUrl);

  useEffect(() => {
    const img = new window.Image();
    img.src = coverPhotoUrl;

    img.onload = () => {
      setCoverUrl(coverPhotoUrl);
    };

    img.onerror = () => {
      setCoverUrl(fallbackCoverPhotoUrl);
    };
  }, [coverPhotoUrl, fallbackCoverPhotoUrl]);

  return (
    <div style={{ backgroundImage: `url('${coverUrl}')` }} className={className} />
  );
};

export default Cover;
