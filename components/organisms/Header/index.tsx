import Link from "next/link";
import Atom from "@atom";
import Navigation from "../Navigation";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <Atom.Logo className="h-9 w-9 transition-transform duration-300 group-hover:-rotate-6" />
          <span className="hidden text-sm font-medium tracking-tight sm:block">
            Bos Eriko
          </span>
        </Link>
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
