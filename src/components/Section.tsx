import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Section = ({
  sectionTitle,
  sectionId,
  children,
  additionClass = "text-2xl",
  margin = "mb-8",
  onHide,
}: {
  sectionTitle: string;
  sectionId: string;
  children: React.ReactNode;
  additionClass?: string;
  margin?: string;
  onHide?: () => void;
}) => {
  return (
    <section id={sectionId} className={`${margin} group/section`}>
      <div className="flex items-center gap-2 mb-2">
        <h3 className={`font-bold [color:var(--accent)] ${additionClass}`}>
          {sectionTitle}
        </h3>
        {onHide && (
          <button
            onClick={onHide}
            className="hideOnPrint opacity-0 group-hover/section:opacity-100 transition-opacity text-neutral-400 hover:text-red-500 text-sm"
            title="Hide section"
          >
            <FontAwesomeIcon icon={faEyeSlash} />
          </button>
        )}
      </div>
      {children}
    </section>
  );
};

export default Section;
