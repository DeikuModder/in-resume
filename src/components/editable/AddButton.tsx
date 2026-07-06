import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface AddButtonProps {
  onClick: () => void;
  label: string;
}

const AddButton = ({ onClick, label }: AddButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="hideOnPrint mt-2 flex items-center gap-1 text-sm text-neutral-400 hover:text-neutral-600 transition-colors"
    >
      <FontAwesomeIcon icon={faPlus} />
      {label}
    </button>
  );
};

export default AddButton;
