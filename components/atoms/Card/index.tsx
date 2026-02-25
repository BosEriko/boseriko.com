import { ReactNode, Fragment } from "react";

interface ICardProps {
  cover_photo_url: string;
  children: ReactNode;
}

const Card: React.FunctionComponent<ICardProps> = ({
  cover_photo_url,
  children,
}) => {
  return <div>{children}</div>;
};

export default Card;
