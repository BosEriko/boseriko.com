import { ReactNode } from "react";
import Link from "next/link";
import Cover from "../Cover";

interface ICardProps {
  url: string;
  coverPhotoUrl: string;
  fallbackCoverPhotoUrl?: string | null;
  children: ReactNode;
}

const Card: React.FunctionComponent<ICardProps> = ({
  url,
  coverPhotoUrl,
  fallbackCoverPhotoUrl = null,
  children,
}) => {
  return (
    <Link href={url} className="group flex h-full flex-col">
      <div className="overflow-hidden rounded-sm border border-line bg-paper-deep">
        <Cover
          coverPhotoUrl={coverPhotoUrl}
          fallbackCoverPhotoUrl={fallbackCoverPhotoUrl}
          className="aspect-2/1 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col pt-5">{children}</div>
    </Link>
  );
};

export default Card;
