import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface PaginationProps {
  page: number;
  previousHref: string;
  nextHref: string;
  hasPrevious: boolean;
  hasNext: boolean;
}

const linkClass =
  "inline-flex items-center gap-2 rounded-sm border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors";
const enabledClass = "border-ink hover:bg-ink hover:text-paper";
const disabledClass = "cursor-not-allowed border-line text-muted/60";

const Pagination: React.FC<PaginationProps> = ({
  page,
  previousHref,
  nextHref,
  hasPrevious,
  hasNext,
}) => {
  return (
    <nav
      aria-label="Pagination"
      className="mt-16 flex items-center justify-between border-t border-line pt-6"
    >
      {hasPrevious ? (
        <Link href={previousHref} className={`${linkClass} ${enabledClass}`}>
          <FontAwesomeIcon icon={faArrowLeft} />
          Previous
        </Link>
      ) : (
        <span aria-disabled className={`${linkClass} ${disabledClass}`}>
          <FontAwesomeIcon icon={faArrowLeft} />
          Previous
        </span>
      )}

      <span className="font-mono text-xs text-muted">
        Page {String(page).padStart(2, "0")}
      </span>

      {hasNext ? (
        <Link href={nextHref} className={`${linkClass} ${enabledClass}`}>
          Next
          <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      ) : (
        <span aria-disabled className={`${linkClass} ${disabledClass}`}>
          Next
          <FontAwesomeIcon icon={faArrowRight} />
        </span>
      )}
    </nav>
  );
};

export default Pagination;
