import { ReactNode } from "react";
import Link from "next/link";
import Cover from "../Cover";
import Window from "../Window";

interface ICardProps {
  url: string;
  coverPhotoUrl: string;
  fallbackCoverPhotoUrl?: string | null;
  label?: string;
  children: ReactNode;
}

const Card: React.FunctionComponent<ICardProps> = ({
  url,
  coverPhotoUrl,
  fallbackCoverPhotoUrl = null,
  label,
  children,
}) => {
  return (
    <Link href={url} className="group flex h-full flex-col">
      <Window
        label={label}
        className="transition-all duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:shadow-[6px_6px_0_var(--color-brand)]"
      >
        <Cover
          coverPhotoUrl={coverPhotoUrl}
          fallbackCoverPhotoUrl={fallbackCoverPhotoUrl}
          className="aspect-2/1 bg-paper-deep"
          imageClassName="transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
        />
      </Window>
      <div className="flex flex-1 flex-col pt-5">{children}</div>
    </Link>
  );
};

export default Card;
