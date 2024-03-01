import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  handleDelete: (index: number) => void;
  index: number;
};

const DeleteButton: React.FC<Props> = ({ handleDelete, index }) => {
  return (
    <button
      className="hideOnPrint relative right-0 top-0 text-2xl font-bold opacity-20 hover:opacity-100"
      onClick={() => handleDelete(index)}
    >
      <FontAwesomeIcon icon={faTrash} />
    </button>
  );
};

export default DeleteButton;
