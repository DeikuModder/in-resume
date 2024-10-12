import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 *
 * @param {() => void} onClose - The function that closes the parent element
 * @returns A closing button
 */
const CLOSE_BTN = ({ onClose }: { onClose: () => void }) => {
  return (
    <button
      onClick={onClose}
      className="hover:text-red-600 transition-colors p-1 font-bold w-[100%]"
    >
      <FontAwesomeIcon icon={faX} />
    </button>
  );
};

export default CLOSE_BTN;
