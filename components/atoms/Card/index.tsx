import { ReactNode, Fragment } from "react";
import Link from "next/link";

interface ICardProps {
  url: string;
  coverPhotoUrl: string;
  children: ReactNode;
}

const Card: React.FunctionComponent<ICardProps> = ({
  url,
  coverPhotoUrl,
  children,
}) => {
  return (
    <div
      className="
        border rounded-lg bg-white border-gray-200 overflow-hidden cursor-pointer
        transition-all duration-300 ease-in-out
        hover:border-[#f7b43d] hover:scale-105 relative
      "
    >
      <Link href={url}>
        <div style={{ backgroundImage: `url("${coverPhotoUrl}")` }} className="aspect-2/1 bg-cover bg-center"></div>
        <div className="p-5 mb-10">{children}</div>
      </Link>
    </div>
  );
};

export default Card;
